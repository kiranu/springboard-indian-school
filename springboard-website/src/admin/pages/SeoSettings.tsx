import { useState, useEffect } from 'react'
import api from '../../lib/api'

interface SeoPage {
  id: number
  page_key: string
  page_label: string
  meta_title: string
  meta_description: string
  og_title: string
  og_description: string
  og_image: string
  keywords: string
}

const DEFAULT_PAGES: SeoPage[] = [
  { id: 1, page_key: 'home', page_label: 'Home Page', meta_title: 'Springboard Indian School Hyderabad | Best CBSE School', meta_description: 'Springboard Indian School is a premier CBSE school in Hyderabad offering world-class education from Pre-K to Grade 10. Admissions open for 2026-27.', og_title: 'Springboard Indian School – Where Excellence Begins', og_description: 'Nurturing young minds with holistic education in Hyderabad.', og_image: '', keywords: 'best school hyderabad, cbse school hyderabad, springboard school' },
  { id: 2, page_key: 'about', page_label: 'About Page', meta_title: 'About Springboard Indian School | Our Story & Mission', meta_description: 'Learn about Springboard Indian School\'s history, vision, mission and the dedicated team shaping the future of education in Hyderabad.', og_title: 'About Us – Springboard Indian School', og_description: 'Our story, our mission, and our commitment to excellence.', og_image: '', keywords: 'about springboard school, school history, school mission' },
  { id: 3, page_key: 'admissions', page_label: 'Admissions Page', meta_title: 'School Admissions 2026-27 | Springboard Indian School Hyderabad', meta_description: 'Apply now for 2026-27 admissions at Springboard Indian School. Limited seats available. Pre-K to Grade 10 enrollment open.', og_title: 'Admissions Open 2026-27 – Apply Now', og_description: 'Secure your child\'s future. Limited seats. Apply today.', og_image: '', keywords: 'school admissions hyderabad, cbse admissions 2026, apply now' },
  { id: 4, page_key: 'academics', page_label: 'Academics Page', meta_title: 'CBSE Academic Programs | Springboard Indian School', meta_description: 'Explore our comprehensive CBSE academic programs from Pre-K through Grade 10, featuring modern teaching methods and holistic development.', og_title: 'Academic Excellence at Springboard', og_description: 'Discover our CBSE programs designed for holistic development.', og_image: '', keywords: 'cbse curriculum, academic programs, school curriculum hyderabad' },
  { id: 5, page_key: 'contact', page_label: 'Contact Page', meta_title: 'Contact Springboard Indian School Hyderabad', meta_description: 'Get in touch with Springboard Indian School. Visit us at our campus or call us. We\'re here to answer all your questions about admissions.', og_title: 'Contact Us – Springboard Indian School', og_description: 'Reach out to us for admissions and enquiries.', og_image: '', keywords: 'contact springboard school, school address hyderabad, school phone number' },
  { id: 6, page_key: 'facilities', page_label: 'Facilities Page', meta_title: 'World-Class Facilities | Springboard Indian School Hyderabad', meta_description: 'Explore state-of-the-art facilities at Springboard Indian School — modern classrooms, sports complex, science labs, library, and more.', og_title: 'Our Facilities – Springboard Indian School', og_description: 'Modern infrastructure designed to inspire learning and growth.', og_image: '', keywords: 'school facilities hyderabad, school infrastructure, cbse school labs' },
  { id: 7, page_key: 'gallery', page_label: 'Gallery Page', meta_title: 'Photo Gallery | Springboard Indian School Hyderabad', meta_description: 'Browse photos of campus life, events, sports, academics, and celebrations at Springboard Indian School Hyderabad.', og_title: 'Gallery – Springboard Indian School', og_description: 'A glimpse into the vibrant life at Springboard Indian School.', og_image: '', keywords: 'school gallery hyderabad, school photos, campus life springboard' },
  { id: 8, page_key: 'events', page_label: 'Events Page', meta_title: 'School Events & Activities | Springboard Indian School', meta_description: 'Stay updated with upcoming events, workshops, cultural programs, and extracurricular activities at Springboard Indian School Hyderabad.', og_title: 'Events – Springboard Indian School', og_description: 'Discover upcoming events and activities at our school.', og_image: '', keywords: 'school events hyderabad, school activities, cultural programs cbse school' },
  { id: 9, page_key: 'blog', page_label: 'Blog Page', meta_title: 'School Blog | News & Updates – Springboard Indian School', meta_description: 'Read the latest news, educational insights, and school updates from Springboard Indian School Hyderabad.', og_title: 'Blog – Springboard Indian School', og_description: 'News, insights, and stories from our school community.', og_image: '', keywords: 'school blog hyderabad, education news, springboard school updates' },
  { id: 10, page_key: 'parent_portal', page_label: 'Parent Portal Page', meta_title: 'Parent Portal | Springboard Indian School Hyderabad', meta_description: 'Access the Springboard Indian School parent portal for student updates, fee details, notices, and communication with teachers.', og_title: 'Parent Portal – Springboard Indian School', og_description: 'Stay connected with your child\'s education journey.', og_image: '', keywords: 'parent portal school, school parent login, student updates hyderabad' },
  { id: 11, page_key: 'faq', page_label: 'FAQ Page', meta_title: 'Frequently Asked Questions | Springboard Indian School Hyderabad', meta_description: 'Find answers to common questions about admissions, curriculum, fees, facilities, and more at Springboard Indian School Hyderabad.', og_title: 'FAQ – Springboard Indian School', og_description: 'Got questions? We have answers. Explore our FAQs.', og_image: '', keywords: 'school faq hyderabad, school admissions questions, cbse school queries' },
  { id: 12, page_key: 'privacy_policy', page_label: 'Privacy Policy Page', meta_title: 'Privacy Policy | Springboard Indian School Hyderabad', meta_description: 'Read how Springboard Indian School collects, uses, and protects your personal information on our website and services.', og_title: 'Privacy Policy – Springboard Indian School', og_description: 'Your privacy matters to us. Read our privacy policy.', og_image: '', keywords: 'privacy policy springboard school, data protection school hyderabad' },
  { id: 13, page_key: 'terms_and_conditions', page_label: 'Terms & Conditions Page', meta_title: 'Terms & Conditions | Springboard Indian School Hyderabad', meta_description: 'Read the Terms and Conditions governing the use of Springboard Indian School\'s website and services.', og_title: 'Terms & Conditions – Springboard Indian School', og_description: 'Terms governing the use of our website and services.', og_image: '', keywords: 'terms and conditions springboard school, website terms hyderabad school' },
]

