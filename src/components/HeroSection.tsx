import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'
import { useContent } from '../store/content'

const faceImage = (import.meta.glob('../assets/face.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>)['../assets/face.png']

export default function HeroSection() {
  const content = useContent()
  const navLinks = content.hero.navLinks

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex flex-col overflow-x-clip">
      <FadeIn as="nav" delay={0} y={-20} className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            {content.hero.heading}
          </h1>
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {content.hero.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <button onClick={() => scrollTo('#contact')} className="cursor-pointer">
            <ContactButton />
          </button>
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet padding={150} strength={3} rotateStrength={25}>
          <div className="relative">
            <img
              src={faceImage}
              alt="Taha portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] animate-[float_4s_ease-in-out_infinite]"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(182, 0, 168, 0.15) 0%, transparent 60%)',
                filter: 'blur(30px)',
                transform: 'translateY(20%)',
              }}
            />
          </div>
        </Magnet>
      </FadeIn>
    </section>
  )
}
