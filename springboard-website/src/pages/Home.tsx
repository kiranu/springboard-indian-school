import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft, FaStar, FaChalkboardUser, FaShieldHalved, FaGraduationCap, FaPaintbrush, FaTrophy, FaUsers } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, EffectFade } from 'swiper/modules'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/effect-fade'
// @ts-ignore
import 'swiper/css/navigation'

import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'
import api from '../lib/api'

interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const WHY_CHOOSE_ITEMS = [
  {
    Icon: FaChalkboardUser,
    title: 'Expert Educators',
    desc: 'Highly qualified, experienced and caring teachers who inspire every child\'s unique potential.',
    iconColor: '#EF4444',
    lightBg: '#FEF2F2',
  },
  {
    Icon: FaShieldHalved,
    title: 'Safe & Secure Campus',
    desc: 'CCTV-monitored, fully gated campus with background-verified staff for 100% child safety.',
    iconColor: '#3B82F6',
    lightBg: '#EFF6FF',
  },
  {
    Icon: FaGraduationCap,
    title: 'CBSE Curriculum',
    desc: 'Nationally recognised CBSE curriculum enriched with activity-based experiential learning.',
    iconColor: '#F59E0B',
    lightBg: '#FFFBEB',
  },
  {
    Icon: FaPaintbrush,
    title: 'Creative Learning',
    desc: 'Art, music, drama and hands-on projects to nurture creativity and joyful self-expression.',
    iconColor: '#8B5CF6',
    lightBg: '#F5F3FF',
  },
  {
    Icon: FaTrophy,
    title: 'Sports & Co-Curricular',
    desc: 'Rich sports programs and extracurricular activities for holistic, all-round development.',
    iconColor: '#10B981',
    lightBg: '#ECFDF5',
  },
  {
    Icon: FaUsers,
    title: 'Parent Partnership',
    desc: 'Regular PTMs, parent portal and open communication channels for a collaborative journey.',
    iconColor: '#EC4899',
    lightBg: '#FDF2F8',
  },
]

const FALLBACK_GALLERY = [
  { id: 1, title: 'Campus Life', category: 'Campus', image_url: '/assets/img/gallery/gallery-h1-1-1.jpg' },
  { id: 2, title: 'Classroom', category: 'Academics', image_url: '/assets/img/gallery/gallery-h1-1-2.jpg' },
  { id: 3, title: 'Sports Day', category: 'Sports', image_url: '/assets/img/gallery/gallery-h1-1-3.jpg' },
  { id: 4, title: 'Celebrations', category: 'Events', image_url: '/assets/img/gallery/gallery-h1-1-4.jpg' },
]

