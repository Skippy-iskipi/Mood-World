"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import StressedRoom from "./mood-rooms/stressed-room"
import CryingRoom from "./mood-rooms/crying-room"
import WorkRoom from "./mood-rooms/work-room"
import OverthinkingRoom from "./mood-rooms/overthinking-room"
import MadRoom from "./mood-rooms/mad-room"
import SleeplessRoom from "./mood-rooms/sleepless-room"
import MissingRoom from "./mood-rooms/missing-room"

type Mood = {
  id: string
  emoji: string
  label: string
  color: string
  description: string
  illustration: string
}

interface InteractiveMoodWorldProps {
  mood: Mood
  onBack: () => void
  musicEnabled: boolean
  setMusicEnabled?: (enabled: boolean) => void
  isPaused?: boolean
  setIsPaused?: (paused: boolean) => void
}

const roomComponents = {
  stressed: StressedRoom,
  crying: CryingRoom,
  work: WorkRoom,
  overthinking: OverthinkingRoom,
  mad: MadRoom,
  sleepless: SleeplessRoom,
  missing: MissingRoom,
}

export default function InteractiveMoodWorld({ mood, onBack, musicEnabled, setMusicEnabled, isPaused, setIsPaused }: InteractiveMoodWorldProps) {
  const RoomComponent = roomComponents[mood.id as keyof typeof roomComponents]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen relative"
    >

      {/* Back Button - Improved for mobile */}
      <motion.button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-full p-3 md:p-4 shadow-xl border-2 border-pink-200 hover:bg-white transition-all duration-300 touch-manipulation"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
      </motion.button>

      {/* Room Content */}
      {mood.id === 'sleepless' ? (
        <SleeplessRoom mood={mood} musicEnabled={musicEnabled} setMusicEnabled={setMusicEnabled} isPaused={isPaused} setIsPaused={setIsPaused} />
      ) : (
        <RoomComponent mood={mood} musicEnabled={musicEnabled} />
      )}
    </motion.div>
  )
}
