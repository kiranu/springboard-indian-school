import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaLocationDot, FaClock } from 'react-icons/fa6'
import SeoHead from '../../components/seo/SeoHead'
import AdmissionCta from '../../components/shared/AdmissionCta'
import api from '../../lib/api'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1526628953301-3e589a6a120a?q=80&w=600&h=400&fit=crop'

interface Event {
  id: number
  title: string
  slug: string
  description: string
  event_date: string | null
  end_date: string | null
  location: string
  featured_image: string
}

const parseEventDate = (dateStr: string | null) => {
  if (!dateStr) return { day: '--', month: '---', year: '----' }
  const d = new Date(dateStr + 'T00:00:00')
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toLowerCase(),
    year: d.getFullYear().toString(),
  }
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const res = await api.get('/events/', { params: { ordering: 'event_date' } })
        setEvents(res.data.results || res.data)
      } catch {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <>
      <SeoHead
        title="Events"
        description="Stay updated with Springboard Indian School's upcoming events, sports days, cultural programs, and educational activities."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Our Events</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Events</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Events List */}
      <section className="vs-event--page bg-color6 space space-extra-bottom z-index-common overflow-hidden">
        <div className="vs-event--ele1">
          <img src="/assets/img/elements/events-page-ele1.png" alt="event page ele1" />
        </div>
        <div className="vs-event--ele2">
          <img src="/assets/img/elements/events-page-ele2.png" alt="event page ele2" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Event Schedule</span>
                  <h2 className="vs-title__main">Upcoming School Events</h2>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <i className="fa-solid fa-spinner fa-spin fa-2x text-theme-color1" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            events.map((event, idx) => {
              const { day, month, year } = parseEventDate(event.event_date)
              return (
                <motion.div
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * idx } }
                  }}
                  className="vs-event"
                >
                  <div className="vs-event__figure">
                    <img
                      className="vs-event__figure--img"
                      src={event.featured_image || PLACEHOLDER}
                      alt={event.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
                    />
                    <div className="vs-event__figure--date">
                      <span className="vs-event__figure--day">
                        {day}
                        <span className="vs-event__figure--month">{month}</span>
                      </span>
                      <span className="vs-event__figure--year">{year}</span>
                    </div>
                  </div>
                  <div className="vs-event__content">
                    <h2 className="vs-event__title">
                      <Link to={`/events/${event.slug}`}>{event.title}</Link>
                    </h2>
                    <div className="vs-time__features">
                      <ul>
                        <li><span><FaLocationDot />{event.location}</span></li>
                        {event.end_date && (
                          <li><span><FaClock />{parseEventDate(event.end_date).day} {parseEventDate(event.end_date).month} {parseEventDate(event.end_date).year}</span></li>
                        )}
                      </ul>
                    </div>
                    <p className="vs-event__text">{event.description}</p>
                    <div className="vs-event__footer">
                      <div className="vs-event__btn">
                        <Link to={`/events/${event.slug}`} className="vs-btn"><span className="vs-btn__border"></span>Details</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </section>

      <AdmissionCta subtitle="Be part of our vibrant school community. Enroll now and participate in our exciting events!" />
    </>
  )
}
