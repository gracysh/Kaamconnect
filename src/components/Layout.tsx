import { Outlet } from 'react-router-dom'
import { Chatbot } from './Chatbot'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Toast } from './Toast'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Toast />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
