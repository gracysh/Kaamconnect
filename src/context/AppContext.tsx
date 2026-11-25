import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { resetDemoData, seedIfNeeded } from '../lib/seed'
import { isValidEmail, isValidPhone, isValidPin, nowIso, store, uid } from '../lib/storage'
import type {
  Availability,
  Booking,
  BookingStatus,
  Review,
  Role,
  ServiceType,
  User,
  WorkerProfile,
} from '../types'

seedIfNeeded()

interface RegisterCustomerInput {
  name: string
  email: string
  password: string
  phone: string
  area: string
  pinCode: string
}

interface RegisterWorkerInput {
  name: string
  email: string
  password: string
  phone: string
  skills: ServiceType[]
  experienceYears: number
  location: string
  pinCode: string
  visitingFee: number
  availability: Availability
  bio: string
}

interface AppContextValue {
  users: User[]
  bookings: Booking[]
  reviews: Review[]
  currentUser: User | null
  toast: string | null
  error: string | null
  clearMessages: () => void
  login: (email: string, password: string, role: Role) => string | null
  logout: () => void
  registerCustomer: (input: RegisterCustomerInput) => string | null
  registerWorker: (input: RegisterWorkerInput) => string | null
  createBooking: (input: {
    workerId: string
    service: ServiceType
    problem: string
    area: string
    pinCode: string
  }) => string | null
  updateBookingStatus: (bookingId: string, status: BookingStatus) => string | null
  addReview: (bookingId: string, rating: number, comment: string) => string | null
  setWorkerAvailability: (availability: Availability) => void
  setWorkerApproval: (workerId: string, status: 'approved' | 'rejected') => void
  workerStats: (workerId: string) => { avg: number; count: number }
  resetDemo: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => store.getUsers())
  const [bookings, setBookings] = useState<Booking[]>(() => store.getBookings())
  const [reviews, setReviews] = useState<Review[]>(() => store.getReviews())
  const [sessionId, setSessionId] = useState<string | null>(() => store.getSession()?.userId ?? null)
  const [toast, setToast] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const persistUsers = (next: User[]) => {
    setUsers(next)
    store.setUsers(next)
  }
  const persistBookings = (next: Booking[]) => {
    setBookings(next)
    store.setBookings(next)
  }
  const persistReviews = (next: Review[]) => {
    setReviews(next)
    store.setReviews(next)
  }

  const currentUser = users.find((u) => u.id === sessionId) ?? null

  const clearMessages = useCallback(() => {
    setToast(null)
    setError(null)
  }, [])

  const login = (email: string, password: string, role: Role) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!user) return 'No account matches that email and password.'
    if (user.role !== role) return `This account is registered as a ${user.role}, not a ${role}.`
    store.setSession({ userId: user.id })
    setSessionId(user.id)
    setError(null)
    setToast(`Welcome back, ${user.name.split(' ')[0]}.`)
    return null
  }

  const logout = () => {
    store.setSession(null)
    setSessionId(null)
    setToast('You have been signed out.')
  }

  const registerCustomer = (input: RegisterCustomerInput) => {
    if (!input.name.trim()) return 'Please enter your full name.'
    if (!isValidEmail(input.email)) return 'Enter a valid email address.'
    if (input.password.length < 6) return 'Password must be at least 6 characters.'
    if (!isValidPhone(input.phone)) return 'Enter a valid 10-digit Indian mobile number.'
    if (!input.area.trim()) return 'Please enter your area.'
    if (!isValidPin(input.pinCode)) return 'PIN code must be 6 digits.'
    if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
      return 'An account with this email already exists.'
    }
    const user: User = {
      id: uid(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      phone: input.phone.trim(),
      role: 'customer',
      area: input.area.trim(),
      pinCode: input.pinCode.trim(),
      createdAt: nowIso(),
    }
    persistUsers([...users, user])
    store.setSession({ userId: user.id })
    setSessionId(user.id)
    setToast('Account created. You can now book a worker.')
    return null
  }

  const registerWorker = (input: RegisterWorkerInput) => {
    if (!input.name.trim()) return 'Please enter your full name.'
    if (!isValidEmail(input.email)) return 'Enter a valid email address.'
    if (input.password.length < 6) return 'Password must be at least 6 characters.'
    if (!isValidPhone(input.phone)) return 'Enter a valid 10-digit Indian mobile number.'
    if (input.skills.length === 0) return 'Select at least one skill.'
    if (input.experienceYears < 0 || Number.isNaN(input.experienceYears)) return 'Enter years of experience.'
    if (!input.location.trim()) return 'Please enter your location.'
    if (!isValidPin(input.pinCode)) return 'PIN code must be 6 digits.'
    if (input.visitingFee < 0) return 'Visiting fee cannot be negative.'
    if (!input.bio.trim()) return 'Please add a short bio.'
    if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
      return 'An account with this email already exists.'
    }
    const worker: WorkerProfile = {
      skills: input.skills,
      experienceYears: input.experienceYears,
      location: input.location.trim(),
      pinCode: input.pinCode.trim(),
      visitingFee: input.visitingFee,
      availability: input.availability,
      bio: input.bio.trim(),
      approvalStatus: 'pending',
      avatarHue: Math.floor(Math.random() * 360),
    }
    const user: User = {
      id: uid(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      phone: input.phone.trim(),
      role: 'worker',
      worker,
      createdAt: nowIso(),
    }
    persistUsers([...users, user])
    store.setSession({ userId: user.id })
    setSessionId(user.id)
    setToast('Profile submitted. An admin will approve you before customers can book you.')
    return null
  }

  const createBooking = (input: {
    workerId: string
    service: ServiceType
    problem: string
    area: string
    pinCode: string
  }) => {
    if (!currentUser || currentUser.role !== 'customer') return 'Please sign in as a customer to book.'
    if (!input.problem.trim() || input.problem.trim().length < 12) {
      return 'Describe the problem in at least 12 characters.'
    }
    if (!input.area.trim()) return 'Enter your area.'
    if (!isValidPin(input.pinCode)) return 'PIN code must be 6 digits.'
    const worker = users.find((u) => u.id === input.workerId && u.role === 'worker')
    if (!worker?.worker) return 'Worker not found.'
    if (worker.worker.approvalStatus !== 'approved') return 'This worker is not approved yet.'
    if (worker.worker.availability === 'unavailable') return 'This worker is currently unavailable.'
    if (!worker.worker.skills.includes(input.service)) return 'This worker does not offer that service.'
    const booking: Booking = {
      id: uid(),
      customerId: currentUser.id,
      workerId: worker.id,
      service: input.service,
      problem: input.problem.trim(),
      area: input.area.trim(),
      pinCode: input.pinCode.trim(),
      visitingFee: worker.worker.visitingFee,
      status: 'Pending',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    }
    persistBookings([booking, ...bookings])
    setToast('Booking request sent. The worker will accept or reject it shortly.')
    return null
  }

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    if (!currentUser) return 'Please sign in first.'
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return 'Booking not found.'
    const isCustomer = currentUser.id === booking.customerId
    const isWorker = currentUser.id === booking.workerId
    const isAdmin = currentUser.role === 'admin'

    if (status === 'Cancelled' && !isCustomer && !isAdmin) return 'Only the customer can cancel.'
    if (status === 'Cancelled' && booking.status !== 'Pending') {
      return 'Only pending bookings can be cancelled.'
    }
    if ((status === 'Accepted' || status === 'Rejected') && !isWorker && !isAdmin) {
      return 'Only the assigned worker can accept or reject.'
    }
    if ((status === 'Accepted' || status === 'Rejected') && booking.status !== 'Pending') {
      return 'This request is no longer pending.'
    }
    if (status === 'Completed' && !isWorker && !isAdmin) return 'Only the worker can mark a job completed.'
    if (status === 'Completed' && booking.status !== 'Accepted') {
      return 'Only accepted bookings can be completed.'
    }

    persistBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status, updatedAt: nowIso() } : b)),
    )
    setToast(`Booking marked as ${status}.`)
    return null
  }

  const addReview = (bookingId: string, rating: number, comment: string) => {
    if (!currentUser || currentUser.role !== 'customer') return 'Please sign in as a customer.'
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return 'Booking not found.'
    if (booking.customerId !== currentUser.id) return 'You can only review your own bookings.'
    if (booking.status !== 'Completed') return 'Reviews are available after a job is completed.'
    if (reviews.some((r) => r.bookingId === bookingId)) return 'You already reviewed this visit.'
    if (rating < 1 || rating > 5) return 'Choose a rating from 1 to 5.'
    if (!comment.trim()) return 'Please add a short comment.'
    const review: Review = {
      id: uid(),
      bookingId,
      customerId: currentUser.id,
      workerId: booking.workerId,
      rating,
      comment: comment.trim(),
      createdAt: nowIso(),
    }
    persistReviews([review, ...reviews])
    setToast('Thanks for the review.')
    return null
  }

  const setWorkerAvailability = (availability: Availability) => {
    if (!currentUser?.worker) return
    persistUsers(
      users.map((u) =>
        u.id === currentUser.id && u.worker ? { ...u, worker: { ...u.worker, availability } } : u,
      ),
    )
    setToast('Availability updated.')
  }

  const setWorkerApproval = (workerId: string, status: 'approved' | 'rejected') => {
    if (currentUser?.role !== 'admin') return
    persistUsers(
      users.map((u) =>
        u.id === workerId && u.worker ? { ...u, worker: { ...u.worker, approvalStatus: status } } : u,
      ),
    )
    setToast(status === 'approved' ? 'Worker approved.' : 'Worker rejected.')
  }

  const workerStats = (workerId: string) => {
    const list = reviews.filter((r) => r.workerId === workerId)
    if (list.length === 0) return { avg: 0, count: 0 }
    const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length
    return { avg: Number(avg.toFixed(1)), count: list.length }
  }

  const resetDemo = () => {
    resetDemoData()
    setUsers(store.getUsers())
    setBookings(store.getBookings())
    setReviews(store.getReviews())
    setSessionId(null)
    setToast('Demo data restored.')
  }

  const value = useMemo(
    () => ({
      users,
      bookings,
      reviews,
      currentUser,
      toast,
      error,
      clearMessages,
      login,
      logout,
      registerCustomer,
      registerWorker,
      createBooking,
      updateBookingStatus,
      addReview,
      setWorkerAvailability,
      setWorkerApproval,
      workerStats,
      resetDemo,
    }),
    [users, bookings, reviews, currentUser, toast, error, clearMessages],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
