import { useState, useEffect } from 'react'
import api from '../../lib/api'
import DataTable, { Column } from '../components/DataTable'
import FileUpload from '../components/FileUpload'
import MediaLibrary from './MediaLibrary'
import RichTextEditor from '../components/RichTextEditor'

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
  // SEO
  meta_title: string
  meta_description: string
  keywords: string
  og_image: string
  canonical_url: string
  // GEO
  geo_region: string
  geo_placename: string
  created_at: string
}

const EMPTY_EVENT: Omit<SchoolEvent, 'id' | 'created_at'> = {
  title: '', slug: '', description: '', content: '',
  event_date: '', end_date: '', location: 'School Campus',
  featured_image: '', is_published: false,
  meta_title: '', meta_description: '', keywords: '', og_image: '', canonical_url: '',
  geo_region: 'IN-TG', geo_placename: 'Hyderabad',
}

export default function EventEditor() {
  const [events, setEvents] = useState<SchoolEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_EVENT)
  const [saving, setSaving] = useState(false)
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [seoOpen, setSeoOpen] = useState(false)

  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/events/')
      setEvents(res.data.results || res.data)
    } catch {
      setEvents([
        { id: 1, title: 'Annual Sports Day 2026', slug: 'annual-sports-day-2026', description: 'A day of athletic excellence and team spirit.', content: '', event_date: '2026-04-15', end_date: '2026-04-15', location: 'School Ground', featured_image: '', is_published: true, meta_title: '', meta_description: '', keywords: '', og_image: '', canonical_url: '', geo_region: 'IN-TG', geo_placename: 'Hyderabad', created_at: '2026-03-20' },
        { id: 2, title: 'Science Exhibition', slug: 'science-exhibition', description: 'Students showcase innovative science projects.', content: '', event_date: '2026-04-25', end_date: '2026-04-26', location: 'School Hall', featured_image: '', is_published: true, meta_title: '', meta_description: '', keywords: '', og_image: '', canonical_url: '', geo_region: 'IN-TG', geo_placename: 'Hyderabad', created_at: '2026-03-18' },
        { id: 3, title: 'Parent-Teacher Meeting', slug: 'ptm-april-2026', description: 'Quarterly parent-teacher interaction.', content: '', event_date: '2026-04-10', end_date: '2026-04-10', location: 'Classrooms', featured_image: '', is_published: false, meta_title: '', meta_description: '', keywords: '', og_image: '', canonical_url: '', geo_region: 'IN-TG', geo_placename: 'Hyderabad', created_at: '2026-03-15' },
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
      event_date: form.event_date || null,
      end_date: form.end_date || null,
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
      meta_title: row.meta_title || '', meta_description: row.meta_description || '',
      keywords: row.keywords || '', og_image: row.og_image || '', canonical_url: row.canonical_url || '',
      geo_region: row.geo_region || 'IN-TG', geo_placename: row.geo_placename || 'Hyderabad',
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

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' as const }
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 600 as const, color: '#374151', marginBottom: 6 }

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
          onAdd={() => { setForm(EMPTY_EVENT); setEditingId(null); setShowForm(true); setSeoOpen(false) }}
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

          {/* Core fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Start Date *</label>
              <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>End Date</label>
              <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} style={inputStyle} />
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
            <label style={labelStyle}>Short Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Full Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
              placeholder="Detailed event description…"
              minHeight={300}
            />
          </div>

          {/* SEO & GEO Section */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, marginBottom: 24, overflow: 'hidden' }}>
            <button
              onClick={() => setSeoOpen((o) => !o)}
              style={{
                width: '100%', padding: '14px 18px', background: '#f8fafc', border: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1B4F8E',
              }}
            >
              <span><i className="fa-solid fa-magnifying-glass" style={{ marginRight: 8 }} />SEO, Meta &amp; GEO Information</span>
              <i className={`fa-solid fa-chevron-${seoOpen ? 'up' : 'down'}`} style={{ fontSize: 12, color: '#94a3b8' }} />
            </button>

            {seoOpen && (
              <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Google preview */}
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>Search Preview</div>
                  <div style={{ fontSize: 17, color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {form.meta_title || form.title || 'Event Title'}
                  </div>
                  <div style={{ fontSize: 13, color: '#006621', margin: '2px 0' }}>springboardindianschool.edu.in/events/{form.slug || 'event-slug'}</div>
                  <div style={{ fontSize: 13, color: '#4d5156', lineHeight: 1.5 }}>
                    {form.meta_description || form.description || 'Meta description will appear here...'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>
                      Meta Title
                      <span style={{ fontSize: 11, color: form.meta_title.length > 60 ? '#ef4444' : '#94a3b8', fontWeight: 400, marginLeft: 6 }}>
                        {form.meta_title.length}/60
                      </span>
                    </label>
                    <input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                      placeholder={form.title || 'Leave blank to use event title'}
                      style={{ ...inputStyle, borderColor: form.meta_title.length > 60 ? '#ef4444' : '#d1d5db' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Keywords <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>(comma-separated)</span></label>
                    <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                      placeholder="e.g. school sports day, cbse hyderabad events" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Meta Description
                    <span style={{ fontSize: 11, color: form.meta_description.length > 160 ? '#ef4444' : '#94a3b8', fontWeight: 400, marginLeft: 6 }}>
                      {form.meta_description.length}/160
                    </span>
                  </label>
                  <textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2}
                    placeholder={form.description || 'Leave blank to use short description'}
                    style={{ ...inputStyle, resize: 'vertical', borderColor: form.meta_description.length > 160 ? '#ef4444' : '#d1d5db' }} />
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>Open Graph (Social Sharing)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>OG Image URL</label>
                      <input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })}
                        placeholder={form.featured_image || 'Leave blank to use featured image'} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Canonical URL <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
                      <input value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                        placeholder="https://springboardindianschool.edu.in/events/..." style={inputStyle} />
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>GEO / Structured Data</div>
                  <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 12px' }}>
                    Helps search engines understand the physical location of this event for local SEO.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>
                        GEO Region <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>(ISO 3166-2)</span>
                      </label>
                      <input value={form.geo_region} onChange={(e) => setForm({ ...form, geo_region: e.target.value })}
                        placeholder="e.g. IN-TG" style={inputStyle} />
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>IN-TG = Telangana · IN-AP = Andhra Pradesh</div>
                    </div>
                    <div>
                      <label style={labelStyle}>GEO Placename</label>
                      <input value={form.geo_placename} onChange={(e) => setForm({ ...form, geo_placename: e.target.value })}
                        placeholder="e.g. Hyderabad" style={inputStyle} />
                    </div>
                  </div>
                </div>

              </div>
            )}
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
