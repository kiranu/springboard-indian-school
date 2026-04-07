import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
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
                    <a className="vs-gallery__image--link" href={item.image_url} target="_blank" rel="noreferrer">
                      <img
                        className="vs-gallery__image"
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </a>
                  </div>
                  <div className="vs-gallery__hover">
                    <a href={item.image_url} target="_blank" rel="noreferrer" className="vs-gallery__icon">
                      <FaEye />
                    </a>
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
    </>
  )
}
