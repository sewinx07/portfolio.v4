import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function AnimatedChar({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: import('framer-motion').MotionValue<number>
}) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.2, 0.2 + ((index + 1) / total) * 0.8]
  )

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={`relative ${className || ''}`}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          index={i}
          total={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  )
}
