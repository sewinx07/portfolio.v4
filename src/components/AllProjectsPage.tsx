import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FadeIn from './FadeIn'
import type { Project } from '../store/projects'
import { useProjects } from '../store/projects'

function CardImages({ project }: { project: Project }) {
  const imgs = project.images

  if (imgs.length === 1) {
    return (
      <div className="lg:w-[45%]">
        <img
          src={imgs[0]}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px]"
        />
      </div>
    )
  }

  if (imgs.length === 2) {
    return (
      <div className="lg:w-[45%] flex gap-2 sm:gap-3">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="w-1/2 object-cover rounded-[30px] sm:rounded-[40px]"
            style={{ height: 'clamp(160px, 20vw, 280px)' }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="lg:w-[45%] flex gap-2 sm:gap-3">
      <div className="w-[40%] flex flex-col gap-2 sm:gap-3">
        <img
          src={imgs[0]}
          alt=""
          loading="lazy"
          className="w-full object-cover rounded-[30px] sm:rounded-[40px]"
          style={{ height: 'clamp(100px, 12vw, 160px)' }}
        />
        <img
          src={imgs[1]}
          alt=""
          loading="lazy"
          className="w-full object-cover rounded-[30px] sm:rounded-[40px]"
          style={{ height: 'clamp(120px, 16vw, 220px)' }}
        />
      </div>
      <div className="w-[60%]">
        <img
          src={imgs[2]}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px]"
        />
      </div>
    </div>
  )
}

export default function AllProjectsPage() {
  const projects = useProjects()

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 mb-8 sm:mb-10 md:mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
        </Link>

        <FadeIn y={40}>
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
          >
            All Projects
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p
            className="text-[#D7E2EA]/50 font-light mb-12 sm:mb-16"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)' }}
          >
            A curated collection of work across web development, graphic design, and video editing.
          </p>
        </FadeIn>

        <div>
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08} y={40} duration={0.7}>
              <Link to={`/projects/${project.id}`} className="block group">
                <div className="border-2 border-[#D7E2EA]/20 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-5 sm:p-7 md:p-9 mb-8 sm:mb-10 md:mb-12 hover:border-[#D7E2EA]/40 transition-colors duration-300">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="lg:w-[55%]">
                      <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <span
                          className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
                          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
                        >
                          {project.num}
                        </span>
                        <div className="pt-2">
                          <div className="flex flex-wrap gap-2 mb-1">
                            <span className="text-[#D7E2EA]/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                              {project.category}
                            </span>
                            <span className="text-[#B600A8] text-xs sm:text-sm font-medium uppercase tracking-wider">
                              {project.type}
                            </span>
                            <span className="text-[#D7E2EA]/40 text-xs sm:text-sm font-light">
                              {project.year}
                            </span>
                          </div>
                          <h3
                            className="text-[#D7E2EA] font-medium uppercase leading-tight group-hover:text-[#B600A8] transition-colors duration-300"
                            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
                          >
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p
                        className="text-[#D7E2EA]/70 font-light leading-relaxed mb-4 text-sm sm:text-base"
                        style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 border border-[#D7E2EA]/20 rounded-full px-4 py-1.5"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <CardImages project={project} />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}