import type { ReactNode } from 'react'

export const inputCls =
  'w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl px-4 py-3 text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none focus:border-[#B600A8]/60 transition-colors duration-200 font-light'
export const labelCls = 'block text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/50 mb-2'
export const cardCls =
  'border-2 border-[#D7E2EA]/20 rounded-[30px] sm:rounded-[40px] p-6 sm:p-8'
export const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-[#B600A8] text-white rounded-2xl px-6 py-3 font-medium hover:bg-[#D000C0] transition-colors duration-200'
export const btnGhost =
  'inline-flex items-center justify-center gap-2 border border-[#D7E2EA]/20 rounded-2xl px-6 py-3 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/50 transition-colors duration-200'
export const btnDanger =
  'inline-flex items-center justify-center gap-2 border border-[#ff5252]/40 rounded-2xl px-6 py-3 text-[#ff5252] hover:bg-[#ff5252]/10 transition-colors duration-200'

export function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  rows,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  textarea?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          className={`${inputCls} min-h-[110px] resize-y`}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full py-3 px-4 rounded-2xl border border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40 transition-colors duration-200 text-left"
    >
      <span className="text-[#D7E2EA] font-medium">{label}</span>
      <span
        className={`relative inline-block rounded-full transition-colors duration-200 ${checked ? 'bg-[#B600A8]' : 'bg-[#D7E2EA]/15'}`}
        style={{ width: 48, height: 26, flexShrink: 0 }}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-[26px]' : 'translate-x-0.5'}`}
          style={{ width: 22, height: 22 }}
        />
      </span>
    </button>
  )
}

export function GroupCard({
  title,
  description,
  children,
  onReset,
}: {
  title: string
  description?: string
  children: ReactNode
  onReset?: () => void
}) {
  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wider text-lg">{title}</h3>
          {description && <p className="text-[#D7E2EA]/40 font-light text-sm mt-1">{description}</p>}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200 uppercase tracking-wider"
          >
            Reset to default
          </button>
        )}
      </div>
      {children}
    </div>
  )
}