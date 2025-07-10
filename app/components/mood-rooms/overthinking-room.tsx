"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';
import { supabase } from '../../../lib/supabaseClient'

interface OverthinkingRoomProps {
  mood: any
  musicEnabled: boolean
}

const comfortMessages = [
  "That thought doesn't need to weigh you down. Let it float away like moonlight. 🌙",
  "It's okay to let this one go. Your mind deserves peace, not chaos. ✨",
  "You are not your thoughts. You are the gentle observer watching them pass. 🦋",
  "Every thought released makes room for something beautiful to grow. 🌸",
  "Your overthinking mind is trying to protect you, but you're safe now. 💕",
  "Not every thought deserves a home in your heart. Choose wisely. 🏡",
  "You have the power to tend your mental garden with love. 🌿",
  "Some thoughts are just visitors - you don't have to invite them to stay. 🚪",
]

const seedTypes = [
  { name: "Peace", emoji: "🕊️", color: "from-blue-400 to-cyan-300" },
  { name: "You are loved", emoji: "💖", color: "from-pink-400 to-rose-300" },
  { name: "Rest", emoji: "😌", color: "from-purple-400 to-indigo-300" },
  { name: "Trust yourself", emoji: "🌟", color: "from-yellow-400 to-amber-300" },
  { name: "You're enough", emoji: "✨", color: "from-green-400 to-emerald-300" },
  { name: "Breathe", emoji: "🌬️", color: "from-teal-400 to-cyan-300" },
]

const cloudThoughts = [
  { text: "What if I'm not good enough?", category: "self-doubt" },
  { text: "Did I say the wrong thing?", category: "social-anxiety" },
  { text: "Should I have done that differently?", category: "regret" },
  { text: "What if something bad happens?", category: "future-worry" },
  { text: "Am I making the right choice?", category: "decision-anxiety" },
  { text: "Everyone probably thinks I'm weird", category: "social-anxiety" },
  { text: "I should be doing more", category: "productivity-pressure" },
  { text: "What if I fail?", category: "fear" },
]

const groundingResponses = {
  "self-doubt": "That's a thought, not a fact. You are inherently worthy. 💎",
  "social-anxiety": "Let's pause this spiral. Most people are thinking about themselves, not judging you. 🤗",
  regret: "The past is a teacher, not a prison. You did your best with what you knew then. 🌅",
  "future-worry": "The future isn't here yet. Right now, in this moment, you are safe. 🛡️",
  "decision-anxiety": "There's no perfect choice, only the choice you make with love. Trust yourself. 💝",
  "productivity-pressure": "Your worth isn't measured by your output. You are valuable simply by existing. 🌸",
  fear: "Fear is just excitement without breath. Let's breathe together. 🫁",
}

