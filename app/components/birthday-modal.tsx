"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Lock, Heart } from "lucide-react"

interface BirthdayModalProps {
  isOpen: boolean
  onSuccess: () => void
}

export default function BirthdayModal({ isOpen, onSuccess }: BirthdayModalProps) {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Set the correct birthday here (MM/DD/YYYY format)
  const correctBirthday = {
    day: "19",
    month: "07",
    year: "2003"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    if (day === correctBirthday.day && 
        month === correctBirthday.month && 
        year === correctBirthday.year) {
      // Store authentication in localStorage
      localStorage.setItem("birthdayAuthenticated", "true")
      onSuccess()
    } else {
      setError("That's not quite right, Babe. Try again? 💕")
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-pink-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome, My Love 💕
                </h2>
                <p className="text-gray-600 text-sm">
                  Please enter your birthday
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Month */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month
                    </label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const monthNum = String(i + 1).padStart(2, "0")
                        return (
                          <option key={monthNum} value={monthNum}>
                            {monthNum}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  {/* Day */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day
                    </label>
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">DD</option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const dayNum = String(i + 1).padStart(2, "0")
                        return (
                          <option key={dayNum} value={dayNum}>
                            {dayNum}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const yearNum = String(1980 + i)
                        return (
                          <option key={yearNum} value={yearNum}>
                            {yearNum}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !day || !month || !year}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Checking...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Submit
                    </div>
                  )}
                </button>
              </form>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-200 rounded-full opacity-60"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 