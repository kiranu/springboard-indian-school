import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import api from '../lib/api'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
  sort_order: number
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery/')
        const data = Array.isArray(res.data) ? res.data : res.data.results || []
        setItems(data)

        // Extract unique categories
        const cats = ['All', ...Array.from(new Set(data.map((item: GalleryItem) => item.category)))]
        setCategories(cats)
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
        setItems([])
        setCategories(['All'])
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Filter items by category
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory)

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') setLightboxIndex(null)
    if (e.key === 'ArrowLeft') setLightboxIndex(i => (i! > 0 ? i! - 1 : filteredItems.length - 1))
    if (e.key === 'ArrowRight') setLightboxIndex(i => (i! < filteredItems.length - 1 ? i! + 1 : 0))
  }, [lightboxIndex, filteredItems.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Arrange items in rows (4 items per row)
  const galleryRows = []
  for (let i = 0; i < filteredItems.length; i += 4) {
    galleryRows.push(filteredItems.slice(i, i + 4))
  }

  // Assign column classes for styling
  const colClasses = ['vs-gallery--col1', 'vs-gallery--col2', 'vs-gallery--col3', 'vs-gallery--col4']
  const itemsWithClasses = galleryRows.map(row =>
    row.map((item, idx) => ({ ...item, colClass: colClasses[idx % 4] }))
  )

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex(i => i.id === item.id)
    setLightboxIndex(idx)
  }

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  return (
    <>
      <SeoHead
        title="Gallery"
        description="View our gallery showcasing student activities, events, facilities, and campus life at Springboard Indian School."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Our Gallery</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Our Gallery</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Class / Gallery */}
      <section className="vs-class--area bg-color6 space space-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">School Gallery</span>
                  <h2 className="vs-title__main">Our Gallery For Kids</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 25,
                    border: selectedCategory === cat ? 'none' : '1px solid #ddd',
                    background: selectedCategory === cat ? '#1B4F8E' : 'transparent',
                    color: selectedCategory === cat ? '#fff' : '#333',
                    fontSize: 14,
                    fontWeight: selectedCategory === cat ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: 16, color: '#666' }}>No images found in this category.</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && filteredItems.length > 0 && itemsWithClasses.map((row, rowIdx) => (
            <div key={rowIdx} className="vs-gallery--row" style={{ marginTop: rowIdx > 0 ? '30px' : '0' }}>
              {row.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
                  }}
                  className={`vs-gallery ${item.colClass}`}
                >
                  <div className="vs-gallery__figure">
                    <div
                      className="vs-gallery__image--link"
                      onClick={() => openLightbox(item)}
                      style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}
                    >
                      <img
                        className="vs-gallery__image"
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="vs-gallery__hover">
                    <button
                      onClick={() => openLightbox(item)}
                      className="vs-gallery__icon"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FaEye />
                    </button>
                    <span className="vs-gallery__cate">{item.category}</span>
                    <h4 className="vs-gallery__heading">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <AdmissionCta subtitle="Love what you see? Schedule a campus visit to experience our school firsthand!" />

      {/* Lightbox */}
      {currentItem && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: 20, zIndex: 1,
            }}
          >
            <FaTimes />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(i => (i! > 0 ? i! - 1 : filteredItems.length - 1))
            }}
            style={{
              position: 'absolute', left: 16,
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: 22,
            }}
          >
            <FaChevronLeft />
          </button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '88vw' }}
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              style={{
                maxWidth: '88vw', maxHeight: '80vh',
                objectFit: 'contain', borderRadius: 8,
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            />
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{currentItem.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 4 }}>
                {currentItem.category} &nbsp;·&nbsp; {lightboxIndex! + 1} / {filteredItems.length}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(i => (i! < filteredItems.length - 1 ? i! + 1 : 0))
            }}
            style={{
              position: 'absolute', right: 16,
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: 22,
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </>
  )
}
