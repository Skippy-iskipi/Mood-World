"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StressedRoomProps {
  mood: any
  musicEnabled: boolean
}

const comfortMessages = [
  "Breathe with me. Let go... just for now. 🌿",
  "Your breath is your anchor. You are safe in this moment. 🌸",
  "Feel the earth beneath you, supporting you always. 🌱",
  "Each breath brings you closer to peace. You're doing beautifully. ✨",
  "The trees are whispering: 'You are stronger than you know.' 🌲",
  "Let the wind carry away what no longer serves you. 🍃",
  "In this sacred space, you can simply be. No pressure, just presence. 🌺",
  "Your nervous system is learning to trust again. Be patient with yourself. 💚",
]

export default function StressedRoom({ mood, musicEnabled }: StressedRoomProps) {
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    // Show random comfort message
    const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
    setCurrentMessage(randomMessage)
  }, [])

  useEffect(() => {
    if (!isBreathing) return

    const breathingCycle = () => {
      // Inhale (3s)
      setBreathPhase("inhale")
      setTimeout(() => {
        // Hold (7s)
        setBreathPhase("hold")
        setTimeout(() => {
          // Exhale (8s)
          setBreathPhase("exhale")
          setTimeout(() => {
            breathingCycle() // Repeat
          }, 8000)
        }, 7000)
      }, 3000)
    }

    breathingCycle()
  }, [isBreathing])

  const getBreathingScale = () => {
    switch (breathPhase) {
      case "inhale":
        return [1, 2.2]
      case "hold":
        return [2.2, 2.2]
      case "exhale":
        return [2.2, 1]
      default:
        return [1, 1]
    }
  }

  const getBreathingDuration = () => {
    switch (breathPhase) {
      case "inhale":
        return 3
      case "hold":
        return 7
      case "exhale":
        return 8
      default:
        return 1
    }
  }

  const getPhaseText = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in..."
      case "hold":
        return "Hold gently..."
      case "exhale":
        return "Release..."
      default:
        return "Breathe with me"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-mint-100 to-green-200 relative overflow-hidden">
      {/* Floating Glade Background */}
      <div className="absolute inset-0">
        {/* Glowing Trees */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`tree-${i}`}
            className="absolute text-6xl"
            style={{
              left: `${5 + i * 12}%`,
              bottom: `${15 + (i % 3) * 10}%`,
              filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))",
            }}
            animate={{
              x: [0, 15, 0, -10, 0],
              rotate: [0, 3, 0, -2, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            🌲
          </motion.div>
        ))}

        {/* Floating Wind Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`wind-${i}`}
            className="absolute text-2xl opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 200],
              y: [0, -20, 10, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            🍃
          </motion.div>
        ))}

        {/* Wind Chimes */}
        <motion.div
          className="absolute top-20 right-20 text-5xl"
          style={{
            filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))",
          }}
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          🎐
        </motion.div>
      </div>

      {/* Breathing Bubbles */}
      {isBreathing &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute w-6 h-6 bg-green-200/40 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${60 + (i % 2) * 15}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -80, -160],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: getBreathingDuration(),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md text-center border-2 border-green-200"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="text-6xl mb-4"
          >
            🌿
          </motion.div>

          <h1 className="text-3xl font-bold text-green-700 mb-4">Breath of Ease</h1>
          <p className="text-gray-600 mb-6">A floating glade where peace flows with every breath</p>

          {!isBreathing ? (
            <motion.button
              onClick={() => setIsBreathing(true)}
              className="bg-gradient-to-r from-green-400 to-mint-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Breathing 🫁
            </motion.button>
          ) : (
            <div className="space-y-6">
              {/* Breathing Ring */}
              <motion.div
                className="w-40 h-40 border-4 border-green-300 rounded-full mx-auto flex items-center justify-center relative"
                animate={{
                  scale: getBreathingScale(),
                  borderColor: ["rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.8)", "rgba(34, 197, 94, 0.3)"],
                }}
                transition={{
                  duration: getBreathingDuration(),
                  ease: "easeInOut",
                }}
                style={{
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                }}
              >
                <motion.div
                  className="text-green-600 font-bold text-lg"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🌸
                </motion.div>
              </motion.div>

              <motion.p
                className="text-green-700 font-medium text-lg"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                {getPhaseText()}
              </motion.p>

              <motion.button
                onClick={() => setIsBreathing(false)}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
                whileHover={{ scale: 1.05 }}
              >
                Pause breathing
              </motion.button>
            </div>
          )}

          {/* Comfort Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-green-100 rounded-2xl p-4 border-2 border-green-200"
          >
            <p className="text-green-700 font-medium italic text-sm">{currentMessage}</p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  )
}
