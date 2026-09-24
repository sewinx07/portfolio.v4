import { useSyncExternalStore } from 'react'

export type NavLink = { id: string; label: string; href: string }
export type Social = { id: string; label: string; url: string }
export type ServiceItem = { id: string; name: string; description: string }
export type PlanItem = {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular: boolean
}

export type SiteContent = {
  sectionIds: {
    hero: boolean
    marquee: boolean
    about: boolean
    services: boolean
    price: boolean
    work: boolean
    contact: boolean
  }
  siteTitle: string
  hero: {
    heading: string
    subtitle: string
    navLinks: NavLink[]
  }
  about: {
    heading: string
    paragraph: string
    images: string[]
  }
  work: {
    title: string
    viewAllLabel: string
  }
  services: {
    heading: string
    items: ServiceItem[]
  }
  plans: {
    heading: string
    buttonLabel: string
    items: PlanItem[]
  }
  contact: {
    heading: string
    intro: string
    email: string
    location: string
    successMessage: string
    placeholders: { name: string; email: string; subject: string; message: string }
    socials: Social[]
  }
  global: {
    contactButtonLabel: string
  }
}

export const sectionDefinitions: { key: keyof SiteContent['sectionIds']; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'marquee', label: 'Marquee' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'price', label: 'Pricing' },
  { key: 'work', label: 'Works' },
  { key: 'contact', label: 'Contact' },
]

