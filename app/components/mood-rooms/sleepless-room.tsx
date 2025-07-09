"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';
import { useRef } from "react"

interface SleeplessRoomProps {
  mood: any
  musicEnabled: boolean
  setMusicEnabled?: (enabled: boolean) => void
  isPaused?: boolean
  setIsPaused?: (paused: boolean) => void
}

const comfortMessages = [
  "Let the stars watch over you. Rest easy, Sheikha. 🌙",
  "Sleep will come when your body is ready. Until then, you're held by the universe. ✨",
  "Insomnia is not your fault. Your nervous system is just being extra protective tonight. 💙",
  "Even if sleep doesn't come, rest is still happening. Your body knows how to heal. 🌟",
  "The moon understands sleepless nights. You're not alone in the darkness. 🌙",
  "Sometimes the most beautiful thoughts come in the quiet hours. 💭",
  "Your worth isn't measured by how well you sleep. You're perfect as you are. 💕",
  "The stars have been awake for billions of years. They'll keep you company. ⭐",
]

const sleepMusicOptions = [
  "jfKfPfyJRdk", // Relaxing Sleep Music
  "1ZYbU82GVz4", // Deep Sleep Music
  "lFcSrYw-ARY", // Calming Sleep Sounds
  "YQaW2gkVCoA", // Rain Sounds for Sleep
  "nLfeFdXF3PY", // Ocean Waves Sleep Music
  "UfcAVejslrU", // Forest Sounds for Sleep
]

