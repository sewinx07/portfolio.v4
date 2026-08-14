import FadeIn from './FadeIn'

const services = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Building fast, responsive, and scalable websites and web applications using modern frameworks and clean code that performs across all devices.',
  },
  {
    num: '02',
    name: 'UI/UX Design',
    desc: 'Designing intuitive interfaces and seamless user experiences that balance aesthetics with functionality, backed by research and user testing.',
  },
  {
    num: '03',
    name: 'Branding & Identity',
    desc: 'Crafting cohesive visual identities — from logos and color systems to typography and brand guidelines — that leave a lasting impression.',
  },
  {
    num: '04',
    name: 'Video Editing',
    desc: 'Producing polished video content with professional cuts, color grading, sound design, and motion graphics tailored for any platform.',
  },
  {
    num: '05',
    name: 'Motion Graphics',
    desc: 'Creating dynamic animated visuals, kinetic typography, and explainer videos that bring brands and messages to life.',
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((item, i) => (
          <FadeIn
            key={item.num}
            delay={i * 0.1}
            y={30}
            className="flex gap-4 sm:gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
            style={{
              borderBottom: i < services.length - 1
                ? '1px solid rgba(12, 12, 12, 0.15)'
                : undefined,
            }}
          >
            <span
              className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {item.num}
            </span>
            <div className="flex flex-col justify-center">
              <h3
                className="font-medium uppercase text-[#0C0C0C] leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {item.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl opacity-60 text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
