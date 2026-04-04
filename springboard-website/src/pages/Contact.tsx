import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPhoneVolume, FaEnvelope, FaInstagram, FaLinkedinIn, FaVimeoV, FaTwitter } from 'react-icons/fa'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ fname: '', lname: '', phone: '', email: '', message: '' })
  }

  return (
    <>
      <SeoHead
        title="Contact Us"
        description="Get in touch with Springboard Indian School. We'd love to hear from you and answer any questions about admissions."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Contact Us</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Contact us</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="space space-extra-bottom overflow-hidden">
        <div className="container">
          <div className="row gx-60">
            <div className="col-lg-5 mb-30">
              <div className="vs-title title-anime animation-style2 mb-3">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">contact us</span>
                  <h2 className="vs-title__main">Get In Touch</h2>
                </div>
              </div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="contact-info mb-20">
                <span>Address:</span> Springboard Indian School, Plot No. XXX, Hyderabad, Telangana, India - 500XXX
              </motion.div>
              <div className="mb-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="address-info">
                  <div className="address-info__icon">
                    <FaPhoneVolume />
                  </div>
                  <div className="address-info__content">
                    <span>Customer Service :</span>
                    <a href="tel:+914040XXXXXX">+91-40-XXXXXXXX,</a>
                    <a href="tel:+9198XXXXXXXX">+91-98-XXXXXXXX</a>
                  </div>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="address-info">
                  <div className="address-info__icon">
                    <FaEnvelope />
                  </div>
                  <div className="address-info__content">
                    <span>careers / info :</span>
                    <a className="text-lowercase" href="mailto:info@springboardschool.com">info@springboardschool.com</a>
                  </div>
                </motion.div>
              </div>
              <img className="contact-divider" src="/assets/img/elements/divider-contact.svg" alt="divider" />
              <div className="social-style style2">
                <span className="social-style__label">Follow Us :</span>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaVimeoV /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
            
            <div className="col-lg-7 mb-30">
              <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} onSubmit={handleSubmit} className="form-style2 ajax-contact">
                {submitted && (
                  <div style={{ backgroundColor: '#d4edda', color: '#27ae60', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                    Thank you! We'll get back to you soon.
                  </div>
                )}
                <div className="row gx-20">
                  <div className="col-md-6 form-group">
                    <input className="form-control" type="text" name="fname" id="fname" placeholder="Your Name *" value={formData.fname} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <input className="form-control" type="text" name="lname" id="lname" placeholder="Last Name *" value={formData.lname} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <input className="form-control" type="email" name="email" id="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <input className="form-control" type="tel" name="phone" id="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-12 form-group">
                    <textarea className="form-control" name="message" id="message" placeholder="Type Your Message *" rows={5} value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="col-12">
                    <button className="vs-btn" type="submit"><span className="vs-btn__border"></span>Send Message</button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps View */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '400px' }}>
            <iframe 
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3217409249764!2d78.36151771487714!3d17.44431838804473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a2eb620faf%3A0xeabf521b44d708f5!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <AdmissionCta />
    </>
  )
}
