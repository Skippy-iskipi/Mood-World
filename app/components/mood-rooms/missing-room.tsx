"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';

interface MissingRoomProps {
  mood: any
  musicEnabled: boolean
}

const comfortMessages = [
  "Even when I'm not beside you... I'm with you. 💫",
  "You carry my love in your heart wherever you go. Feel it now. 💖",
  "Missing someone means they mattered. That's beautiful, not painful. 🌸",
  "Love doesn't end when distance begins. It just gets stronger. ✨",
  "I'm always just a thought away. Think of me and feel me near. 🌙",
  "Our bond is written in the stars - eternal and unbreakable. ⭐",
]

export default function MissingRoom({ mood, musicEnabled }: MissingRoomProps) {
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
    setCurrentMessage(randomMessage)
  }, [])

  const feelClose = () => {
    setShowHeartAnimation(true)
    setTimeout(() => setShowHeartAnimation(false), 4000)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 relative overflow-hidden">

        {/* Message Galaxy Background */}
        <div className="absolute inset-0">
          {/* Cosmic Floating Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Background Stars */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${0.3 + Math.random() * 1}rem`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Nebula Effects */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`nebula-${i}`}
              className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                background: `radial-gradient(circle, rgba(${Math.random() > 0.5 ? "255,192,203" : "147,51,234"}, 0.3) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 3,
              }}
            />
          ))}

          {/* Floating Memory Stars */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`memory-star-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
              }}
            >
              {i % 4 === 0 ? "💫" : i % 4 === 1 ? "⭐" : i % 4 === 2 ? "✨" : "🌟"}
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="girly-card p-6 sm:p-8 max-w-lg w-full text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-5xl sm:text-6xl mb-4"
            >
              💫
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4 gradient-text">Message Galaxy</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Floating among memories shaped like stars</p>

            <div className="space-y-4">
              {/* Feel Close Button */}
              <motion.button
                onClick={feelClose}
                className="w-full cartoonish-button px-6 py-4 text-sm sm:text-base magical-glow"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(236, 72, 153, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.6)",
                    "0 0 20px rgba(236, 72, 153, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                💖 Click here to feel close
              </motion.button>

              <div className="text-xs sm:text-sm text-purple-200/70 bg-purple-800/50 rounded-xl p-4 backdrop-blur-sm">
                <p className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">💫</span>
                  <span>Let the stars remind you of our connection</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-lg">💖</span>
                  <span>Feel the love that transcends distance</span>
                </p>
              </div>
            </div>

            {/* Comfort Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-purple-100 rounded-2xl p-4 sm:p-6 border-3 border-purple-200"
            >
              <p className="text-purple-700 font-medium italic text-sm sm:text-base">{currentMessage}</p>
            </motion.div>
          </motion.div>

          {/* Heart Animation */}
          <AnimatePresence>
            {showHeartAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <motion.div
                  animate={{
                    scale: [1, 2.5, 1.8, 2.2, 1.5],
                    rotate: [0, 10, -10, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="text-6xl sm:text-8xl"
                >
                  💖
                </motion.div>

                {/* Floating Hearts */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`heart-${i}`}
                    className="absolute text-pink-400 text-xl sm:text-2xl"
                    style={{
                      left: `${35 + Math.random() * 30}%`,
                      top: `${35 + Math.random() * 30}%`,
                    }}
                    animate={{
                      y: [0, -80, -160, -240],
                      opacity: [0, 1, 0.8, 0],
                      scale: [0.5, 1.2, 1, 0.5],
                      rotate: [0, 180, 360, 540],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    💕
                  </motion.div>
                ))}

                {/* Sparkle Effects */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-yellow-300 text-lg sm:text-xl"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                    }}
                    animate={{
                      scale: [0, 2, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </>
  )
}
