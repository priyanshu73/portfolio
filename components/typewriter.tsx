"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 300, className = "", onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, delay, isComplete, onComplete, text])

  return (
    <div className={`flex items-center ${className}`}>
      <span>
        {displayText.startsWith("$") ? (
          <>
            <span className="text-primary">$</span>
            {displayText.slice(1)}
          </>
        ) : (
          displayText
        )}
      </span>
      {!isComplete && <div className="h-4 w-2 bg-primary animate-blink ml-0.5"></div>}
    </div>
  )
}
