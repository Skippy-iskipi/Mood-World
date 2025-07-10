"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MusicManager from '../music-manager';

interface MissingRoomProps {
  mood: any
  musicEnabled: boolean
}

const comfortMessages = [
  "I miss you too, my love. Every moment without you feels incomplete. 💔",
  "Distance can't diminish what we share. You're always in my heart. 💖",
  "I'm thinking of you right now, wishing I could hold you close.",
  "Even miles away, my love reaches you. You're never truly alone.",
  "I can't wait to be with you again. You're my everything. 💕",
]

export default function MissingRoom({ mood, musicEnabled }: MissingRoomProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % comfortMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-200 to-purple-200 relative overflow-hidden">

        {/* Floating Hearts Background */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              💕
            </motion.div>
          ))}
          
          {/* Soft Glow Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="girly-card p-6 sm:p-8 max-w-lg w-full text-center"
          >
            {/* Pulsing Heart */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-8xl sm:text-9xl mb-6 text-red-400 drop-shadow-lg"
            >
              💔
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-rose-700 mb-4 gradient-text">Miss me?</h1>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">Hear my voice and feel my love, even when we're apart.</p>

            <div className="space-y-6">
              {/* Voice Message Button */}
              <motion.button
                onClick={handlePlay}
                className="w-full cartoonish-button px-8 py-6 text-lg sm:text-xl magical-glow relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #be185d 50%, #a855f7 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(236, 72, 153, 0.4)",
                    "0 0 40px rgba(236, 72, 153, 0.8)",
                    "0 0 20px rgba(236, 72, 153, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🎵</span>
                  <span>{isPlaying ? "Pause My Voice" : "Hear My Voice"}</span>
                  <span className="text-2xl">💕</span>
                </div>
              </motion.button>

              <audio
                ref={audioRef}
                src="/audio/voice.mp3"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                preload="auto"
                style={{ display: 'none' }}
              />

              {/* Comfort Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm sm:text-base text-rose-700/90 bg-pink-100/70 rounded-xl p-4 backdrop-blur-sm border border-pink-200/50"
                >
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">💝</span>
                    <span>{comfortMessages[currentMessage]}</span>
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Love Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="text-rose-600/80 bg-pink-50/60 rounded-lg p-3 backdrop-blur-sm border border-pink-200/30">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">💌</span>
                    <span>Every heartbeat calls your name</span>
                  </p>
                </div>
                <div className="text-purple-600/80 bg-purple-50/60 rounded-lg p-3 backdrop-blur-sm border border-purple-200/30">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-lg">🌙</span>
                    <span>I dream of you every night</span>
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Floating Love Particles */}
          <AnimatePresence>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400 text-2xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0], y: [-20, -40, -60] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                ✨
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </>
  )
}
