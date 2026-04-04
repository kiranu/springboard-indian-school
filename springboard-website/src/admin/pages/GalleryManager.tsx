import { useState, useEffect } from 'react'
import api from '../../lib/api'
import FileUpload from '../components/FileUpload'
import MediaLibrary from './MediaLibrary'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
  is_published: boolean
  sort_order: number
  created_at: string
}

const CATEGORIES = ['Campus', 'Events', 'Sports', 'Arts', 'Academics', 'Celebrations']

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', category: 'Campus', image_url: '', is_published: true, sort_order: 0 })
  const [saving, setSaving] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const fetchGallery = async () => {
    try {
      const res = await api.get('/admin/gallery/')
      setItems(res.data.results || res.data)
    } catch {
      setItems([
        { id: 1, title: 'School Building', category: 'Campus', image_url: '/assets/img/gallery/gallery-1.jpg', is_published: true, sort_order: 1, created_at: '2026-03-20' },
        { id: 2, title: 'Science Lab', category: 'Academics', image_url: '/assets/img/gallery/gallery-2.jpg', is_published: true, sort_order: 2, created_at: '2026-03-19' },
        { id: 3, title: 'Sports Day', category: 'Sports', image_url: '/assets/img/gallery/gallery-3.jpg', is_published: true, sort_order: 3, created_at: '2026-03-18' },
        { id: 4, title: 'Annual Day Celebration', category: 'Events', image_url: '/assets/img/gallery/gallery-4.jpg', is_published: true, sort_order: 4, created_at: '2026-03-17' },
        { id: 5, title: 'Art Exhibition', category: 'Arts', image_url: '/assets/img/gallery/gallery-5.jpg', is_published: false, sort_order: 5, created_at: '2026-03-16' },
        { id: 6, title: 'Playground', category: 'Campus', image_url: '/assets/img/gallery/gallery-6.jpg', is_published: true, sort_order: 6, created_at: '2026-03-15' },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGallery() }, [])

  const filtered = filterCategory === 'All' ? items : items.filter((i) => i.category === filterCategory)

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/admin/gallery/${editingId}/`, form)
        setItems((prev) => prev.map((i) => i.id === editingId ? { ...i, ...form } : i))
      } else {
        const res = await api.post('/admin/gallery/', form)
        setItems((prev) => [...prev, { id: res.data.id || Date.now(), ...form, created_at: new Date().toISOString().split('T')[0] } as GalleryItem])
      }
    } catch {
      if (editingId) {
        setItems((prev) => prev.map((i) => i.id === editingId ? { ...i, ...form } : i))
      } else {
        setItems((prev) => [...prev, { id: Date.now(), ...form, created_at: new Date().toISOString().split('T')[0] } as GalleryItem])
      }
    } finally {
      setSaving(false); setShowForm(false); setEditingId(null)
      setForm({ title: '', category: 'Campus', image_url: '', is_published: true, sort_order: 0 })
    }
  }

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return
    try { await api.delete(`/admin/gallery/${item.id}/`) } catch {}
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  const togglePublish = async (item: GalleryItem) => {
    const updated = { ...item, is_published: !item.is_published }
    try { await api.patch(`/admin/gallery/${item.id}/`, { is_published: updated.is_published }) } catch {}
    setItems((prev) => prev.map((i) => i.id === item.id ? updated : i))
  }

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
    </div>
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Gallery</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Manage your school's photo gallery.</p>
        </div>
        <button onClick={() => { setForm({ title: '', category: 'Campus', image_url: '', is_published: true, sort_order: items.length + 1 }); setEditingId(null); setShowForm(true) }}
          style={{ padding: '10px 20px', borderRadius: 8, background: '#1B4F8E', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-plus" /> Add Image
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['All', ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setFilterCategory(cat)}
            style={{
              padding: '6px 16px', borderRadius: 20, border: '1px solid',
              borderColor: filterCategory === cat ? '#1B4F8E' : '#d1d5db',
              background: filterCategory === cat ? '#1B4F8E' : '#fff',
              color: filterCategory === cat ? '#fff' : '#475569',
              fontSize: 13, cursor: 'pointer', fontWeight: filterCategory === cat ? 600 : 400,
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filtered.map((item) => (
          <div key={item.id} style={{
            background: '#fff', borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'relative',
          }}>
            <div style={{ height: 180, background: '#f1f5f9', position: 'relative' }}>
              <img src={item.image_url} alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              {!item.is_published && (
                <span style={{
                  position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 6,
                  background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 11, fontWeight: 600,
                }}>Draft</span>
              )}
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>{item.category}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => {
                  setEditingId(item.id)
                  setForm({ title: item.title, category: item.category, image_url: item.image_url, is_published: item.is_published, sort_order: item.sort_order })
                  setShowForm(true)
                }} style={{ padding: '4px 10px', borderRadius: 6, background: '#eff6ff', color: '#1d4ed8', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                  <i className="fa-solid fa-pen" /> Edit
                </button>
                <button onClick={() => togglePublish(item)}
                  style={{ padding: '4px 10px', borderRadius: 6, background: item.is_published ? '#fef3c7' : '#d1fae5', color: item.is_published ? '#92400e' : '#065f46', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                  {item.is_published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => handleDelete(item)}
                  style={{ padding: '4px 10px', borderRadius: 6, background: '#fef2f2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowForm(false)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 24px' }}>{editingId ? 'Edit Image' : 'Add New Image'}</h3>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <FileUpload
              value={form.image_url}
              label="Image *"
              hint="JPG, PNG, WebP, GIF up to 5MB"
              accept="image/*"
              onUpload={(f) => setForm({ ...form, image_url: f.url || '' })}
              onPickFromLibrary={() => setShowMediaPicker(true)}
            />

            {showMediaPicker && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => setShowMediaPicker(false)}>
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 900, maxHeight: '85vh', overflowY: 'auto' }}
                  onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Pick from Media Library</h3>
                    <button onClick={() => setShowMediaPicker(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#94a3b8' }}>×</button>
                  </div>
                  <MediaLibrary pickerMode pickerFilter="image"
                    onPick={(f) => { setForm({ ...form, image_url: f.url }); setShowMediaPicker(false) }} />
                </div>
              </div>
            )}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                <span style={{ fontSize: 14, color: '#374151' }}>Published</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSave} disabled={saving || !form.title}
                style={{ padding: '10px 24px', borderRadius: 8, background: '#1B4F8E', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: saving || !form.title ? 0.6 : 1 }}>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add Image'}
              </button>
              <button onClick={() => { setShowForm(false); setEditingId(null) }}
                style={{ padding: '10px 24px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: 'none', fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
