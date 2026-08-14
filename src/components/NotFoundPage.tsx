import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center px-5">
      <h1
        className="hero-heading font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: 'clamp(5rem, 20vw, 12rem)' }}
      >
        404
      </h1>
      <p className="text-[#D7E2EA]/60 font-light text-center mt-4 mb-10" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
        Page not found
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
      </Link>
    </div>
  )
}
