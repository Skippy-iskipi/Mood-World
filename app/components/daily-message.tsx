"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X } from "lucide-react"

const dailyMessages = [
  "Good morning, beautiful soul! Today is a new canvas for your amazing story. 🌸",
  "Remember: You don't have to be perfect to be worthy of love. You already are. 💕",
  "Your feelings are valid, your dreams matter, and you belong exactly where you are. ✨",
  "Take a deep breath, Sheikha. You're doing better than you think you are. 🌿",
  "You bring light into this world just by existing. Thank you for being you. 🌟",
  "It's okay to rest. It's okay to feel. It's okay to be exactly where you are today. 🤗",
  "Your heart is so beautiful. The way you care for others shows your incredible soul. 💖",
]

export default function DailyMessage() {
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    // Show daily message after a delay
    const timer = setTimeout(() => {
      const today = new Date().toDateString()
      const lastShown = localStorage.getItem("lastDailyMessage")

      if (lastShown !== today) {
        const randomMessage = dailyMessages[Math.floor(Math.random() * dailyMessages.length)]
        setCurrentMessage(randomMessage)
        setShowMessage(true)
        localStorage.setItem("lastDailyMessage", today)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-pink-200">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="text-2xl"
              >
                💌
              </motion.div>

              <div className="flex-1">
                <h3 className="font-bold text-pink-700 mb-2">From Babe to Sheikha 💕</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{currentMessage}</p>
              </div>

              <motion.button
                onClick={() => setShowMessage(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.div
              className="flex justify-center mt-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
