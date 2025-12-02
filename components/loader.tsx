"use client"

import { useEffect, useState } from "react"

const greetings = [
  "Hello World",           // English
  "Hola Mundo",            // Spanish
  "こんにちは世界",         // Japanese
  "Привет мир",            // Russian
  "नमस्ते संसार",          // Nepali
]

export function Loader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([])
  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Generate particles once on mount
  useEffect(() => {
    setIsMounted(true)
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }))
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          // Start exit animation after showing the last greeting
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(onLoadingComplete, 1000) // Match exit animation duration (1s for curve up animation)
          }, 440)
          return prev
        }
      })
    }, 330) // Change greeting every 330ms (10% slower: 300 * 1.1)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  // Sync progress bar with loading
  useEffect(() => {
    const totalDuration = greetings.length * 330 + 440 // Total time for all greetings + final pause
    const increment = 100 / (totalDuration / 50) // Update every 50ms
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return next
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none`}
      style={{
        background: '#050505',
        transform: isExiting ? 'translateY(-120vh)' : 'translateY(0)',
        transition: 'transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >

      {/* Coder Vibe Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern - subtle */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 25s linear infinite'
          }}
        />
        
        {/* Subtle glow effects - white/gray */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gray-300/[0.015] rounded-full blur-3xl" />
        
        {/* Floating code-like lines */}
        <div className="absolute top-1/4 left-[10%] w-32 h-[1px] bg-white/10" style={{ animation: 'slideRight 8s ease-in-out infinite' }} />
        <div className="absolute top-1/3 right-[15%] w-24 h-[1px] bg-white/10" style={{ animation: 'slideLeft 10s ease-in-out infinite', animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-[20%] w-20 h-[1px] bg-white/10" style={{ animation: 'slideRight 12s ease-in-out infinite', animationDelay: '2s' }} />
        
        {/* Floating particles - white */}
        {isMounted && particles.slice(0, 15).map((particle, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Binary code effect - subtle */}
        <div className="absolute top-[15%] left-[5%] text-white/5 text-xs font-mono" style={{ animation: 'fadeInOut 4s ease-in-out infinite' }}>
          01001000 01100101 01101100 01101100 01101111
        </div>
        <div className="absolute bottom-[20%] right-[8%] text-white/5 text-xs font-mono" style={{ animation: 'fadeInOut 5s ease-in-out infinite', animationDelay: '1.5s' }}>
          01010111 01101111 01110010 01101100 01100100
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/10" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/10" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/10" />
        
        {/* Pulsing dots in corners */}
        <div className="absolute top-8 left-8 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        <div className="absolute top-8 right-8 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '1s' }} />
        <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '1.5s' }} />
      </div>

      {/* Main content */}
      <div 
        className="relative z-10 text-center font-mono"
        style={{
          transform: isExiting ? 'translateY(-40px)' : 'translateY(0)',
          transition: 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Terminal-style prefix */}
        <div className="mb-4 text-white/40 text-sm">
          <span className="mr-2">$</span>
          <span className="animate-pulse">initializing...</span>
        </div>
        
        <div className="relative inline-block">
          <div className="flex items-center justify-center gap-2">
            {/* Apple-style white gradient text with stronger blink */}
            <h1
              className="text-5xl md:text-7xl font-bold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #e0e0e0, #ffffff, #f5f5f5)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shine 3s linear infinite, strongBlink 0.8s ease-in-out infinite',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
              }}
            >
              {greetings[currentIndex]}
            </h1>
            
            {/* Blinking cursor on the right */}
            <span 
              className="inline-block w-[4px] h-12 md:h-16 bg-white"
              style={{
                animation: isExiting ? 'none' : 'cursorBlink 0.7s ease-in-out infinite',
              }}
            />
          </div>
          
          {/* Subtle white glowing effect */}
          <div 
            className="absolute inset-0 blur-2xl opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.3), transparent)',
              animation: 'pulse 2.5s ease-in-out infinite',
            }}
          />
        </div>
        
        {/* Loading progress bar - synced with actual progress */}
        <div className="mt-10 w-56 mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white/60 via-white to-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes strongBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes cursorBlink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(8px);
          }
        }
        
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
        
        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateX(200px);
          }
        }
        
        @keyframes slideLeft {
          0%, 100% {
            transform: translateX(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateX(-200px);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
      `}</style>
    </div>
  )
}

