import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { AvailabilityDot } from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import { rupees } from '../lib/storage'
import type { ServiceType } from '../types'

export function BookWorker() {
  const { workerId } = useParams()
  const [params] = useSearchParams()
  const { users, currentUser, createBooking, reviews, workerStats } = useApp()
  const navigate = useNavigate()
  const worker = users.find((u) => u.id === workerId)
  const profile = worker?.worker
  const [formError, setFormError] = useState<string | null>(null)
  const [service, setService] = useState<ServiceType>(
    (params.get('service') as ServiceType) || profile?.skills[0] || 'electrician',
  )
  const [problem, setProblem] = useState(params.get('problem') || '')
  const [area, setArea] = useState(params.get('area') || currentUser?.area || '')
  const [pinCode, setPinCode] = useState(params.get('pin') || currentUser?.pinCode || '')

  if (!worker || !profile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-semibold">Worker not found.</p>
        <Link to="/find" className="mt-4 inline-block text-accent">
          Back to search
        </Link>
      </div>
    )
  }

  const stats = workerStats(worker.id)
  const workerReviews = reviews.filter((r) => r.workerId === worker.id)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      navigate('/login', { state: { from: `/book/${worker.id}` } })
      return
    }
    const err = createBooking({ workerId: worker.id, service, problem, area, pinCode })
    if (err) setFormError(err)
    else navigate('/bookings')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="card p-6">
          <div className="flex gap-4">
            <Avatar name={worker.name} hue={profile.avatarHue} size="lg" />
            <div>
              <h1 className="font-display text-3xl">{worker.name}</h1>
              <p className="text-navy/60">
                {profile.location} · {profile.experienceYears} years
              </p>
              <div className="mt-2">
                <AvailabilityDot value={profile.availability} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-navy/70">{profile.bio}</p>
          <p className="mt-4 text-2xl font-bold">
            {rupees(profile.visitingFee)}{' '}
            <span className="text-sm font-medium text-navy/55">visiting fee</span>
          </p>
          <p className="mt-1 text-xs text-navy/55">
            Repair and material charges, if any, are paid directly to {worker.name.split(' ')[0]}. KAAMCONNECT does not
            collect online payments.
          </p>
          <p className="mt-3 text-sm">
            Rating: {stats.count ? `${stats.avg} / 5 from ${stats.count} review(s)` : 'No reviews yet'}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Reviews</h2>
          {workerReviews.length === 0 && <p className="mt-3 text-sm text-navy/50">No reviews yet for this worker.</p>}
          <ul className="mt-3 space-y-3">
            {workerReviews.map((r) => {
              const author = users.find((u) => u.id === r.customerId)
              return (
                <li key={r.id} className="rounded-2xl bg-white p-4 text-sm">
                  <p className="font-semibold">
                    {author?.name ?? 'Customer'} · {r.rating}/5
                  </p>
                  <p className="mt-1 text-navy/70">{r.comment}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <form className="card h-fit space-y-4 p-6" onSubmit={onSubmit}>
        <h2 className="text-lg font-semibold">Create booking</h2>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>}
        {!currentUser && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Sign in as a customer to send this request.{' '}
            <Link className="font-semibold" to="/login" state={{ from: `/book/${worker.id}` }}>
              Login
            </Link>
          </p>
        )}
        <label className="block text-sm font-medium">
          Service
          <select className="input mt-1" value={service} onChange={(e) => setService(e.target.value as ServiceType)}>
            {profile.skills.map((s) => (
              <option key={s} value={s}>
                {SERVICE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Problem
          <textarea className="input mt-1 min-h-28" value={problem} onChange={(e) => setProblem(e.target.value)} required />
        </label>
        <label className="block text-sm font-medium">
          Area
          <input className="input mt-1" value={area} onChange={(e) => setArea(e.target.value)} required />
        </label>
        <label className="block text-sm font-medium">
          PIN code
          <input className="input mt-1" value={pinCode} onChange={(e) => setPinCode(e.target.value)} maxLength={6} required />
        </label>
        <button type="submit" className="btn-primary w-full" disabled={profile.availability === 'unavailable'}>
          Send booking request
        </button>
      </form>
    </div>
  )
}
