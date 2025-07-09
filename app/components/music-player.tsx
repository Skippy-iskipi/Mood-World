"use client"

import { useEffect, useRef, useState } from "react"

interface MusicPlayerProps {
  musicEnabled: boolean
  moodId: string
}

// Using reliable HTTPS audio sources
const audioSources = {
  selection: "/audio/Bubbly.mp3",
  stressed: "/audio/stressed.mp3", // Forest sounds
  crying: "/audio/crying.mp3", // Rain sounds
  work: "/audio/work.mp3", // Lofi jazz
  overthinking: "/audio/overthink.mp3", // Ambient calm
  mad: "/audio/mad.mp3", // Calming meditation
  sleepless: "/audio/sleeping.mp3", // Sleep sounds
  missing: "/audio/missingme.mp3", // Nostalgic piano
}

// Fallback: Generate calming tones using Web Audio API
const generateCalmingTone = (frequency: number, audioContext: AudioContext, duration = 2) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  oscillator.type = "sine"

  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5)
  gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + duration - 0.5)
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

const moodFrequencies = {
  selection: [261.63, 329.63, 392.0], // C-E-G major chord
  stressed: [220.0, 246.94, 293.66], // A-B-D calming
  crying: [196.0, 220.0, 261.63], // G-A-C gentle
  work: [293.66, 369.99, 440.0], // D-F#-A uplifting
  overthinking: [174.61, 196.0, 220.0], // F-G-A grounding
  mad: [130.81, 164.81, 196.0], // C-E-G low and calming
  sleepless: [146.83, 174.61, 220.0], // D-F-A peaceful
  missing: [207.65, 246.94, 311.13], // G#-B-D# emotional
}

export default function MusicPlayer({ musicEnabled, moodId }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [useGeneratedAudio, setUseGeneratedAudio] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Try to load audio file
  useEffect(() => {
    if (!musicEnabled) return

    const audio = audioRef.current
    if (!audio) return

    const audioUrl = audioSources[moodId as keyof typeof audioSources]
    if (!audioUrl) {
      setUseGeneratedAudio(true)
      return
    }

    audio.src = audioUrl
    audio.volume = 0.3
    audio.loop = true

    const handleCanPlay = () => {
      setAudioLoaded(true)
      setUseGeneratedAudio(false)
    }

    const handleError = () => {
      console.log("Audio failed to load, using generated tones")
      setUseGeneratedAudio(true)
      setAudioLoaded(false)
    }

    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("error", handleError)
    }
  }, [moodId, musicEnabled])

  // Play/pause audio
  useEffect(() => {
    if (!musicEnabled) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    if (audioLoaded && !useGeneratedAudio) {
      const audio = audioRef.current
      if (audio) {
        audio.play().catch(() => {
          console.log("Audio play failed, using generated tones")
          setUseGeneratedAudio(true)
        })
        setIsPlaying(true)
      }
    } else if (useGeneratedAudio) {
      playGeneratedAudio()
    }
  }, [musicEnabled, audioLoaded, useGeneratedAudio, moodId])

  const playGeneratedAudio = () => {
    if (!musicEnabled) return

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }

      const audioContext = audioContextRef.current
      const frequencies = moodFrequencies[moodId as keyof typeof moodFrequencies]

      const playChord = () => {
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            generateCalmingTone(freq, audioContext, 3)
          }, index * 500)
        })
      }

      // Play initial chord
      playChord()

      // Repeat every 8 seconds
      const interval = setInterval(() => {
        if (musicEnabled) {
          playChord()
        } else {
          clearInterval(interval)
        }
      }, 8000)

      setIsPlaying(true)

      return () => clearInterval(interval)
    } catch (error) {
      console.log("Web Audio API not supported")
    }
  }

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} />
      {isPlaying && (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 text-xs font-medium border-2 border-pink-300 z-20 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-700">{useGeneratedAudio ? "Ambient Tones" : "Calming Music"}</span>
        </div>
      )}
    </>
  )
}
