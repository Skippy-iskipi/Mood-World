"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';

interface WorkRoomProps {
  mood: any
  musicEnabled: boolean
}

const wineMessages = [
  "You showed so much grace today. Every smile you shared made someone's day brighter. 🌟",
  "Every table you touched felt your kindness. Your service is a gift to this world. ✨",
  "You're genuinely kind. It shows in how you treat everyone around you. 💫",
  "Your patience today was extraordinary. You handled everything with such elegance. 🌹",
  "You brought warmth to every interaction. That's not just work - that's magic. ✨",
  "The care you showed today didn't go unnoticed. You are deeply appreciated. 💖",
]

const finalWineMessage = "Now let yourself be filled too — with love, with rest, with peace. 🍷"

const selfCareItems = [
  {
    item: "🧻",
    message: "You've done enough",
    description: "A soft napkin with gentle words stitched in gold",
  },
  {
    item: "🦢",
    message: "There's something really refined about how you carry yourself.",
    description: "A note folded into a swan with loving words",
  },
  {
    item: "🔔",
    message: "Time to rest, Babe",
    description: "A tiny bell that chimes softly",
  },
  {
    item: "🌹",
    message: "Your beauty radiates from within",
    description: "A single rose with a whispered compliment",
  },
  {
    item: "💌",
    message: "I hope you realize how much you're loved.",
    description: "A love letter sealed with care",
  },
]

const comfortMessages = [
  "You served with grace all day. Now, let me serve comfort to you. 🥂",
  "Your hospitality is sacred work. You deserve to be held with the same tenderness. 💕",
  "Every act of service you gave today was love in action. Feel that love return to you now. ✨",
  "You've poured yourself out for others. Tonight, let yourself be refilled with peace. 🍷",
  "The grace you showed today reflects the grace you deserve to receive. 🌙",
  "You made others feel welcome. Now welcome this moment of rest into your heart. 🌹",
]

