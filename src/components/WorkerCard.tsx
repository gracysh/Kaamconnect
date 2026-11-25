import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICE_LABELS } from '../lib/constants'
import { rupees } from '../lib/storage'
import type { ServiceType, User } from '../types'
import { AvailabilityDot } from './StatusBadge'
import { Avatar } from './Avatar'

export function WorkerCard({
  worker,
  stats,
  service,
  pinCode,
  problem,
  area,
}: {
  worker: User
  stats: { avg: number; count: number }
  service?: ServiceType
  pinCode?: string
  problem?: string
  area?: string
}) {
  const profile = worker.worker
  if (!profile) return null
  const params = new URLSearchParams()
  if (service) params.set('service', service)
  if (pinCode) params.set('pin', pinCode)
  if (problem) params.set('problem', problem)
  if (area) params.set('area', area)
  const qs = params.toString()

  return (
    <article className="card flex flex-col p-5">
      <div className="flex gap-4">
        <Avatar name={worker.name} hue={profile.avatarHue} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-semibold">{worker.name}</h3>
            <p className="shrink-0 rounded-lg bg-navy px-2.5 py-1 text-sm font-bold text-white">
              {rupees(profile.visitingFee)}
              <span className="block text-[10px] font-medium text-white/70">visiting fee</span>
            </p>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-navy/60">
            <MapPin size={14} /> {profile.location} · {profile.pinCode}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 font-medium text-navy">
              <Star size={14} className="fill-accent text-accent" />
              {stats.count ? `${stats.avg} (${stats.count})` : 'New'}
            </span>
            <span className="text-navy/40">·</span>
            <span>{profile.experienceYears} yrs experience</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {profile.skills.map((s) => (
          <span key={s} className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-700">
            {SERVICE_LABELS[s]}
          </span>
        ))}
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-sm text-navy/70">{profile.bio}</p>
      <div className="mt-4 flex items-center justify-between">
        <AvailabilityDot value={profile.availability} />
        <Link to={`/book/${worker.id}${qs ? `?${qs}` : ''}`} className="btn-primary !py-2">
          Book visit
        </Link>
      </div>
    </article>
  )
}
