"use client"

import { useEffect, useRef, useState } from "react"

interface EnhancedMusicSystemProps {
  musicEnabled: boolean
  moodId: string
}

const localAudioSources = {
  selection: "/audio/Bubbly.mp3", // Mood selection screen
  stressed: "/audio/stressed.mp3",
  crying: "/audio/crying.mp3",
  work: "/audio/work.mp3",
  overthinking: "/audio/overthink.mp3",
  mad: "/audio/mad.mp3",
  sleepless: "/audio/sleeping.mp3",
  missing: "/audio/missingme.mp3",
}

export default function EnhancedMusicSystem({ musicEnabled, moodId }: EnhancedMusicSystemProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!musicEnabled) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const audio = audioRef.current
    const audioUrl = localAudioSources[moodId as keyof typeof localAudioSources]
    if (audio && audioUrl) {
      audio.src = audioUrl
      audio.volume = 0.3
      audio.loop = true
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [musicEnabled, moodId])

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} />
    </>
  )
}
