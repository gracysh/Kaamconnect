import type { Booking, Review, User } from '../types'
import { store, uid } from './storage'

function daysAgo(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export function seedIfNeeded() {
  if (store.isSeeded()) return

  const admin: User = {
    id: 'user-admin',
    name: 'KAAMCONNECT Admin',
    email: 'admin@kaamconnect.in',
    password: 'admin123',
    phone: '9990001111',
    role: 'admin',
    createdAt: daysAgo(40),
  }

  const customer: User = {
    id: 'user-priya',
    name: 'Priya Sharma',
    email: 'priya@kaamconnect.in',
    password: 'customer123',
    phone: '9876543210',
    role: 'customer',
    pinCode: '110016',
    area: 'Hauz Khas, Delhi',
    createdAt: daysAgo(20),
  }

  const customer2: User = {
    id: 'user-arjun',
    name: 'Arjun Mehta',
    email: 'arjun@kaamconnect.in',
    password: 'customer123',
    phone: '9811122233',
    role: 'customer',
    pinCode: '122001',
    area: 'Sector 29, Gurugram',
    createdAt: daysAgo(12),
  }

  const workers: User[] = [
    {
      id: 'user-ravi',
      name: 'Ravi Kumar',
      email: 'ravi.electrician@kaamconnect.in',
      password: 'worker123',
      phone: '9800112233',
      role: 'worker',
      createdAt: daysAgo(30),
      worker: {
        skills: ['electrician'],
        experienceYears: 9,
        location: 'Hauz Khas, South Delhi',
        pinCode: '110016',
        visitingFee: 149,
        availability: 'available',
        bio: 'Licensed electrician for homes and shops. Fast response for fan, MCB and wiring issues.',
        approvalStatus: 'approved',
        avatarHue: 210,
      },
    },
    {
      id: 'user-neha',
      name: 'Neha Verma',
      email: 'neha.plumber@kaamconnect.in',
      password: 'worker123',
      phone: '9800223344',
      role: 'worker',
      createdAt: daysAgo(25),
      worker: {
        skills: ['plumber'],
        experienceYears: 6,
        location: 'Laxmi Nagar, East Delhi',
        pinCode: '110092',
        visitingFee: 129,
        availability: 'available',
        bio: 'Bathroom fittings, mixer taps, leakage tracing and tank cleaning specialist.',
        approvalStatus: 'approved',
        avatarHue: 18,
      },
    },
    {
      id: 'user-imran',
      name: 'Imran Siddiqui',
      email: 'imran.ac@kaamconnect.in',
      password: 'worker123',
      phone: '9800334455',
      role: 'worker',
      createdAt: daysAgo(22),
      worker: {
        skills: ['ac_repair'],
        experienceYears: 11,
        location: 'Sector 18, Noida',
        pinCode: '201301',
        visitingFee: 199,
        availability: 'available',
        bio: 'Split and window AC servicing, gas charging, PCB and installation work.',
        approvalStatus: 'approved',
        avatarHue: 160,
      },
    },
    {
      id: 'user-suresh',
      name: 'Suresh Yadav',
      email: 'suresh.carpenter@kaamconnect.in',
      password: 'worker123',
      phone: '9800445566',
      role: 'worker',
      createdAt: daysAgo(18),
      worker: {
        skills: ['carpenter'],
        experienceYears: 14,
        location: 'Sector 29, Gurugram',
        pinCode: '122001',
        visitingFee: 179,
        availability: 'busy',
        bio: 'Custom woodwork, door alignment, wardrobes and furniture repair.',
        approvalStatus: 'approved',
        avatarHue: 38,
      },
    },
    {
      id: 'user-kiran',
      name: 'Kiran Joshi',
      email: 'kiran.multi@kaamconnect.in',
      password: 'worker123',
      phone: '9800556677',
      role: 'worker',
      createdAt: daysAgo(10),
      worker: {
        skills: ['electrician', 'ac_repair'],
        experienceYears: 7,
        location: 'Connaught Place, Delhi',
        pinCode: '110001',
        visitingFee: 169,
        availability: 'available',
        bio: 'Handles electrical faults and AC servicing for apartments and offices.',
        approvalStatus: 'approved',
        avatarHue: 280,
      },
    },
    {
      id: 'user-aman',
      name: 'Aman Singh',
      email: 'aman.pending@kaamconnect.in',
      password: 'worker123',
      phone: '9800667788',
      role: 'worker',
      createdAt: daysAgo(1),
      worker: {
        skills: ['plumber', 'carpenter'],
        experienceYears: 4,
        location: 'Dwarka, Delhi',
        pinCode: '110075',
        visitingFee: 99,
        availability: 'available',
        bio: 'New on KAAMCONNECT. Reliable for taps, shelves and small home repairs.',
        approvalStatus: 'pending',
        avatarHue: 330,
      },
    },
  ]

  const bookings: Booking[] = [
    {
      id: 'bk-1',
      customerId: customer.id,
      workerId: 'user-ravi',
      service: 'electrician',
      problem: 'Kitchen socket sparks when the mixer is plugged in.',
      area: 'Hauz Khas Village',
      pinCode: '110016',
      visitingFee: 149,
      status: 'Completed',
      createdAt: daysAgo(8),
      updatedAt: daysAgo(7),
    },
    {
      id: 'bk-2',
      customerId: customer.id,
      workerId: 'user-neha',
      service: 'plumber',
      problem: 'Master bathroom tap keeps dripping overnight.',
      area: 'Hauz Khas',
      pinCode: '110016',
      visitingFee: 129,
      status: 'Accepted',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
    {
      id: 'bk-3',
      customerId: customer2.id,
      workerId: 'user-suresh',
      service: 'carpenter',
      problem: 'Wardrobe door is off-hinge and scraping the floor.',
      area: 'Sector 29',
      pinCode: '122001',
      visitingFee: 179,
      status: 'Pending',
      createdAt: daysAgo(0),
      updatedAt: daysAgo(0),
    },
    {
      id: 'bk-4',
      customerId: customer2.id,
      workerId: 'user-imran',
      service: 'ac_repair',
      problem: 'Bedroom AC cools weakly after 20 minutes.',
      area: 'Noida Sector 18',
      pinCode: '201301',
      visitingFee: 199,
      status: 'Cancelled',
      createdAt: daysAgo(5),
      updatedAt: daysAgo(5),
    },
  ]

  const reviews: Review[] = [
    {
      id: uid(),
      bookingId: 'bk-1',
      customerId: customer.id,
      workerId: 'user-ravi',
      rating: 5,
      comment: 'Reached on time, found the faulty socket and replaced it cleanly. Fair visiting fee.',
      createdAt: daysAgo(7),
    },
  ]

  store.setUsers([admin, customer, customer2, ...workers])
  store.setBookings(bookings)
  store.setReviews(reviews)
  store.markSeeded()
}

export function resetDemoData() {
  localStorage.removeItem('kaamconnect_seeded_v1')
  store.setUsers([])
  store.setBookings([])
  store.setReviews([])
  store.setSession(null)
  seedIfNeeded()
}
