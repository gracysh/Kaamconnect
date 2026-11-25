import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookingBadge } from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import { formatDate, rupees } from '../lib/storage'

export function CustomerBookings() {
  const { currentUser, bookings, users, reviews, updateBookingStatus, addReview } = useApp()
  const mine = bookings.filter((b) => b.customerId === currentUser?.id)
  const [comment, setComment] = useState<Record<string, string>>({})
  const [rating, setRating] = useState<Record<string, number>>({})
  const [localError, setLocalError] = useState<string | null>(null)

  const submitReview = (bookingId: string) => {
    const err = addReview(bookingId, rating[bookingId] || 5, comment[bookingId] || '')
    setLocalError(err)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl">Booking history</h1>
      <p className="mt-2 text-navy/65">Track requests, cancel while pending, and rate completed visits.</p>
      {localError && <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{localError}</p>}

      {mine.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
          <p className="font-semibold">No bookings yet.</p>
          <Link to="/find" className="mt-3 inline-block font-semibold text-accent">
            Find a worker
          </Link>
        </div>
      )}

      <ul className="mt-8 space-y-4">
        {mine.map((b) => {
          const worker = users.find((u) => u.id === b.workerId)
          const reviewed = reviews.some((r) => r.bookingId === b.id)
          return (
            <li key={b.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {SERVICE_LABELS[b.service]} · {worker?.name ?? 'Worker'}
                  </p>
                  <p className="text-sm text-navy/60">
                    {b.area} · {b.pinCode} · {formatDate(b.createdAt)}
                  </p>
                </div>
                <BookingBadge status={b.status} />
              </div>
              <p className="mt-3 text-sm text-navy/75">{b.problem}</p>
              <p className="mt-2 text-sm font-semibold">
                Visiting fee {rupees(b.visitingFee)}{' '}
                <span className="font-normal text-navy/50">· extras paid to worker</span>
              </p>
              {b.status === 'Pending' && (
                <button
                  type="button"
                  className="btn-ghost mt-4 !py-2"
                  onClick={() => setLocalError(updateBookingStatus(b.id, 'Cancelled'))}
                >
                  Cancel request
                </button>
              )}
              {b.status === 'Completed' && !reviewed && (
                <div className="mt-4 space-y-2 rounded-xl bg-cream p-4">
                  <p className="text-sm font-semibold">Leave a review</p>
                  <select
                    className="input"
                    value={rating[b.id] ?? 5}
                    onChange={(e) => setRating((r) => ({ ...r, [b.id]: Number(e.target.value) }))}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} star{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="input min-h-20"
                    placeholder="How was the visit?"
                    value={comment[b.id] ?? ''}
                    onChange={(e) => setComment((c) => ({ ...c, [b.id]: e.target.value }))}
                  />
                  <button type="button" className="btn-primary !py-2" onClick={() => submitReview(b.id)}>
                    Submit review
                  </button>
                </div>
              )}
              {reviewed && <p className="mt-3 text-xs font-medium text-emerald-700">You reviewed this visit.</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
