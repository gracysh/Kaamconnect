import { Link } from 'react-router-dom'
import { APP_NAME, TAGLINE } from '../lib/constants'

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{APP_NAME}</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">{TAGLINE}</p>
        </div>
        <div className="text-sm text-white/75">
          <p className="mb-2 font-semibold text-white">Services</p>
          <p>Electrician · Plumber · AC Repair · Carpenter</p>
          <p className="mt-3">Visiting fees are shown upfront. Repair and material charges are paid directly to workers. No online payments.</p>
        </div>
        <div className="text-sm text-white/75">
          <p className="mb-2 font-semibold text-white">Get started</p>
          <Link to="/register/customer" className="block hover:text-accent">
            Register as customer
          </Link>
          <Link to="/register/worker" className="mt-1 block hover:text-accent">
            Register as worker
          </Link>
          <Link to="/login" className="mt-1 block hover:text-accent">
            Login
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} KAAMCONNECT. Local help, without the runaround.
      </div>
    </footer>
  )
}
