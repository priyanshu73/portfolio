"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface MousePosition {
  x: number
  y: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current theme colors
      const isDark = document.documentElement.classList.contains("dark")
      const particleColor = isDark ? "rgba(255, 255, 255," : "rgba(0, 0, 0,"
      const lineColor = isDark ? "rgba(100, 149, 237," : "rgba(59, 130, 246,"

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - attract particles to mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.02
          particle.vy += (dy / distance) * force * 0.02
        }

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particleColor}${particle.opacity})`
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = (1 - distance / 120) * 0.2
            ctx.strokeStyle = `${lineColor}${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw floating geometric shapes
      const time = Date.now() * 0.001

      // Floating circles
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3) + Math.sin(time + i) * 50
        const y = canvas.height * 0.5 + Math.cos(time + i * 0.7) * 40
        const radius = 30 + Math.sin(time + i * 2) * 10

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `${lineColor}0.1)`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Floating rectangles
      for (let i = 0; i < 2; i++) {
        ctx.save()
        const x = canvas.width * (0.3 + i * 0.4) + Math.cos(time + i) * 60
        const y = canvas.height * 0.6 + Math.sin(time + i * 0.5) * 50
        ctx.translate(x, y)
        ctx.rotate(time * 0.5 + i)
        ctx.strokeStyle = `${lineColor}0.08)`
        ctx.lineWidth = 2
        ctx.strokeRect(-25, -25, 50, 50)
        ctx.restore()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

