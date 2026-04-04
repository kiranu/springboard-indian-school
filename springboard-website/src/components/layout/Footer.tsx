import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPhoneVolume, FaFacebookF, FaInstagram, FaYoutube, FaLocationDot, FaEnvelope, FaAngleRight } from 'react-icons/fa6'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Footer() {
  return (
    <footer className="vs-footer bg-title">
      <div className="vs-footer__top z-index-common space-extra-top space-extra-bottom">
        <motion.img 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          src="/assets/img/footer/footer-element-1.png" alt="Footer Element" className="vs-footer__ele1" />
        <img src="/assets/img/footer/footer-element-2.png" alt="Footer Element" className="vs-footer__ele2" />
        <motion.img 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          src="/assets/img/footer/footer-element-3.png" alt="Footer Element" className="vs-footer__ele3" />
        <div className="vs-balls vs-balls--screen" data-balls-top="-6px" data-balls-color="#ffffff"></div>
        
        <div className="container">
          <div className="row gy-4 gx-xxl-5">
            {/* Widget 1: About */}
            <div className="col-lg-4 col-md-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-footer__widget">
                <div className="vs-footer__logo text-center text-md-start mb-25">
                  <Link to="/" className="vs-footer__logo-link">
                    <img src="/assets/img/springboard-logo.png" alt="Springboard Logo" style={{ filter: 'brightness(0) invert(1)', maxHeight: '70px' }} />
                  </Link>
                </div>
                <p className="vs-footer__desc text-center text-md-start text-white">
                  Springboard Indian School is dedicated to nurturing young minds with quality CBSE education, holistic development, and activity-based learning.
                </p>
                <div className="icon-call justify-content-center justify-content-md-start pt-10 mb-10">
                  <span className="icon-call__icon"><FaPhoneVolume /></span>
                  <div className="icon-call__content">
                    <span className="icon-call__title text-white">Call us</span>
                    <a href="tel:+914040XXXXXX" className="icon-call__number text-white">+91-40-XXXXXXXX</a>
                  </div>
                </div>
                <div className="social-style social-style--version2 w-100 justify-content-center justify-content-md-start pt-25">
                  <span className="social-style__label text-white">Follow us :</span>
                  <a href="#"><FaFacebookF /></a>
                  <a href="#"><FaInstagram /></a>
                  <a href="#"><FaYoutube /></a>
                </div>
              </motion.div>
            </div>

            {/* Widget 2: Quick Links */}
            <div className="col-lg-4 col-md-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-footer__widget">
                <h3 className="vs-footer__title text-white">Discover</h3>
                <div className="vs-footer__menu">
                  <ul className="vs-footer__menu--list text-white">
                    <li><Link to="/"><FaAngleRight className="me-2" />Home</Link></li>
                    <li><Link to="/about"><FaAngleRight className="me-2" />About Us</Link></li>
                    <li><Link to="/academics"><FaAngleRight className="me-2" />Academics</Link></li>
                    <li><Link to="/admissions"><FaAngleRight className="me-2" />Admissions</Link></li>
                    <li><Link to="/contact"><FaAngleRight className="me-2" />Contact</Link></li>
                  </ul>
                  <ul className="vs-footer__menu--list text-white">
                    <li><Link to="/gallery"><FaAngleRight className="me-2" />Gallery</Link></li>
                    <li><Link to="/events"><FaAngleRight className="me-2" />Events</Link></li>
                    <li><Link to="/facilities"><FaAngleRight className="me-2" />Facilities</Link></li>
                    <li><Link to="/blog"><FaAngleRight className="me-2" />Blog</Link></li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Widget 3: Contact Info */}
            <div className="col-lg-4 col-md-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="vs-footer__widget">
                <h3 className="vs-footer__title text-white">Contact Info</h3>
                <div className="sidebar-gallery">
                  <div className="contact-info" style={{ color: 'white', opacity: 0.8 }}>
                    <p className="mb-3">
                      <strong className="d-block mb-1"><FaLocationDot className="me-2 text-theme-color" /> Address:</strong>
                      Springboard Indian School,<br />
                      Hyderabad, Telangana, India
                    </p>
                    <p className="mb-3">
                      <strong className="d-block mb-1"><FaEnvelope className="me-2 text-theme-color" /> Email:</strong>
                      <a href="mailto:info@springboardschool.com" className="text-white text-decoration-none">info@springboardschool.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="vs-footer__bottom bg-theme-color-1">
        <div className="container">
          <div className="row gy-3 gx-5 align-items-center justify-content-center justify-content-lg-between flex-column-reverse flex-lg-row">
            <div className="col-md-auto">
              <p className="vs-footer__copyright mb-0 text-white">
                Copyright © {new Date().getFullYear()}
                <Link to="/" className="text-white ms-1 fw-bold">Springboard Indian School</Link>. All rights reserved
              </p>
            </div>
            <div className="col-md-auto">
              <ul className="vs-footer__bottom--menu text-white m-0 p-0" style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
                <li><Link to="/" className="text-white text-decoration-none">Terms & Conditions</Link></li>
                <li><Link to="/" className="text-white text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