export let idCounter = 0
export function newEntityId(prefix = 'id'): string {
  idCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`
}

const SL = (id: string, label: string, url: string): Social => ({ id, label, url })
const NL = (id: string, label: string, href: string): NavLink => ({ id, label, href })
const SV = (id: string, name: string, description: string): ServiceItem => ({ id, name, description })
const PL = (
  id: string,
  name: string,
  price: string,
  description: string,
  features: string[],
  popular = false
): PlanItem => ({ id, name, price, description, features, popular })

export const defaultContent: SiteContent = {
  sectionIds: {
    hero: true,
    marquee: true,
    about: true,
    services: true,
    price: true,
    work: true,
    contact: true,
  },
  siteTitle: 'SEWINX | Design',
  hero: {
    heading: "Hi, i'm taha",
    subtitle:
      'a engineering student, web developer, graphic designer & video editor driven by crafting striking digital experiences',
    navLinks: [
      NL('nav-1', 'About', '#about'),
      NL('nav-2', 'Price', '#price'),
      NL('nav-3', 'Projects', '#projects'),
      NL('nav-4', 'Contact', '#contact'),
    ],
  },
  about: {
    heading: 'About me',
    paragraph:
      "With over six years of experience across web development, graphic design, and video editing, i craft digital experiences that captivate and convert. From building responsive websites and designing brand identities to producing polished video content, i help businesses tell their story with impact and precision. Let's create something extraordinary together!",
    images: [
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    ],
  },
  work: {
    title: 'WORK',
    viewAllLabel: 'View All Projects',
  },
  services: {
    heading: 'Services',
    items: [
      SV(
        'svc-1',
        'Web Development',
        'Building fast, responsive, and scalable websites and web applications using modern frameworks and clean code that performs across all devices.'
      ),
      SV(
        'svc-2',
        'UI/UX Design',
        'Designing intuitive interfaces and seamless user experiences that balance aesthetics with functionality, backed by research and user testing.'
      ),
      SV(
        'svc-3',
        'Branding & Identity',
        'Crafting cohesive visual identities — from logos and color systems to typography and brand guidelines — that leave a lasting impression.'
      ),
      SV(
        'svc-4',
        'Video Editing',
        'Producing polished video content with professional cuts, color grading, sound design, and motion graphics tailored for any platform.'
      ),
      SV(
        'svc-5',
        'Motion Graphics',
        'Creating dynamic animated visuals, kinetic typography, and explainer videos that bring brands and messages to life.'
      ),
    ],
  },
  plans: {
    heading: 'Price',
    buttonLabel: 'Get Started',
    items: [
      PL(
        'plan-1',
        'Starter',
        '',
        'Perfect for small projects and personal brands looking to make an impact.',
        ['Single-page website or brand kit', 'Basic UI/UX design', '1 revision round', 'PNG/SVG/PDF delivery', '3 business day turnaround']
      ),
      PL(
        'plan-2',
        'Professional',
        '',
        'Ideal for businesses and agencies needing a full digital presence.',
        [
          'Multi-page website or full brand identity',
          'Advanced UI/UX & responsive design',
          '3 revision rounds',
          'Source files & assets included',
          '30-second video edit or motion reel',
          '5 business day turnaround',
        ],
        true
      ),
      PL(
        'plan-3',
        'Enterprise',
        '',
        'Comprehensive solution for large-scale projects and ongoing partnerships.',
        [
          'Custom web app or complete brand system',
          'Premium UI/UX with user testing',
          'Unlimited revisions',
          'Full video production & motion graphics',
          'SEO & performance optimization',
          'Priority support',
          'Custom timeline',
        ]
      ),
    ],
  },
  contact: {
    heading: 'Contact',
    intro: "Have a project in mind? Let's bring your vision to life. Reach out and I'll get back to you within 24 hours.",
    email: 'Tahagmir13@gmail.com',
    location: 'Gabes, Tunisia',
    successMessage: 'Message sent! Your email client has been opened.',
    placeholders: { name: 'Your Name', email: 'Your Email', subject: 'Subject', message: 'Your Message' },
    socials: [
      SL('soc-1', 'Instagram', 'https://www.instagram.com/sewinx.zip/'),
      SL('soc-2', 'GitHub', 'https://github.com/sewinx07'),
      SL('soc-3', 'LinkedIn', 'https://www.linkedin.com/in/taha-gmir-018026218/'),
    ],
  },
  global: {
    contactButtonLabel: 'Contact Me',
  },
}

const CONTENT_STORAGE_KEY = 'sewinx.content.v1'
const PASSWORD_STORAGE_KEY = 'sewinx.admin-password'
const DEFAULT_ADMIN_PASSWORD = 'sewinx-admin'

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

export function deepMerge<T>(base: T, patch: unknown): T {
  if (!isObj(base) || !isObj(patch)) return (patch as T) ?? base
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(patch)) {
    const b = (base as Record<string, unknown>)[key]
    const p = patch[key]
    out[key] = isObj(b) && isObj(p) ? deepMerge(b, p) : p === undefined ? b : p
  }
  return out as T
}

type Patch = { [K in keyof SiteContent]?: unknown }

function loadPatch(): Patch {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Patch) : {}
  } catch {
    return {}
  }
}

let patchState: Patch = loadPatch()

function computeContent(): SiteContent {
  const merged: Record<string, unknown> = {}
  for (const key of Object.keys(defaultContent) as (keyof SiteContent)[]) {
    merged[key] = deepMerge(defaultContent[key], patchState[key])
  }
  return merged as unknown as SiteContent
}

let content: SiteContent = computeContent()

const contentListeners = new Set<() => void>()

function persistContent() {
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(patchState))
  } catch {
    // storage full — keep in memory for this session
  }
}

function emitContent() {
  content = computeContent()
  persistContent()
  contentListeners.forEach((l) => l())
}

function subscribeContent(cb: () => void) {
  contentListeners.add(cb)
  return () => {
    contentListeners.delete(cb)
  }
}

export function getContent(): SiteContent {
  return content
}

export function useContent(): SiteContent {
  return useSyncExternalStore(subscribeContent, getContent, getContent)
}

export function updateSection<K extends keyof SiteContent>(key: K, patch: unknown) {
  const base = (patchState[key] as Record<string, unknown> | undefined) ??
    (defaultContent[key] as unknown as Record<string, unknown> | undefined) ??
    patch
  patchState = {
    ...patchState,
    [key]: isObj(base) ? deepMerge(base, patch) : patch,
  }
  emitContent()
}

export function resetSection<K extends keyof SiteContent>(key: K) {
  const next = { ...patchState }
  delete next[key]
  patchState = next
  emitContent()
}

export function resetAllContent() {
  patchState = {}
  emitContent()
}

export function getAdminPassword(): string {
  if (typeof localStorage === 'undefined') return DEFAULT_ADMIN_PASSWORD
  try {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) ?? DEFAULT_ADMIN_PASSWORD
  } catch {
    return DEFAULT_ADMIN_PASSWORD
  }
}

export function setAdminPassword(password: string) {
  localStorage.setItem(PASSWORD_STORAGE_KEY, password)
}

export function checkPassword(password: string): boolean {
  return password === getAdminPassword()
}

const ADMIN_SESSION_KEY = 'sewinx.admin'

export function isAdmin(): boolean {
  return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function setAdmin(value: boolean) {
  if (value) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}