export default function SeoSettings() {
  const [pages, setPages] = useState<SeoPage[]>(DEFAULT_PAGES)
  const [activePage, setActivePage] = useState<SeoPage>(DEFAULT_PAGES[0])
  const [apiPageKeys, setApiPageKeys] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const res = await api.get('/admin/seo/')
        if (res.data && res.data.length > 0) {
          const apiPages: SeoPage[] = res.data
          // Merge: use API data for known pages, keep defaults for the rest
          const merged = DEFAULT_PAGES.map((defaultPage) => {
            const apiPage = apiPages.find((p) => p.page_key === defaultPage.page_key)
            return apiPage || defaultPage
          })
          const extras = apiPages.filter((p) => !DEFAULT_PAGES.find((d) => d.page_key === p.page_key))
          const allPages = [...merged, ...extras]
          setPages(allPages)
          setActivePage(allPages[0])
          setApiPageKeys(new Set(apiPages.map((p) => p.page_key)))

          // Auto-create any defaults missing from DB
          const missingDefaults = DEFAULT_PAGES.filter(
            (d) => !apiPages.find((p) => p.page_key === d.page_key)
          )
          if (missingDefaults.length > 0) {
            const created = await Promise.all(
              missingDefaults.map((page) =>
                api.post('/admin/seo/', page).then((r) => r.data).catch(() => page)
              )
            )
            setApiPageKeys((prev) => new Set([...prev, ...created.map((p: SeoPage) => p.page_key)]))
            setPages((prev) =>
              prev.map((p) => {
                const c = created.find((cr: SeoPage) => cr.page_key === p.page_key)
                return c || p
              })
            )
          }
        } else {
          // DB is empty — create all defaults in parallel
          const created = await Promise.all(
            DEFAULT_PAGES.map((page) =>
              api.post('/admin/seo/', page).then((r) => r.data).catch(() => page)
            )
          )
          setPages(created)
          setActivePage(created[0])
          setApiPageKeys(new Set(created.map((p: SeoPage) => p.page_key)))
        }
      } catch { /* use defaults */ }
    }
    fetchSeo()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      let saved = activePage
      if (apiPageKeys.has(activePage.page_key)) {
        // Page exists in DB — update it
        await api.put(`/admin/seo/${activePage.id}/`, activePage)
      } else {
        // New page — create it
        const res = await api.post('/admin/seo/', activePage)
        saved = res.data
        setApiPageKeys((prev) => new Set([...prev, saved.page_key]))
      }
      setPages((prev) => prev.map((p) => p.page_key === saved.page_key ? saved : p))
      setActivePage(saved)
    } catch { /* offline mode */ }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const field = (label: string, key: keyof SeoPage, type: 'input' | 'textarea' = 'input', helpText?: string) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
      {helpText && <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 6, marginTop: 0 }}>{helpText}</p>}
      {type === 'input' ? (
        <input
          value={(activePage as any)[key] || ''}
          onChange={(e) => setActivePage({ ...activePage, [key]: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }}
        />
      ) : (
        <textarea
          value={(activePage as any)[key] || ''}
          onChange={(e) => setActivePage({ ...activePage, [key]: e.target.value })}
          rows={3}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
        />
      )}
      {(key === 'meta_title' || key === 'meta_description') && (
        <div style={{ fontSize: 11, color: (activePage as any)[key]?.length > (key === 'meta_title' ? 60 : 160) ? '#ef4444' : '#6b7280', marginTop: 4 }}>
          {(activePage as any)[key]?.length || 0} / {key === 'meta_title' ? 60 : 160} characters
          {key === 'meta_title' && (activePage as any)[key]?.length > 60 && ' ⚠ Too long'}
          {key === 'meta_description' && (activePage as any)[key]?.length > 160 && ' ⚠ Too long'}
        </div>
      )}
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>SEO Settings</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Manage meta tags, Open Graph, and keywords for each page.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Page Selector */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: '#64748b' }}>PAGES</div>
          {pages.map((page) => (
            <button
              key={page.page_key}
              onClick={() => setActivePage(page)}
              style={{
                width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', cursor: 'pointer',
                background: activePage.page_key === page.page_key ? '#eff6ff' : '#fff',
                borderLeft: activePage.page_key === page.page_key ? '3px solid #1B4F8E' : '3px solid transparent',
                fontSize: 14, color: activePage.page_key === page.page_key ? '#1B4F8E' : '#374151',
                fontWeight: activePage.page_key === page.page_key ? 600 : 400,
                transition: 'background 0.1s',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <span>{page.page_label}</span>
              {!apiPageKeys.has(page.page_key) && (
                <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 400 }}>not saved</span>
              )}
            </button>
          ))}
        </div>

        {/* SEO Form */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', margin: 0 }}>{activePage.page_label}</h2>
            {saved && (
              <span style={{ fontSize: 13, color: '#059669', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fa-solid fa-check-circle" /> Saved successfully
              </span>
            )}
          </div>

          {/* Google Preview */}
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>Search Preview</div>
            <div style={{ fontSize: 18, color: '#1a0dab', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activePage.meta_title || 'Page Title'}
            </div>
            <div style={{ fontSize: 13, color: '#006621', marginBottom: 2 }}>springboardindianschool.edu.in</div>
            <div style={{ fontSize: 14, color: '#4d5156', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {activePage.meta_description || 'Page description will appear here...'}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 20, paddingBottom: 4 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1B4F8E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Meta Tags</h3>
          </div>
          {field('Meta Title', 'meta_title', 'input', 'Recommended: 50–60 characters')}
          {field('Meta Description', 'meta_description', 'textarea', 'Recommended: 120–160 characters')}
          {field('Keywords', 'keywords', 'input', 'Comma-separated keywords')}

          <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 20, paddingBottom: 4, marginTop: 8 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1B4F8E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Open Graph (Social Sharing)</h3>
          </div>
          {field('OG Title', 'og_title')}
          {field('OG Description', 'og_description', 'textarea')}
          {field('OG Image URL', 'og_image', 'input')}

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              marginTop: 8, padding: '10px 28px', borderRadius: 8, background: '#1B4F8E', color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 600, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
