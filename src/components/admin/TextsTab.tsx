import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useContent, updateSection, resetSection, newEntityId } from '../../store/content'
import { Field, GroupCard, btnGhost, inputCls } from './fields'

export default function TextsTab() {
  const content = useContent()
  const [saved, setSaved] = useState(false)

  const save = (key: 'hero' | 'about' | 'work' | 'global', patch: unknown) => {
    updateSection(key, patch)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const reset = (key: 'hero' | 'about' | 'work' | 'global') => {
    if (window.confirm('Reset this section to its default content?')) resetSection(key)
  }

  const navLinks = content.hero.navLinks

  return (
    <div className="space-y-8">
      <GroupCard
        title="Hero"
        description="The first screen of your homepage."
        onReset={() => reset('hero')}
      >
        <div className="space-y-5">
          <Field
            label="Heading"
            value={content.hero.heading}
            onChange={(heading) => save('hero', { heading })}
          />
          <Field
            label="Subtitle"
            textarea
            value={content.hero.subtitle}
            onChange={(subtitle) => save('hero', { subtitle })}
          />
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/50 mb-2">
              Navigation links
            </label>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <div key={link.id} className="flex gap-3">
                  <input
                    className={inputCls}
                    value={link.label}
                    placeholder="Label"
                    onChange={(e) =>
                      save('hero', {
                        navLinks: navLinks.map((l) => (l.id === link.id ? { ...l, label: e.target.value } : l)),
                      })
                    }
                  />
                  <input
                    className={inputCls}
                    value={link.href}
                    placeholder="#contact"
                    onChange={(e) =>
                      save('hero', {
                        navLinks: navLinks.map((l) => (l.id === link.id ? { ...l, href: e.target.value } : l)),
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      save('hero', { navLinks: navLinks.filter((l) => l.id !== link.id) })
                    }
                    className="border border-[#D7E2EA]/20 rounded-2xl px-3 text-[#D7E2EA]/40 hover:text-[#ff5252] hover:border-[#ff5252]/50 transition-colors duration-200 flex-shrink-0"
                    aria-label="Remove nav link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => save('hero', { navLinks: [...navLinks, { id: newEntityId('nav'), label: 'New', href: '#contact' }] })}
              className="mt-3 inline-flex items-center gap-2 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors duration-200 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add link
            </button>
          </div>
        </div>
      </GroupCard>

      <GroupCard title="About" description="The about section texts." onReset={() => reset('about')}>
        <div className="space-y-5">
          <Field label="Heading" value={content.about.heading} onChange={(heading) => save('about', { heading })} />
          <Field
            label="Paragraph"
            textarea
            rows={8}
            value={content.about.paragraph}
            onChange={(paragraph) => save('about', { paragraph })}
          />
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/50 mb-2">
              Decorative images (4 URLs)
            </label>
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                className={`${inputCls} mb-3`}
                value={content.about.images[i] ?? ''}
                placeholder={`Image ${i + 1} URL`}
                onChange={(e) => {
                  const images = [...content.about.images]
                  images[i] = e.target.value
                  save('about', { images })
                }}
              />
            ))}
          </div>
        </div>
      </GroupCard>

      <GroupCard title="Works" description="The animated WORK showcase section." onReset={() => reset('work')}>
        <div className="space-y-5">
          <Field label="Animated title" value={content.work.title} onChange={(title) => save('work', { title })} />
          <Field
            label="View all label"
            value={content.work.viewAllLabel}
            onChange={(viewAllLabel) => save('work', { viewAllLabel })}
          />
        </div>
      </GroupCard>

      <GroupCard title="Global" description="Buttons shared across the site." onReset={() => reset('global')}>
        <Field
          label="Contact button label"
          value={content.global.contactButtonLabel}
          onChange={(contactButtonLabel) => save('global', { contactButtonLabel })}
        />
      </GroupCard>

      <div className="flex items-center gap-3">
        <button type="button" className={btnGhost} onClick={() => window.location.reload()}>
          Preview site
        </button>
        {saved && <span className="text-sm text-[#B600A8]">Changes saved</span>}
      </div>
    </div>
  )
}