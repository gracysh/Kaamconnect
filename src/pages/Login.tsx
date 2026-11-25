import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { DEMO_ACCOUNTS } from '../lib/constants'
import type { Role } from '../types'

export function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from
  const [role, setRole] = useState<Role>('customer')
  const [email, setEmail] = useState('priya@kaamconnect.in')
  const [password, setPassword] = useState('customer123')
  const [formError, setFormError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = login(email, password, role)
    if (err) {
      setFormError(err)
      return
    }
    if (from) navigate(from)
    else if (role === 'admin') navigate('/admin')
    else if (role === 'worker') navigate('/worker')
    else navigate('/find')
  }

  const fillDemo = (r: Role) => {
    setRole(r)
    if (r === 'admin') {
      setEmail('admin@kaamconnect.in')
      setPassword('admin123')
    } else if (r === 'worker') {
      setEmail('ravi.electrician@kaamconnect.in')
      setPassword('worker123')
    } else {
      setEmail('priya@kaamconnect.in')
      setPassword('customer123')
    }
    setFormError(null)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl">Welcome back</h1>
      <p className="mt-2 text-navy/65">Sign in to manage bookings or your worker profile.</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {(['customer', 'worker', 'admin'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => fillDemo(r)}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize ${
              role === r ? 'border-accent bg-accent/10 text-navy' : 'border-navy/10 bg-white text-navy/70'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form className="card mt-6 space-y-4 p-6" onSubmit={onSubmit}>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>}
        <label className="block text-sm font-medium">
          Email
          <input className="input mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input className="input mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn-primary w-full">
          Login as {role}
        </button>
      </form>

      <p className="mt-4 text-sm text-navy/60">
        New here? <Link to="/register" className="font-semibold text-accent">Register</Link>
      </p>

      <div className="mt-8 rounded-2xl bg-white p-4 text-xs text-navy/70">
        <p className="font-semibold text-navy">Demo accounts</p>
        <ul className="mt-2 space-y-1">
          {DEMO_ACCOUNTS.map((a) => (
            <li key={a.email}>
              {a.role}: {a.email} / {a.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
