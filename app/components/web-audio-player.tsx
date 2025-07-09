"use client"

import { useEffect, useRef, useState } from "react"

interface WebAudioPlayerProps {
  musicEnabled: boolean
  frequency: number
  type?: OscillatorType
  volume?: number
}

export default function WebAudioPlayer({ musicEnabled, frequency, type = "sine", volume = 0.1 }: WebAudioPlayerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if Web Audio API is supported
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    setIsSupported(!!AudioContext)
  }, [])

  useEffect(() => {
    if (!isSupported) return

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext

    if (musicEnabled) {
      try {
        // Create audio context
        audioContextRef.current = new AudioContext()
        const audioContext = audioContextRef.current

        // Create oscillator and gain node
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        // Configure oscillator
        oscillator.type = type
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

        // Configure gain (volume)
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime)

        // Connect nodes
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // Start oscillator
        oscillator.start()

        // Store references
        oscillatorRef.current = oscillator
        gainNodeRef.current = gainNode
      } catch (error) {
        console.log("Web Audio API failed:", error)
      }
    } else {
      // Stop audio
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          // Oscillator might already be stopped
        }
        oscillatorRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (error) {
          // Oscillator might already be stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [musicEnabled, frequency, type, volume, isSupported])

  return null // This component doesn't render anything
}
