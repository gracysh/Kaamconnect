import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useApp } from '../context/AppContext'

export function Toast() {
  const { toast, error, clearMessages } = useApp()
  const msg = error || toast
  useEffect(() => {
    if (!msg) return
    const t = window.setTimeout(clearMessages, 4200)
    return () => window.clearTimeout(t)
  }, [msg, clearMessages])

  if (!msg) return null
  return (
    <div className="pointer-events-none fixed top-20 right-4 z-50 max-w-sm">
      <div
        className={`pointer-events-auto flex items-start gap-3 rounded-2xl px-4 py-3 text-sm shadow-lg ${
          error ? 'bg-rose-600 text-white' : 'bg-navy text-white'
        }`}
      >
        <p className="flex-1">{msg}</p>
        <button type="button" onClick={clearMessages} className="opacity-80 hover:opacity-100" aria-label="Dismiss">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
