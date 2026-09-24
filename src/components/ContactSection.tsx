import { useState, type FormEvent } from 'react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import { useContent } from '../store/content'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactSection() {
  const content = useContent()
  const c = content.contact
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const mailto = `mailto:${c.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailto, '_blank')
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-6 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {c.heading}
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-[#D7E2EA] font-light text-center mx-auto mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)', maxWidth: '520px' }}
        >
          {c.intro}
        </p>
      </FadeIn>

      <div className="max-w-2xl mx-auto">
        <FadeIn delay={0.25} y={20}>
          {submitted && (
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-[#B600A8] font-medium uppercase tracking-wider text-sm sm:text-base">
                {c.successMessage}
              </p>
            </div>
          )}
          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <input
                  type="text"
                  placeholder={c.placeholders.name}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full bg-transparent border-2 rounded-full px-6 py-3.5 sm:py-4 text-[#D7E2EA] text-sm sm:text-base font-light placeholder-[#D7E2EA]/40 outline-none transition-colors duration-200 ${errors.name ? 'border-red-500/60 focus:border-red-500' : 'border-[#D7E2EA]/20 focus:border-[#B600A8]/50'}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 px-6">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder={c.placeholders.email}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full bg-transparent border-2 rounded-full px-6 py-3.5 sm:py-4 text-[#D7E2EA] text-sm sm:text-base font-light placeholder-[#D7E2EA]/40 outline-none transition-colors duration-200 ${errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-[#D7E2EA]/20 focus:border-[#B600A8]/50'}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 px-6">{errors.email}</p>}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder={c.placeholders.subject}
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className={`w-full bg-transparent border-2 rounded-full px-6 py-3.5 sm:py-4 text-[#D7E2EA] text-sm sm:text-base font-light placeholder-[#D7E2EA]/40 outline-none transition-colors duration-200 ${errors.subject ? 'border-red-500/60 focus:border-red-500' : 'border-[#D7E2EA]/20 focus:border-[#B600A8]/50'}`}
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1 px-6">{errors.subject}</p>}
            </div>
            <div>
              <textarea
                rows={5}
                placeholder={c.placeholders.message}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                className={`w-full bg-transparent border-2 rounded-[30px] px-6 py-4 sm:py-5 text-[#D7E2EA] text-sm sm:text-base font-light placeholder-[#D7E2EA]/40 outline-none transition-colors duration-200 resize-none ${errors.message ? 'border-red-500/60 focus:border-red-500' : 'border-[#D7E2EA]/20 focus:border-[#B600A8]/50'}`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1 px-6">{errors.message}</p>}
            </div>
            <div className="flex justify-center pt-2">
              <button type="submit">
                <ContactButton />
              </button>
            </div>
          </form>
        </FadeIn>
      </div>

      <FadeIn delay={0.4} y={20} className="mt-20 sm:mt-24">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16">
          <div className="text-center">
            <p className="text-[#D7E2EA]/40 text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">Email</p>
            <p className="text-[#D7E2EA] font-light text-sm sm:text-base">{c.email}</p>
          </div>
          <div className="text-center">
            <p className="text-[#D7E2EA]/40 text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">Location</p>
            <p className="text-[#D7E2EA] font-light text-sm sm:text-base">{c.location}</p>
          </div>
          <div className="text-center">
            <p className="text-[#D7E2EA]/40 text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">Social</p>
            <div className="flex gap-4 justify-center">
              {c.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="text-[#D7E2EA] font-light text-sm sm:text-base hover:text-[#B600A8] transition-colors duration-200"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
