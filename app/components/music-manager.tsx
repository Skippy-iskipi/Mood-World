"use client"

import { useEffect, useState, useRef } from "react"
import AudioPlayer from "./audio-player"
import WebAudioPlayer from "./web-audio-player"

interface MusicManagerProps {
  musicEnabled: boolean
  moodId: string
}

// Fallback audio files (you can host these or use royalty-free sources)
const moodSounds = {
  selection: "/audio/Bubbly.mp3",
  stressed: "/audio/stressed.mp3",
  crying: "/audio/crying.mp3",
  work: "/audio/work.mp3",
  overthinking: "/audio/overthinking.mp3",
  mad: "/audio/mad.mp3",
  sleepless: "/audio/sleeping.mp3",
  missing: "/audio/missingme.mp3",
}

// Web Audio API frequencies for each mood (as fallback)
const moodFrequencies = {
  selection: 261.63, // C4
  stressed: 220.0, // A3
  crying: 196.0, // G3
  work: 293.66, // D4
  overthinking: 174.61, // F3
  mad: 130.81, // C3
  sleepless: 164.81, // E3
  missing: 207.65, // G#3
}

export default function MusicManager({ musicEnabled, moodId }: MusicManagerProps) {
  const [useWebAudio, setUseWebAudio] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const trackUrl = moodSounds[moodId as keyof typeof moodSounds]
  const frequency = moodFrequencies[moodId as keyof typeof moodFrequencies]

  useEffect(() => {
    // Test if audio files are available
    if (trackUrl) {
      const audio = new Audio()
      audio.src = trackUrl
      audio.addEventListener("error", () => {
        setAudioError(true)
        setUseWebAudio(true)
      })
      audio.addEventListener("canplay", () => {
        setAudioError(false)
        setUseWebAudio(false)
      })
    } else {
      setUseWebAudio(true)
    }
  }, [trackUrl])

  // If audio files fail, use Web Audio API for ambient tones
  if (useWebAudio || audioError) {
    return (
      <>
        <audio ref={audioRef} src={trackUrl} />
        <WebAudioPlayer musicEnabled={musicEnabled} frequency={frequency} type="sine" volume={0.1} />
      </>
    )
  }

  return (
    <>
      <audio ref={audioRef} src={trackUrl} />
      <AudioPlayer musicEnabled={musicEnabled} trackUrl={trackUrl} volume={0.3} loop={true} />
    </>
  )
}
