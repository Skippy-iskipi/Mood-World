"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

type Mood = {
  id: string
  emoji: string
  label: string
  color: string
  description: string
}

interface MoodWorldProps {
  mood: Mood
  onBack: () => void
}

const moodScenes = {
  stressed: {
    title: "Peaceful Forest Sanctuary",
    description: "Let the gentle breeze carry your worries away",
    background: "bg-gradient-to-b from-green-100 to-green-200",
    elements: [
      { icon: "🌲", animation: "sway", delay: 0 },
      { icon: "🍃", animation: "float", delay: 0.5 },
      { icon: "🎐", animation: "gentle", delay: 1 },
      { icon: "🌿", animation: "sway", delay: 1.5 },
    ],
    message: "Breathe deeply, Sheikha. You are stronger than any storm. 🌸",
  },
  crying: {
    title: "Gentle Rain Embrace",
    description: "Your tears are healing, let them flow freely",
    background: "bg-gradient-to-b from-blue-100 to-pink-100",
    elements: [
      { icon: "☔", animation: "gentle", delay: 0 },
      { icon: "💧", animation: "fall", delay: 0.3 },
      { icon: "🌈", animation: "glow", delay: 1 },
      { icon: "☁️", animation: "float", delay: 0.8 },
    ],
    message: "Every tear is a step toward healing. You're so brave. 💕",
  },
  overthinking: {
    title: "Starry Mind Garden",
    description: "Let your thoughts settle like stardust",
    background: "bg-gradient-to-b from-indigo-200 to-purple-200",
    elements: [
      { icon: "⭐", animation: "twinkle", delay: 0 },
      { icon: "☁️", animation: "drift", delay: 0.5 },
      { icon: "🌙", animation: "glow", delay: 1 },
      { icon: "✨", animation: "sparkle", delay: 1.5 },
    ],
    message: "Your mind is beautiful, even in its complexity. Rest now. 🌙",
  },
  work: {
    title: "Cozy Comfort Corner",
    description: "A warm space to decompress and recharge",
    background: "bg-gradient-to-b from-orange-100 to-pink-100",
    elements: [
      { icon: "☕", animation: "steam", delay: 0 },
      { icon: "💡", animation: "glow", delay: 0.5 },
      { icon: "📚", animation: "gentle", delay: 1 },
      { icon: "🕯️", animation: "flicker", delay: 1.5 },
    ],
    message: "You worked so hard today. You deserve rest and kindness. 🤗",
  },
  tired: {
    title: "Dreamy Sleep Haven",
    description: "Soft pillows and lullabies await you",
    background: "bg-gradient-to-b from-purple-100 to-pink-100",
    elements: [
      { icon: "🛏️", animation: "gentle", delay: 0 },
      { icon: "🎵", animation: "float", delay: 0.5 },
      { icon: "💤", animation: "drift", delay: 1 },
      { icon: "🌙", animation: "glow", delay: 1.5 },
    ],
    message: "Rest is not a luxury, it's necessary. Sleep well, angel. 😴",
  },
  bored: {
    title: "Magical Wonder Garden",
    description: "Discover sparkly surprises and hidden delights",
    background: "bg-gradient-to-b from-yellow-100 to-green-100",
    elements: [
      { icon: "🦋", animation: "flutter", delay: 0 },
      { icon: "✨", animation: "sparkle", delay: 0.3 },
      { icon: "🌺", animation: "bloom", delay: 0.8 },
      { icon: "🐛", animation: "crawl", delay: 1.2 },
    ],
    message: "Life is full of small wonders waiting to be discovered! 🌟",
  },
  mad: {
    title: "Safe Release Space",
    description: "A cozy fire to transform anger into warmth",
    background: "bg-gradient-to-b from-red-100 to-orange-100",
    elements: [
      { icon: "🔥", animation: "flicker", delay: 0 },
      { icon: "🪵", animation: "gentle", delay: 0.5 },
      { icon: "💨", animation: "drift", delay: 1 },
      { icon: "🌋", animation: "pulse", delay: 1.5 },
    ],
    message: "Your anger is valid. Let it transform into your power. 🔥",
  },
  sleepless: {
    title: "Cosmic Breathing Space",
    description: "Guided breathing under infinite stars",
    background: "bg-gradient-to-b from-indigo-300 to-purple-300",
    elements: [
      { icon: "🌌", animation: "twinkle", delay: 0 },
      { icon: "⭐", animation: "pulse", delay: 0.4 },
      { icon: "🌙", animation: "glow", delay: 0.8 },
      { icon: "💫", animation: "spiral", delay: 1.2 },
    ],
    message: "Breathe with the universe. Sleep will come when ready. 🌙",
  },
  missing: {
    title: "Self-Love Ocean",
    description: "Messages of love washing ashore just for you",
    background: "bg-gradient-to-b from-blue-200 to-pink-200",
    elements: [
      { icon: "🏖️", animation: "gentle", delay: 0 },
      { icon: "💌", animation: "float", delay: 0.5 },
      { icon: "🌊", animation: "wave", delay: 1 },
      { icon: "✨", animation: "sparkle", delay: 1.5 },
    ],
    message: "You are worthy of love, especially your own. Welcome home. 💖",
  },
}

const animations = {
  sway: {
    x: [0, 10, 0, -10, 0],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  float: {
    y: [0, -20, 0],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  gentle: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  fall: {
    y: [0, 100],
    opacity: [1, 0],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  glow: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.2, 1],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  twinkle: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  drift: {
    x: [0, 50, 0],
    transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  sparkle: {
    rotate: [0, 180, 360],
    scale: [0.8, 1.2, 0.8],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  steam: {
    y: [0, -30],
    opacity: [1, 0],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: [0, 0, 0.58, 1] },
  },
  flicker: {
    opacity: [0.8, 1, 0.9, 1],
    transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  flutter: {
    x: [0, 20, -10, 15, 0],
    y: [0, -15, 10, -5, 0],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  bloom: {
    scale: [0.8, 1.3, 1],
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  crawl: {
    x: [0, 100, 0],
    transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  pulse: {
    scale: [1, 1.4, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  spiral: {
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
  wave: {
    scaleX: [1, 1.2, 1],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] },
  },
}

export default function MoodWorld({ mood, onBack }: MoodWorldProps) {
  const scene = moodScenes[mood.id as keyof typeof moodScenes]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`min-h-screen ${scene.background} relative overflow-hidden`}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </motion.button>

      {/* Animated Scene Elements */}
      <div className="absolute inset-0">
        {scene.elements.map((element, index) => {
          const anim = animations[element.animation as keyof typeof animations];
          const { transition, ...animProps } = anim;
          const { ease, ...restTransition } = transition || {};

          return (
            <motion.div
              key={index}
              className="absolute text-6xl"
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                ...animProps,
              }}
              transition={{
                ...restTransition,
                delay: element.delay,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {element.icon}
            </motion.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl max-w-md"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-8xl mb-6"
          >
            {mood.emoji}
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">{scene.title}</h1>

          <p className="text-lg text-gray-600 mb-6">{scene.description}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-pink-100 rounded-2xl p-4 border-2 border-pink-200"
          >
            <p className="text-gray-700 font-medium italic">{scene.message}</p>
          </motion.div>

          {/* Breathing Guide for certain moods */}
          {(mood.id === "stressed" || mood.id === "sleepless" || mood.id === "overthinking") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6"
            >
              <p className="text-sm text-gray-600 mb-3">Breathe with me:</p>
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-auto opacity-70"
              />
              <p className="text-xs text-gray-500 mt-2">Inhale... Hold... Exhale...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
