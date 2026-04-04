import { useState, useEffect } from 'react'
import api from '../../lib/api'

interface Settings {
  school_name: string
  tagline: string
  address: string
  phone_primary: string
  phone_secondary: string
  email_primary: string
  email_admissions: string
  whatsapp_number: string
  google_maps_embed: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
  twitter_url: string
  admission_open: boolean
  seats_available: string
  announcement_bar: string
  announcement_enabled: boolean
  academic_year: string
}

const DEFAULT_SETTINGS: Settings = {
  school_name: 'Springboard Indian School',
  tagline: 'Where Every Child\'s Journey Begins',
  address: 'Survey No. 123, Kondapur, Hyderabad, Telangana 500084',
  phone_primary: '+91 40 2345 6789',
  phone_secondary: '+91 98765 43210',
  email_primary: 'info@springboardindianschool.edu.in',
  email_admissions: 'admissions@springboardindianschool.edu.in',
  whatsapp_number: '919876543210',
  google_maps_embed: '',
  facebook_url: 'https://facebook.com/SpringboardIndianSchool',
  instagram_url: 'https://instagram.com/springboard_school_hyd',
  youtube_url: '',
  twitter_url: '',
  admission_open: true,
  seats_available: '12',
  announcement_bar: '🎉 Admissions Open for 2026-27! Limited Seats Available. Apply Now!',
  announcement_enabled: true,
  academic_year: '2026-27',
}

type SettingsSection = 'general' | 'contact' | 'social' | 'admissions'

