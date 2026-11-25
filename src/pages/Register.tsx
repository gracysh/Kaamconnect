import { Hammer, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Register() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl">Create an account</h1>
      <p className="mt-2 text-navy/65">Choose how you want to use KAAMCONNECT.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link to="/register/customer" className="card p-8 transition hover:-translate-y-1">
          <UserRound className="text-accent" size={32} />
          <h2 className="mt-4 text-2xl font-semibold">I need a worker</h2>
          <p className="mt-2 text-sm text-navy/65">Book electricians, plumbers, AC repair and carpenters near you.</p>
          <p className="mt-6 font-semibold text-accent">Customer registration →</p>
        </Link>
        <Link to="/register/worker" className="card p-8 transition hover:-translate-y-1">
          <Hammer className="text-accent" size={32} />
          <h2 className="mt-4 text-2xl font-semibold">I provide a service</h2>
          <p className="mt-2 text-sm text-navy/65">List your skills, visiting fee and availability. Admin approval required.</p>
          <p className="mt-6 font-semibold text-accent">Worker registration →</p>
        </Link>
      </div>
    </div>
  )
}
