import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'fa-solid fa-gauge-high' },
  { label: 'Enquiries', path: '/admin/enquiries', icon: 'fa-solid fa-envelope-open-text' },
  { label: 'Blog Posts', path: '/admin/blogs', icon: 'fa-solid fa-newspaper' },
  { label: 'Events', path: '/admin/events', icon: 'fa-solid fa-calendar-days' },
  { label: 'Gallery', path: '/admin/gallery', icon: 'fa-solid fa-images' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: 'fa-solid fa-star' },
  { label: 'Media Library', path: '/admin/media', icon: 'fa-solid fa-photo-film' },
  { label: 'SEO Settings', path: '/admin/seo', icon: 'fa-solid fa-chart-line' },
  { label: 'Site Settings', path: '/admin/settings', icon: 'fa-solid fa-gear' },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 260 : 72,
          background: '#1B4F8E',
          transition: 'width 0.3s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/assets/img/springboard-logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', objectFit: 'contain' }} />
          {sidebarOpen && (
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Springboard</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  marginBottom: 4,
                  transition: 'all 0.2s',
                }}
              >
                <i className={item.icon} style={{ width: 20, textAlign: 'center', fontSize: 16 }} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 8, width: '100%',
              color: 'rgba(255,255,255,0.7)', background: 'transparent',
              border: 'none', cursor: 'pointer', fontSize: 14,
            }}
          >
            <i className="fa-solid fa-right-from-bracket" style={{ width: 20, textAlign: 'center' }} />
            {sidebarOpen && <span>Logout</span>}
          </button>
          <Link
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 8,
              color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14,
            }}
          >
            <i className="fa-solid fa-globe" style={{ width: 20, textAlign: 'center' }} />
            {sidebarOpen && <span>View Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 260 : 72, transition: 'margin-left 0.3s ease' }}>
        {/* Top Bar */}
        <header style={{
          background: '#fff', padding: '12px 24px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}
          >
            <i className="fa-solid fa-bars" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 13, color: '#888' }}>Welcome, Admin</span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#1B4F8E', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14,
            }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: 24 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