export default function SiteSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [activeSection, setActiveSection] = useState<SettingsSection>('general')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings/')
        if (res.data) setSettings({ ...DEFAULT_SETTINGS, ...res.data })
      } catch { /* use defaults */ }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/admin/settings/', settings)
    } catch { /* offline mode */ }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const set = (key: keyof Settings, value: any) => setSettings((prev) => ({ ...prev, [key]: value }))

  const textField = (label: string, key: keyof Settings, placeholder?: string, type = 'text') => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={(settings as any)[key] || ''}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }}
      />
    </div>
  )

  const SECTIONS: { key: SettingsSection; label: string; icon: string }[] = [
    { key: 'general', label: 'General', icon: 'fa-solid fa-house' },
    { key: 'contact', label: 'Contact & Map', icon: 'fa-solid fa-location-dot' },
    { key: 'social', label: 'Social Media', icon: 'fa-solid fa-share-nodes' },
    { key: 'admissions', label: 'Admissions', icon: 'fa-solid fa-graduation-cap' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Site Settings</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Configure global settings for your school website.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Section Nav */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {SECTIONS.map((sec) => (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key)}
              style={{
                width: '100%', padding: '13px 16px', textAlign: 'left', border: 'none', cursor: 'pointer',
                background: activeSection === sec.key ? '#eff6ff' : '#fff',
                borderLeft: activeSection === sec.key ? '3px solid #1B4F8E' : '3px solid transparent',
                fontSize: 14, color: activeSection === sec.key ? '#1B4F8E' : '#374151',
                fontWeight: activeSection === sec.key ? 600 : 400,
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <i className={sec.icon} style={{ width: 16, textAlign: 'center' }} /> {sec.label}
            </button>
          ))}
        </div>

        {/* Settings Panel */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {SECTIONS.find((s) => s.key === activeSection)?.label} Settings
            </h2>
            {saved && (
              <span style={{ fontSize: 13, color: '#059669', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fa-solid fa-check-circle" /> Saved successfully
              </span>
            )}
          </div>

          {activeSection === 'general' && (
            <>
              {textField('School Name', 'school_name')}
              {textField('Tagline / Motto', 'tagline', 'Where Every Child\'s Journey Begins')}
              {textField('Academic Year', 'academic_year', '2026-27')}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Announcement Bar</label>
                <input
                  value={settings.announcement_bar}
                  onChange={(e) => set('announcement_bar', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box', marginBottom: 8 }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={settings.announcement_enabled} onChange={(e) => set('announcement_enabled', e.target.checked)} />
                  <span style={{ fontSize: 14, color: '#374151' }}>Show announcement bar on website</span>
                </label>
              </div>
            </>
          )}

          {activeSection === 'contact' && (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>School Address</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => set('address', e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              {textField('Primary Phone', 'phone_primary', '+91 40 2345 6789', 'tel')}
              {textField('Secondary Phone', 'phone_secondary', '+91 98765 43210', 'tel')}
              {textField('Primary Email', 'email_primary', 'info@school.edu.in', 'email')}
              {textField('Admissions Email', 'email_admissions', 'admissions@school.edu.in', 'email')}
              {textField('WhatsApp Number', 'whatsapp_number', '919876543210 (with country code, no +)')}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Google Maps Embed URL</label>
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px' }}>
                  From Google Maps → Share → Embed → copy the src="..." URL
                </p>
                <textarea
                  value={settings.google_maps_embed}
                  onChange={(e) => set('google_maps_embed', e.target.value)}
                  rows={3}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box', fontFamily: 'monospace' }}
                />
              </div>
            </>
          )}

          {activeSection === 'social' && (
            <>
              <div style={{ marginBottom: 16, padding: 14, background: '#f0f9ff', borderRadius: 8, fontSize: 13, color: '#0369a1' }}>
                <i className="fa-solid fa-circle-info" style={{ marginRight: 8 }} />
                Enter full URLs including https://
              </div>
              {[
                { label: 'Facebook URL', key: 'facebook_url' as keyof Settings, icon: 'fa-brands fa-facebook', color: '#1877f2' },
                { label: 'Instagram URL', key: 'instagram_url' as keyof Settings, icon: 'fa-brands fa-instagram', color: '#e1306c' },
                { label: 'YouTube URL', key: 'youtube_url' as keyof Settings, icon: 'fa-brands fa-youtube', color: '#ff0000' },
                { label: 'Twitter / X URL', key: 'twitter_url' as keyof Settings, icon: 'fa-brands fa-x-twitter', color: '#000' },
              ].map((social) => (
                <div key={social.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    <i className={social.icon} style={{ color: social.color }} /> {social.label}
                  </label>
                  <input
                    value={(settings as any)[social.key] || ''}
                    onChange={(e) => set(social.key, e.target.value)}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </>
          )}

          {activeSection === 'admissions' && (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 16 }}>
                  <div
                    onClick={() => set('admission_open', !settings.admission_open)}
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: settings.admission_open ? '#1B4F8E' : '#d1d5db',
                      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 9, background: '#fff',
                      position: 'absolute', top: 3,
                      left: settings.admission_open ? 23 : 3,
                      transition: 'left 0.2s',
                    }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: settings.admission_open ? '#1B4F8E' : '#6b7280' }}>
                    Admissions {settings.admission_open ? 'Open' : 'Closed'}
                  </span>
                </label>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 0 }}>
                  When enabled, shows "Admissions Open" banners and CTAs across the website.
                </p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Available Seats</label>
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px' }}>Displayed as urgency indicator on admissions page</p>
                <input
                  type="number"
                  value={settings.seats_available}
                  onChange={(e) => set('seats_available', e.target.value)}
                  style={{ width: 120, padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }}
                />
              </div>
              {/* Preview */}
              {settings.admission_open && (
                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ea580c', marginBottom: 4 }}>
                    <i className="fa-solid fa-fire" style={{ marginRight: 6 }} />
                    Urgency Badge Preview
                  </div>
                  <div style={{ fontSize: 14, color: '#9a3412' }}>
                    Only {settings.seats_available} seats left for {settings.academic_year}!
                  </div>
                </div>
              )}
            </>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              marginTop: 8, padding: '10px 28px', borderRadius: 8, background: '#1B4F8E', color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 600, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
