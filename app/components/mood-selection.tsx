"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Star } from "lucide-react"

type Mood = {
  id: string
  emoji: string
  label: string
  color: string
  description: string
  illustration: string
}

interface MoodSelectionProps {
  moods: Mood[]
  onMoodSelect: (mood: Mood) => void
  musicEnabled: boolean
}

export default function MoodSelection({ moods, onMoodSelect, musicEnabled }: MoodSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-4 pt-12 md:p-6 md:pt-16"
    >
      {/* Header - Improved Mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8 md:mb-12"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-6xl md:text-8xl mb-4 md:mb-6"
        >
          🌸
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-purple-700 mb-3 md:mb-4 leading-tight px-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          Hi Sheikha
          <motion.span
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            className="inline-block ml-2"
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 font-medium mb-2 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          How are you feeling today?
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-pink-600 font-semibold italic px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          I'm always here for you. 💕
        </motion.p>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400" />
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400 fill-purple-400" />
          <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-400 fill-rose-400" />
        </motion.div>
      </motion.div>

      {/* Mood Grid - Improved Mobile Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className={`${mood.color} rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border-3 border-white/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group touch-manipulation`}
            style={{ minHeight: "140px" }}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.4 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, 1, -1, 0],
              transition: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl md:rounded-3xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Main emoji */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
              className="text-4xl md:text-5xl mb-2 md:mb-3 relative z-10"
            >
              {mood.emoji}
            </motion.div>

            {/* Illustration */}
            <motion.div
              className="text-xl md:text-2xl mb-1 md:mb-2 opacity-60"
              animate={{
                y: [0, -5, 0],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              {mood.illustration}
            </motion.div>

            <h3 className="font-bold text-gray-700 text-base md:text-lg mb-1 md:mb-2 relative z-10 leading-tight">
              {mood.label}
            </h3>

            <p className="text-xs md:text-sm text-gray-600 leading-tight relative z-10 px-1">{mood.description}</p>

            {/* Sparkle effects */}
            <motion.div
              className="absolute top-2 right-2 text-yellow-300 text-sm md:text-base"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.5,
              }}
            >
              ✨
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Bottom Message - Improved Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center mt-8 md:mt-12 px-4"
      >
        <motion.p
          className="text-sm md:text-base text-gray-500 italic mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Whatever you're feeling is completely valid, Babe
        </motion.p>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="text-2xl md:text-3xl"
        >
          💖
        </motion.div>
      </motion.div>

      {/* Audio Indicator */}
      {musicEnabled && (
        <motion.div
          className="fixed bottom-4 left-4 bg-pink-200/90 backdrop-blur-sm rounded-full px-4 py-3 text-xs text-pink-700 font-medium border-2 border-pink-300 z-20 flex items-center gap-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            🎵
          </motion.div>
          <span>Bubbly - Colbie Caillat</span>
        </motion.div>
      )}
    </motion.div>
  )
}
