"use client"

import { useEffect, useRef, useState } from "react"

interface AudioManagerProps {
  musicEnabled: boolean
  moodId: string
}

const moodSounds = {
  selection: "/audio/Bubbly.mp3",
  stressed: "/audio/stressed.mp3",
  crying: "/audio/crying.mp3",
  work: "/audio/work.mp3",
  overthinking: "/audio/overthink.mp3",
  mad: "/audio/mad.mp3",
  sleepless: "/audio/sleeping.mp3",
  missing: "/audio/missingme.mp3",
}

export default function AudioManager({ musicEnabled, moodId }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true

      const handleCanPlay = () => setIsLoaded(true)
      audioRef.current.addEventListener("canplay", handleCanPlay)

      return () => {
        audioRef.current?.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (musicEnabled) {
        audioRef.current.play().catch(console.log)
      } else {
        audioRef.current.pause()
      }
    }
  }, [musicEnabled, isLoaded])

  // Create a simple tone using Web Audio API as fallback
  const createTone = (frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  // Play interaction sounds
  useEffect(() => {
    if (musicEnabled) {
      // Play a gentle tone based on mood
      const frequencies = {
        stressed: 220,
        crying: 196,
        work: 261,
        overthinking: 174,
        mad: 130,
        sleepless: 164,
        missing: 207,
      }

      createTone(frequencies[moodId as keyof typeof frequencies] || 220, 2)
    }
  }, [moodId, musicEnabled])

  return (
    <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
      <source src={moodSounds[moodId as keyof typeof moodSounds]} type="audio/mpeg" />
      {/* Fallback for browsers that don't support MP3 */}
      Your browser does not support the audio element.
    </audio>
  )
}
