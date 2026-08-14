import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      <div className="flex flex-col items-center justify-center min-h-screen gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <div style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
            <AnimatedText
              text="With over six years of experience across web development, graphic design, and video editing, i craft digital experiences that captivate and convert. From building responsive websites and designing brand identities to producing polished video content, i help businesses tell their story with impact and precision. Let's create something extraordinary together!"
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            />
          </div>

          <button onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }} className="cursor-pointer">
            <ContactButton />
          </button>
        </div>
      </div>
    </section>
  )
}
