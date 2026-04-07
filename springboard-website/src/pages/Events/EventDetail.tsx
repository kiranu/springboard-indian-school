import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarDays, FaLocationDot, FaShareNodes, FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaPerson, FaPhoneVolume, FaEnvelope } from 'react-icons/fa6'
import SeoHead from '../../components/seo/SeoHead'
import AdmissionCta from '../../components/shared/AdmissionCta'
import api from '../../lib/api'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1526628953301-3e589a6a120a?q=80&w=1200&h=600&fit=crop'

interface Event {
  id: number
  title: string
  slug: string
  description: string
  content: string
  event_date: string | null
  end_date: string | null
  location: string
  featured_image: string
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EventDetail() {
  const { slug } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setNotFound(false)
      try {
        const res = await api.get(`/events/${slug}/`)
        setEvent(res.data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-theme-color1" style={{ marginTop: 100 }} />
      </div>
    )
  }

  if (notFound || !event) {
    return (
      <div className="text-center py-5">
        <h3>Event not found</h3>
        <Link to="/events" className="vs-btn mt-3"><span className="vs-btn__border"></span>Back to Events</Link>
      </div>
    )
  }

  const sanitisedContent = (event.content || '').replace(/<p><br\s*\/?><\/p>/gi, '')

  return (
    <>
      <SeoHead
        title={event.title}
        description={event.description || `Learn more about ${event.title} at Springboard Indian School.`}
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Event Details</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-wrapper__menu--item">{event.title}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Event Content */}
      <section className="vs-section space space-extra-bottom bg-color6 overflow-hidden">
        <div className="container">
          <div className="row gx-40">
            <div className="col-lg-8">
              <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="vs-blog vs-blog--single vs-class--details mb-30">
                <div className="vs-blog__img--figure">
                  <img
                    src={event.featured_image || PLACEHOLDER}
                    alt={event.title}
                    className="vs-blog__img"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                  />
                </div>
                <div className="vs-blog__content">
                  <h3 className="vs-blog__heading mb-10">{event.title}</h3>
                  <div className="vs-blog__meta mb-25">
                    {event.event_date && (
                      <span className="vs-blog__meta--link me-3">
                        <FaCalendarDays className="me-2 text-theme-color3" /> {formatDate(event.event_date)}
                        {event.end_date && event.end_date !== event.event_date && ` – ${formatDate(event.end_date)}`}
                      </span>
                    )}
                    <span className="vs-blog__meta--link">
                      <FaLocationDot className="me-2 text-theme-color1" /> {event.location}
                    </span>
                  </div>

                  {sanitisedContent ? (
                    <div
                      className="ql-content"
                      dangerouslySetInnerHTML={{ __html: sanitisedContent }}
                    />
                  ) : (
                    <p>{event.description}</p>
                  )}

                  <hr className="mb-25 mt-50" />

                  <div className="vs-blog__footer mt-0 pt-0">
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

            <div className="col-lg-4 mb-30">
              <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } } }} className="sidebar-area vs-class--sidebar ps-0">
                <form action="#" className="vs-side-form widget bg-white">
                  <h2 className="wp-block-heading">Registration</h2>
                  <div className="vs-side-form__group">
                    <span className="vs-side-form__icon-wrapper"><FaPerson /></span>
                    <input type="text" className="vs-side-form__input" placeholder="Guest Name" name="guest-name" />
                  </div>
                  <div className="vs-side-form__group">
                    <span className="vs-side-form__icon-wrapper"><FaPhoneVolume /></span>
                    <input type="tel" className="vs-side-form__input" placeholder="Phone No" name="phone" />
                  </div>
                  <div className="vs-side-form__group">
                    <span className="vs-side-form__icon-wrapper"><FaEnvelope /></span>
                    <input type="email" className="vs-side-form__input" placeholder="Your Email" name="email" />
                  </div>
                  <div className="vs-side-form__group--btn">
                    <button type="button" className="vs-side-form__submit">Register Now</button>
                  </div>
                </form>

                <div className="sidebar-contact parallax-wrap mt-4">
                  <h3 className="sidebar-contact__title">Let's Contact with us</h3>
                  <span className="sidebar-contact__icon">
                    <img src="/assets/img/service/service-icon-contact.png" alt="contact icon" />
                  </span>
                  <p className="sidebar-contact__text">Need help? Talk to expert</p>
                  <a className="sidebar-contact__call" href="tel:+914023456789">+91 40-2345-6789</a>
                  <img className="sidebar-contact__map" src="/assets/img/service/sidebar-contact-bg.png" alt="map" />
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
