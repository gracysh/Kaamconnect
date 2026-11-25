import { BookingBadge, ApprovalBadge } from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import { formatDate, rupees } from '../lib/storage'
import type { Availability } from '../types'

export function WorkerDashboard() {
  const { currentUser, bookings, users, reviews, updateBookingStatus, setWorkerAvailability, workerStats } =
    useApp()
  const profile = currentUser?.worker
  const mine = bookings.filter((b) => b.workerId === currentUser?.id)
  const pending = mine.filter((b) => b.status === 'Pending')
  const others = mine.filter((b) => b.status !== 'Pending')
  const stats = currentUser ? workerStats(currentUser.id) : { avg: 0, count: 0 }
  const myReviews = reviews.filter((r) => r.workerId === currentUser?.id)

  if (!profile) return null

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Worker dashboard</h1>
          <p className="mt-1 text-navy/65">Hello {currentUser?.name}. Manage requests and availability.</p>
        </div>
        <ApprovalBadge status={profile.approvalStatus} />
      </div>

      {profile.approvalStatus !== 'approved' && (
        <p className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Customers will not see your profile until an admin approves it. You can still preview incoming requests after
          approval.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm text-navy/55">Visiting fee</p>
          <p className="mt-1 text-2xl font-bold">{rupees(profile.visitingFee)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-navy/55">Rating</p>
          <p className="mt-1 text-2xl font-bold">{stats.count ? `${stats.avg} / 5` : '—'}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-navy/55">Open requests</p>
          <p className="mt-1 text-2xl font-bold">{pending.length}</p>
        </div>
      </div>

      <label className="mt-6 block max-w-xs text-sm font-medium">
        Availability
        <select
          className="input mt-1"
          value={profile.availability}
          onChange={(e) => setWorkerAvailability(e.target.value as Availability)}
        >
          <option value="available">Available</option>
          <option value="busy">Busy today</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>

      <h2 className="mt-10 text-lg font-semibold">Incoming requests</h2>
      {pending.length === 0 && <p className="mt-3 text-sm text-navy/50">No pending requests right now.</p>}
      <ul className="mt-3 space-y-3">
        {pending.map((b) => {
          const customer = users.find((u) => u.id === b.customerId)
          return (
            <li key={b.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold">
                  {SERVICE_LABELS[b.service]} · {customer?.name}
                </p>
                <BookingBadge status={b.status} />
              </div>
              <p className="mt-1 text-sm text-navy/60">
                {b.area} · {b.pinCode} · {customer?.phone}
              </p>
              <p className="mt-2 text-sm">{b.problem}</p>
              <p className="mt-2 text-sm font-semibold">Visiting fee {rupees(b.visitingFee)}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" className="btn-primary !py-2" onClick={() => updateBookingStatus(b.id, 'Accepted')}>
                  Accept
                </button>
                <button type="button" className="btn-ghost !py-2" onClick={() => updateBookingStatus(b.id, 'Rejected')}>
                  Reject
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Other bookings</h2>
      {others.length === 0 && <p className="mt-3 text-sm text-navy/50">No other bookings yet.</p>}
      <ul className="mt-3 space-y-3">
        {others.map((b) => {
          const customer = users.find((u) => u.id === b.customerId)
          return (
            <li key={b.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold">
                  {SERVICE_LABELS[b.service]} · {customer?.name} · {formatDate(b.updatedAt)}
                </p>
                <BookingBadge status={b.status} />
              </div>
              <p className="mt-2 text-sm text-navy/70">{b.problem}</p>
              {b.status === 'Accepted' && (
                <button
                  type="button"
                  className="btn-navy mt-4 !py-2"
                  onClick={() => updateBookingStatus(b.id, 'Completed')}
                >
                  Mark completed
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Reviews received</h2>
      {myReviews.length === 0 && <p className="mt-3 text-sm text-navy/50">No reviews yet.</p>}
      <ul className="mt-3 space-y-3">
        {myReviews.map((r) => (
          <li key={r.id} className="rounded-2xl bg-white p-4 text-sm">
            <p className="font-semibold">{r.rating}/5</p>
            <p className="mt-1 text-navy/70">{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
