import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import FadeIn from './FadeIn'
import { getProject } from '../store/projects'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProject(id) : undefined

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}
          >
            Project not found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
          </Link>
        </div>
      </div>
    )
  }

  const heroImage = project.images[0]
  const gallery = project.images.slice(1)

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium uppercase tracking-wider text-sm">All Projects</span>
          </Link>
          <Link
            to="/"
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 font-medium uppercase tracking-wider text-sm"
          >
            Home
          </Link>
        </div>

        <FadeIn y={40}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-4">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              #{project.num}
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="text-[#D7E2EA]/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[#B600A8] text-xs sm:text-sm font-medium uppercase tracking-wider">
                {project.type}
              </span>
              <span className="text-[#D7E2EA]/40 text-xs sm:text-sm font-light">{project.year}</span>
            </div>
          </div>
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}
          >
            {project.title}
          </h1>
        </FadeIn>

        {project.description && (
          <FadeIn delay={0.1} y={20}>
            <p
              className="text-[#D7E2EA]/70 font-light leading-relaxed mb-6 max-w-3xl"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
            >
              {project.description}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.15} y={20}>
          <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 border border-[#D7E2EA]/20 rounded-full px-4 py-1.5"
              >
                {tool}
              </span>
            ))}
            {project.site && (
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#B600A8] border border-[#B600A8]/40 rounded-full px-4 py-1.5 hover:bg-[#B600A8]/10 transition-colors duration-200"
              >
                Visit Project
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </FadeIn>

        {heroImage && (
          <FadeIn delay={0.2} y={40}>
            <div className="border-2 border-[#D7E2EA]/20 rounded-[40px] sm:rounded-[50px] overflow-hidden mb-8 sm:mb-10">
              <img
                src={heroImage}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </FadeIn>
        )}

        {gallery.length > 0 && (
          <FadeIn delay={0.25} y={40}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className="border-2 border-[#D7E2EA]/20 rounded-[30px] sm:rounded-[40px] overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`${project.title} ${i + 2}`}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}