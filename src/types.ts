export type Role = 'customer' | 'worker' | 'admin'
export type ServiceType = 'electrician' | 'plumber' | 'ac_repair' | 'carpenter'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type Availability = 'available' | 'busy' | 'unavailable'
export type BookingStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Completed' | 'Cancelled'

export interface WorkerProfile {
  skills: ServiceType[]
  experienceYears: number
  location: string
  pinCode: string
  visitingFee: number
  availability: Availability
  bio: string
  approvalStatus: ApprovalStatus
  avatarHue: number
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  role: Role
  pinCode?: string
  area?: string
  worker?: WorkerProfile
  createdAt: string
}

export interface Booking {
  id: string
  customerId: string
  workerId: string
  service: ServiceType
  problem: string
  area: string
  pinCode: string
  visitingFee: number
  status: BookingStatus
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  bookingId: string
  customerId: string
  workerId: string
  rating: number
  comment: string
  createdAt: string
}

export interface Session {
  userId: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}
