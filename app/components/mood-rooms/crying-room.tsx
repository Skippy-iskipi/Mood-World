"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';

interface CryingRoomProps {
  mood: any
  musicEnabled: boolean
}

const comfortMessages = [
  "Your tears are sacred water, washing away what no longer serves you. 💙",
  "I see your beautiful and tender heart. You don't have to carry this alone. 🌙",
  "Crying is how your soul speaks when words aren't enough. I'm listening. 💧",
  "You're not broken, you're breaking open. There's a difference, and it's beautiful. ✨",
  "Your sensitivity is not weakness - it's your superpower, your gift to this world. 🌸",
  "I'm wrapping you in the softest blanket of love right now. Feel it around you. 🤗",
  "Every tear is a prayer, a release, a step toward healing. You're so brave. 🕊️",
  "In this quiet moment, know that you are deeply, completely loved. 💕",
  "Your heart is safe with me. Cry as long as you need to. I'll wait. 🌊",
  "You don't need to be strong right now. Just be real. Just be you. 🌺",
]

const raindropQuotes = [
  "Tears mean your heart is honest. 💧",
  "I'm still here, always. ✨",
  "Your feelings are completely valid. 🌙",
  "You're allowed to feel this deeply. 💙",
  "This pain will transform into wisdom. 🌸",
  "I believe in your strength, even when you don't. 💪",
  "You are worthy of comfort and care. 🤗",
  "Your heart knows how to heal itself. 🌿",
  "I see you, I hear you, I love you. 💕",
  "You're exactly where you need to be. 🕊️",
]

const candleMessages = [
  "I know it hurts right now. I'm with you. 🕯️",
  "You're allowed to feel this deeply. 💛",
  "Your pain matters. Your healing matters. You matter. ✨",
  "I'm holding space for all of your feelings. 🤗",
  "You don't have to be okay right now. Just be. 🌙",
  "I see your courage in feeling so deeply. 💙",
  "You are safe to fall apart here. I'll help you rebuild. 🌸",
  "Your tears are watering the garden of your growth. 🌱",
]

