import type { ServiceType } from '../types'

export const APP_NAME = 'KAAMCONNECT'
export const TAGLINE = 'Find the Right Worker, Right When You Need One.'

export const SERVICE_LABELS: Record<ServiceType, string> = {
  electrician: 'Electrician',
  plumber: 'Plumber',
  ac_repair: 'AC Repair',
  carpenter: 'Carpenter',
}

export const SERVICE_BLURBS: Record<ServiceType, string> = {
  electrician: 'Wiring, fans, switches, inverters and emergency power issues.',
  plumber: 'Leaks, taps, bathrooms, tanks and drainage repairs.',
  ac_repair: 'Servicing, gas filling, installation and cooling issues.',
  carpenter: 'Furniture, doors, modular work and wood repairs at home.',
}

export const STORAGE_KEYS = {
  users: 'kaamconnect_users',
  bookings: 'kaamconnect_bookings',
  reviews: 'kaamconnect_reviews',
  session: 'kaamconnect_session',
  seeded: 'kaamconnect_seeded_v1',
}

export const DEMO_ACCOUNTS = [
  { role: 'Customer', email: 'priya@kaamconnect.in', password: 'customer123' },
  { role: 'Worker', email: 'ravi.electrician@kaamconnect.in', password: 'worker123' },
  { role: 'Admin', email: 'admin@kaamconnect.in', password: 'admin123' },
] as const
