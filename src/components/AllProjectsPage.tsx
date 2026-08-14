import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import FadeIn from './FadeIn'

const allProjects = [
  {
    num: '01',
    title: 'Nova Dashboard',
    category: 'Client',
    type: 'Web Development',
    year: '2026',
    description: 'A fully responsive analytics dashboard built for a SaaS startup. Features real-time data visualization, customizable widgets, and a clean dark-mode interface.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Firebase'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=85',
    ],
  },
  {
    num: '02',
    title: 'Bloom Brand Identity',
    category: 'Personal',
    type: 'Graphic Design',
    year: '2025',
    description: 'Complete brand identity for a sustainable skincare line. Includes logo system, color palette, typography, packaging mockups, and brand guidelines.',
    tools: ['Figma', 'Illustrator', 'Photoshop', 'After Effects'],
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=85',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=85',
    ],
  },
  {
    num: '03',
    title: 'Vertex Media Reel',
    category: 'Client',
    type: 'Video Editing',
    year: '2026',
    description: 'A high-energy promotional video reel for a tech conference. Combines event footage, motion graphics, color grading, and a custom soundtrack.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    images: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=85',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85',
      'https://images.unsplash.com/photo-1578022761797-b8636c3e5b6a?w=800&q=85',
    ],
  },
  {
    num: '04',
    title: 'Flux E-Commerce',
    category: 'Client',
    type: 'Web Development',
    year: '2025',
    description: 'A modern e-commerce platform with product filtering, cart management, payment integration, and an admin dashboard for inventory control.',
    tools: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85',
    ],
  },
  {
    num: '05',
    title: 'Prism Visual Kit',
    category: 'Personal',
    type: 'Graphic Design',
    year: '2025',
    description: 'A versatile visual identity system designed for a fictional creative agency. Explores geometric patterns, duotone palettes, and modular layout grids.',
    tools: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
    images: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=85',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=85',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85',
    ],
  },
  {
    num: '06',
    title: 'Pulse Promo',
    category: 'Client',
    type: 'Video Editing',
    year: '2026',
    description: 'A cinematic product launch video for a fitness wearable brand. Combines lifestyle footage, 3D product shots, kinetic typography, and sound design.',
    tools: ['Premiere Pro', 'After Effects', 'Cinema 4D', 'Audition'],
    images: [
      'https://images.unsplash.com/photo-1578022761797-b8636c3e5b6a?w=800&q=85',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=85',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85',
    ],
  },
]

function ProjectDetail({ project, index }: { project: (typeof allProjects)[0]; index: number }) {
  return (
    <FadeIn delay={index * 0.08} y={40} duration={0.7}>
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
                  <span className="text-[#D7E2EA]/40 text-xs sm:text-sm font-light">{project.year}</span>
                </div>
                <h3
                  className="text-[#D7E2EA] font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="text-[#D7E2EA]/70 font-light leading-relaxed mb-4 text-sm sm:text-base" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
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

          <div className="lg:w-[45%] flex gap-2 sm:gap-3">
            <div className="w-[40%] flex flex-col gap-2 sm:gap-3">
              <img
                src={project.images[0]}
                alt=""
                loading="lazy"
                className="w-full object-cover rounded-[30px] sm:rounded-[40px]"
                style={{ height: 'clamp(100px, 12vw, 160px)' }}
              />
              <img
                src={project.images[1]}
                alt=""
                loading="lazy"
                className="w-full object-cover rounded-[30px] sm:rounded-[40px]"
                style={{ height: 'clamp(120px, 16vw, 220px)' }}
              />
            </div>
            <div className="w-[60%]">
              <img
                src={project.images[2]}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function AllProjectsPage() {
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
          {allProjects.map((project, i) => (
            <ProjectDetail key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
