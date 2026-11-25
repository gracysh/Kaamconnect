import { ApprovalBadge, BookingBadge } from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import { formatDate, rupees } from '../lib/storage'

export function AdminDashboard() {
  const { users, bookings, setWorkerApproval, resetDemo } = useApp()
  const workers = users.filter((u) => u.role === 'worker' && u.worker)
  const pending = workers.filter((w) => w.worker?.approvalStatus === 'pending')
  const rest = workers.filter((w) => w.worker?.approvalStatus !== 'pending')

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Admin dashboard</h1>
          <p className="mt-1 text-navy/65">Approve workers and monitor every booking on the platform.</p>
        </div>
        <button type="button" className="btn-ghost" onClick={resetDemo}>
          Reset demo data
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm text-navy/55">Pending workers</p>
          <p className="text-2xl font-bold">{pending.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-navy/55">Approved workers</p>
          <p className="text-2xl font-bold">{workers.filter((w) => w.worker?.approvalStatus === 'approved').length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-navy/55">Bookings</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Worker approvals</h2>
      {pending.length === 0 && <p className="mt-3 text-sm text-navy/50">No workers waiting for approval.</p>}
      <ul className="mt-3 space-y-3">
        {pending.map((w) => (
          <li key={w.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{w.name}</p>
                <p className="text-sm text-navy/60">
                  {w.phone} · {w.worker?.location} · {w.worker?.pinCode}
                </p>
                <p className="mt-1 text-sm">
                  {w.worker?.skills.map((s) => SERVICE_LABELS[s]).join(', ')} · {w.worker?.experienceYears} yrs · fee{' '}
                  {rupees(w.worker?.visitingFee ?? 0)}
                </p>
                <p className="mt-2 text-sm text-navy/70">{w.worker?.bio}</p>
              </div>
              <ApprovalBadge status="pending" />
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-primary !py-2" onClick={() => setWorkerApproval(w.id, 'approved')}>
                Approve
              </button>
              <button type="button" className="btn-ghost !py-2" onClick={() => setWorkerApproval(w.id, 'rejected')}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">All workers</h2>
      <ul className="mt-3 space-y-2">
        {rest.map((w) => (
          <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3">
            <span className="text-sm font-medium">
              {w.name} · {w.worker?.skills.map((s) => SERVICE_LABELS[s]).join(', ')}
            </span>
            <div className="flex items-center gap-2">
              {w.worker && <ApprovalBadge status={w.worker.approvalStatus} />}
              {w.worker?.approvalStatus === 'rejected' && (
                <button type="button" className="text-xs font-semibold text-accent" onClick={() => setWorkerApproval(w.id, 'approved')}>
                  Approve
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">All bookings</h2>
      {bookings.length === 0 && <p className="mt-3 text-sm text-navy/50">No bookings yet.</p>}
      <ul className="mt-3 space-y-3">
        {bookings.map((b) => {
          const customer = users.find((u) => u.id === b.customerId)
          const worker = users.find((u) => u.id === b.workerId)
          return (
            <li key={b.id} className="card p-4 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold">
                  {SERVICE_LABELS[b.service]} · {customer?.name} → {worker?.name}
                </p>
                <BookingBadge status={b.status} />
              </div>
              <p className="mt-1 text-navy/60">
                {b.area} {b.pinCode} · {formatDate(b.createdAt)} · {rupees(b.visitingFee)} visit
              </p>
              <p className="mt-2">{b.problem}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
