import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaCalendarDays, FaTag, FaMagnifyingGlass, FaShareNodes, FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaEnvelopeOpenText } from 'react-icons/fa6'
import SeoHead from '../../components/seo/SeoHead'
import AdmissionCta from '../../components/shared/AdmissionCta'
import api from '../../lib/api'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&h=600&fit=crop'

interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  author: string
  excerpt: string
  content: string
  featured_image: string
  created_at: string
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setNotFound(false)
      try {
        const [postRes, listRes] = await Promise.all([
          api.get(`/blog/${slug}/`),
          api.get('/blog/', { params: { page_size: 5 } }),
        ])
        setPost(postRes.data)
        const all: BlogPost[] = listRes.data.results || listRes.data
        setRecentPosts(all.filter((p) => p.slug !== slug).slice(0, 3))
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-theme-color1" style={{ marginTop: 100 }} />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="text-center py-5">
        <h3>Post not found</h3>
        <Link to="/blog" className="vs-btn mt-3"><span className="vs-btn__border"></span>Back to Blog</Link>
      </div>
    )
  }

  const paragraphs = (post.content || post.excerpt || '').split('\n\n').filter(Boolean)

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.excerpt || `Read about ${post.title} on the Springboard Indian School blog.`}
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-1.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Our News</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item"><Link to="/blog">Our News</Link></li>
                <li className="breadcrumb-wrapper__menu--item">{post.title}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Detail Section */}
      <section className="vs-section space space-extra-bottom">
        <div className="container">
          <div className="row gx-40">
            <div className="col-lg-8 mb-30">
              <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="vs-blog vs-blog--single vs-class--details">
                <div className="vs-blog__img--figure">
                  <img
                    src={post.featured_image || PLACEHOLDER}
                    alt={post.title}
                    className="vs-blog__img"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                  />
                </div>
                <div className="vs-blog__content">
                  <h3 className="vs-blog__heading mb-10">{post.title}</h3>
                  <div className="vs-blog__meta mb-25">
                    <span className="vs-blog__meta--link me-3">
                      <FaUser className="me-2 text-theme-color2" /> {post.author}
                    </span>
                    <span className="vs-blog__meta--link me-3">
                      <FaCalendarDays className="me-2 text-theme-color3" /> {formatDate(post.created_at)}
                    </span>
                    <span className="vs-blog__meta--link">
                      <FaTag className="me-2 text-theme-color4" /> {post.category}
                    </span>
                  </div>

                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, idx) => (
                      <p key={idx} className="mb-4">{p}</p>
                    ))
                  ) : (
                    <p className="mb-4">{post.excerpt}</p>
                  )}

                  <blockquote className="vs-quote">
                    <p>"Education is the most powerful weapon which you can use to change the world."</p>
                    <cite>Nelson Mandela</cite>
                  </blockquote>

                  <p className="mt-4">
                    If you have any questions or would like to learn more about how we implement
                    these concepts at Springboard Indian School, please don't hesitate to reach out
                    to our administration team.
                  </p>

                  <hr className="mb-25 mt-50" />

                  <div className="vs-blog__footer mt-0 pt-0">
                    <div className="vs-blog__footer--cloud">
                      <span className="vs-blog__footer--title"><FaTag className="me-2" />Category:</span>
                      <div className="vs-blog__footer--list">
                        <span className="vs-blog__footer--links" style={{ display: 'inline-block', padding: '5px 15px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '14px', color: '#666' }}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="vs-blog__footer--share">
                      <span className="vs-blog__footer--title">share : <FaShareNodes className="ms-2" /></span>
                      <ul className="vs-blog__footer--share__list">
                        <li><a href="#"><FaFacebookF /></a></li>
                        <li><a href="#"><FaXTwitter /></a></li>
                        <li><a href="#"><FaInstagram /></a></li>
                        <li><a href="#"><FaLinkedinIn /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } } }} className="sidebar-area">
                <div className="widget widget--search">
                  <form action="/blog" className="wp-block-search">
                    <label className="wp-block-search__label">Search</label>
                    <div className="wp-block-search__inside-wrapper">
                      <input className="wp-block-search__input" placeholder="Search..." type="search" />
                      <button aria-label="Search" className="wp-block-search__button" type="submit">
                        <FaMagnifyingGlass />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="widget">
                  <div className="widget_categories">
                    <h2 className="wp-block-heading">Category</h2>
                    <ul>
                      <li><Link to="/blog">Education</Link></li>
                      <li><Link to="/blog">Parenting</Link></li>
                      <li><Link to="/blog">Academics</Link></li>
                      <li><Link to="/blog">School Events</Link></li>
                    </ul>
                  </div>
                </div>

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

                <div className="sidebar-banner position-relative rounded overflow-hidden p-4 text-center mt-4 border border-theme">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-theme-color3 opacity-10"></div>
                  <span className="sidebar-banner__icon text-theme-color3 d-block mb-3" style={{ fontSize: '40px' }}>
                    <FaEnvelopeOpenText />
                  </span>
                  <span className="sidebar-banner__title--sub text-uppercase fw-bold text-theme-color2 d-block mb-2">Subscribe</span>
                  <h4 className="sidebar-banner__title--main mb-4">Our Newsletter</h4>
                  <input className="form-control mb-3" type="email" placeholder="Enter your email" />
                  <button className="vs-btn style4 w-100"><span className="vs-btn__border"></span>Subscribe Now</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AdmissionCta />
    </>
  )
}
