import FadeIn from './FadeIn'

const plans = [
  {
    name: 'Starter',
    price: '',
    desc: 'Perfect for small projects and personal brands looking to make an impact.',
    features: [
      'Single-page website or brand kit',
      'Basic UI/UX design',
      '1 revision round',
      'PNG/SVG/PDF delivery',
      '3 business day turnaround',
    ],
  },
  {
    name: 'Professional',
    price: '',
    desc: 'Ideal for businesses and agencies needing a full digital presence.',
    features: [
      'Multi-page website or full brand identity',
      'Advanced UI/UX & responsive design',
      '3 revision rounds',
      'Source files & assets included',
      '30-second video edit or motion reel',
      '5 business day turnaround',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '',
    desc: 'Comprehensive solution for large-scale projects and ongoing partnerships.',
    features: [
      'Custom web app or complete brand system',
      'Premium UI/UX with user testing',
      'Unlimited revisions',
      'Full video production & motion graphics',
      'SEO & performance optimization',
      'Priority support',
      'Custom timeline',
    ],
  },
]

export default function PriceSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="price" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-24 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Price
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1} y={30}>
            <div
              className={`rounded-[30px] sm:rounded-[40px] border-2 p-6 sm:p-8 flex flex-col h-full ${
                plan.popular
                  ? 'border-[#B600A8] bg-[#B600A8]/5'
                  : 'border-[#D7E2EA]/20 bg-[#0C0C0C]'
              }`}
            >
              {plan.popular && (
                <span className="text-[#B600A8] text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">
                  Most Popular
                </span>
              )}
              <h3 className="text-[#D7E2EA] font-medium uppercase text-xl sm:text-2xl md:text-3xl mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="hero-heading font-black leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                >
                  {plan.price}
                </span>
              </div>
              <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base leading-relaxed mb-6">
                {plan.desc}
              </p>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-[#D7E2EA] text-sm sm:text-base font-light">
                    <span className="text-[#B600A8] mt-0.5 flex-shrink-0">&#10003;</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full py-3.5 sm:py-4 rounded-full font-medium uppercase tracking-widest text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'text-white cursor-pointer'
                    : 'border-2 border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 cursor-pointer'
                }`}
                style={
                  plan.popular
                    ? {
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      }
                    : undefined
                }
              >
                Get Started
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