export default function CryingRoom({ mood, musicEnabled }: CryingRoomProps) {
  const [journalEntry, setJournalEntry] = useState("")
  const [showJournal, setShowJournal] = useState(false)
  const [showFeatherAnimation, setShowFeatherAnimation] = useState(false)
  const [currentComfortMessage, setCurrentComfortMessage] = useState("")
  const [showComfortMessage, setShowComfortMessage] = useState(false)
  const [selectedRaindropQuote, setSelectedRaindropQuote] = useState("")
  const [selectedCandleMessage, setSelectedCandleMessage] = useState("")
  const [raindrops, setRaindrops] = useState<Array<{ id: number; x: number; delay: number }>>([])
  const [usedMessages, setUsedMessages] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize raindrops
  useEffect(() => {
    const drops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setRaindrops(drops)
  }, [])

  const getRandomMessage = (messages: string[], used: string[]) => {
    const available = messages.filter((msg) => !used.includes(msg))
    if (available.length === 0) {
      setUsedMessages([])
      return messages[Math.floor(Math.random() * messages.length)]
    }
    return available[Math.floor(Math.random() * available.length)]
  }

  const submitJournalEntry = () => {
    if (journalEntry.trim()) {
      setShowFeatherAnimation(true)

      setTimeout(() => {
        const message = getRandomMessage(comfortMessages, usedMessages)
        setCurrentComfortMessage(message)
        setUsedMessages((prev) => [...prev, message])
        setShowComfortMessage(true)
        setJournalEntry("")
        setShowJournal(false)
        setShowFeatherAnimation(false)
      }, 2500)
    }
  }

  const handleRaindropTap = (dropId: number) => {
    const quote = raindropQuotes[Math.floor(Math.random() * raindropQuotes.length)]
    setSelectedRaindropQuote(quote)
    setTimeout(() => setSelectedRaindropQuote(""), 3500)
  }

  const handleCandleTap = () => {
    const message = candleMessages[Math.floor(Math.random() * candleMessages.length)]
    setSelectedCandleMessage(message)
    setTimeout(() => setSelectedCandleMessage(""), 4000)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">

        {/* Glass Conservatory Background */}
        <div className="absolute inset-0">
          {/* Moonlight streaming through windows */}
          <motion.div
            className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-blue-200/30 via-blue-100/20 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleX: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-blue-200/25 via-blue-100/15 to-transparent"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Glass window frames */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-slate-600/40" />
            <div className="absolute top-0 right-1/3 w-0.5 h-full bg-slate-600/40" />
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-slate-600/40" />
            <div className="absolute top-2/3 left-0 w-full h-0.5 bg-slate-600/40" />
          </div>

          {/* Animated raindrops on glass - Fixed interaction */}
          {raindrops.map((drop) => (
            <motion.div
              key={drop.id}
              className="absolute cursor-pointer touch-manipulation"
              style={{
                left: `${drop.x}%`,
                top: "-5%",
                width: "24px",
                height: "24px",
                zIndex: 20,
              }}
              animate={{
                y: ["0vh", "105vh"],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: drop.delay,
                ease: "linear",
              }}
            >
              <motion.button
                onClick={() => handleRaindropTap(drop.id)}
                className="w-full h-full flex items-center justify-center text-blue-300 hover:text-blue-200 transition-colors"
                whileHover={{ scale: 1.5 }}
                whileTap={{
                  scale: [1, 2.5, 0],
                  rotate: [0, 180, 360],
                  transition: { duration: 0.8 },
                }}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                💧
              </motion.button>
            </motion.div>
          ))}

          {/* Glowing pond in center - Much larger */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80 h-56 md:w-96 md:h-64 bg-gradient-to-r from-blue-400/40 via-cyan-300/50 to-blue-400/40 rounded-full"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: "0 0 60px rgba(34, 211, 238, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.3)",
            }}
          >
            {/* Enhanced ripples in pond */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-cyan-300/40 rounded-full"
                animate={{
                  scale: [0.6, 1.4, 0.6],
                  opacity: [0.9, 0.1, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.8,
                }}
              />
            ))}

            {/* Pond surface sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-cyan-200 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>

          {/* Floating fireflies */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`firefly-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                boxShadow: "0 0 10px #fde047, 0 0 20px #fde047, 0 0 30px #fde047",
              }}
              animate={{
                x: [0, 50, -30, 20, 0],
                y: [0, -30, 20, -10, 0],
                opacity: [0.4, 1, 0.6, 1, 0.4],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Interactive Elements */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pt-20">
          {/* Journal Book */}
          <motion.div
            className="absolute bottom-40 left-8 md:left-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => setShowJournal(true)}
              className="text-5xl md:text-6xl cursor-pointer hover:scale-110 transition-transform touch-manipulation"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                filter: "drop-shadow(0 0 20px rgba(147, 197, 253, 0.5))",
                minWidth: "48px",
                minHeight: "48px",
              }}
            >
              📖
            </motion.button>
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-blue-200 font-medium text-center whitespace-nowrap"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Let It Out
            </motion.div>
          </motion.div>

          {/* Candle of Warmth */}
          <motion.div
            className="absolute top-32 right-8 md:right-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={handleCandleTap}
              className="text-4xl md:text-5xl cursor-pointer hover:scale-110 transition-transform touch-manipulation"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              style={{
                filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))",
                minWidth: "48px",
                minHeight: "48px",
              }}
            >
              🕯️
            </motion.button>
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-yellow-200 font-medium text-center whitespace-nowrap"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Warmth
            </motion.div>
          </motion.div>

          {/* Main comfort area */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center max-w-sm mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-6xl md:text-7xl mb-6"
            >
              🌙
            </motion.div>

            <h1 className="text-2xl md:text-3xl font-bold text-blue-200 mb-4 gradient-text">Raindrop Sanctuary</h1>

            <p className="text-blue-300/80 text-sm md:text-base mb-6 leading-relaxed">
              A quiet glass conservatory where your tears become ripples of healing
            </p>

            <div className="text-xs md:text-sm text-blue-200/70 space-y-2 bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
              <p className="flex items-center justify-center gap-2">
                <span className="text-lg">💧</span>
                <span>Tap raindrops for gentle words</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-lg">📖</span>
                <span>Open journal to write your heart</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-lg">🕯️</span>
                <span>Touch candle for warm whispers</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Journal Modal */}
        <AnimatePresence>
          {showJournal && (
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
                className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-2 border-blue-300/30"
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
                    className="text-4xl md:text-5xl mb-4"
                  >
                    📖
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-blue-200 mb-2">Let It Out</h3>
                  <p className="text-blue-300/80 text-sm md:text-base">Write what's on your heart, beautiful soul</p>
                </div>

                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Pour your heart out here... Every word, every feeling is safe with me. 💙"
                  className="w-full h-32 md:h-40 p-4 bg-slate-700/50 border-2 border-blue-300/30 rounded-2xl resize-none focus:border-blue-400/50 focus:outline-none text-blue-100 placeholder-blue-300/60 text-sm md:text-base"
                  autoFocus
                />

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <motion.button
                    onClick={submitJournalEntry}
                    disabled={!journalEntry.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    style={{ minHeight: "56px" }}
                    whileHover={{ scale: journalEntry.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: journalEntry.trim() ? 0.95 : 1 }}
                  >
                    🪶 Release into the pond
                  </motion.button>
                  <motion.button
                    onClick={() => setShowJournal(false)}
                    className="px-6 py-4 border-2 border-slate-600 rounded-full text-slate-300 hover:bg-slate-700/50 font-semibold touch-manipulation"
                    style={{ minHeight: "56px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feather Animation */}
        <AnimatePresence>
          {showFeatherAnimation && (
            <motion.div
              initial={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              animate={{
                opacity: [1, 0.8, 0],
                scale: [1, 0.8, 0.5],
                y: [0, 200, 400],
                x: [0, 50, -20],
                rotate: [0, 180, 360],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-4xl md:text-5xl"
            >
              🪶
              <motion.div
                animate={{
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: 3,
                }}
                className="absolute -top-2 -right-2 text-cyan-300 text-lg"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comfort Message Display */}
        <AnimatePresence>
          {showComfortMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed bottom-24 left-4 right-4 md:bottom-32 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-40"
            >
              <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-blue-300/30 max-w-md mx-auto">
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
                    💙
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

                <p className="text-blue-200 font-medium italic text-sm md:text-base leading-relaxed mb-4">
                  {currentComfortMessage}
                </p>

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowJournal(true)}
                    className="flex-1 bg-blue-600/50 text-blue-200 px-4 py-3 rounded-full font-semibold hover:bg-blue-600/70 transition-colors touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Write Again
                  </motion.button>
                  <motion.button
                    onClick={() => setShowComfortMessage(false)}
                    className="px-4 py-3 border-2 border-slate-600 rounded-full text-slate-300 hover:bg-slate-700/50 font-semibold touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Raindrop Quote Display */}
        <AnimatePresence>
          {selectedRaindropQuote && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              className="fixed top-24 left-4 right-4 md:top-32 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-30"
            >
              <div className="bg-blue-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-blue-400/40 max-w-sm mx-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: 2,
                  }}
                  className="text-2xl mb-2 text-center"
                >
                  💧
                </motion.div>
                <p className="text-blue-200 font-medium text-center text-sm md:text-base">{selectedRaindropQuote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candle Message Display */}
        <AnimatePresence>
          {selectedCandleMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-40 right-4 md:top-48 md:right-8 z-30"
            >
              <div className="bg-amber-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-yellow-400/40 max-w-xs">
                <motion.div
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-2xl mb-2 text-center"
                >
                  🕯️
                </motion.div>
                <p className="text-yellow-200 font-medium text-center text-sm italic leading-relaxed">
                  {selectedCandleMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  )
}
