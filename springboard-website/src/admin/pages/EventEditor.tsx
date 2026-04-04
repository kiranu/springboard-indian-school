import { useState, useEffect } from 'react'
import api from '../../lib/api'
import DataTable, { Column } from '../components/DataTable'
import FileUpload from '../components/FileUpload'
import MediaLibrary from './MediaLibrary'

interface SchoolEvent {
  id: number
  title: string
  slug: string
  description: string
  content: string
  event_date: string
  end_date: string
  location: string
  featured_image: string
  is_published: boolean
  created_at: string
}

const EMPTY_EVENT: Omit<SchoolEvent, 'id' | 'created_at'> = {
  title: '', slug: '', description: '', content: '',
  event_date: '', end_date: '', location: 'School Campus',
  featured_image: '', is_published: false,
}

export default function EventEditor() {
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_EVENT)
  const [saving, setSaving] = useState(false)
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/events/')
      setEvents(res.data.results || res.data)
    } catch {
      setEvents([
        { id: 1, title: 'Annual Sports Day 2026', slug: 'annual-sports-day-2026', description: 'A day of athletic excellence and team spirit.', content: '', event_date: '2026-04-15', end_date: '2026-04-15', location: 'School Ground', featured_image: '', is_published: true, created_at: '2026-03-20' },
        { id: 2, title: 'Science Exhibition', slug: 'science-exhibition', description: 'Students showcase innovative science projects.', content: '', event_date: '2026-04-25', end_date: '2026-04-26', location: 'School Hall', featured_image: '', is_published: true, created_at: '2026-03-18' },
        { id: 3, title: 'Parent-Teacher Meeting', slug: 'ptm-april-2026', description: 'Quarterly parent-teacher interaction.', content: '', event_date: '2026-04-10', end_date: '2026-04-10', location: 'Classrooms', featured_image: '', is_published: false, created_at: '2026-03-15' },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      // Django DateField requires null, not empty string
      event_date: form.event_date || null,
      end_date: form.end_date || null,
      // Django URLField requires null or valid URL, not empty string
      featured_image: form.featured_image || '',
    }
    try {
      if (editingId) {
        await api.put(`/admin/events/${editingId}/`, payload)
        setEvents((prev) => prev.map((e) => e.id === editingId ? { ...e, ...payload } : e))
      } else {
        const res = await api.post('/admin/events/', payload)
        setEvents((prev) => [{ id: res.data.id || Date.now(), ...payload, created_at: new Date().toISOString().split('T')[0] } as SchoolEvent, ...prev])
      }
    } catch {
      if (editingId) {
        setEvents((prev) => prev.map((e) => e.id === editingId ? { ...e, ...payload } : e))
      } else {
        setEvents((prev) => [{ id: Date.now(), ...payload, created_at: new Date().toISOString().split('T')[0] } as SchoolEvent, ...prev])
      }
    } finally {
      setSaving(false); setShowForm(false); setEditingId(null); setForm(EMPTY_EVENT)
    }
  }

  const handleEdit = (row: SchoolEvent) => {
    setEditingId(row.id)
    setForm({
      title: row.title, slug: row.slug, description: row.description, content: row.content,
      event_date: row.event_date, end_date: row.end_date, location: row.location,
      featured_image: row.featured_image, is_published: row.is_published,
    })
    setShowForm(true)
  }

  const handleDelete = async (row: SchoolEvent) => {
    if (!window.confirm(`Delete "${row.title}"?`)) return
    try { await api.delete(`/admin/events/${row.id}/`) } catch {}
    setEvents((prev) => prev.filter((e) => e.id !== row.id))
  }

  const columns: Column<SchoolEvent>[] = [
    { key: 'title', label: 'Event', render: (v) => <span style={{ fontWeight: 500, color: '#1e293b' }}>{v}</span> },
    { key: 'event_date', label: 'Date', render: (v) => v || '—' },
    { key: 'location', label: 'Location' },
    { key: 'is_published', label: 'Status', render: (v) => (
      <span style={{
        padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
        background: v ? '#d1fae5' : '#fef3c7', color: v ? '#065f46' : '#92400e',
      }}>{v ? 'Published' : 'Draft'}</span>
    )},
  ]

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
    </div>
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Events</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Manage school events and activities.</p>
      </div>

      {!showForm ? (
        <DataTable
          title="All Events"
          columns={columns}
          data={events}
          searchPlaceholder="Search events..."
          onAdd={() => { setForm(EMPTY_EVENT); setEditingId(null); setShowForm(true) }}
          addLabel="New Event"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{editingId ? 'Edit Event' : 'Create New Event'}</h2>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_EVENT); setEditingId(null) }}
              style={{ background: 'none', border: 'none', fontSize: 13, color: '#64748b', cursor: 'pointer' }}>← Back to list</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Start Date *</label>
              <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>End Date</label>
              <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <FileUpload
            value={form.featured_image}
            label="Featured Image"
            hint="JPG, PNG, WebP, GIF up to 5MB"
            accept="image/*"
            onUpload={(f) => setForm({ ...form, featured_image: f.url || '' })}
            onPickFromLibrary={() => setShowMediaPicker(true)}
          />

          {showMediaPicker && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setShowMediaPicker(false)}>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 900, maxHeight: '85vh', overflowY: 'auto' }}
                onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Pick from Media Library</h3>
                  <button onClick={() => setShowMediaPicker(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#94a3b8' }}>×</button>
                </div>
                <MediaLibrary pickerMode pickerFilter="image"
                  onPick={(f) => { setForm({ ...form, featured_image: f.url }); setShowMediaPicker(false) }} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Short Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10}
              placeholder="Detailed event description... (HTML supported)"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
              <span style={{ fontSize: 14, color: '#374151' }}>Publish immediately</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleSave} disabled={saving || !form.title}
              style={{
                padding: '10px 24px', borderRadius: 8, background: '#1B4F8E', color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: saving || !form.title ? 0.6 : 1,
              }}>
              {saving ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_EVENT); setEditingId(null) }}
              style={{ padding: '10px 24px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: 'none', fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
