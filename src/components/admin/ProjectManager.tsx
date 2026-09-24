import { useRef, useState } from 'react'
import { Pencil, Plus, Trash2, Upload, Link2, X } from 'lucide-react'
import FadeIn from '../FadeIn'
import type { Project } from '../../store/projects'
import {
  useProjects,
  getProject,
  saveProject,
  deleteProject,
  nextNum,
  newProjectId,
  fileToDataUrl,
} from '../../store/projects'
import { inputCls, labelCls, btnPrimary, btnGhost, btnDanger } from './fields'

type FormState = {
  id: string
  num: string
  title: string
  category: string
  type: string
  year: string
  description: string
  toolsText: string
  images: string[]
  site: string
}

const emptyForm = (): FormState => ({
  id: '',
  num: nextNum(),
  title: '',
  category: 'Client',
  type: 'Web Development',
  year: '',
  description: '',
  toolsText: '',
  images: [],
  site: '',
})

const toForm = (p: Project): FormState => ({
  id: p.id,
  num: p.num,
  title: p.title,
  category: p.category,
  type: p.type,
  year: p.year,
  description: p.description,
  toolsText: p.tools.join(', '),
  images: [...p.images],
  site: p.site ?? '',
})

function Editor({
  initial,
  onSaved,
  onCancel,
  onDelete,
}: {
  initial: FormState
  onSaved: () => void
  onCancel: () => void
  onDelete?: () => void
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const addImage = (src: string) => {
    if (!src) return
    setForm((f) => ({ ...f, images: [...f.images, src] }))
    setUrlInput('')
  }

  const removeImage = (index: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const converted = await Promise.all(Array.from(files).map((file) => fileToDataUrl(file)))
      setForm((f) => ({ ...f, images: [...f.images, ...converted] }))
    } catch {
      setError('Could not process one of the uploaded files.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const save = () => {
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    const project: Project = {
      id: form.id || newProjectId(),
      num: form.num.trim() || nextNum(),
      title: form.title.trim(),
      category: form.category.trim() || 'Client',
      type: form.type.trim() || 'Web Development',
      year: form.year.trim(),
      description: form.description.trim(),
      tools: form.toolsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      images: form.images,
      site: form.site.trim() || undefined,
    }
    saveProject(project)
    onSaved()
  }

  return (
    <div className="border-2 border-[#D7E2EA]/20 rounded-[40px] sm:rounded-[50px] p-6 sm:p-8 md:p-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Project title"
          />
        </div>
        <div>
          <label className={labelCls}>Number</label>
          <input className={inputCls} value={form.num} onChange={(e) => set('num', e.target.value)} placeholder="01" />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <select className={`${inputCls} appearance-none`} value={form.category} onChange={(e) => set('category', e.target.value)}>
            <option>Client</option>
            <option>Personal</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select className={`${inputCls} appearance-none`} value={form.type} onChange={(e) => set('type', e.target.value)}>
            <option>Web Development</option>
            <option>Graphic Design</option>
            <option>Video Editing</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Year</label>
          <input className={inputCls} value={form.year} onChange={(e) => set('year', e.target.value)} placeholder="2026" />
        </div>
        <div>
          <label className={labelCls}>Link (optional)</label>
          <input className={inputCls} value={form.site} onChange={(e) => set('site', e.target.value)} placeholder="https://…" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea
            className={`${inputCls} min-h-[120px] resize-y`}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="What was this project about?"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Tools (comma separated)</label>
          <input
            className={inputCls}
            value={form.toolsText}
            onChange={(e) => set('toolsText', e.target.value)}
            placeholder="React, TypeScript, Figma"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Images</label>
          <div className="flex flex-wrap gap-4">
            {form.images.map((src, i) => (
              <div key={i} className="relative w-28 sm:w-32">
                <img
                  src={src}
                  alt=""
                  className="w-28 sm:w-32 h-16 object-cover rounded-xl border border-[#D7E2EA]/20"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-[#0C0C0C] border border-[#D7E2EA]/30 rounded-full p-1 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
                  aria-label={`Remove image ${i + 1}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              className={`${inputCls} flex-1`}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste an image URL…"
            />
            <button
              type="button"
              onClick={() => addImage(urlInput.trim())}
              className="inline-flex items-center justify-center gap-2 border border-[#D7E2EA]/20 rounded-2xl px-5 py-3 text-[#D7E2EA]/80 hover:border-[#D7E2EA]/50 transition-colors duration-200"
            >
              <Link2 className="w-4 h-4" />
              Add URL
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 border border-[#B600A8]/50 rounded-2xl px-5 py-3 text-[#B600A8] hover:bg-[#B600A8]/10 transition-colors duration-200 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading…' : 'Upload files'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
          </div>
          <p className="mt-2 text-xs text-[#D7E2EA]/30 font-light">
            Uploaded images are auto-compressed and stored in your browser (localStorage).
          </p>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-[#ff5252]">{error}</p>}

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={save} className={btnPrimary}>
          Save project
        </button>
        <button type="button" onClick={onCancel} className={btnGhost}>
          Cancel
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} className={btnDanger}>
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default function ProjectManager() {
  const projects = useProjects()
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingForm =
    editingId === 'new'
      ? emptyForm()
      : editingId && editingId !== 'new'
        ? (() => {
            const p = getProject(editingId)
            return p ? toForm(p) : null
          })()
        : null

  return (
    <div>
      {editingForm && (
        <div className="mb-10">
          <Editor
            initial={editingForm}
            onSaved={() => setEditingId(null)}
            onCancel={() => setEditingId(null)}
            onDelete={
              editingForm.id
                ? () => {
                    deleteProject(editingForm.id)
                    setEditingId(null)
                  }
                : undefined
            }
          />
        </div>
      )}

      <div className="mb-8">
        <button onClick={() => setEditingId('new')} className="inline-flex items-center gap-2 border border-[#B600A8]/50 rounded-2xl px-6 py-3 text-[#B600A8] hover:bg-[#B600A8]/10 transition-colors duration-200 font-medium">
          <Plus className="w-4 h-4" />
          New project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <FadeIn key={project.id} y={12}>
            <div className="flex items-center gap-4 border-2 border-[#D7E2EA]/20 rounded-3xl p-3 sm:p-4 hover:border-[#D7E2EA]/40 transition-colors duration-200">
              <img src={project.images[0]} alt="" className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#D7E2EA]/40 font-mono text-xs">#{project.num}</span>
                  <span className="text-[#D7E2EA] font-medium truncate">{project.title}</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-0.5 text-xs text-[#D7E2EA]/40">
                  <span>{project.category}</span>
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingId(project.id)}
                  className="border border-[#D7E2EA]/20 rounded-xl p-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 transition-colors duration-200"
                  aria-label={`Edit ${project.title}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${project.title}"?`)) {
                      deleteProject(project.id)
                      setEditingId(null)
                    }
                  }}
                  className="border border-[#D7E2EA]/20 rounded-xl p-2 text-[#D7E2EA]/40 hover:text-[#ff5252] hover:border-[#ff5252]/50 transition-colors duration-200"
                  aria-label={`Delete ${project.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}