export default function SleeplessRoom({ mood, musicEnabled, setMusicEnabled, isPaused, setIsPaused }: SleeplessRoomProps) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [showMusicNotes, setShowMusicNotes] = useState(false)
  const [currentMusicId, setCurrentMusicId] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
    setCurrentMessage(randomMessage)
    // Select random music when component loads
    const randomMusic = sleepMusicOptions[Math.floor(Math.random() * sleepMusicOptions.length)]
    setCurrentMusicId(randomMusic)
  }, [])

  useEffect(() => {
    // Pause or play the global audio element if possible
    if (audioRef.current) {
      if (musicEnabled && !isPaused) {
        audioRef.current.play()
      } else if (musicEnabled && isPaused) {
        audioRef.current.pause()
      }
    }
  }, [musicEnabled, isPaused])

  const handlePlay = () => {
    if (setIsPaused) setIsPaused(false)
    if (setMusicEnabled) setMusicEnabled(true)
    setShowMusicNotes(true)
  }
  const handlePause = () => {
    if (setIsPaused) setIsPaused(true)
    setShowMusicNotes(false)
  }
  const handleStop = () => {
    if (setIsPaused) setIsPaused(false)
    if (setMusicEnabled) setMusicEnabled(false)
    setShowMusicNotes(false)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-indigo-300 via-purple-300 to-blue-300 relative overflow-hidden">
        {/* Lunar Lullaby Background */}
        <div className="absolute inset-0">
          {/* Large Glowing Moon */}
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 text-8xl sm:text-9xl"
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.6))",
            }}
          >
            🌙
          </motion.div>

          {/* Starlit Sky */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${0.5 + Math.random() * 1.5}rem`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Gentle Ocean Waves */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-blue-400/40 to-transparent"
            animate={{
              scaleX: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Wave Details */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute bottom-0 text-blue-300 text-2xl sm:text-3xl opacity-60"
              style={{
                left: `${i * 12}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
              }}
            >
              🌊
            </motion.div>
          ))}

          {/* Floating Music Notes */}
          <AnimatePresence>
            {showMusicNotes &&
              [...Array(12)].map((_, i) => (
                <motion.div
                  key={`note-${i}`}
                  className="absolute text-purple-300 text-xl sm:text-2xl"
                  style={{
                    left: `${15 + i * 7}%`,
                    bottom: "25%",
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    y: [0, -60, -120, -180],
                    opacity: [0, 1, 0.8, 0],
                    rotate: [0, 15, -15, 0],
                    scale: [0.8, 1.2, 1, 0.8],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                >
                  🎵
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Glowing Cosmic Elements */}
          <motion.div
            className="absolute top-32 right-16 text-3xl sm:text-4xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute top-40 left-16 text-2xl sm:text-3xl"
            animate={{
              opacity: [0.6, 1, 0.6],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            💫
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="girly-card p-6 sm:p-8 max-w-md w-full text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-5xl sm:text-6xl mb-4"
            >
              🌌
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4 gradient-text">Taylor's Calming Song</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">A calming moonlit sanctuary for restless nights</p>

            <div className="space-y-4">
              {/* Play/Pause/Stop Buttons */}
              {(!musicEnabled || (!musicEnabled && !isPaused)) && (
                <motion.button
                  onClick={handlePlay}
                  className="w-full cartoonish-button px-6 py-4 text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎵 Play Taylor Calming Song
                </motion.button>
              )}
              {musicEnabled && !isPaused && (
                <div className="flex gap-3">
                  <motion.button
                    onClick={handlePause}
                    className="flex-1 cartoonish-button px-6 py-4 text-sm sm:text-base magical-glow"
                    style={{
                      background: "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ⏸️ Pause
                  </motion.button>
                  <motion.button
                    onClick={handleStop}
                    className="flex-1 cartoonish-button px-6 py-4 text-sm sm:text-base"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔇 Stop Taylor Calming Song
                  </motion.button>
                </div>
              )}
              {musicEnabled && isPaused && (
                <div className="flex gap-3">
                  <motion.button
                    onClick={handlePlay}
                    className="flex-1 cartoonish-button px-6 py-4 text-sm sm:text-base magical-glow"
                    style={{
                      background: "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶️ Play Again
                  </motion.button>
                  <motion.button
                    onClick={handleStop}
                    className="flex-1 cartoonish-button px-6 py-4 text-sm sm:text-base"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔇 Stop Taylor Calming Song
                  </motion.button>
                </div>
              )}
              <AnimatePresence>
                {musicEnabled && !isPaused && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-indigo-100 rounded-2xl p-4 sm:p-6 border-3 border-indigo-200"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2 mb-2"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <span className="text-indigo-600 text-lg">🎵</span>
                      <span className="text-indigo-700 font-medium text-sm sm:text-base">Taylor calming song playing...</span>
                      <span className="text-indigo-600 text-lg">🌊</span>
                    </motion.div>
                    <p className="text-indigo-600 text-xs sm:text-sm italic">
                      Enjoy Taylor's soothing voice and gentle waves to help you rest
                    </p>
                  </motion.div>
                )}
                {musicEnabled && isPaused && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-indigo-100 rounded-2xl p-4 sm:p-6 border-3 border-indigo-200"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2 mb-2"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <span className="text-indigo-600 text-lg">⏸️</span>
                      <span className="text-indigo-700 font-medium text-sm sm:text-base">Taylor calming song paused</span>
                      <span className="text-indigo-600 text-lg">🌊</span>
                    </motion.div>
                    <p className="text-indigo-600 text-xs sm:text-sm italic">
                      Take a moment, then play again when you're ready
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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

          {/* Breathing Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 border-3 border-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center magical-glow"
              animate={{
                scale: [1, 1.3, 1],
                borderColor: ["rgba(147, 51, 234, 0.3)", "rgba(147, 51, 234, 0.8)", "rgba(147, 51, 234, 0.3)"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="text-purple-400 text-2xl sm:text-3xl"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                🌙
              </motion.span>
            </motion.div>
            <p className="text-purple-600 text-sm font-medium">Breathe with the moon's gentle rhythm</p>
            <p className="text-purple-500 text-xs mt-1 italic">In... hold... out... rest...</p>
          </motion.div>
        </div>

      </div>
    </>
  )
}
