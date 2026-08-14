import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  rotateStrength?: number
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  rotateStrength = 20,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
    transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
  })

  const rafRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current
      if (!el) { rafRef.current = null; return }

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const halfW = rect.width / 2 + padding
      const halfH = rect.height / 2 + padding

      if (Math.abs(distX) < halfW && Math.abs(distY) < halfH) {
        const tx = distX / strength
        const ty = distY / strength
        const rx = -(distY / rotateStrength)
        const ry = distX / rotateStrength

        setStyle({
          transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0px)`,
          transition: 'transform 0.3s ease-out',
        })
      }
      rafRef.current = null
    })
  }, [padding, strength, rotateStrength])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
      transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    const el = ref.current
    if (el) el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (el) el.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}
