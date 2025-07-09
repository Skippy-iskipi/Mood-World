"use client"

import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"
import { useMemo, useState, useEffect } from "react"

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const elements = [
    { icon: Heart, color: "text-pink-300", size: "w-4 h-4", delay: 0 },
    { icon: Star, color: "text-yellow-300", size: "w-3 h-3", delay: 2 },
    { icon: Sparkles, color: "text-purple-300", size: "w-5 h-5", delay: 4 },
    { icon: Heart, color: "text-rose-300", size: "w-3 h-3", delay: 6 },
    { icon: Star, color: "text-blue-300", size: "w-4 h-4", delay: 8 },
  ]

  // Generate random positions for main elements only once on the client
  const elementPositions = useMemo(
    () => elements.map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })),
    []
  )

  // Generate random sparkles only once on the client
  const sparkles = useMemo(
    () => Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${0.5 + Math.random() * 1}rem`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5,
    })),
    []
  )

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} ${element.size} opacity-30`}
          style={elementPositions[index]}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-full h-full fill-current" />
        </motion.div>
      ))}

      {/* Floating sparkles */}
      {sparkles.map((sparkle, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute text-yellow-300 opacity-20"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            fontSize: sparkle.fontSize,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}
