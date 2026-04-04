import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api'

interface DashboardStats {
  enquiries: number
  blogs: number
  events: number
  gallery: number
  testimonials: number
  newEnquiries: number
}

const STAT_CARDS = [
  { key: 'newEnquiries', label: 'New Enquiries', icon: 'fa-solid fa-envelope', color: '#ef4444', bg: '#fef2f2', link: '/admin/enquiries' },
  { key: 'enquiries', label: 'Total Enquiries', icon: 'fa-solid fa-envelope-open-text', color: '#f59e0b', bg: '#fffbeb', link: '/admin/enquiries' },
  { key: 'blogs', label: 'Blog Posts', icon: 'fa-solid fa-newspaper', color: '#3b82f6', bg: '#eff6ff', link: '/admin/blogs' },
  { key: 'events', label: 'Events', icon: 'fa-solid fa-calendar-days', color: '#8b5cf6', bg: '#f5f3ff', link: '/admin/events' },
  { key: 'gallery', label: 'Gallery Items', icon: 'fa-solid fa-images', color: '#10b981', bg: '#ecfdf5', link: '/admin/gallery' },
  { key: 'testimonials', label: 'Testimonials', icon: 'fa-solid fa-star', color: '#f59e0b', bg: '#fffbeb', link: '/admin/testimonials' },
]

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    enquiries: 0, blogs: 0, events: 0, gallery: 0, testimonials: 0, newEnquiries: 0,
  })
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard/')
        setStats(res.data.stats || res.data)
        setRecentEnquiries(res.data.recent_enquiries || [])
      } catch {
        // Use placeholder data if API not ready
        setStats({ enquiries: 24, blogs: 8, events: 5, gallery: 42, testimonials: 12, newEnquiries: 6 })
        setRecentEnquiries([
          { id: 1, parent_name: 'Priya Sharma', child_name: 'Aarav', grade: 'Grade 1', phone: '9876543210', created_at: '2026-03-30', status: 'new' },
          { id: 2, parent_name: 'Rahul Kumar', child_name: 'Ananya', grade: 'Pre-K', phone: '9876543211', created_at: '2026-03-29', status: 'contacted' },
          { id: 3, parent_name: 'Meena Reddy', child_name: 'Karthik', grade: 'Grade 3', phone: '9876543212', created_at: '2026-03-28', status: 'new' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const getStatusBadge = (status: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      new: { bg: '#dbeafe', color: '#1d4ed8' },
      contacted: { bg: '#fef3c7', color: '#92400e' },
      enrolled: { bg: '#d1fae5', color: '#065f46' },
      closed: { bg: '#f3f4f6', color: '#6b7280' },
    }
    const c = colors[status] || colors.new
    return (
      <span style={{
        padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
        background: c.bg, color: c.color, textTransform: 'capitalize',
      }}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Welcome back! Here's an overview of your school website.</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {STAT_CARDS.map((card) => (
          <Link
            key={card.key}
            to={card.link}
            style={{
              background: '#fff', borderRadius: 12, padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)' }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={card.icon} style={{ fontSize: 20, color: card.color }} />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1e293b' }}>
                {(stats as any)[card.key] ?? 0}
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', margin: 0 }}>Recent Enquiries</h2>
          <Link to="/admin/enquiries" style={{ fontSize: 13, color: '#1B4F8E', textDecoration: 'none' }}>
            View All →
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Parent Name', 'Child Name', 'Grade', 'Phone', 'Date', 'Status'].map((h) => (
                  <th key={h} style={{
                    padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#64748b',
                    textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#1e293b', fontWeight: 500 }}>{enq.parent_name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{enq.child_name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{enq.grade}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{enq.phone}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{enq.created_at}</td>
                  <td style={{ padding: '12px 16px' }}>{getStatusBadge(enq.status)}</td>
                </tr>
              ))}
              {recentEnquiries.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
