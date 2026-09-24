import { useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { useContent, updateSection, resetSection, newEntityId } from '../../store/content'
import type { ServiceItem, PlanItem } from '../../store/content'
import { Field, GroupCard, inputCls, labelCls, btnPrimary, btnGhost, btnDanger } from './fields'

function MoveButtons({
  onUp,
  onDown,
  canUp,
  canDown,
}: {
  onUp: () => void
  onDown: () => void
  canUp: boolean
  canDown: boolean
}) {
  return (
    <span className="flex flex-col">
      <button
        type="button"
        disabled={!canUp}
        onClick={onUp}
        className="px-1.5 py-0.5 text-[#D7E2EA]/50 hover:text-[#D7E2EA] disabled:opacity-20 text-sm leading-none"
        aria-label="Move up"
      >
        ▲
      </button>
      <button
        type="button"
        disabled={!canDown}
        onClick={onDown}
        className="px-1.5 py-0.5 text-[#D7E2EA]/50 hover:text-[#D7E2EA] disabled:opacity-20 text-sm leading-none"
        aria-label="Move down"
      >
        ▼
      </button>
    </span>
  )
}

function move<T>(list: T[], index: number, delta: -1 | 1): T[] {
  const next = [...list]
  const j = index + delta
  if (j < 0 || j >= next.length) return next
  ;[next[index], next[j]] = [next[j], next[index]]
  return next
}

function ServiceItemRow({
  item,
  index,
  total,
  onPatch,
  onDelete,
  onMove,
}: {
  item: ServiceItem
  index: number
  total: number
  onPatch: (patch: Partial<ServiceItem>) => void
  onDelete: () => void
  onMove: (delta: -1 | 1) => void
}) {
  return (
    <div className="border border-[#D7E2EA]/15 rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[#D7E2EA]/30">
          <GripVertical className="w-4 h-4" />
        </span>
        <input
          className={`${inputCls} flex-1`}
          value={item.name}
          placeholder="Service name"
          onChange={(e) => onPatch({ name: e.target.value })}
        />
        <MoveButtons
          canUp={index > 0}
          canDown={index < total - 1}
          onUp={() => onMove(-1)}
          onDown={() => onMove(1)}
        />
        <button
          type="button"
          onClick={onDelete}
          className="border border-[#D7E2EA]/20 rounded-xl p-2 text-[#D7E2EA]/40 hover:text-[#ff5252] hover:border-[#ff5252]/50 transition-colors duration-200"
          aria-label="Delete service"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <textarea
        className={`${inputCls} min-h-[70px] resize-y`}
        value={item.description}
        placeholder="Service description"
        onChange={(e) => onPatch({ description: e.target.value })}
      />
    </div>
  )
}

export default function ListsTab() {
  const content = useContent()
  const [draft, setDraft] = useState<PlanItem | null>(null)

  const patchServices = (patch: unknown) => updateSection('services', patch)
  const patchPlans = (patch: unknown) => updateSection('plans', patch)

  const addService = () => {
    patchServices({
      items: [
        ...content.services.items,
        { id: newEntityId('svc'), name: 'New service', description: '' },
      ],
    })
  }

  const startEditPlan = (plan: PlanItem) => {
    setDraft({ ...plan, features: [...plan.features], id: plan.id })
  }

  const startNewPlan = () => {
    setDraft({ id: newEntityId('plan'), name: 'New plan', price: '', description: '', features: [''], popular: false })
  }

  const savePlan = () => {
    if (!draft) return
    const features = draft.features.map((f) => f.trim()).filter(Boolean)
    const clean = { ...draft, features }
    const exists = content.plans.items.some((p) => p.id === clean.id)
    const items = exists
      ? content.plans.items.map((p) => (p.id === clean.id ? clean : p))
      : [...content.plans.items, clean]
    patchPlans({ items })
    setDraft(null)
  }

  const deleteDraftPlan = () => {
    if (!draft) return
    patchPlans({ items: content.plans.items.filter((p) => p.id !== draft.id) })
    setDraft(null)
  }

  return (
    <div className="space-y-8">
      <GroupCard
        title="Services"
        description="Your services list. Reorder with the arrows."
        onReset={() => {
          if (window.confirm('Reset services to defaults?')) resetSection('services')
        }}
      >
        <div className="mb-5">
          <Field
            label="Heading"
            value={content.services.heading}
            onChange={(heading) => patchServices({ heading })}
          />
        </div>
        <div className="space-y-3">
          {content.services.items.map((item, i) => (
            <ServiceItemRow
              key={item.id}
              item={item}
              index={i}
              total={content.services.items.length}
              onPatch={(patch) =>
                patchServices({
                  items: content.services.items.map((s) => (s.id === item.id ? { ...s, ...patch } : s)),
                })
              }
              onMove={(delta) =>
                patchServices({ items: move(content.services.items, i, delta) })
              }
              onDelete={() => {
                if (window.confirm(`Delete service "${item.name}"?`))
                  patchServices({ items: content.services.items.filter((s) => s.id !== item.id) })
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addService}
          className="mt-4 inline-flex items-center gap-2 border border-[#B600A8]/50 rounded-2xl px-6 py-3 text-[#B600A8] hover:bg-[#B600A8]/10 transition-colors duration-200 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add service
        </button>
      </GroupCard>

      <GroupCard
        title="Pricing plans"
        description="Plans shown in the pricing section. Leave price empty for 'on request'."
        onReset={() => {
          if (window.confirm('Reset pricing plans to defaults?')) resetSection('plans')
        }}
      >
        <div className="mb-5 grid md:grid-cols-2 gap-4">
          <Field label="Heading" value={content.plans.heading} onChange={(heading) => patchPlans({ heading })} />
          <Field label="Button label" value={content.plans.buttonLabel} onChange={(buttonLabel) => patchPlans({ buttonLabel })} />
        </div>

        {draft && (
          <div className="border-2 border-[#B600A8]/40 rounded-3xl p-5 mb-6 bg-[#0C0C0C]">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Field label="Plan name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
              <Field label="Price" value={draft.price} onChange={(price) => setDraft({ ...draft, price })} placeholder="e.g. $299" />
            </div>
            <Field
              label="Description"
              textarea
              rows={2}
              value={draft.description}
              onChange={(description) => setDraft({ ...draft, description })}
            />
            <div className="mt-4">
              <label className={labelCls}>Features (one per line)</label>
              <textarea
                className={`${inputCls} min-h-[100px] resize-y`}
                value={draft.features.join('\n')}
                onChange={(e) => setDraft({ ...draft, features: e.target.value.split('\n') })}
              />
            </div>
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.popular}
                onChange={(e) => setDraft({ ...draft, popular: e.target.checked })}
                className="w-4 h-4 accent-[#B600A8]"
              />
              <span className="text-sm text-[#D7E2EA]/70">Mark as “Most Popular”</span>
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={savePlan} className={btnPrimary}>
                Save plan
              </button>
              <button type="button" onClick={() => { setDraft(null) }} className={btnGhost}>
                Cancel
              </button>
              {draft.id && (
                <button type="button" onClick={deleteDraftPlan} className={btnDanger}>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {content.plans.items.map((plan, i) => (
            <div
              key={plan.id}
              className="flex flex-wrap items-center gap-4 border border-[#D7E2EA]/15 rounded-2xl p-4"
            >
              <span className="text-[#D7E2EA]/30">
                <GripVertical className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-[180px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#D7E2EA] font-medium">{plan.name}</span>
                  {plan.popular && (
                    <span className="text-[10px] uppercase tracking-wider text-[#B600A8] border border-[#B600A8]/40 rounded-full px-2 py-0.5">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#D7E2EA]/40 font-light truncate">{plan.description}</p>
              </div>
              <span className="text-[#D7E2EA]/60 font-light text-lg">{plan.price || '—'}</span>
              <MoveButtons
                canUp={i > 0}
                canDown={i < content.plans.items.length - 1}
                onUp={() => patchPlans({ items: move(content.plans.items, i, -1) })}
                onDown={() => patchPlans({ items: move(content.plans.items, i, 1) })}
              />
              <button
                type="button"
                onClick={() => startEditPlan(plan)}
                className="border border-[#D7E2EA]/20 rounded-xl p-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 transition-colors duration-200"
                aria-label={`Edit plan ${plan.name}`}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete plan "${plan.name}"?`))
                    patchPlans({ items: content.plans.items.filter((p) => p.id !== plan.id) })
                }}
                className="border border-[#D7E2EA]/20 rounded-xl p-2 text-[#D7E2EA]/40 hover:text-[#ff5252] hover:border-[#ff5252]/50 transition-colors duration-200"
                aria-label={`Delete plan ${plan.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={startNewPlan}
          className="mt-4 inline-flex items-center gap-2 border border-[#B600A8]/50 rounded-2xl px-6 py-3 text-[#B600A8] hover:bg-[#B600A8]/10 transition-colors duration-200 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add plan
        </button>
      </GroupCard>
    </div>
  )
}