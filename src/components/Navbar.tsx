import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function Navbar() {
  const { currentUser, logout } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const homeDash =
    currentUser?.role === 'admin' ? '/admin' : currentUser?.role === 'worker' ? '/worker' : '/bookings'

  const links = [
    { to: '/', label: 'Home' },
    { to: '/find', label: 'Find Workers' },
    { to: '/#how-it-works', label: 'How it works', hash: true },
  ]

  if (currentUser?.role === 'customer') links.push({ to: '/bookings', label: 'My bookings' })
  if (currentUser?.role === 'worker') links.push({ to: '/worker', label: 'Dashboard' })
  if (currentUser?.role === 'admin') links.push({ to: '/admin', label: 'Admin' })

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-display text-lg font-bold">
            K
          </span>
          <span className="font-display text-xl tracking-tight">KAAMCONNECT</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) =>
            link.hash ? (
              <a key={link.to} href={link.to} className="text-white/75 hover:text-white">
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'text-accent' : 'text-white/75 hover:text-white')}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <>
              <button
                type="button"
                onClick={() => navigate(homeDash)}
                className="text-sm text-white/80 hover:text-white"
              >
                {currentUser.name.split(' ')[0]} · {currentUser.role}
              </button>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="btn-ghost !border-white/20 !bg-transparent !py-2 !text-white hover:!bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-white/85 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="btn-primary !py-2.5">
                Register
              </Link>
            </>
          )}
        </div>

        <button type="button" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="space-y-3 border-t border-white/10 px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link key={link.to} to={link.hash ? '/' : link.to} onClick={() => setOpen(false)} className="block text-white/85">
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <button
              type="button"
              className="btn-ghost w-full !border-white/20 !bg-transparent !text-white"
              onClick={() => {
                logout()
                setOpen(false)
                navigate('/')
              }}
            >
              Sign out
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn-ghost flex-1 !border-white/20 !bg-transparent !text-white" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-primary flex-1" onClick={() => setOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
