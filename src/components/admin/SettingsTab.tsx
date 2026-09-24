import { useState } from 'react'
import { useContent, updateSection, setAdminPassword, getAdminPassword } from '../../store/content'
import { GroupCard, btnPrimary, inputCls, labelCls } from './fields'

export default function SettingsTab() {
  const content = useContent()
  const [siteTitle, setSiteTitle] = useState(content.siteTitle)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')

  const saveTitle = () => {
    const t = siteTitle.trim()
    if (!t) return
    updateSection('siteTitle', t)
    setMsg('Site title updated.')
    window.setTimeout(() => setMsg(''), 2000)
  }

  const savePassword = () => {
    if (password.length < 4) {
      setMsg('Password must be at least 4 characters.')
      return
    }
    if (password !== confirm) {
      setMsg('Passwords do not match.')
      return
    }
    setAdminPassword(password)
    setMsg('Password updated. Log out and use the new one next time.')
    setPassword('')
    setConfirm('')
    window.setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div className="space-y-8">
      <GroupCard title="Site title" description="Shown in the browser tab.">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input className={inputCls} value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
          <button type="button" onClick={saveTitle} className={btnPrimary}>
            Save title
          </button>
        </div>
        <p className="mt-3 text-xs text-[#D7E2EA]/30 font-light">
          Current browser title: “{content.siteTitle}”
        </p>
      </GroupCard>

      <GroupCard
        title="Admin password"
        description="Change the password used to enter this dashboard."
        onReset={() => {
          if (window.confirm('Reset the admin password to the default (sewinx-admin)?'))
            setAdminPassword('sewinx-admin')
        }}
      >
        <p className="mb-4 text-sm text-[#D7E2EA]/40 font-light">
          Current encrypted value: {getAdminPassword().split('').map(() => '•').join('')}
        </p>
        <div className="grid md:grid-cols-2 gap-5 max-w-xl">
          <div>
            <label className={labelCls}>New password</label>
            <input
              type="password"
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Confirm password</label>
            <input
              type="password"
              className={inputCls}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
        <button type="button" onClick={savePassword} className={`${btnPrimary} mt-5`}>
          Update password
        </button>
      </GroupCard>

      {msg && <p className="text-sm text-[#B600A8]">{msg}</p>}
    </div>
  )
}