import { useEffect, useRef, useState, useCallback } from 'react'

const row1Images = [
  'src/assets/projects/1.png',
  'src/assets/projects/2.png',
  'src/assets/projects/3.png',
  'src/assets/projects/4.png',
  'src/assets/projects/5.png',
  'src/assets/projects/6.png',
  'src/assets/projects/7.png',
  'src/assets/projects/8.png',
  'src/assets/projects/9.png',
  'src/assets/projects/10.png',
  'src/assets/projects/11.png',
]

const row2Images = [
  'src/assets/projects/11.png',
  'src/assets/projects/10.png',
  'src/assets/projects/9.png',
  'src/assets/projects/8.png',
  'src/assets/projects/7.png',
  'src/assets/projects/6.png',
  'src/assets/projects/5.png',
  'src/assets/projects/4.png',
  'src/assets/projects/3.png',
  'src/assets/projects/2.png',
]

function MarqueeRow({
  images,
  direction,
  speed = 0.15,
}: {
  images: string[]
  direction: 'right' | 'left'
  speed?: number
}) {
  const [offset, setOffset] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastScrollRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const scrollDelta = window.scrollY - lastScrollRef.current
      lastScrollRef.current = window.scrollY
      setOffset(prev => prev + scrollDelta * speed)
      rafRef.current = null
    })
  }, [speed])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const tripled = [...images, ...images, ...images]
  const x = direction === 'right' ? offset : -offset

  return (
    <div className="flex gap-3 w-max" style={{ transform: `translateX(${x}px)`, willChange: 'transform' }}>
      {tripled.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading="lazy"
          className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
        />
      ))}
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={row1Images} direction="right" speed={0.18} />
        <MarqueeRow images={row2Images} direction="left" speed={0.12} />
      </div>
    </section>
  )
}