export default function OverthinkingRoom({ mood, musicEnabled }: OverthinkingRoomProps) {
  const [currentThought, setCurrentThought] = useState("")
  const [releasedThoughts, setReleasedThoughts] = useState<string[]>([])
  const [plantedSeeds, setPlantedSeeds] = useState<Array<{ id: number; seed: any; x: number; y: number }>>([])
  const [availableSeeds, setAvailableSeeds] = useState<any[]>([])
  const [showComfortMessage, setShowComfortMessage] = useState(false)
  const [currentComfortMessage, setCurrentComfortMessage] = useState("")
  const [showLanternAnimation, setShowLanternAnimation] = useState(false)
  const [showGroundingExercise, setShowGroundingExercise] = useState(false)
  const [groundingStep, setGroundingStep] = useState(0)
  const [floatingMessages, setFloatingMessages] = useState<
    Array<{ id: number; text: string; x: number; y: number; delay: number }>
  >([])

  const groundingSteps = [
    { count: 5, sense: "see", prompt: "Name 5 things you can see around you", emoji: "👀" },
    { count: 4, sense: "touch", prompt: "Name 4 things you can touch", emoji: "✋" },
    { count: 3, sense: "hear", prompt: "Name 3 things you can hear", emoji: "👂" },
    { count: 2, sense: "smell", prompt: "Name 2 things you can smell", emoji: "👃" },
    { count: 1, sense: "feel", prompt: "Name 1 thing you feel in your heart", emoji: "💖" },
  ]

  // Initialize floating clouds
  useEffect(() => {
    const createFloatingMessage = () => {
      const messages = [
        "Let this thought drift away...",
        "You are not your thoughts",
        "Peace is always available",
        "Breathe and release",
        "This too shall pass",
        "You are safe in this moment",
      ]

      const newMessage = {
        id: Date.now(),
        text: messages[Math.floor(Math.random() * messages.length)],
        x: Math.random() * 70 + 10,
        y: Math.random() * 40 + 20,
        delay: 0,
      }

      setFloatingMessages((prev) => [...prev.slice(-2), newMessage])

      setTimeout(() => {
        setFloatingMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id))
      }, 8000)
    }

    const interval = setInterval(createFloatingMessage, 6000)
    createFloatingMessage() // Create first one immediately

    return () => clearInterval(interval)
  }, [])

  const releaseThought = async () => {
    if (currentThought.trim()) {
      // Save to Supabase
      await supabase.from('user_messages').insert([
        {
          room: 'overthinking',
          message: currentThought,
        }
      ])
      setShowLanternAnimation(true)
      setReleasedThoughts([...releasedThoughts, currentThought])

      // Give a seed after releasing
      const randomSeed = seedTypes[Math.floor(Math.random() * seedTypes.length)]
      setAvailableSeeds([...availableSeeds, randomSeed])

      setTimeout(() => {
        const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
        setCurrentComfortMessage(randomMessage)
        setShowComfortMessage(true)
        setCurrentThought("")
        setShowLanternAnimation(false)

        setTimeout(() => setShowComfortMessage(false), 5000)
      }, 2000)
    }
  }

  const plantSeed = (seedIndex: number) => {
    const seed = availableSeeds[seedIndex]
    const newPlant = {
      id: Date.now(),
      seed,
      x: 20 + Math.random() * 60,
      y: 60 + Math.random() * 20,
    }

    setPlantedSeeds([...plantedSeeds, newPlant])
    setAvailableSeeds(availableSeeds.filter((_, index) => index !== seedIndex))
  }

  const startGroundingExercise = () => {
    setShowGroundingExercise(true)
    setGroundingStep(0)
  }

  const nextGroundingStep = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep(groundingStep + 1)
    } else {
      setShowGroundingExercise(false)
      setGroundingStep(0)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Dreamy Garden Background */}
        <div className="absolute inset-0">
          {/* Glowing Moon */}
          <motion.div
            className="absolute top-8 right-8 text-6xl"
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.6))",
            }}
          >
            🌙
          </motion.div>

          {/* Breathing Stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Fireflies */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`firefly-${i}`}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24",
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

          {/* Floating Wisdom Messages */}
          {floatingMessages.map((message) => (
            <motion.div
              key={message.id}
              className="absolute pointer-events-none z-20"
              style={{ left: `${message.x}%`, top: `${message.y}%` }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.8],
                y: [20, 0, -10, -30],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
              }}
            >
              <div className="bg-purple-800/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-purple-400/40 max-w-xs">
                <span className="text-purple-100 text-xs font-medium italic">{message.text}</span>
              </div>
            </motion.div>
          ))}

          {/* Garden Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/40 to-transparent" />
        </div>

        {/* Planted Garden */}
        <div className="absolute inset-0">
          {plantedSeeds.map((plant) => (
            <motion.div
              key={plant.id}
              className="absolute"
              style={{ left: `${plant.x}%`, bottom: `${plant.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${plant.seed.color} flex items-center justify-center shadow-lg`}
                animate={{
                  y: [0, -5, 0],
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 30px rgba(255, 255, 255, 0.5)",
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <span className="text-lg">{plant.seed.emoji}</span>
              </motion.div>
              <div className="text-center mt-1">
                <span className="text-xs text-white font-medium">{plant.seed.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="relative z-10 min-h-screen flex flex-col p-4 pt-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
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
              🧠
            </motion.div>

            <h1 className="text-2xl font-bold text-purple-200 mb-2 gradient-text">Thought Garden</h1>
            <p className="text-purple-300/80 text-sm leading-relaxed px-2">
              Every thought has a place — and not every one needs to stay
            </p>
          </motion.div>

          {/* Release Thought Lantern */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-400/30 shadow-2xl mb-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-purple-200 mb-2">🧠 Release a Thought</h3>
              <p className="text-purple-300/70 text-xs">Type your racing thought and let it float away</p>
            </div>

            <textarea
              value={currentThought}
              onChange={(e) => setCurrentThought(e.target.value)}
              placeholder="What's spinning in your mind right now? Let it out..."
              className="w-full h-24 p-4 bg-slate-700/50 border-2 border-purple-300/30 rounded-2xl resize-none focus:border-purple-400/50 focus:outline-none text-purple-100 placeholder-purple-300/60 text-sm mb-4"
            />

            <motion.button
              onClick={releaseThought}
              disabled={!currentThought.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              whileHover={{ scale: currentThought.trim() ? 1.05 : 1 }}
              whileTap={{ scale: currentThought.trim() ? 0.95 : 1 }}
              style={{ minHeight: "48px" }}
            >
              🏮 Release into the Night
            </motion.button>
          </motion.div>

          {/* Available Seeds */}
          {availableSeeds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border-2 border-green-400/30 shadow-2xl mb-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-green-200 mb-2">🪴 Plant What Matters</h3>
                <p className="text-green-300/70 text-xs">Choose intentional thoughts to grow in your garden</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {availableSeeds.map((seed, index) => (
                  <motion.button
                    key={index}
                    onClick={() => plantSeed(index)}
                    className={`bg-gradient-to-r ${seed.color} text-white p-3 rounded-2xl font-semibold shadow-lg touch-manipulation`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: "48px" }}
                  >
                    <div className="text-lg mb-1">{seed.emoji}</div>
                    <div className="text-xs">{seed.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Control Buttons */}
          <div className="grid grid-cols-1 gap-3 mt-auto mb-6">
            <motion.button
              onClick={startGroundingExercise}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-full font-semibold touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minHeight: "48px" }}
            >
              🧘 5-4-3-2-1 Grounding
            </motion.button>
          </div>

          {/* Instructions */}
          <div className="text-xs text-purple-200/70 space-y-2 bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
            <p className="flex items-center gap-2">
              <span className="text-base">🏮</span>
              <span>Release racing thoughts as lanterns</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-base">🌸</span>
              <span>Plant positive seeds in your garden</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-base">🧘</span>
              <span>Use grounding exercise when overwhelmed</span>
            </p>
          </div>
        </div>

        {/* Lantern Animation */}
        <AnimatePresence>
          {showLanternAnimation && (
            <motion.div
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{
                opacity: [1, 0.8, 0],
                scale: [1, 0.6, 0.3],
                y: [0, -200, -400],
                rotate: [0, 15, 30],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-4xl"
            >
              🏮
              <motion.div
                animate={{
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: 2,
                }}
                className="absolute -top-2 -right-2 text-yellow-300 text-lg"
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
              className="fixed bottom-24 left-4 right-4 z-40"
            >
              <div className="bg-purple-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-purple-400/40 max-w-sm mx-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-3xl mb-4 text-center"
                >
                  🌙
                </motion.div>
                <p className="text-purple-200 font-medium italic text-sm text-center leading-relaxed">
                  {currentComfortMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grounding Exercise Modal */}
        <AnimatePresence>
          {showGroundingExercise && (
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
                className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-cyan-300/30"
              >
                <div className="text-center mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-4xl mb-4"
                  >
                    {groundingSteps[groundingStep].emoji}
                  </motion.div>
                  <h3 className="text-xl font-bold text-cyan-200 mb-2">5-4-3-2-1 Grounding</h3>
                  <div className="text-2xl font-bold text-cyan-300 mb-2">{groundingSteps[groundingStep].count}</div>
                  <p className="text-cyan-300/80 text-sm">{groundingSteps[groundingStep].prompt}</p>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={nextGroundingStep}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-full font-semibold touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: "48px" }}
                  >
                    {groundingStep < groundingSteps.length - 1 ? "Next" : "Complete"}
                  </motion.button>
                  <motion.button
                    onClick={() => setShowGroundingExercise(false)}
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

      </div>
    </>
  )
}
