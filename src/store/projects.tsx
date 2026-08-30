import { useSyncExternalStore } from 'react'

export type Project = {
  id: string
  num: string
  title: string
  category: string
  type: string
  year: string
  description: string
  tools: string[]
  images: string[]
  site?: string
}

export const ADMIN_PASSWORD = 'sewinx-admin'

const STORAGE_KEY = 'sewinx.projects.v1'
const ADMIN_SESSION_KEY = 'sewinx.admin'

const images = import.meta.glob('../assets/projects/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imageMap: Record<string, string> = {}
for (const [path, url] of Object.entries(images)) {
  const name = path.split('/').pop() as string
  imageMap[name] = url
}

const D = (
  id: string,
  num: string,
  title: string,
  category: string,
  type: string,
  year: string,
  description: string,
  tools: string[],
  file: string,
  site = 'https://github.com/sewinx07'
): Project => ({
  id,
  num,
  title,
  category,
  type,
  year,
  description,
  tools,
  images: [imageMap[file]],
  site,
})

export const defaultProjects: Project[] = [
  D(
    'default-01',
    '01',
    'Nova Dashboard',
    'Client',
    'Web Development',
    '2026',
    'A fully responsive analytics dashboard built for a SaaS startup. Features real-time data visualization, customizable widgets, and a clean dark-mode interface.',
    ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Firebase'],
    '1.png'
  ),
  D(
    'default-02',
    '02',
    'Bloom Brand Identity',
    'Personal',
    'Graphic Design',
    '2025',
    'Complete brand identity for a sustainable skincare line. Includes logo system, color palette, typography, packaging mockups, and brand guidelines.',
    ['Figma', 'Illustrator', 'Photoshop', 'After Effects'],
    '2.png'
  ),
  D(
    'default-03',
    '03',
    'Vertex Media Reel',
    'Client',
    'Video Editing',
    '2026',
    'A high-energy promotional video reel for a tech conference. Combines event footage, motion graphics, color grading, and a custom soundtrack.',
    ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    '3.png'
  ),
  D(
    'default-04',
    '04',
    'Flux E-Commerce',
    'Client',
    'Web Development',
    '2025',
    'A modern e-commerce platform with product filtering, cart management, payment integration, and an admin dashboard for inventory control.',
    ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    '4.png'
  ),
  D(
    'default-05',
    '05',
    'Prism Visual Kit',
    'Personal',
    'Graphic Design',
    '2025',
    'A versatile visual identity system designed for a fictional creative agency. Explores geometric patterns, duotone palettes, and modular layout grids.',
    ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
    '5.png'
  ),
  D(
    'default-06',
    '06',
    'Pulse Promo',
    'Client',
    'Video Editing',
    '2026',
    'A cinematic product launch video for a fitness wearable brand. Combines lifestyle footage, 3D product shots, kinetic typography, and sound design.',
    ['Premiere Pro', 'After Effects', 'Cinema 4D', 'Audition'],
    '6.png'
  ),
  D(
    'default-07',
    '07',
    'Neon Brand System',
    'Client',
    'Graphic Design',
    '2026',
    'A modular brand system for a creative tech studio, built around a neon-accented palette, flexible lockups, and scalable print and digital guidelines.',
    ['Figma', 'Illustrator', 'Photoshop'],
    '7.png'
  ),
  D(
    'default-08',
    '08',
    'Orbit App Design',
    'Personal',
    'Web Development',
    '2025',
    'Concept UX/UI design and front-end prototype for a satellite mission-tracking app, exploring glassmorphism surfaces and data-dense screens.',
    ['Figma', 'React', 'TypeScript', 'Tailwind CSS'],
    '8.png'
  ),
  D(
    'default-09',
    '09',
    'Drift Motion Reel',
    'Client',
    'Video Editing',
    '2026',
    'A dreamy motion reel for an automotive brand celebrating open-road driving — slow drifts, cinematic color grading, and a layered ambient soundscape.',
    ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    '9.png'
  ),
  D(
    'default-10',
    '10',
    'Echo Web Platform',
    'Client',
    'Web Development',
    '2025',
    'A full-scale web platform for a podcast network with episode management, SEO-ready pages, audience analytics, and a modern headless CMS.',
    ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    '10.png'
  ),
  D(
    'default-11',
    '11',
    'Vibe Social Campaign',
    'Personal',
    'Graphic Design',
    '2026',
    'A social-first campaign kit of bold typographic posters, reel covers, and sticker systems for a limited streetwear drop.',
    ['Photoshop', 'Illustrator', 'After Effects'],
    '11.png'
  ),
]

type StoredState = {
  edits: Record<string, Project>
  deleted: string[]
}

function emptyState(): StoredState {
  return { edits: {}, deleted: [] }
}

function loadState(): StoredState {
  if (typeof localStorage === 'undefined') return emptyState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    return {
      edits: parsed?.edits ?? {},
      deleted: Array.isArray(parsed?.deleted) ? parsed.deleted : [],
    }
  } catch {
    return emptyState()
  }
}

let state: StoredState = loadState()

function computeProjects(): Project[] {
  const base = defaultProjects
    .filter((p) => !state.deleted.includes(p.id))
    .map((p) => state.edits[p.id] ?? p)
  const added = Object.values(state.edits).filter(
    (p) => !defaultProjects.some((d) => d.id === p.id)
  )
  return [...base, ...added]
}

let projects: Project[] = computeProjects()

const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage full or unavailable — edits stay in memory for this session
  }
}

function emit() {
  projects = computeProjects()
  persist()
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function getProjects(): Project[] {
  return projects
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function nextNum(): string {
  return String(projects.length + 1).padStart(2, '0')
}

export function newProjectId(): string {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function saveProject(project: Project) {
  state = {
    ...state,
    edits: { ...state.edits, [project.id]: { ...project } },
    deleted: state.deleted.filter((id) => id !== project.id),
  }
  emit()
}

export function deleteProject(id: string) {
  const edits = { ...state.edits }
  delete edits[id]
  const isDefault = defaultProjects.some((p) => p.id === id)
  state = {
    ...state,
    edits,
    deleted: isDefault
      ? [...new Set([...state.deleted, id])]
      : state.deleted,
  }
  emit()
}

export function useProjects(): Project[] {
  return useSyncExternalStore(subscribe, getProjects, getProjects)
}

export const isAdmin = () =>
  typeof sessionStorage !== 'undefined' && sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'

export const setAdmin = (value: boolean) => {
  if (value) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

export const checkPassword = (password: string) => password === ADMIN_PASSWORD

export function fileToDataUrl(
  file: File,
  maxDim = 1600,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load image'))
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas not supported'))
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}