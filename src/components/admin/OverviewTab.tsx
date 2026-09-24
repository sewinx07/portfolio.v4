import { useContent, updateSection, sectionDefinitions, resetAllContent } from '../../store/content'
import { Toggle, GroupCard } from './fields'

export default function OverviewTab() {
  const content = useContent()
  const ids = content.sectionIds

  const setSection = (key: keyof typeof ids, value: boolean) => {
    updateSection('sectionIds', { [key]: value })
  }

  return (
    <GroupCard
      title="Sections"
      description="Turn any section of the homepage on or off. Changes apply instantly on the live site."
      onReset={() => {
        if (window.confirm('Reset ALL site content to defaults? This includes texts, services, pricing and contact info.')) {
          resetAllContent()
        }
      }}
    >
      <div className="grid sm:grid-cols-2 gap-3">
        {sectionDefinitions.map((def) => (
          <Toggle
            key={def.key}
            label={def.label}
            checked={ids[def.key]}
            onChange={(v) => setSection(def.key, v)}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-[#D7E2EA]/30 font-light">
        Tip: hidden sections keep their content — untoggle to bring them back.
      </p>
    </GroupCard>
  )
}