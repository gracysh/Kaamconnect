import type { ApprovalStatus, Availability, BookingStatus } from '../types'

const bookingStyles: Record<BookingStatus, string> = {
  Pending: 'bg-amber-100 text-amber-800',
  Accepted: 'bg-sky-100 text-sky-800',
  Rejected: 'bg-rose-100 text-rose-800',
  Completed: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-navy/10 text-navy/60',
}

export function BookingBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${bookingStyles[status]}`}>{status}</span>
  )
}

export function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  const map: Record<ApprovalStatus, string> = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-rose-100 text-rose-800',
  }
  const label: Record<ApprovalStatus, string> = {
    pending: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[status]}`}>{label[status]}</span>
}

export function AvailabilityDot({ value }: { value: Availability }) {
  const map = {
    available: { c: 'bg-emerald-500', t: 'Available' },
    busy: { c: 'bg-amber-500', t: 'Busy today' },
    unavailable: { c: 'bg-navy/30', t: 'Unavailable' },
  }
  const item = map[value]
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-navy/70">
      <span className={`h-2 w-2 rounded-full ${item.c}`} />
      {item.t}
    </span>
  )
}
