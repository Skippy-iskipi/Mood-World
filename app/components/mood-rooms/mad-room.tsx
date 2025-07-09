"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';

interface MadRoomProps {
  mood: any
  musicEnabled: boolean
}

{
  /* YouTube Music Embed - Anger Relief Music */
}
{

}

const comfortMessages = [
  "Let it out. It's safe to feel. I'll still be here. 🔥",
  "Your anger is valid. It doesn't make you bad - it makes you human. 💕",
  "Feel the fire, then let it transform into your power. You're safe here. ✨",
  "Anger is just love with nowhere to go. Let's give it a place to rest. 🌸",
  "You're allowed to feel mad. You're allowed to release. You're allowed to heal. 🤗",
  "In this sacred fire, your frustration becomes fuel for your growth. 🔥",
  "Your feelings matter. Your anger has a message. Let's listen together. 👂",
  "After the storm comes the calm. After the fire comes the warmth. 🌈",
]

export default function MadRoom({ mood, musicEnabled }: MadRoomProps) {
  const [frustration, setFrustration] = useState("")
  const [isVenting, setIsVenting] = useState(false)
  const [burnedMessages, setBurnedMessages] = useState<string[]>([])
  const [showBurnAnimation, setShowBurnAnimation] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [burningText, setBurningText] = useState("")
  const fireRef = useRef<HTMLDivElement>(null)
  const ventRef = useRef<HTMLDivElement>(null)
  const [burnAnimCoords, setBurnAnimCoords] = useState<{start: {x: number, y: number}, end: {x: number, y: number}} | null>(null)
  const [messageSize, setMessageSize] = useState<{width: number, height: number}>({width: 0, height: 0})
  const animMsgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const randomMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
    setCurrentMessage(randomMessage)
  }, [])

  useEffect(() => {
    if (showBurnAnimation && animMsgRef.current) {
      const rect = animMsgRef.current.getBoundingClientRect()
      setMessageSize({ width: rect.width, height: rect.height })
    }
  }, [showBurnAnimation, burningText])

  const burnFrustration = () => {
    if (frustration.trim()) {
      // Get vent and fire positions
      const ventRect = ventRef.current?.getBoundingClientRect()
      const fireRect = fireRef.current?.getBoundingClientRect()
      if (ventRect && fireRect) {
        setBurnAnimCoords({
          start: { x: ventRect.left + ventRect.width / 2, y: ventRect.top + ventRect.height / 2 },
          end: { x: fireRect.left + fireRect.width / 2, y: fireRect.top + fireRect.height / 2 }
        })
      }
      setBurningText(frustration)
      setShowBurnAnimation(true)
      setBurnedMessages([...burnedMessages, frustration])
      setTimeout(() => {
        setShowBurnAnimation(false)
        setBurningText("")
        setFrustration("")
        setIsVenting(false)
        setBurnAnimCoords(null)
      }, 2400)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-red-100 via-orange-100 to-pink-100 relative overflow-hidden">
        {/* YouTube Music Embed - Anger Relief Music */}
        {/* {musicEnabled && (
        <iframe
          src="https://www.youtube.com/embed/UgHKb_7884o?autoplay=1&loop=1&playlist=UgHKb_7884o&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0"
          allow="autoplay; encrypted-media"
          style={{
            position: "fixed",
            top: "-1000px",
            left: "-1000px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )} */}
        {/* Fire Pit Forest Clearing */}
        <div className="absolute inset-0">
          {/* Forest Background */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-200 to-transparent" />

          {/* Trees around clearing */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`tree-${i}`}
              className="absolute text-4xl sm:text-5xl"
              style={{
                left: i < 3 ? `${5 + i * 15}%` : `${60 + (i - 3) * 15}%`,
                bottom: `${15 + (i % 2) * 10}%`,
              }}
              animate={{
                x: [0, 5, 0, -3, 0],
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🌲
            </motion.div>
          ))}

          {/* Logs */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`log-${i}`}
              className="absolute text-3xl sm:text-4xl z-10"
              style={{
                left: `${42 + i * 4}%`,
                bottom: "12%",
                transform: `rotate(${-30 + i * 20}deg)`,
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            >
              🪵
            </motion.div>
          ))}

          {/* Main Fire - Realistic Animated Fire (No Emoji) */}
          <motion.div
            ref={fireRef}
            className="absolute left-[45%] bottom-[24%] sm:bottom-[20%] transform -translate-x-1/2 flex flex-col items-center z-20"
            style={{ pointerEvents: 'none' }}
          >
            {/* Fire Glow */}
            <motion.div
              className="absolute left-1/2 top-2/3 -translate-x-1/2 w-32 h-14 rounded-full bg-orange-400 blur-2xl opacity-60 z-0"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1.5, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ bottom: '-18px' }}
            />
            {/* Layered Flames */}
            <div className="relative flex flex-col items-center z-10" style={{ marginBottom: '-10px' }}>
              {/* Center Tall Flame */}
              <motion.div
                className="absolute left-0 w-16 h-28 rounded-b-full bg-gradient-to-t from-yellow-400 via-orange-500 to-transparent blur-md opacity-90"
                animate={{
                  scaleY: [1, 1.15, 1],
                  opacity: [0.85, 1, 1],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ zIndex: 3 }}
              />
              {/* Left Flame */}
              <motion.div
                className="absolute left-[-28px] w-12 h-20 rounded-b-full bg-gradient-to-t from-orange-500 via-yellow-300 to-transparent blur-md opacity-80"
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                style={{ zIndex: 2 }}
              />
              {/* Right Flame */}
              <motion.div
                className="absolute left-[28px] w-12 h-20 rounded-b-full bg-gradient-to-t from-orange-500 via-yellow-300 to-transparent blur-md opacity-80"
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
                style={{ zIndex: 2 }}
              />
              {/* Flicker Flame */}
              <motion.div
                className="absolute left-0 w-10 h-16 rounded-b-full bg-gradient-to-t from-yellow-200 via-orange-300 to-transparent blur-md opacity-70"
                animate={{
                  scaleY: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                style={{ zIndex: 1 }}
              />
            </div>
            {/* Animated Sparks */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute bg-yellow-200 rounded-full opacity-70"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  bottom: '60%',
                  width: `${6 + Math.random() * 6}px`,
                  height: `${6 + Math.random() * 6}px`,
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  y: [0, -40 - Math.random() * 30, 0],
                  opacity: [0.7, 0, 0],
                  scale: [1, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Enhanced Fire Sparks */}
          {[...Array(showBurnAnimation ? 20 : 10)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute text-yellow-400 text-sm sm:text-base"
              style={{
                left: `${35 + Math.random() * 30}%`,
                bottom: `${25 + Math.random() * 30}%`,
                fontSize: `${0.8 + Math.random() * 1}rem`,
              }}
              animate={{
                y: [0, -60, -120, -180],
                opacity: [1, 0.8, 0.4, 0],
                scale: [1, 0.8, 0.6, 0.3],
                rotate: [0, 180, 360, 540],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Cozy Forest Elements */}
          <motion.div
            className="absolute bottom-10 left-10 text-2xl sm:text-3xl"
            animate={{
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10 text-2xl sm:text-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            
          </motion.div>
        </div>

        {/* Burning Message Animation */}
        <AnimatePresence>
          {showBurnAnimation && burningText && burnAnimCoords && (
            <motion.div
              ref={animMsgRef}
              initial={{
                opacity: 1,
                scale: 1,
                x: burnAnimCoords.start.x - messageSize.width / 2,
                y: burnAnimCoords.start.y - messageSize.height / 2,
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 9999,
              }}
              animate={{
                x: [burnAnimCoords.start.x - messageSize.width / 2, burnAnimCoords.end.x - messageSize.width / 2, burnAnimCoords.end.x - messageSize.width / 2],
                y: [burnAnimCoords.start.y - messageSize.height / 2, burnAnimCoords.end.y - messageSize.height / 2, burnAnimCoords.end.y - messageSize.height / 2],
                scale: [1, 0.5, 0.5],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.65, 1],
                ease: "easeInOut"
              }}
              style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none' }}
              className="max-w-xs text-center font-bold text-sm sm:text-base px-4 pointer-events-none"
            >
              <span>{burningText}</span>
              {/* Fire Sparkles around burning text */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`burn-spark-${i}`}
                  className="absolute text-orange-400 text-lg"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                  }}
                >
                  🔥
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-4 sm:p-6 pt-16 sm:pt-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="girly-card p-6 sm:p-8 max-w-lg w-full text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-5xl sm:text-6xl mb-4"
            >
              😡
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-4 gradient-text">Fire Pit Vent Zone</h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">A safe forest clearing to release and transform</p>

            {!isVenting ? (
              <motion.button
                onClick={() => setIsVenting(true)}
                className="w-full cartoonish-button px-6 py-4 text-sm sm:text-base"
                style={{
                  background: "linear-gradient(135deg, #f87171 0%, #fb923c 50%, #fbbf24 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔥 Let It Out
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" ref={ventRef}>
                <div className="relative">
                  <textarea
                    value={frustration}
                    onChange={(e) => setFrustration(e.target.value)}
                    placeholder="Write out everything that's making you mad. This is your safe space to feel it all. Let the fire transform it into strength. 🔥"
                    className="w-full h-32 sm:h-36 p-4 border-3 border-red-200 rounded-2xl resize-none focus:border-red-400 focus:outline-none bg-red-50/50 text-sm sm:text-base"
                    autoFocus
                  />
                  <motion.div
                    className="absolute top-2 right-2 text-red-300 text-lg"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    🔥
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={burnFrustration}
                    disabled={!frustration.trim()}
                    className="flex-1 cartoonish-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    style={{
                      background: frustration.trim()
                        ? "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #b91c1c 100%)"
                        : "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)",
                    }}
                    whileHover={{ scale: frustration.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: frustration.trim() ? 0.95 : 1 }}
                  >
                    🔥 Burn It Away
                  </motion.button>
                  <motion.button
                    onClick={() => setIsVenting(false)}
                    className="px-6 py-3 border-3 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 font-semibold text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Done
                  </motion.button>
                </div>

                {burnedMessages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center bg-orange-100 rounded-2xl p-4 border-3 border-orange-200"
                  >
                    <p className="text-orange-700 font-semibold text-sm sm:text-base">
                      🔥 Transformed by fire: <span className="text-orange-600">{burnedMessages.length}</span> release
                      {burnedMessages.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-orange-600 text-xs sm:text-sm mt-1 italic">Your anger is becoming your power ✨</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Comfort Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-pink-100 rounded-2xl p-4 sm:p-6 border-3 border-pink-200"
            >
              <p className="text-pink-700 font-medium italic text-sm sm:text-base">{currentMessage}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Audio Indicator */}
      </div>
    </>
  )
}
