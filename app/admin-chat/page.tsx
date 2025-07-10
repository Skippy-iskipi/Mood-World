"use client"

import { useState } from "react"
import ChatComponent from "../components/ChatComponent"

export default function AdminChatPage() {
  const [authenticated, setAuthenticated] = useState(
    typeof window !== 'undefined' && localStorage.getItem('admin-auth') === 'true'
  )
  const [password, setPassword] = useState("")

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return <ChatComponent role="admin" />
} 