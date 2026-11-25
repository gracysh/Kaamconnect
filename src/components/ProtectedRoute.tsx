import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Role } from '../types'

export function ProtectedRoute({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { currentUser } = useApp()
  const location = useLocation()
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (!roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }
  return children
}
