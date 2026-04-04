import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaCalendarDays, FaTag, FaMagnifyingGlass, FaArrowRight, FaEnvelopeOpenText } from 'react-icons/fa6'
import SeoHead from '../../components/seo/SeoHead'
import AdmissionCta from '../../components/shared/AdmissionCta'
import api from '../../lib/api'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&h=450&fit=crop'

interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  author: string
  excerpt: string
  featured_image: string
  created_at: string
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const params: Record<string, string> = {}
        if (activeCategory) params.category = activeCategory
        if (search) params.search = search
        const res = await api.get('/blog/', { params })
        setPosts(res.data.results || res.data)
      } catch {
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [activeCategory, search])

  const recentPosts = posts.slice(0, 3)

  return (
    <>
      <SeoHead
        title="Blog & News"
        description="Read the latest news, educational insights, and updates from Springboard Indian School's blog."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-1.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Latest News</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Our News</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="vs-section space space-extra-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {loading ? (
                <div className="text-center py-5">
                  <i className="fa-solid fa-spinner fa-spin fa-2x text-theme-color1" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No blog posts published yet. Check back soon!</p>
                </div>
              ) : (
                posts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * idx } }
                    }}
                    className="vs-blog"
                  >
                    <img src="/assets/img/elements/vs-blog-ele1.svg" alt="blog elements" className="vs-blog__ele1" />
                    <div className="vs-blog__img--figure">
                      <Link className="vs-blog__img--link" to={`/blog/${post.slug}`}>
                        <img
                          src={post.featured_image || PLACEHOLDER}
                          alt={post.title}
                          className="vs-blog__img"
                          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                        />
                      </Link>
                    </div>
                    <div className="vs-blog__content">
                      <div className="vs-blog__meta">
                        <Link className="vs-blog__meta--link" to={`/blog/${post.slug}`}>
                          <FaUser className="me-2 text-theme-color2" />{post.author}
                        </Link>
                        <Link className="vs-blog__meta--link" to={`/blog/${post.slug}`}>
                          <FaCalendarDays className="me-2 text-theme-color3" />{formatDate(post.created_at)}
                        </Link>
                        <Link className="vs-blog__meta--link" to={`/blog/${post.slug}`}>
                          <FaTag className="me-2 text-theme-color4" />{post.category}
                        </Link>
                      </div>
                      <Link className="vs-blog__heading--link" to={`/blog/${post.slug}`}>
                        <h3 className="vs-blog__heading">{post.title}</h3>
                      </Link>
                      <p className="vs-blog__desc">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="vs-blog__link">
                        Read more <FaArrowRight className="ms-2" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="col-lg-4">
              <div className="sidebar-area">
                {/* Search */}
                <div className="widget widget--search">
                  <form onSubmit={(e) => e.preventDefault()} className="wp-block-search">
                    <label className="wp-block-search__label">Search</label>
                    <div className="wp-block-search__inside-wrapper">
                      <input
                        className="wp-block-search__input"
                        placeholder="Search posts..."
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button aria-label="Search" className="wp-block-search__button" type="submit">
                        <FaMagnifyingGlass />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Categories */}
                <div className="widget">
                  <div className="widget_categories">
                    <h2 className="wp-block-heading">Category</h2>
                    <ul>
                      {['', 'Education', 'Parenting', 'Academics', 'School Events', 'School Life'].map((cat) => (
                        <li key={cat}>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); setActiveCategory(cat) }}
                            style={{ fontWeight: activeCategory === cat ? 700 : 400 }}
                          >
                            {cat || 'All'}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                  <div className="widget">
                    <h2 className="wp-block-heading">Recent Post</h2>
                    <div className="recent-post-wrap">
                      {recentPosts.map((rp) => (
                        <div className="recent-post" key={rp.id}>
                          <div className="media-img">
                            <img
                              src={rp.featured_image || PLACEHOLDER}
                              alt={rp.title}
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                              onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                            />
                          </div>
                          <div className="media-body">
                            <div className="recent-post-meta">
                              <span className="text-muted small">
                                <FaCalendarDays className="me-2" />{formatDate(rp.created_at)}
                              </span>
                            </div>
                            <h4 className="post-title h6 mb-0 mt-1">
                              <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="sidebar-banner position-relative rounded overflow-hidden p-4 text-center mt-4">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-theme-color1 opacity-10"></div>
                  <span className="sidebar-banner__icon text-theme-color1 d-block mb-3" style={{ fontSize: '40px' }}>
                    <FaEnvelopeOpenText />
                  </span>
                  <span className="sidebar-banner__title--sub text-uppercase fw-bold text-theme-color2 d-block mb-2">Subscribe</span>
                  <h4 className="sidebar-banner__title--main mb-4">Our Newsletter</h4>
                  <input className="form-control mb-3" type="email" placeholder="Enter your email" />
                  <button className="vs-btn w-100"><span className="vs-btn__border"></span>Subscribe Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdmissionCta />
    </>
  )
}
