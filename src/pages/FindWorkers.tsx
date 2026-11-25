import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { WorkerCard } from '../components/WorkerCard'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import { isValidPin } from '../lib/storage'
import type { ServiceType } from '../types'

const services = Object.keys(SERVICE_LABELS) as ServiceType[]

export function FindWorkers() {
  const { users, workerStats, currentUser } = useApp()
  const [params, setParams] = useSearchParams()
  const initialService = (params.get('service') as ServiceType | null) || 'electrician'
  const [service, setService] = useState<ServiceType>(
    services.includes(initialService) ? initialService : 'electrician',
  )
  const [pinCode, setPinCode] = useState(params.get('pin') || currentUser?.pinCode || '')
  const [area, setArea] = useState(params.get('area') || currentUser?.area || '')
  const [problem, setProblem] = useState(params.get('problem') || '')
  const [searched, setSearched] = useState(Boolean(params.get('service') || params.get('pin')))
  const [searchError, setSearchError] = useState<string | null>(null)

  const runSearch = (e?: FormEvent) => {
    e?.preventDefault()
    if (pinCode && !isValidPin(pinCode)) {
      setSearchError('PIN code must be 6 digits.')
      return
    }
    if (problem && problem.trim().length < 12) {
      setSearchError('Problem description should be at least 12 characters so workers understand the job.')
      return
    }
    setSearchError(null)
    setSearched(true)
    setParams({ service, pin: pinCode, problem, area })
  }

  const results = useMemo(() => {
    if (!searched) return []
    return users.filter((u) => {
      if (u.role !== 'worker' || !u.worker) return false
      if (u.worker.approvalStatus !== 'approved') return false
      if (!u.worker.skills.includes(service)) return false
      if (pinCode && u.worker.pinCode !== pinCode) {
        const samePrefix = u.worker.pinCode.slice(0, 3) === pinCode.slice(0, 3)
        if (!samePrefix) return false
      }
      return true
    })
  }, [users, searched, service, pinCode])

  const exact = results.filter((u) => !pinCode || u.worker?.pinCode === pinCode)
  const nearby = results.filter((u) => pinCode && u.worker?.pinCode !== pinCode)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl">Find the right worker</h1>
      <p className="mt-2 max-w-2xl text-navy/65">
        Select a service, describe the issue and enter your PIN. Visiting fees are listed on every card. Parts and
        repair extra are paid to the worker in person.
      </p>

      <form className="card mt-8 grid gap-4 p-6 md:grid-cols-2" onSubmit={runSearch}>
        {searchError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 md:col-span-2">{searchError}</p>}
        <label className="block text-sm font-medium">
          Service
          <select className="input mt-1" value={service} onChange={(e) => setService(e.target.value as ServiceType)}>
            {services.map((s) => (
              <option key={s} value={s}>
                {SERVICE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Area
          <input className="input mt-1" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Locality" />
        </label>
        <label className="block text-sm font-medium">
          PIN code
          <input className="input mt-1" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="e.g. 110016" maxLength={6} />
        </label>
        <label className="block text-sm font-medium md:col-span-2">
          Describe the problem
          <textarea
            className="input mt-1 min-h-24"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Example: Kitchen socket sparks when I plug in the mixer."
          />
        </label>
        <button type="submit" className="btn-primary md:col-span-2">
          Show matching workers
        </button>
      </form>

      {!searched && (
        <p className="mt-10 text-center text-navy/50">Search to see approved workers in your area.</p>
      )}

      {searched && results.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
          <p className="font-semibold">No approved workers for this search yet.</p>
          <p className="mt-2 text-sm text-navy/60">
            Try PIN 110016, 110092, 122001, 201301 or 110001 — those have demo workers.
          </p>
        </div>
      )}

      {exact.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">In your PIN {pinCode || ''}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {exact.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                stats={workerStats(w.id)}
                service={service}
                pinCode={pinCode}
                problem={problem}
                area={area}
              />
            ))}
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Nearby (same region)</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {nearby.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                stats={workerStats(w.id)}
                service={service}
                pinCode={pinCode}
                problem={problem}
                area={area}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