export default function WorkRoom({ mood, musicEnabled }: WorkRoomProps) {
  const [wineLevel, setWineLevel] = useState(0)
  const [currentWineMessage, setCurrentWineMessage] = useState("")
  const [showFinalWineMessage, setShowFinalWineMessage] = useState(false)
  const [showReflectionCard, setShowReflectionCard] = useState(false)
  const [reflectionAnswers, setReflectionAnswers] = useState({ proud: "", letGo: "" })
  const [showReflectionComplete, setShowReflectionComplete] = useState(false)
  const [selfCareIndex, setSelfCareIndex] = useState(0)
  const [showSelfCareMessage, setShowSelfCareMessage] = useState(false)
  const [currentComfortMessage, setCurrentComfortMessage] = useState("")
  const [showComfortMessage, setShowComfortMessage] = useState(false)

  useEffect(() => {
    // Show comfort message after delay
    const timer = setTimeout(() => {
      const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
      setCurrentComfortMessage(randomMessage)
      setShowComfortMessage(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleWinePour = () => {
    if (wineLevel < 100) {
      const newLevel = Math.min(wineLevel + 25, 100)
      setWineLevel(newLevel)

      if (newLevel < 100) {
        const messageIndex = Math.floor(newLevel / 25 - 1)
        setCurrentWineMessage(wineMessages[messageIndex] || wineMessages[0])
      } else {
        setCurrentWineMessage("")
        setShowFinalWineMessage(true)
        setTimeout(() => setShowFinalWineMessage(false), 6000)
      }
    }
  }

  const handleReflectionSubmit = () => {
    if (reflectionAnswers.proud.trim() || reflectionAnswers.letGo.trim()) {
      setShowReflectionComplete(true)
      setTimeout(() => {
        setShowReflectionCard(false)
        setShowReflectionComplete(false)
        setReflectionAnswers({ proud: "", letGo: "" })
      }, 4000)
    }
  }

  const handleSelfCareTap = () => {
    const currentItem = selfCareItems[selfCareIndex]
    setShowSelfCareMessage(true)

    setTimeout(() => {
      setShowSelfCareMessage(false)
      setSelfCareIndex((prev) => (prev + 1) % selfCareItems.length)
    }, 4000)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Rooftop Bar Background */}
        <div className="absolute inset-0">
          {/* City Skyline */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-900/30 to-transparent">
            {/* Building silhouettes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`building-${i}`}
                className="absolute bottom-0 bg-slate-800/60"
                style={{
                  left: `${i * 12}%`,
                  width: `${8 + Math.random() * 6}%`,
                  height: `${40 + Math.random() * 60}px`,
                }}
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                {/* Building windows */}
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={`window-${j}`}
                    className="absolute w-1 h-1 bg-yellow-400/80"
                    style={{
                      left: `${20 + j * 25}%`,
                      top: `${20 + j * 15}%`,
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Warm Ambient Lighting */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-amber-900/20 via-transparent to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Floating Jazz Notes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`note-${i}`}
              className="absolute text-amber-300/40 text-lg"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.2,
              }}
            >
              🎵
            </motion.div>
          ))}
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="relative z-10 min-h-screen flex flex-col p-4 pt-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-5xl mb-4"
            >
              🥂
            </motion.div>

            <h1 className="text-2xl font-bold text-amber-200 mb-2 gradient-text">After Hours Lounge</h1>
            <p className="text-amber-300/80 text-sm leading-relaxed px-2">
              A luxurious rooftop sanctuary where your service is honored
            </p>

            {/* Reserved Sign */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 bg-amber-900/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-amber-400/30 mx-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="text-2xl mb-2"
              >
                💌
              </motion.div>
              <p className="text-amber-200 font-medium italic text-sm">
                "Reserved for Sheikha - You deserve this moment"
              </p>
            </motion.div>
          </motion.div>

          {/* Interactive Bar Counter */}
          <div className="flex-1 flex flex-col justify-center space-y-6 max-w-sm mx-auto w-full">
            {/* Wine Glass Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border-2 border-amber-400/30 shadow-2xl"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-amber-200 mb-2">🍷 Pour Your Feelings</h3>
                <p className="text-amber-300/70 text-xs">Tap to fill your glass with appreciation</p>
              </div>

              {/* Wine Glass Visual */}
              <motion.div className="relative mx-auto mb-4" style={{ width: "80px", height: "120px" }}>
                {/* Glass outline */}
                <div
                  className="absolute inset-0 border-2 border-amber-300/60 rounded-b-full"
                  style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                />

                {/* Wine fill */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-red-400 rounded-b-full"
                  style={{
                    height: `${wineLevel}%`,
                    borderTopLeftRadius: wineLevel > 90 ? "8px" : "0",
                    borderTopRightRadius: wineLevel > 90 ? "8px" : "0",
                  }}
                  animate={{
                    boxShadow:
                      wineLevel > 0
                        ? [
                            "0 0 20px rgba(220, 38, 38, 0.4)",
                            "0 0 30px rgba(220, 38, 38, 0.6)",
                            "0 0 20px rgba(220, 38, 38, 0.4)",
                          ]
                        : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />

                {/* Floating wine bottle */}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🍾
                </motion.div>
              </motion.div>

              <motion.button
                onClick={handleWinePour}
                disabled={wineLevel >= 100}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                whileHover={{ scale: wineLevel < 100 ? 1.05 : 1 }}
                whileTap={{ scale: wineLevel < 100 ? 0.95 : 1 }}
                style={{ minHeight: "48px" }}
              >
                {wineLevel >= 100 ? "🥂 Glass Full" : "Pour Appreciation"}
              </motion.button>

              {/* Wine Message Display */}
              <AnimatePresence>
                {currentWineMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 bg-red-900/30 rounded-2xl p-4 border border-red-400/30"
                  >
                    <p className="text-red-200 font-medium italic text-sm text-center leading-relaxed">
                      {currentWineMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Service Reflection Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-400/30 shadow-2xl"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-purple-200 mb-2">📜 Service Reflection</h3>
                <p className="text-purple-300/70 text-xs">Honor your day of service</p>
              </div>

              <motion.button
                onClick={() => setShowReflectionCard(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-full font-semibold touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: "48px" }}
              >
                📝 Open Reflection Card
              </motion.button>
            </motion.div>

            {/* Self-Care Tray */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border-2 border-amber-400/30 shadow-2xl"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-amber-200 mb-2">🧺 Tray of Self-Care</h3>
                <p className="text-amber-300/70 text-xs">Discover gentle surprises</p>
              </div>

              <motion.button
                onClick={handleSelfCareTap}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-full font-semibold touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ minHeight: "48px" }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-xl mr-2"
                >
                  {selfCareItems[selfCareIndex].item}
                </motion.span>
                Reveal Surprise
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Final Wine Message */}
        <AnimatePresence>
          {showFinalWineMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="fixed inset-4 flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-r from-red-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-red-400/40 max-w-sm w-full">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-4xl mb-4 text-center"
                >
                  🍷
                </motion.div>
                <p className="text-red-200 font-bold text-center text-base leading-relaxed">{finalWineMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflection Card Modal */}
        <AnimatePresence>
          {showReflectionCard && !showReflectionComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-purple-300/30"
              >
                <div className="text-center mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-4xl mb-4"
                  >
                    📜
                  </motion.div>
                  <h3 className="text-xl font-bold text-purple-200 mb-2">Service Reflection</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      One thing you're proud of today:
                    </label>
                    <textarea
                      value={reflectionAnswers.proud}
                      onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, proud: e.target.value }))}
                      className="w-full h-20 p-3 bg-slate-700/50 border-2 border-purple-300/30 rounded-xl resize-none focus:border-purple-400/50 focus:outline-none text-purple-100 placeholder-purple-300/60 text-sm"
                      placeholder="Your grace, your kindness, your strength..."
                    />
                  </div>

                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      One moment you wish to let go:
                    </label>
                    <textarea
                      value={reflectionAnswers.letGo}
                      onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, letGo: e.target.value }))}
                      className="w-full h-20 p-3 bg-slate-700/50 border-2 border-purple-300/30 rounded-xl resize-none focus:border-purple-400/50 focus:outline-none text-purple-100 placeholder-purple-300/60 text-sm"
                      placeholder="Release it into the night..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <motion.button
                    onClick={handleReflectionSubmit}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-full font-semibold touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: "48px" }}
                  >
                    🌹 Slide Under Rose
                  </motion.button>
                  <motion.button
                    onClick={() => setShowReflectionCard(false)}
                    className="px-4 py-3 border-2 border-slate-600 rounded-full text-slate-300 hover:bg-slate-700/50 font-semibold touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: "48px" }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflection Complete Message */}
        <AnimatePresence>
          {showReflectionComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-purple-400/40 max-w-sm w-full text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-4xl mb-4"
                >
                  🌹
                </motion.div>
                <p className="text-purple-200 font-medium italic text-sm leading-relaxed">
                  "You've served others all day. Tonight, let yourself be served by stillness."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Self-Care Message Display */}
        <AnimatePresence>
          {showSelfCareMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              className="fixed bottom-24 left-4 right-4 z-40"
            >
              <div className="bg-amber-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-amber-400/40 max-w-sm mx-auto text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-3xl mb-3"
                >
                  {selfCareItems[selfCareIndex].item}
                </motion.div>
                <p className="text-amber-200 font-bold text-base mb-2">"{selfCareItems[selfCareIndex].message}"</p>
                <p className="text-amber-300/70 text-xs italic">{selfCareItems[selfCareIndex].description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comfort Message Zone */}
        <AnimatePresence>
          {showComfortMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-20 left-4 right-4 z-40"
            >
              <div className="bg-gradient-to-r from-amber-900/95 to-purple-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-amber-400/30 max-w-sm mx-auto">
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-3xl"
                  >
                    🥂
                  </motion.div>
                  <motion.button
                    onClick={() => setShowComfortMessage(false)}
                    className="text-slate-400 hover:text-slate-200 text-xl touch-manipulation"
                    style={{ minWidth: "32px", minHeight: "32px" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                <p className="text-amber-200 font-medium italic text-sm leading-relaxed">{currentComfortMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
