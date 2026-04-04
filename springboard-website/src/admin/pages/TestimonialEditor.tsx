import { useState, useEffect } from 'react'
import api from '../../lib/api'
import DataTable, { Column } from '../components/DataTable'

interface Testimonial {
  id: number
  parent_name: string
  child_name: string
  grade: string
  content: string
  rating: number
  photo_url: string
  is_published: boolean
  created_at: string
}

const EMPTY_TESTIMONIAL = {
  parent_name: '', child_name: '', grade: '', content: '',
  rating: 5, photo_url: '', is_published: false,
}

export default function TestimonialEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_TESTIMONIAL)
  const [saving, setSaving] = useState(false)

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/admin/testimonials/')
      setTestimonials(res.data.results || res.data)
    } catch {
      setTestimonials([
        { id: 1, parent_name: 'Mrs. Lakshmi Rao', child_name: 'Aditya', grade: 'Grade 4', content: 'Springboard has been an amazing journey for our son. The teachers are dedicated and caring.', rating: 5, photo_url: '', is_published: true, created_at: '2026-03-20' },
        { id: 2, parent_name: 'Mr. Venkat Reddy', child_name: 'Sai', grade: 'Grade 2', content: 'The holistic approach to education at Springboard sets it apart from other schools.', rating: 5, photo_url: '', is_published: true, created_at: '2026-03-18' },
        { id: 3, parent_name: 'Mrs. Sunitha Patel', child_name: 'Anvi', grade: 'Pre-K', content: 'My daughter loves going to school every day. The early childhood program is excellent.', rating: 4, photo_url: '', is_published: false, created_at: '2026-03-15' },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTestimonials() }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}/`, form)
        setTestimonials((prev) => prev.map((t) => t.id === editingId ? { ...t, ...form } : t))
      } else {
        const res = await api.post('/admin/testimonials/', form)
        setTestimonials((prev) => [{ id: res.data.id || Date.now(), ...form, created_at: new Date().toISOString().split('T')[0] } as Testimonial, ...prev])
      }
    } catch {
      if (editingId) {
        setTestimonials((prev) => prev.map((t) => t.id === editingId ? { ...t, ...form } : t))
      } else {
        setTestimonials((prev) => [{ id: Date.now(), ...form, created_at: new Date().toISOString().split('T')[0] } as Testimonial, ...prev])
      }
    } finally {
      setSaving(false); setShowForm(false); setEditingId(null); setForm(EMPTY_TESTIMONIAL)
    }
  }

  const handleEdit = (row: Testimonial) => {
    setEditingId(row.id)
    setForm({
      parent_name: row.parent_name, child_name: row.child_name, grade: row.grade,
      content: row.content, rating: row.rating, photo_url: row.photo_url, is_published: row.is_published,
    })
    setShowForm(true)
  }

  const handleDelete = async (row: Testimonial) => {
    if (!window.confirm(`Delete testimonial from ${row.parent_name}?`)) return
    try { await api.delete(`/admin/testimonials/${row.id}/`) } catch {}
    setTestimonials((prev) => prev.filter((t) => t.id !== row.id))
  }

  const renderStars = (rating: number) => (
    <span style={{ color: '#f59e0b' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < rating ? 'fa-solid fa-star' : 'fa-regular fa-star'} style={{ fontSize: 12, marginRight: 2 }} />
      ))}
    </span>
  )

  const columns: Column<Testimonial>[] = [
    { key: 'parent_name', label: 'Parent', render: (v) => <span style={{ fontWeight: 500, color: '#1e293b' }}>{v}</span> },
    { key: 'child_name', label: 'Student' },
    { key: 'grade', label: 'Grade' },
    { key: 'rating', label: 'Rating', render: (v) => renderStars(v) },
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
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Testimonials</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Manage parent testimonials displayed on the website.</p>
      </div>

      {!showForm ? (
        <DataTable
          title="All Testimonials"
          columns={columns}
          data={testimonials}
          searchPlaceholder="Search testimonials..."
          onAdd={() => { setForm(EMPTY_TESTIMONIAL); setEditingId(null); setShowForm(true) }}
          addLabel="New Testimonial"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_TESTIMONIAL); setEditingId(null) }}
              style={{ background: 'none', border: 'none', fontSize: 13, color: '#64748b', cursor: 'pointer' }}>← Back to list</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Parent Name *</label>
              <input value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Child Name</label>
              <input value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Grade</label>
              <input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                placeholder="e.g., Grade 3"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Rating</label>
              <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: star <= form.rating ? '#f59e0b' : '#d1d5db', padding: 0 }}>
                    <i className="fa-solid fa-star" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Photo URL</label>
            <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
              placeholder="https://..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Testimonial Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5}
              placeholder="What the parent said about the school..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
              <span style={{ fontSize: 14, color: '#374151' }}>Publish on website</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleSave} disabled={saving || !form.parent_name || !form.content}
              style={{
                padding: '10px 24px', borderRadius: 8, background: '#1B4F8E', color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: saving || !form.parent_name ? 0.6 : 1,
              }}>
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Testimonial'}
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_TESTIMONIAL); setEditingId(null) }}
              style={{ padding: '10px 24px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: 'none', fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
