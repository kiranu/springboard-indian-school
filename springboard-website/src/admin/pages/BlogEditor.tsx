import { useState, useEffect } from 'react'
import api from '../../lib/api'
import DataTable, { Column } from '../components/DataTable'
import FileUpload from '../components/FileUpload'
import MediaLibrary from './MediaLibrary'

interface Blog {
  id: number
  title: string
  slug: string
  category: string
  author: string
  excerpt: string
  content: string
  featured_image: string
  is_published: boolean
  created_at: string
}

const EMPTY_BLOG: Omit<Blog, 'id' | 'created_at'> = {
  title: '', slug: '', category: 'School Life', author: 'Admin',
  excerpt: '', content: '', featured_image: '', is_published: false,
}

const CATEGORIES = ['School Life', 'Academics', 'Events', 'Parenting Tips', 'Achievements', 'Announcements']

export default function BlogEditor() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_BLOG)
  const [saving, setSaving] = useState(false)
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/admin/blogs/')
      setBlogs(res.data.results || res.data)
    } catch {
      setBlogs([
        { id: 1, title: 'Why Early Childhood Education Matters', slug: 'early-childhood-education', category: 'Academics', author: 'Admin', excerpt: 'Discover the lasting impact of quality early education...', content: '', featured_image: '', is_published: true, created_at: '2026-03-25' },
        { id: 2, title: 'Annual Sports Day Highlights 2026', slug: 'sports-day-2026', category: 'Events', author: 'Admin', excerpt: 'Relive the exciting moments from our annual sports day...', content: '', featured_image: '', is_published: true, created_at: '2026-03-20' },
        { id: 3, title: '10 Tips for Parents: Supporting Homework', slug: 'homework-tips-parents', category: 'Parenting Tips', author: 'Admin', excerpt: 'Simple strategies to help your child succeed...', content: '', featured_image: '', is_published: false, created_at: '2026-03-18' },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, slug: form.slug || generateSlug(form.title) }
    try {
      if (editingId) {
        await api.put(`/admin/blogs/${editingId}/`, payload)
        setBlogs((prev) => prev.map((b) => b.id === editingId ? { ...b, ...payload } : b))
      } else {
        const res = await api.post('/admin/blogs/', payload)
        setBlogs((prev) => [{ id: res.data.id || Date.now(), ...payload, created_at: new Date().toISOString().split('T')[0] } as Blog, ...prev])
      }
    } catch {
      // offline mode — update locally
      if (editingId) {
        setBlogs((prev) => prev.map((b) => b.id === editingId ? { ...b, ...payload } : b))
      } else {
        setBlogs((prev) => [{ id: Date.now(), ...payload, created_at: new Date().toISOString().split('T')[0] } as Blog, ...prev])
      }
    } finally {
      setSaving(false)
      setShowForm(false)
      setEditingId(null)
      setForm(EMPTY_BLOG)
    }
  }

  const handleEdit = (row: Blog) => {
    setEditingId(row.id)
    setForm({
      title: row.title, slug: row.slug, category: row.category,
      author: row.author, excerpt: row.excerpt, content: row.content,
      featured_image: row.featured_image, is_published: row.is_published,
    })
    setShowForm(true)
  }

  const handleDelete = async (row: Blog) => {
    if (!window.confirm(`Delete "${row.title}"?`)) return
    try { await api.delete(`/admin/blogs/${row.id}/`) } catch { /* offline */ }
    setBlogs((prev) => prev.filter((b) => b.id !== row.id))
  }

  const columns: Column<Blog>[] = [
    { key: 'title', label: 'Title', render: (v) => <span style={{ fontWeight: 500, color: '#1e293b' }}>{v}</span> },
    { key: 'category', label: 'Category', render: (v) => (
      <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: '#f0f9ff', color: '#0369a1' }}>{v}</span>
    )},
    { key: 'author', label: 'Author' },
    { key: 'is_published', label: 'Status', render: (v) => (
      <span style={{
        padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
        background: v ? '#d1fae5' : '#fef3c7', color: v ? '#065f46' : '#92400e',
      }}>{v ? 'Published' : 'Draft'}</span>
    )},
    { key: 'created_at', label: 'Date' },
  ]

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
      <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
    </div>
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Blog Posts</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Create and manage blog articles for your school website.</p>
      </div>

      {!showForm ? (
        <DataTable
          title="All Blog Posts"
          columns={columns}
          data={blogs}
          searchPlaceholder="Search blogs..."
          onAdd={() => { setForm(EMPTY_BLOG); setEditingId(null); setShowForm(true) }}
          addLabel="New Post"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{editingId ? 'Edit Post' : 'Create New Post'}</h2>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_BLOG); setEditingId(null) }}
              style={{ background: 'none', border: 'none', fontSize: 13, color: '#64748b', cursor: 'pointer' }}>
              ← Back to list
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box', color: '#64748b' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Author</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
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
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12}
              placeholder="Write your blog post content here... (HTML supported)"
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
              {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY_BLOG); setEditingId(null) }}
              style={{ padding: '10px 24px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: 'none', fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
