"use client"

import { useEffect, useRef, useState } from "react"

interface AudioPlayerProps {
  musicEnabled: boolean
  trackUrl: string
  volume?: number
  loop?: boolean
}

export default function AudioPlayer({ musicEnabled, trackUrl, volume = 0.3, loop = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = () => {
      setHasError(true)
      console.log("Audio failed to load:", trackUrl)
    }

    const handleLoadStart = () => {
      setIsLoaded(false)
      setHasError(false)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)

    // Set audio properties
    audio.volume = volume
    audio.loop = loop
    audio.preload = "auto"

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [trackUrl, volume, loop])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isLoaded || hasError) return

    if (musicEnabled) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error)
          setHasError(true)
        })
      }
    } else {
      audio.pause()
    }
  }, [musicEnabled, isLoaded, hasError])

  return <audio ref={audioRef} src={trackUrl} style={{ display: "none" }} onError={() => setHasError(true)} />
}
