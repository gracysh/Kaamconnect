import { Hammer, ShieldCheck, Star, Wallet, Wind, Wrench, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TAGLINE } from '../lib/constants'
import type { ServiceType } from '../types'

const services: { id: ServiceType; title: string; copy: string; icon: typeof Zap }[] = [
  { id: 'electrician', title: 'Electrician', copy: 'Fans, wiring, MCB trips and emergency power issues.', icon: Zap },
  { id: 'plumber', title: 'Plumber', copy: 'Leaks, taps, bathrooms and drainage — same-day visits.', icon: Wrench },
  { id: 'ac_repair', title: 'AC Repair', copy: 'Servicing, gas filling, installation and weak cooling.', icon: Wind },
  { id: 'carpenter', title: 'Carpenter', copy: 'Doors, wardrobes, furniture repair and woodwork.', icon: Hammer },
]

export function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
              Trusted local trades, on demand
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">{TAGLINE}</h1>
            <p className="mt-5 max-w-lg text-base text-white/75 md:text-lg">
              KAAMCONNECT matches you with verified electricians, plumbers, AC technicians and carpenters near your PIN
              code. See visiting fees upfront. Pay for parts only to the worker — never online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/find" className="btn-primary">
                Find a worker
              </Link>
              <Link to="/register/worker" className="btn-ghost !border-white/20 !bg-transparent !text-white hover:!bg-white/10">
                Join as a worker
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-display text-2xl">4 trades</p>
                <p className="text-white/55">Home essentials</p>
              </div>
              <div>
                <p className="font-display text-2xl">PIN match</p>
                <p className="text-white/55">Nearby first</p>
              </div>
              <div>
                <p className="font-display text-2xl">₹ fees</p>
                <p className="text-white/55">Shown clearly</p>
              </div>
            </div>
          </div>
          <div className="card rotate-1 p-6 text-navy">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">Today in your area</p>
            <p className="mt-2 font-display text-2xl">A typical visit</p>
            <ol className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">1</span>
                Describe the issue and enter your 6-digit PIN.
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">2</span>
                Compare ratings, experience and visiting fee.
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-white">3</span>
                Book. Worker accepts. Parts, if any, paid in person.
              </li>
            </ol>
            <p className="mt-6 rounded-xl bg-cream px-4 py-3 text-xs text-navy/70">
              Demo tip: login as priya@kaamconnect.in / customer123 to try a booking in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl">Services</h2>
            <p className="mt-1 text-navy/60">Pick a trade to start matching nearby approved workers.</p>
          </div>
          <Link to="/find" className="hidden text-sm font-semibold text-accent md:inline">
            Browse all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.id} to={`/find?service=${s.id}`} className="card group p-6 transition hover:-translate-y-1">
              <s.icon className="text-accent" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-navy/65">{s.copy}</p>
              <p className="mt-4 text-sm font-semibold text-navy group-hover:text-accent">Book now</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Tell us the job', copy: 'Choose a service, describe the problem, share area and PIN.' },
              { title: 'Pick a trusted worker', copy: 'See photo initials, years of experience, rating and visiting fee.' },
              { title: 'Track the visit', copy: 'Pending, accepted, completed — then leave a review. Cancel while pending.' },
            ].map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-navy/8 p-6">
                <p className="font-display text-4xl text-accent/80">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-navy/65">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl">Built for Indian homes</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card p-6">
            <ShieldCheck className="text-accent" />
            <h3 className="mt-3 font-semibold">Admin-approved workers</h3>
            <p className="mt-2 text-sm text-navy/65">New workers stay pending until an admin reviews skills and location.</p>
          </div>
          <div className="card p-6">
            <Wallet className="text-accent" />
            <h3 className="mt-3 font-semibold">Clear visiting fees</h3>
            <p className="mt-2 text-sm text-navy/65">No checkout. Repair and material charges go directly to the worker.</p>
          </div>
          <div className="card p-6">
            <Star className="text-accent" />
            <h3 className="mt-3 font-semibold">Reviews that stick</h3>
            <p className="mt-2 text-sm text-navy/65">Completed jobs can be rated so the next customer books with confidence.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
