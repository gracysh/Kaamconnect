import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppProvider } from './context/AppContext'
import { AdminDashboard } from './pages/AdminDashboard'
import { BookWorker } from './pages/BookWorker'
import { CustomerBookings } from './pages/CustomerBookings'
import { FindWorkers } from './pages/FindWorkers'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { RegisterCustomer } from './pages/RegisterCustomer'
import { RegisterWorker } from './pages/RegisterWorker'
import { WorkerDashboard } from './pages/WorkerDashboard'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/customer" element={<RegisterCustomer />} />
            <Route path="/register/worker" element={<RegisterWorker />} />
            <Route path="/find" element={<FindWorkers />} />
            <Route path="/book/:workerId" element={<BookWorker />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute roles={['customer']}>
                  <CustomerBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/worker"
              element={
                <ProtectedRoute roles={['worker']}>
                  <WorkerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
