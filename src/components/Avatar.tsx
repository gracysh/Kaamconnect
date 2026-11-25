import { initials } from '../lib/storage'

export function Avatar({ name, hue, size = 'md' }: { name: string; hue: number; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-16 w-16 text-xl' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-sm'
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl font-bold text-white ${dim}`}
      style={{ background: `linear-gradient(145deg, hsl(${hue} 55% 38%), hsl(${hue} 50% 22%))` }}
      aria-hidden
    >
      {initials(name)}
    </div>
  )
}
