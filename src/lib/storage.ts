import type { Booking, Review, Session, User } from '../types'
import { STORAGE_KEYS } from './constants'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const store = {
  getUsers: () => read<User[]>(STORAGE_KEYS.users, []),
  setUsers: (users: User[]) => write(STORAGE_KEYS.users, users),
  getBookings: () => read<Booking[]>(STORAGE_KEYS.bookings, []),
  setBookings: (bookings: Booking[]) => write(STORAGE_KEYS.bookings, bookings),
  getReviews: () => read<Review[]>(STORAGE_KEYS.reviews, []),
  setReviews: (reviews: Review[]) => write(STORAGE_KEYS.reviews, reviews),
  getSession: () => read<Session | null>(STORAGE_KEYS.session, null),
  setSession: (session: Session | null) => {
    if (session) write(STORAGE_KEYS.session, session)
    else localStorage.removeItem(STORAGE_KEYS.session)
  },
  isSeeded: () => localStorage.getItem(STORAGE_KEYS.seeded) === 'true',
  markSeeded: () => localStorage.setItem(STORAGE_KEYS.seeded, 'true'),
}

export function uid() {
  return crypto.randomUUID()
}

export function nowIso() {
  return new Date().toISOString()
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))
}

export function isValidPin(pin: string) {
  return /^\d{6}$/.test(pin)
}

export function rupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}
