import { Plus, Trash2 } from 'lucide-react'
import { useContent, updateSection, resetSection, newEntityId } from '../../store/content'
import { Field, GroupCard, inputCls, labelCls } from './fields'

export default function ContactTab() {
  const content = useContent()
  const c = content.contact

  const save = (patch: unknown) => updateSection('contact', patch)

  return (
    <div className="space-y-8">
      <GroupCard
        title="Contact section"
        description="Heading, intro and success message."
        onReset={() => {
          if (window.confirm('Reset contact content to defaults?')) resetSection('contact')
        }}
      >
        <div className="space-y-5">
          <Field label="Heading" value={c.heading} onChange={(heading) => save({ heading })} />
          <Field label="Intro" textarea rows={3} value={c.intro} onChange={(intro) => save({ intro })} />
          <Field label="Success message" value={c.successMessage} onChange={(successMessage) => save({ successMessage })} />
        </div>
      </GroupCard>

      <GroupCard title="Direct contact" description="Email, location and form placeholders.">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Email" value={c.email} onChange={(email) => save({ email })} />
          <Field label="Location" value={c.location} onChange={(location) => save({ location })} />
          <Field
            label="Name placeholder"
            value={c.placeholders.name}
            onChange={(name) => save({ placeholders: { ...c.placeholders, name } })}
          />
          <Field
            label="Email placeholder"
            value={c.placeholders.email}
            onChange={(email) => save({ placeholders: { ...c.placeholders, email } })}
          />
          <Field
            label="Subject placeholder"
            value={c.placeholders.subject}
            onChange={(subject) => save({ placeholders: { ...c.placeholders, subject } })}
          />
          <Field
            label="Message placeholder"
            value={c.placeholders.message}
            onChange={(message) => save({ placeholders: { ...c.placeholders, message } })}
          />
        </div>
      </GroupCard>

      <GroupCard title="Social links" description="Shown next to your contact info.">
        <div className="space-y-3">
          {c.socials.map((social) => (
            <div key={social.id} className="flex gap-3">
              <input
                className={inputCls}
                value={social.label}
                placeholder="Label"
                onChange={(e) =>
                  save({ socials: c.socials.map((s) => (s.id === social.id ? { ...s, label: e.target.value } : s)) })
                }
              />
              <input
                className={inputCls}
                value={social.url}
                placeholder="https://…"
                onChange={(e) =>
                  save({ socials: c.socials.map((s) => (s.id === social.id ? { ...s, url: e.target.value } : s)) })
                }
              />
              <button
                type="button"
                onClick={() => save({ socials: c.socials.filter((s) => s.id !== social.id) })}
                className="border border-[#D7E2EA]/20 rounded-2xl px-3 text-[#D7E2EA]/40 hover:text-[#ff5252] hover:border-[#ff5252]/50 transition-colors duration-200 flex-shrink-0"
                aria-label="Remove social link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => save({ socials: [...c.socials, { id: newEntityId('soc'), label: 'New', url: '' }] })}
          className="mt-3 inline-flex items-center gap-2 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add social link
        </button>
        <div className="mt-6">
          <label className={labelCls}>Preview</label>
          <div className="flex flex-wrap gap-2">
            {c.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#D7E2EA] hover:text-[#B600A8] transition-colors duration-200"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </GroupCard>
    </div>
  )
}