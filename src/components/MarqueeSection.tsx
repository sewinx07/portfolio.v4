import { useEffect, useRef, useState, useCallback } from 'react'

const projectImages = import.meta.glob('../assets/projects/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byName: Record<string, string> = {}
for (const [path, url] of Object.entries(projectImages)) {
  byName[path.split('/').pop() as string] = url
}

const row1Images = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',
  '11.png',
].map((n) => byName[n])

const row2Images = [
  '11.png',
  '10.png',
  '9.png',
  '8.png',
  '7.png',
  '6.png',
  '5.png',
  '4.png',
  '3.png',
  '2.png',
].map((n) => byName[n])

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
