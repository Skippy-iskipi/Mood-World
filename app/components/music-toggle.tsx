"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

interface MusicToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function MusicToggle({ enabled, onToggle }: MusicToggleProps) {
  return (
    <motion.button
      onClick={() => onToggle(!enabled)}
      className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl border-2 border-pink-200 hover:bg-white transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div animate={{ rotate: enabled ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {enabled ? <Volume2 className="w-5 h-5 text-purple-600" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
      </motion.div>

      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {enabled ? "Music On" : "Music Off"}
      </motion.div>
    </motion.button>
  )
}
