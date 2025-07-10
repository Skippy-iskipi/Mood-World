"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from '../../lib/supabaseClient'
import { ArrowLeft } from "lucide-react"

interface Message {
  id: string
  sender: string
  message: string
  created_at: string
  replied_to?: string | null
}

interface ChatComponentProps {
  role: 'user' | 'admin'
  onClose?: () => void
}

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatComponent({ role, onClose }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch messages initially and subscribe to realtime
  useEffect(() => {
    fetchMessages()
    const channel = supabase.channel('messages').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      () => fetchMessages()
    ).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (!error && data) setMessages(data as Message[])
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    await supabase.from('messages').insert([
      { sender: role, message: input }
    ])
    setInput("")
    setLoading(false)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 min-h-screen min-w-full">
      <div className="relative w-full flex items-center justify-center h-16 border-b bg-white/90 shadow-sm">
        {onClose && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 md:p-4 border-2 border-pink-200 flex items-center justify-center hover:bg-white transition-all duration-300 touch-manipulation"
            onClick={onClose}
            aria-label="Back"
            style={{ minWidth: "48px", minHeight: "48px" }}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>
        )}
        <span className="text-lg font-bold text-pink-700">Chat with Babe</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 p-4 pb-28">
        {messages.map(msg => {
          const isUser = msg.sender === 'user'
          const isMe = (role === 'user' && isUser) || (role === 'admin' && !isUser)
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md break-words
                ${isUser ? 'bg-pink-200 text-pink-900 rounded-br-md' : 'bg-blue-200 text-blue-900 rounded-bl-md'}`}
                style={{ marginBottom: 4 }}
              >
                <span>{msg.message}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {isUser ? 'Sheikha' : 'Uel'}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{formatTime(msg.created_at)}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white/95 p-4 flex gap-2 border-t z-50">
        <input
          className="flex-1 border rounded-lg px-3 py-3 text-base focus:outline-none focus:ring"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-base disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
} 