export default function Home() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(FALLBACK_GALLERY)

  useEffect(() => {
    api.get('/gallery/')
      .then((res) => {
        const data: GalleryItem[] = Array.isArray(res.data) ? res.data : res.data.results || []
        if (data.length > 0) setGalleryItems(data.slice(0, 4))
      })
      .catch(() => { /* keep fallback */ })
  }, [])

  return (
    <>
      <SeoHead
        title="Home"
        description="Springboard Indian School, Hyderabad - Quality CBSE education for Play Group to Grade 7 with focus on safety, holistic development, and activity-based learning."
      />

      {/* Hero Section matches template */}
      <section className="vs-hero overflow-hidden z-index-common parallax-wrap">
        <div className="vs-hero__ele1">
          <img className="parallax-element" src="/assets/img/hero/h1-ele-1-1.svg" alt="ele" />
        </div>

        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.vs-swiper-button-next',
            prevEl: '.vs-swiper-button-prev',
          }}
          className="vs-hero__active--zoom"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="vs-hero__bg vs-hero__bg--zoom" style={{ backgroundImage: 'url(/assets/img/hero/banner-1-1.jpg)' }}></div>
            <div className="container container--custom">
              <div className="vs-hero__content">
                <div className="vs-hero__shape">
                  <div className="vs-hero__shape--bg" style={{ backgroundImage: 'url(/assets/img/hero/hero-shape-1.svg)' }}></div>
                  <motion.span initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__title--sub">
                    <img src="/assets/img/icons/hero-star-icon.svg" alt="hero star icon" />
                    Welcome to Springboard!
                  </motion.span>
                  <motion.h1 initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__title--main">
                    Where Every Child's Brilliance <span>Finds Its Shine</span>
                  </motion.h1>
                  <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__desc">
                    Quality CBSE Education with Focus on Holistic Development and Activity-Based Learning
                  </motion.p>
                  <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
                    <Link to="/admissions" className="vs-btn vs-hero__btn">
                      <span className="vs-btn__border"></span>Apply Now
                    </Link>
                  </motion.div>
                  <motion.img initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__character" src="/assets/img/hero/hero-character-1.png" alt="Hero Character" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="vs-hero__bg vs-hero__bg--zoom" style={{ backgroundImage: 'url(/assets/img/hero/banner-1-2.jpg)' }}></div>
            <div className="container container--custom">
              <div className="vs-hero__content">
                <div className="vs-hero__shape">
                  <div className="vs-hero__shape--bg" style={{ backgroundImage: 'url(/assets/img/hero/hero-shape-1.svg)' }}></div>
                  <motion.span initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__title--sub">
                    <img src="/assets/img/icons/hero-star-icon.svg" alt="hero star icon" />
                    Play Group to Grade 7
                  </motion.span>
                  <motion.h1 initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__title--main">
                    Safe & Nurturing <span>Environment</span>
                  </motion.h1>
                  <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__desc">
                    100% Safe Campus with State-of-the-Art Facilities and Experienced Educators
                  </motion.p>
                  <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
                    <Link to="/contact" className="vs-btn vs-hero__btn">
                      <span className="vs-btn__border"></span>Book a Visit
                    </Link>
                  </motion.div>
                  <motion.img initial="hidden" whileInView="visible" variants={fadeInUp} className="vs-hero__character" src="/assets/img/hero/hero-character-1.png" alt="Hero Character" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <div className="vs-hero__direction">
            <div className="vs-swiper-button-next">
              <FaArrowRight />
            </div>
            <div className="vs-swiper-button-prev">
              <FaArrowLeft />
            </div>
          </div>
        </Swiper>
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#f6f1e4"></div>
      </section>

      {/* Services/Programs Area matching template */}
      <section className="vs-service--area animation-active z-index-common space overflow-hidden" style={{ backgroundImage: 'url(/assets/img/service/service-bg.png)' }}>
        <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft} src="/assets/img/elements/service-ele-1.svg" alt="elements1" className="vs-service--ele1" />
        <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} src="/assets/img/elements/service-ele-2.svg" alt="elements2" className="vs-service--ele2" />

        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Our Programs</span>
                  <h2 className="vs-title__main">Education <span>For Every Stage</span></h2>
                </div>
              </div>
            </div>
          </div>

          <div className="z-index-common">
            <Swiper
              modules={[Autoplay, Navigation]}
              loop={true}
              autoplay={{ delay: 6000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1200: { slidesPerView: 3, spaceBetween: 30 }
              }}
              className="vs-carousel vs-carousel--service z-index-common pl-0"
            >
              {[
                { title: 'Play Group', img: '/assets/img/service/s-1-1.jpg', icon: '/assets/img/icons/service-icon-1-1.svg' },
                { title: 'Nursery', img: '/assets/img/service/s-1-2.jpg', icon: '/assets/img/icons/service-icon-1-2.svg' },
                { title: 'LKG & UKG', img: '/assets/img/service/s-1-3.jpg', icon: '/assets/img/icons/service-icon-1-3.svg' },
                { title: 'Primary 1-4', img: '/assets/img/service/s-1-1.jpg', icon: '/assets/img/icons/service-icon-1-1.svg' },
                { title: 'Grade 5-7', img: '/assets/img/service/s-1-2.jpg', icon: '/assets/img/icons/service-icon-1-2.svg' },
              ].map((prog, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-service">
                    <div className="vs-service__figure">
                      <Link to="/academics" className="vs-service__image--link">
                        <img className="vs-service__image" src={prog.img} alt={prog.title} />
                      </Link>
                    </div>
                    <div className="vs-service__content">
                      <div className="vs-service__header">
                        <span className="vs-service__icon">
                          <img src={prog.icon} alt="icon" />
                        </span>
                        <h3 className="vs-service__title">
                          <Link to="/academics">{prog.title}</Link>
                        </h3>
                      </div>
                      <p className="vs-service__text">Age-appropriate curriculum focusing on foundational skills and cognitive development.</p>
                      <Link to="/academics" className="vs-service__btn">
                        Know Details
                        <FaArrowRight className="ms-2" />
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="vs-balls" data-balls-bottom="-1px" data-balls-color="#fdfcf9"></div>
      </section>


      {/* Learning Opportunity / About Section from Template */}
      <section className="vs-about--section space space-extra-bottom z-index-common parallax-wrap overflow-hidden" style={{ backgroundImage: 'url(/assets/img/about/vs-about-h1-bg.png)' }}>
        <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} src="/assets/img/about/vs-about-h1-ele-4.png" alt="elements" className="vs-about--ele1" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-about--image">
                <div className="vs-about--image__figure1">
                  <img src="/assets/img/facilities/facilities1.jpg" alt="about image" width="198" height="214" loading="lazy" style={{ objectFit: 'cover' }} />
                </div>
                <div className="vs-about--image__figure2">
                  <img src="/assets/img/facilities/facilities2.jpg" alt="about image" width="400" height="461" loading="lazy" style={{ objectFit: 'cover' }} />
                </div>
                <div className="vs-about--image__ele1 parallax-element">
                  <img src="/assets/img/about/vs-about-h1-ele-1.svg" alt="elements" />
                </div>
                <div className="vs-about--image__ele2 parallax-element">
                  <img src="/assets/img/about/vs-about-h1-ele-2.svg" alt="elements" />
                </div>
                <div className="vs-about--yoe">
                  <span className="vs-about--yoe__number">21+</span>
                  <span className="vs-about--yoe__text">years of experience</span>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-about--right">
                <div className="vs-title title-anime animation-style2">
                  <div className="title-anime__wrap">
                    <span className="vs-title__sub">School Facilities</span>
                    <h2 className="vs-title__main">
                      Learning <span>Opportunity</span> For Kids
                    </h2>
                  </div>
                </div>
                <div className="vs-about--story">
                  <p className="vs-about__text vs-text">Springboard Indian School is dedicated to nurturing young minds with quality education, combining academic excellence with holistic development. Our CBSE curriculum is enriched with interactive, activity-based learning.</p>
                  <ul className="vs-list pt-15 mb-35">
                    <li>Comprehensive CBSE Curriculum</li>
                    <li>Safe & Secure Campus Environment</li>
                    <li>Highly Experienced & Caring Staff</li>
                  </ul>
                  <Link to="/about" className="vs-btn"><span className="vs-btn__border"></span>Discover More</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space space-extra-bottom z-index-common overflow-hidden" style={{ background: 'linear-gradient(180deg, #fdfcf9 0%, #f0f7ff 100%)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Why Choose Us</span>
                  <h2 className="vs-title__main">The Springboard <span>Advantage</span></h2>
                </div>
                <p style={{ color: '#64748b', fontSize: 15, marginTop: 8 }}>
                  We go beyond academics to build confident, curious and compassionate learners.
                </p>
              </div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center mt-2">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="col-xl-4 col-md-6"
              >
                <motion.div
                  whileHover={{ y: -8, boxShadow: `0 20px 48px ${item.iconColor}25` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#fff',
                    borderRadius: 24,
                    padding: '40px 32px 36px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: `2px solid ${item.lightBg}`,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                  }}
                >
                  {/* Decorative background blob */}
                  <div style={{
                    position: 'absolute', top: -24, right: -24,
                    width: 110, height: 110, borderRadius: '50%',
                    background: item.lightBg, opacity: 0.8,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: -18, left: -18,
                    width: 72, height: 72, borderRadius: '50%',
                    background: item.lightBg, opacity: 0.5,
                  }} />

                  {/* Icon circle */}
                  <div style={{
                    width: 84, height: 84, borderRadius: '50%',
                    background: item.lightBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontSize: 34, color: item.iconColor,
                    position: 'relative',
                    boxShadow: `0 8px 28px ${item.iconColor}30`,
                    border: `3px solid ${item.iconColor}20`,
                  }}>
                    <item.Icon />
                  </div>

                  {/* Top accent strip */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 5,
                    background: item.iconColor, borderRadius: '24px 24px 0 0',
                  }} />

                  <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 12, fontSize: 18, position: 'relative' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.75, margin: 0, position: 'relative' }}>
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Times Area */}
      <section className="vs-session--area space space-extra-bottom bg-theme-color-1 z-index-common overflow-hidden">
        <div className="vs-session--bg-image">
          <img src="/assets/img/session/session-bg.png" alt="session bg" />
        </div>
        <div className="vs-session--ele1">
          <img src="/assets/img/session/session-ele-1.png" alt="session ele" />
        </div>
        <div className="vs-session--ele2">
          <img src="/assets/img/session/session-ele-2.png" alt="session ele" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub text-white">Session Times</span>
                  <h2 className="vs-title__main text-white px-xl-5">Your kids Are 100% Safe at Our Care.</h2>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-10">
              <div className="row gx-30">
                {[
                  { title: "Brain Train", time: "8.00am - 10.00am", icon: "h1-1-1" },
                  { title: "Drawing & Paintings", time: "8.00am - 10.00am", icon: "h1-1-2" },
                  { title: "Alphabet Matching", time: "8.00am - 10.00am", icon: "h1-1-3" },
                  { title: "Playland & Caffe", time: "8.00am - 10.00am", icon: "h1-1-4" }
                ].map((item, idx) => (
                  <div key={idx} className="col-lg-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-session">
                      <img className="vs-session__bg" src="/assets/img/elements/session-main-block.png" alt="" />
                      <div className="vs-session__content">
                        <h3 className="vs-session__title">{item.title}</h3>
                        <time className="vs-session__time" dateTime="08:00">{item.time}</time>
                      </div>
                      <span className="vs-session__icon">
                        <img src={`/assets/img/icons/session-icon-${item.icon}.svg`} alt="session icon" />
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Area */}
      <section className="vs-gallery--area space space-extra-bottom overflow-hidden">
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
          <div className="vs-gallery--row">
            {galleryItems.map((item, idx) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`vs-gallery vs-gallery--col${idx + 1}`}>
                <div className="vs-gallery__figure">
                  <Link className="vs-gallery__image--link" to="/gallery">
                    <img
                      className="vs-gallery__image"
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `/assets/img/gallery/gallery-h1-1-${idx + 1}.jpg` }}
                    />
                  </Link>
                </div>
                <div className="vs-gallery__hover">
                  <Link to="/gallery" className="vs-gallery__cate">{item.category}</Link>
                  <Link className="vs-gallery__heading--link" to="/gallery">
                    <h4 className="vs-gallery__heading">{item.title}</h4>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="d-flex justify-content-center pt-50">
            <Link to="/gallery" className="vs-btn"><span className="vs-btn__border"></span>view more</Link>
          </div>
        </div>
      </section>

      {/* Grade Programs */}
      <section className="vs-pro--area position-relative parallax-wrap" style={{ backgroundImage: 'url(/assets/img/bg/program-bg.png)' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-auto text-center text-lg-start">
              <div className="vs-title title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub text-white">GRADE LEVEL</span>
                  <h2 className="vs-title__main text-white">Grade Programs</h2>
                </div>
                <p className="text-white fw-bold text-capitalize font-title vs-text-bolder mb-0">work and play come together</p>
              </div>
              <div className="vs-pro--slider__direction justify-content-center justify-content-lg-start mb-md-4">
                <div className="vs-pro--slider__next"><FaArrowLeft /></div>
                <div className="vs-pro--slider__prev"><FaArrowRight /></div>
              </div>
            </div>
            <div className="col-lg-7 flex-grow-1">
              <Swiper
                modules={[Autoplay, Navigation]}
                loop={true}
                breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
                navigation={{ nextEl: '.vs-pro--slider__next', prevEl: '.vs-pro--slider__prev' }}
                className="vs-carousel"
              >
                {[
                  { title: "Nursery", age: "Age 03 - 04", grade: "Pre", color: "bg-color1" },
                  { title: "LKG", age: "Age 04 - 05", grade: "KG", color: "bg-color2" },
                  { title: "UKG", age: "Age 05 - 06", grade: "KG", color: "bg-color3" },
                  { title: "Grade 1", age: "Age 06 - 07", grade: "1", color: "bg-color4" }
                ].map((g, idx) => (
                  <SwiperSlide key={idx} className="p-4">
                    <div className="vs-pro">
                      <span className={`vs-pro__grade ${g.color}`}>
                        grade
                        <span>{g.grade}</span>
                      </span>
                      <h2 className="vs-pro__title">{g.title}</h2>
                      <span className="vs-pro__age">{g.age}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Area */}
      <section className="vs-class--area space-extra-top space-extra-bottom z-index-common overflow-hidden" style={{ backgroundImage: 'url(/assets/img/class/class-bg.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">School Facilities</span>
                  <h2 className="vs-title__main">Engaging & Spacious School</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="z-index-common">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{ delay: 6000 }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                992: { slidesPerView: 3, spaceBetween: 28 },
                1200: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="vs-carousel vs-carousel--class"
            >
              {[
                { title: 'Campus Facility', img: '1509062522246-3755977927d7', icon: '1' },
                { title: 'Pick & Drop', img: '1544367567-0f2fcb009e0b', icon: '2' },
                { title: 'Play Ground', img: '1592622763261-26733ec60384', icon: '3' },
                { title: 'Healthy Foods', img: '1511216335778-8cb8f037042a', icon: '4' },
                { title: 'Modern Library', img: '1576085898323-218337e3e43c', icon: '2' }
              ].map((fac, idx) => (
                <SwiperSlide key={idx}>
                  <div className="vs-class">
                    <div className="vs-class__figure">
                      <Link className="vs-class__figure--link" to="/facilities">
                        <img className="vs-class__figure--img" src={`/assets/img/class/class-1-${(idx % 4) + 1}.jpg`} alt="Facilities" />
                        <div className="vs-class__icon--wrap">
                          <span className={`vs-class__icon vs-class__icon--color${fac.icon}`}>
                            <img src={`/assets/img/icons/h1-class-icon-${fac.icon}.svg`} alt="Class Icon" />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="vs-class__content">
                      <Link className="vs-class__heading--link" to="/facilities">
                        <h3 className="vs-class__heading">{fac.title}</h3>
                      </Link>
                      <p className="vs-class__text">State-of-the-art facilities designed to provide a safe and enriching environment.</p>
                    </div>
                    <div className="vs-class__bottom">
                      <Link to="/facilities" className="vs-class__link">
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* FAQ Feedback */}
      <section className="bg-title z-index-common space overflow-hidden">
        <div className="feedback-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&fit=crop)' }}></div>
        <div className="feedback-image--right" style={{ backgroundImage: 'url(/assets/img/feedback/feedback-image-1-2.png)' }}></div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="feedback-wrapper">
                <div className="vs-title vs-title--style2 title-anime animation-style2 text-center text-lg-start">
                  <div className="title-anime__wrap">
                    <span className="vs-title__sub">faq feedback</span>
                    <h2 className="vs-title__main pe-xl-3">Customer <span>Feedback</span> For school</h2>
                  </div>
                </div>
                <Swiper modules={[Autoplay]} loop={true} autoplay={{ delay: 5000 }} className="feedback-slider">
                  {[1, 2].map((i) => (
                    <SwiperSlide key={i}>
                      <div className="feedback-block">
                        <div className="feedback-block__image">
                          <img src={`/assets/img/feedback/feedback-man-1-${i}.jpg`} alt="feedback parent" width="145" height="145" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                          <div className="feedback-block__icon--quote">
                            <img src="/assets/img/icons/svg-quote-icon.svg" alt="svg-quote-icon" />
                          </div>
                        </div>
                        <div className="feedback-block__content">
                          <h4 className="feedback-block__title">Happy Parent</h4>
                          <span className="feedback-block__title--sub">Admitted in 2025</span>
                          <div className="feedback-block__rating" style={{ color: '#ffc107', display: 'flex', gap: '5px' }}>
                            {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                          </div>
                          <p className="feedback-block__desc">
                            "We look forward to developing a long-term relationship with children and parents and will welcome children into our excellent after-school service."
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="space space-extra-bottom z-index-common overflow-hidden" style={{ backgroundImage: 'url(/assets/img/blog/h1-bg-blog.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">our news</span>
                  <h2 className="vs-title__main">Our News & Article</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper modules={[Autoplay]} loop={true} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }} className="vs-carousel">
              {[
                { title: "Annual Sports Day", date: "26 Sep 2025", img: "1511629091441-ee46146481b6" },
                { title: "Science Exhibition", date: "10 Oct 2025", img: "1532096359529-ce879c72e38c" },
                { title: "Cultural Fest", date: "15 Nov 2025", img: "1516627145497-19a584348fa9" }
              ].map((blog, idx) => (
                <SwiperSlide key={idx} className="px-3">
                  <div className="vs-blog vs-blog--style2">
                    <div className="vs-blog__inner">
                      <div className="vs-blog__img">
                        <Link to="/blog">
                          <img src={`/assets/img/blog/blog-h1-${(idx % 4) + 1}.jpg`} alt="Blog" loading="lazy" />
                        </Link>
                      </div>
                      <div className="vs-blog__content">
                        <div className="vs-blog__meta">
                          <Link className="vs-blog__meta--link" to="/blog">
                            {blog.date}
                          </Link>
                        </div>
                        <Link className="vs-blog__heading--link" to="/blog">
                          <h3 className="vs-blog__heading">{blog.title}</h3>
                        </Link>
                        <p className="vs-blog__desc">We update our students and parents with the latest ongoing events and success stories of Springboard.</p>
                        <div className="vs-blog__bottom">
                          <Link to="/blog" className="vs-blog__link">
                            Read more<FaArrowRight className="ms-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>


      <AdmissionCta />
    </>
  )
}
