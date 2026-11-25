import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { SERVICE_LABELS } from '../lib/constants'
import type { Availability, ServiceType } from '../types'

const allSkills = Object.keys(SERVICE_LABELS) as ServiceType[]

export function RegisterWorker() {
  const { registerWorker } = useApp()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [skills, setSkills] = useState<ServiceType[]>([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    experienceYears: '3',
    location: '',
    pinCode: '',
    visitingFee: '149',
    availability: 'available' as Availability,
    bio: '',
  })

  const toggleSkill = (s: ServiceType) => {
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = registerWorker({
      ...form,
      skills,
      experienceYears: Number(form.experienceYears),
      visitingFee: Number(form.visitingFee),
    })
    if (err) setFormError(err)
    else navigate('/worker')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-4xl">Worker registration</h1>
      <p className="mt-2 text-navy/65">Your profile stays pending until an admin approves it.</p>
      <form className="card mt-8 space-y-4 p-6" onSubmit={onSubmit}>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>}
        <label className="block text-sm font-medium">
          Full name
          <input className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input className="input mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input className="input mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium">
          Contact number
          <input className="input mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Skills</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {allSkills.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSkill(s)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  skills.includes(s) ? 'bg-navy text-white' : 'bg-navy-50 text-navy'
                }`}
              >
                {SERVICE_LABELS[s]}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            Experience (years)
            <input
              className="input mt-1"
              type="number"
              min={0}
              value={form.experienceYears}
              onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Visiting fee (₹)
            <input
              className="input mt-1"
              type="number"
              min={0}
              value={form.visitingFee}
              onChange={(e) => setForm({ ...form, visitingFee: e.target.value })}
              required
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Location
          <input className="input mt-1" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium">
          PIN code
          <input className="input mt-1" value={form.pinCode} onChange={(e) => setForm({ ...form, pinCode: e.target.value })} maxLength={6} required />
        </label>
        <label className="block text-sm font-medium">
          Availability
          <select
            className="input mt-1"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value as Availability })}
          >
            <option value="available">Available</option>
            <option value="busy">Busy today</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Short bio
          <textarea className="input mt-1 min-h-24" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
        </label>
        <button type="submit" className="btn-primary w-full">
          Submit for approval
        </button>
      </form>
      <p className="mt-4 text-sm text-navy/60">
        Already registered? <Link to="/login" className="font-semibold text-accent">Login</Link>
      </p>
    </div>
  )
}
