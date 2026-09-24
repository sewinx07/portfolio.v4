import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LayoutDashboard, FolderKanban, Type, Mail, List, Settings, Lock } from 'lucide-react'
import FadeIn from './FadeIn'
import { useProjects } from '../store/projects'
import { useContent, isAdmin, setAdmin, checkPassword } from '../store/content'
import ProjectManager from './admin/ProjectManager'
import OverviewTab from './admin/OverviewTab'
import TextsTab from './admin/TextsTab'
import ContactTab from './admin/ContactTab'
import ListsTab from './admin/ListsTab'
import SettingsTab from './admin/SettingsTab'
import { inputCls } from './admin/fields'

type TabKey = 'overview' | 'projects' | 'texts' | 'contact' | 'lists' | 'settings'

const tabs: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Sections', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'texts', label: 'Texts', icon: Type },
  { key: 'contact', label: 'Contact', icon: Mail },
  { key: 'lists', label: 'Services & Pricing', icon: List },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminPage() {
  const projects = useProjects()
  const content = useContent()
  const [authed, setAuthed] = useState(isAdmin)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<TabKey>('overview')

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkPassword(password)) {
      setAdmin(true)
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('Wrong password.')
    }
  }

  const logout = () => {
    setAdmin(false)
    setAuthed(false)
    setPassword('')
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center px-5">
        <FadeIn y={20}>
          <div className="border-2 border-[#D7E2EA]/20 rounded-[40px] p-8 sm:p-12 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#D7E2EA]/60" />
              <span className="text-[#D7E2EA]/60 font-medium uppercase tracking-wider text-sm">
                Admin access
              </span>
            </div>
            <form onSubmit={login}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className={`${inputCls} mb-4`}
              />
              {loginError && <p className="text-sm text-[#ff5252] mb-4">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-[#B600A8] text-white rounded-2xl px-8 py-3 font-medium hover:bg-[#D000C0] transition-colors duration-200"
              >
                Enter
              </button>
            </form>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-6 text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to site
            </Link>
          </div>
        </FadeIn>
      </div>
    )
  }

  const activeTabs = tabs

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium uppercase tracking-wider text-sm">Back to site</span>
          </Link>
          <button
            onClick={logout}
            className="text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200 font-medium uppercase tracking-wider text-sm"
          >
            Log out
          </button>
        </div>

        <FadeIn y={40}>
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight mb-3"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}
          >
            Admin
          </h1>
          <p className="text-[#D7E2EA]/50 font-light mb-8" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)' }}>
            Full control panel — {projects.length} projects ·{' '}
            {Object.values(content.sectionIds).filter(Boolean).length}/{Object.keys(content.sectionIds).length}{' '}
            sections enabled.
          </p>
        </FadeIn>

        <div className="flex flex-wrap gap-2 mb-10">
          {activeTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                tab === t.key
                  ? 'bg-[#B600A8] text-white'
                  : 'border border-[#D7E2EA]/20 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/50'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <FadeIn key={tab} y={20}>
          {tab === 'overview' && <OverviewTab />}
          {tab === 'projects' && <ProjectManager />}
          {tab === 'texts' && <TextsTab />}
          {tab === 'contact' && <ContactTab />}
          {tab === 'lists' && <ListsTab />}
          {tab === 'settings' && <SettingsTab />}
        </FadeIn>
      </div>
    </div>
  )
}