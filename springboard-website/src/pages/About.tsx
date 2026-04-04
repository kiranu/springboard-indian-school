import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa6'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function About() {
  return (
    <>
      <SeoHead
        title="About Us"
        description="Learn about Springboard Indian School's mission, vision, values, and commitment to quality education and child safety."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-2.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">About Us</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">About Us</li>
              </ul>
            </div>
          </motion.div>
        </div>
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
      </div>

      {/* About Us Page */}
      <section className="vs-about--section pt-30 space space-extra-bottom z-index-common overflow-hidden" style={{ backgroundImage: 'url(/assets/img/about/vs-about-h3-bg.png)' }}>
        <img src="/assets/img/about/vs-about-h1-ele-4.png" alt="elements" className="vs-about--ele1" />
        <img src="/assets/img/about/vs-about-h3-ele-1.png" alt="elements" className="vs-about--ele1h3" />
        
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-feature bg-color4">
                <div className="vs-feature__top">
                  <svg width="51" height="25" viewBox="0 0 51 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.22334 5.96216C-2.80791 4.16304 4.56635 -0.155225 6.66735 0.0125662C9.56929 0.24275 11.4149 2.05692 10.614 6.14164C10.1961 8.27957 12.3436 11.0964 13.9067 13.1524C16.2476 16.2384 19.165 18.8641 21.6955 21.8096C23.4947 23.9047 27.5419 23.8813 29.465 21.7121C32.5719 18.2125 35.8918 14.8964 38.8788 11.2991L38.8865 11.303C39.6488 10.2066 39.8693 8.81775 39.4902 7.53425C38.4145 5.09589 39.3044 3.93324 41.4905 2.96964C45.53 1.19454 48.7956 1.59245 49.7436 4.22198C50.7263 6.94908 49.1322 8.40037 46.7024 9.2665C40.0821 11.623 33.5052 22.32 34.6341 23.2657C35.464 23.9609 38.0209 24.2114 38.1012 24.2513C29.5541 24.2114 19.5821 24.2253 13.9857 24.2513C13.9145 24.2516 17.1281 23.5893 18.265 23.4549C21.4636 23.0766 8.86433 9.37229 1.22334 5.96216Z" fill="#4F830E" />
                  </svg>
                </div>
                <div className="vs-feature__icon">
                  <img src="/assets/img/icons/feature-icon-h2-1.svg" alt="feature icon" />
                </div>
                <div className="vs-feature__content">
                  <h3 className="vs-feature__title">Learning & Fun</h3>
                  <p className="vs-feature__text">Interactive sessions focused on fundamental skill development and joyous discovery.</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-feature bg-color1">
                <div className="vs-feature__top">
                  <svg width="51" height="25" viewBox="0 0 51 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.22334 5.96216... (SVG truncated for brevity, filled with same path)" fill="#70167E" />
                  </svg>
                </div>
                <div className="vs-feature__icon">
                  <img src="/assets/img/icons/feature-icon-h2-2.svg" alt="feature icon" />
                </div>
                <div className="vs-feature__content">
                  <h3 className="vs-feature__title">Engaging Classes</h3>
                  <p className="vs-feature__text">Combining hands-on activities with digital and physical learning aids.</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-feature bg-color2">
                <div className="vs-feature__top">
                  <svg width="51" height="25" viewBox="0 0 51 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.22334 5.96216... (SVG truncated for brevity)" fill="#D18109" />
                  </svg>
                </div>
                <div className="vs-feature__icon">
                  <img src="/assets/img/icons/feature-icon-h2-3.svg" alt="feature icon" />
                </div>
                <div className="vs-feature__content">
                  <h3 className="vs-feature__title">Playground</h3>
                  <p className="vs-feature__text">Physical development emphasized alongside large, child-friendly play areas.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="row align-items-center pt-30 gx-50">
            <div className="col-lg-6 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-about--image style2">
                <img src="https://images.unsplash.com/photo-1544764200-d834fd210a23?q=80&w=600&h=600&fit=crop" alt="About Springboard" style={{ borderRadius: '20px' }} />
              </motion.div>
            </div>
            <div className="col-lg-6 mb-30">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-about--right">
                <div className="vs-title title-anime animation-style2">
                  <div className="title-anime__wrap">
                    <span className="vs-title__sub">Our Story</span>
                    <h2 className="vs-title__main">
                      Nurturing Every <span>Child's Potential</span>
                    </h2>
                  </div>
                </div>
                <div className="vs-about--story">
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active">
                      <p className="vs-about__text vs-text">Springboard Indian School is dedicated to providing quality, holistic education combining academic excellence with interactive, activity-based learning under the CBSE curriculum. Over the past decades, we've developed a safe, inclusive environment that builds character and capabilities.</p>
                      <ul className="vs-list pt-15 mb-35">
                        <li>Comprehensive CBSE Curriculum from Foundation to Primary</li>
                        <li>Safe, Spacious & Secure Campus Environment</li>
                        <li>Highly Experienced & Caring Guiding Staff</li>
                      </ul>
                      <Link to="/contact" className="vs-btn"><span className="vs-btn__border"></span>contact us</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vs Video Section */}
      <section className="vs-video--area z-index-common bg-color1 space parallax-wrap overflow-hidden">
        <div className="vs-video--bg-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&h=500&fit=crop)' }}></div>
        <div className="vs-video--bg-image--overlay" style={{ backgroundImage: 'url(/assets/img/video/video-bg-image-overlay.png)' }}></div>
        <img src="/assets/img/video/video-h3-ele1.png" alt="video ele1" className="vs-video--ele1" />
        <img src="/assets/img/video/video-h3-ele2.png" alt="video ele2" className="vs-video--ele2" />
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-video text-center">
                <a href="https://www.youtube.com/watch?v=M1MknRreEMo" target="_blank" rel="noreferrer" className="vs-video__button play-btn">
                  <FaPlay style={{ color: '#fff' }} />
                </a>
                <div className="vs-title title-anime animation-style2 mt-4">
                  <div className="title-anime__wrap">
                    <span className="vs-title__sub text-white">Need Some Help?</span>
                    <h2 className="vs-title__main text-white">
                      Explore Our Campus
                    </h2>
                  </div>
                </div>
                <hr className="vs-video__divider" />
                <div className="vs-video__content">
                  <Link to="/admissions" className="vs-btn"><span className="vs-btn__border"></span>admission</Link>
                  <div className="icon-call text-start">
                    <div className="icon-call__content" style={{ paddingLeft: '20px' }}>
                      <span className="icon-call__title" style={{ color: '#ffffff' }}>Call Support</span>
                      <a href="tel:+914040XXXXXX" className="icon-call__number" style={{ color: '#ffffff' }}>+91-40-XXXXXXXX</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vs Team Section */}
      <section className="space space-extra-bottom bg-color6 overflow-hidden" style={{ backgroundImage: 'url(/assets/img/team/team-bg.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Expert Team</span>
                  <h2 className="vs-title__main">Meet Our Educators</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {[
              { name: 'Dr. Sarah Mathews', role: 'Principal', img: '1573496359142-b8d87734a5a2' },
              { name: 'Ayesha Khan', role: 'Pre-Primary Head', img: '1580489944761-15a19d654956' },
              { name: 'Rahul Sharma', role: 'Maths Department Head', img: '1500648767791-00dcc994a43e' },
              { name: 'Priya Desai', role: 'Arts Coordinator', img: '1544005313-94ddf0286df2' }
            ].map((teacher, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-30">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-team vs-team--style2">
                  <div className="vs-team__img">
                    <img src={`https://images.unsplash.com/photo-${teacher.img}?q=80&w=300&h=300&fit=crop`} alt={teacher.name} style={{ borderRadius: '15px' }} />
                  </div>
                  <div className="vs-team__content">
                    <h3 className="vs-team__heading">
                      <span>{teacher.name}</span>
                    </h3>
                    <span className="vs-team__role">{teacher.role}</span>
                  </div>
                  <ul className="vs-team__share--list">
                    <li><a href="#"><FaFacebookF /></a></li>
                    <li><a href="#"><FaInstagram /></a></li>
                    <li><a href="#"><FaLinkedinIn /></a></li>
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="vs-room--area space space-extra-bottom z-index-common parallax-wrap overflow-hidden" style={{ backgroundImage: 'url(/assets/img/rooms/room-bg.png)' }}>
        <img className="vs-room__ele1" src="/assets/img/rooms/room-ele1.png" alt="room ele1" />
        <img className="vs-room__ele2" src="/assets/img/rooms/room-ele2.png" alt="room ele2" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-50">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-title pe-xl-3 mb-0 title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Inspiring Environments</span>
                  <h2 className="vs-title__main pe-xl-4">Kids Activities And Fun</h2>
                </div>
                <p className="vs-title__text text-capitalize fw-medium mb-0">
                  Our facilities are carefully designed to stimulate creativity, teamwork, and healthy development in a joyful setting.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-7 mb-50">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-room--video" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544426532-61d00d23fb5e?q=80&w=700&h=450&fit=crop)', borderRadius: '20px', overflow: 'hidden' }}>
                <div className="vs-room--ex">
                  <span className="vs-room--ex__num counter-style">
                    <span className="counter-number">21</span>+
                  </span>
                  <h4 className="vs-room--ex__title">years of experience</h4>
                  <img src="/assets/img/rooms/ex-icon.svg" alt="ex icon" />
                </div>
              </motion.div>
            </div>
          </div>
          <div className="row">
            {[
              { title: "Play Ground", color: "bg-color4", icon: "1" },
              { title: "Library", color: "bg-color1", icon: "2" },
              { title: "Music Club", color: "bg-color3", icon: "3" },
              { title: "Cafeteria", color: "bg-color2", icon: "4" }
            ].map((room, idx) => (
              <div key={idx} className="col-lg-3 mb-30">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`vs-room ${room.color}`}>
                  <div className="vs-room__icon">
                    <img src={`/assets/img/rooms/room-icon-h2-${room.icon}.svg`} alt="room icon" />
                  </div>
                  <h3 className="vs-room__title">{room.title}</h3>
                  <p className="vs-room__text">Safe, clean, and inspiring spaces.</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdmissionCta />
    </>
  )
}
