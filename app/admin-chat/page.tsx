"use client"

import { useState, useEffect } from "react"
import ChatComponent from "../components/ChatComponent"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { supabase } from "@/lib/supabaseClient"
import { Menu } from "lucide-react"
import { useState as useReactState } from "react"

export default function AdminChatPage() {
  const [authenticated, setAuthenticated] = useState(
    typeof window !== 'undefined' && localStorage.getItem('admin-auth') === 'true'
  )
  const [password, setPassword] = useState("")
  const [module, setModule] = useState("chat")
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openMessage, setOpenMessage] = useReactState<string | null>(null)

  // Fetch user messages for Messages module
  useEffect(() => {
    if (authenticated && module === "messages") {
      setLoading(true)
      supabase
        .from('user_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setMessages(data)
          setLoading(false)
        })
    }
  }, [authenticated, module])

  const handleLogin = () => {
    if (password === 'mysheikha') {
      localStorage.setItem('admin-auth', 'true')
      setAuthenticated(true)
    } else {
      alert('Wrong password')
    }
  }

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-xs w-full border border-pink-100">
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-700">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-0 w-full h-screen flex bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Sidebar for desktop, overlay for mobile */}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-pink-100 to-blue-50 border-r border-pink-200 flex flex-col py-8 px-4 gap-2 z-40
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-56 md:flex md:py-8 md:px-4 md:gap-2
        `}
        style={{ minWidth: 0 }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-pink-700 text-2xl font-bold"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-pink-700 mb-8 text-center">Admin</h2>
        <button
          className={`text-left px-4 py-2 rounded-lg font-semibold transition-colors mb-2 ${module === 'chat' ? 'bg-pink-500 text-white shadow' : 'hover:bg-pink-100 text-pink-700'}`}
          onClick={() => { setModule('chat'); setSidebarOpen(false); }}
        >
          💬 Chat
        </button>
        <button
          className={`text-left px-4 py-2 rounded-lg font-semibold transition-colors ${module === 'messages' ? 'bg-pink-500 text-white shadow' : 'hover:bg-pink-100 text-pink-700'}`}
          onClick={() => { setModule('messages'); setSidebarOpen(false); }}
        >
          📥 Messages
        </button>
      </aside>
      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-y-auto h-full flex flex-col min-w-0">
        {/* Header row with burger and title */}
        <div className="flex items-center mb-4 gap-2">
          <button
            className="md:hidden flex items-center justify-center rounded-full bg-white border border-pink-200 shadow-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            style={{ width: 40, height: 40 }}
          >
            <Menu className="w-6 h-6 text-pink-700" />
          </button>
          <h3 className="text-lg sm:text-xl font-bold text-pink-700">{module === 'chat' ? 'Chat with Sheikha' : 'All Messages from Sheikha'}</h3>
        </div>
        {/* Main content area */}
        {module === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 min-h-0">
              <ChatComponent role="admin" embedded />
            </div>
          </div>
        )}
        {module === 'messages' && (
          <div>
            {/* Desktop Table */}
            <div className="hidden md:block">
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-400">No messages found.</TableCell>
                        </TableRow>
                      ) : (
                        messages.map((msg) => (
                          <TableRow key={msg.id}>
                            <TableCell className="font-medium text-pink-700">{msg.room}</TableCell>
                            <TableCell className="max-w-[120px] truncate">
                              {msg.message.length > 32 ? (
                                <>
                                  {msg.message.slice(0, 32)}…
                                  <button
                                    className="ml-2 text-xs text-blue-600 underline hover:text-blue-800 focus:outline-none"
                                    onClick={() => setOpenMessage(msg.message)}
                                  >
                                    See more
                                  </button>
                                </>
                              ) : (
                                msg.message
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            {/* Mobile Card List */}
            <div className="md:hidden space-y-4">
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400">No messages found.</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-xl shadow p-4 border border-pink-100">
                    <div className="text-xs text-pink-700 font-semibold mb-1">Room</div>
                    <div className="mb-2 text-pink-700 font-bold">{msg.room}</div>
                    <div className="text-xs text-gray-500 font-semibold mb-1">Message</div>
                    <div className="mb-2 break-words">
                      {msg.message.length > 32 ? (
                        <>
                          {msg.message.slice(0, 32)}…
                          <button
                            className="ml-2 text-xs text-blue-600 underline hover:text-blue-800 focus:outline-none"
                            onClick={() => setOpenMessage(msg.message)}
                          >
                            See more
                          </button>
                        </>
                      ) : (
                        msg.message
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1">Date</div>
                    <div className="text-xs text-gray-700">{new Date(msg.created_at).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
      {/* Modal for full message */}
      {openMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-xs w-full mx-2 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
              onClick={() => setOpenMessage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-gray-800 break-words whitespace-pre-line">
              {openMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 