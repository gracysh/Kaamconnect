import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function RegisterCustomer() {
  const { registerCustomer } = useApp()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    area: '',
    pinCode: '',
  })

  const set = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = registerCustomer(form)
    if (err) setFormError(err)
    else navigate('/find')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-4xl">Customer registration</h1>
      <p className="mt-2 text-navy/65">Create an account to book trusted local workers.</p>
      <form className="card mt-8 space-y-4 p-6" onSubmit={onSubmit}>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>}
        <label className="block text-sm font-medium">
          Full name
          <input className="input mt-1" value={form.name} onChange={set('name')} required />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input className="input mt-1" type="email" value={form.email} onChange={set('email')} required />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input className="input mt-1" type="password" value={form.password} onChange={set('password')} required />
        </label>
        <label className="block text-sm font-medium">
          Mobile
          <input className="input mt-1" value={form.phone} onChange={set('phone')} placeholder="10-digit number" required />
        </label>
        <label className="block text-sm font-medium">
          Area / locality
          <input className="input mt-1" value={form.area} onChange={set('area')} required />
        </label>
        <label className="block text-sm font-medium">
          PIN code
          <input className="input mt-1" value={form.pinCode} onChange={set('pinCode')} maxLength={6} required />
        </label>
        <button type="submit" className="btn-primary w-full">
          Create customer account
        </button>
      </form>
      <p className="mt-4 text-sm text-navy/60">
        Already registered? <Link to="/login" className="font-semibold text-accent">Login</Link>
      </p>
    </div>
  )
}
