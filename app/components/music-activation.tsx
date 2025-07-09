"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2 } from "lucide-react"

interface MusicActivationProps {
  onActivate: () => void
}

export default function MusicActivation({ onActivate }: MusicActivationProps) {
  const [showActivation, setShowActivation] = useState(false)

  useEffect(() => {
    // Check if user has already activated music
    const musicActivated = localStorage.getItem("musicActivated")
    if (!musicActivated) {
      // Show activation prompt after a short delay
      const timer = setTimeout(() => {
        setShowActivation(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleActivate = () => {
    localStorage.setItem("musicActivated", "true")
    setShowActivation(false)
    onActivate()
  }

  const handleSkip = () => {
    setShowActivation(false)
  }

  return (
    <AnimatePresence>
      {showActivation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-pink-200 max-w-sm w-full text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-6xl mb-6"
            >
              🎵
            </motion.div>

            <h3 className="text-2xl font-bold text-purple-700 mb-4">Welcome to Your Mood World!</h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Would you like to enable beautiful background music to enhance your experience?
              <span className="block mt-2 text-pink-600 font-medium italic">
                Music helps create the perfect atmosphere for each mood 💕
              </span>
            </p>

            <div className="flex flex-col gap-3">
              <motion.button
                onClick={handleActivate}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: "56px" }}
              >
                <Volume2 className="w-5 h-5" />
                Yes, Enable Music
              </motion.button>

              <motion.button
                onClick={handleSkip}
                className="w-full border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: "48px" }}
              >
                Maybe Later
              </motion.button>
            </div>

            <p className="text-xs text-gray-500 mt-4 italic">
              You can always toggle music on/off using the button in the top-right corner
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
