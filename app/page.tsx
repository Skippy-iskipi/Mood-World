"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import MoodSelection from "./components/mood-selection"
import InteractiveMoodWorld from "./components/interactive-mood-world"
import FloatingElements from "./components/floating-elements"
import MusicToggle from "./components/music-toggle"
import DailyMessage from "./components/daily-message"
import EnhancedMusicSystem from "./components/enhanced-music-system"

type Mood = {
  id: string
  emoji: string
  label: string
  color: string
  description: string
  illustration: string
}

const moods: Mood[] = [
  {
    id: "stressed",
    emoji: "😖",
    label: "Stressed",
    color: "bg-gradient-to-br from-green-200 to-mint-200",
    description: "Feeling overwhelmed and tense",
    illustration: "🌿",
  },
  {
    id: "crying",
    emoji: "😢",
    label: "Crying",
    color: "bg-gradient-to-br from-blue-200 to-indigo-200",
    description: "Tears need to flow",
    illustration: "☁️",
  },
  {
    id: "work",
    emoji: "💼",
    label: "Tough day at work",
    color: "bg-gradient-to-br from-orange-200 to-pink-200",
    description: "Work has been challenging",
    illustration: "☕",
  },
  {
    id: "overthinking",
    emoji: "🧠",
    label: "Overthinking",
    color: "bg-gradient-to-br from-purple-200 to-pink-200",
    description: "Mind racing with thoughts",
    illustration: "💭",
  },
  {
    id: "mad",
    emoji: "😡",
    label: "Mad",
    color: "bg-gradient-to-br from-red-200 to-orange-200",
    description: "Anger needs release",
    illustration: "🔥",
  },
  {
    id: "sleepless",
    emoji: "🌙",
    label: "Can't sleep",
    color: "bg-gradient-to-br from-indigo-300 to-purple-300",
    description: "Sleep won't come",
    illustration: "⭐",
  },
  {
    id: "missing",
    emoji: "💔",
    label: "Missing me",
    color: "bg-gradient-to-br from-pink-300 to-rose-300",
    description: "Self-love feels distant",
    illustration: "💌",
  },
]

export default function SheikhaMoodWorld() {
  const [mounted, setMounted] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)

  useEffect(() => { setMounted(true) }, [])

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setIsPaused(false) // reset pause when changing mood
  }

  const handleBackToMoods = () => {
    setSelectedMood(null)
    setIsPaused(false) // reset pause when leaving mood
  }

  const getCurrentMoodId = () => {
    return selectedMood ? selectedMood.id : "selection"
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <FloatingElements />
      {/* Enhanced Music System */}
      <EnhancedMusicSystem
        musicEnabled={musicEnabled}
        moodId={getCurrentMoodId()}
        onPlaybackDenied={() => setMusicEnabled(false)}
        paused={selectedMood && selectedMood.id === 'sleepless' ? isPaused : false}
      />
      {/* Music Toggle */}
      <MusicToggle enabled={musicEnabled} onToggle={setMusicEnabled} />
      {/* Daily Message */}
      <DailyMessage />
      <AnimatePresence mode="wait">
        {!selectedMood ? (
          <MoodSelection
            key="mood-selection"
            moods={moods}
            onMoodSelect={handleMoodSelect}
            musicEnabled={musicEnabled}
          />
        ) : (
          <InteractiveMoodWorld
            key="mood-world"
            mood={selectedMood}
            onBack={handleBackToMoods}
            musicEnabled={musicEnabled}
            setMusicEnabled={setMusicEnabled}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
