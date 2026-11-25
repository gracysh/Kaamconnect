import { MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { replyToChat } from '../lib/aiChat'
import { uid } from '../lib/storage'
import type { ChatMessage } from '../types'

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! Welcome to KAAMCONNECT 👋 I am your AI assistant. I can help you find local workers, understand services, book services and answer questions. How can I help you today?',
    },
  ])

  const send = async () => {
    const text = input.trim()
    if (!text || pending) return
  
    setInput('')
  
    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      text,
    }
  
    setMessages((m) => [...m, userMsg])
    setPending(true)
  
    try {
      const reply = await replyToChat(text)
  
      setMessages((m) => [
        ...m,
        { id: uid(), role: 'assistant', text: reply },
      ])
    } catch (error) {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'assistant',
          text: 'Sorry, I could not respond right now. Please try again.',
        },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40">
      {open && (
        <div className="mb-3 flex h-[440px] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">KAAMCONNECT Assist</p>
              <p className="text-[11px] text-white/60">AI-powered service assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-cream p-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === 'user' ? 'ml-auto bg-navy text-white' : 'bg-white text-navy shadow-sm'
                }`}
              >
                {m.text}
              </div>
            ))}
            {pending && (
             <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs text-navy/60 shadow-sm w-fit">
              <span className="animate-pulse">● ● ●</span>
              KAAMCONNECT AI is typing...
             </div>
            )}
          </div>
          <form
            className="flex gap-2 border-t border-navy/10 p-3"
            onSubmit={(e) => {
              e.preventDefault()
              void send()
            }}
          >
            <input
              className="input !py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bookings…"
            />
            <button type="submit" className="btn-primary !px-3" disabled={pending} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-dark"
        aria-label="Open chatbot"
      >
        <MessageCircle />
      </button>
    </div>
  )
}
