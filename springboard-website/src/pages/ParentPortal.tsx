import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheck, FaChartSimple, FaCreditCard, FaMobileScreen, FaShieldHalved, FaCommentDots, FaFileLines, FaRocket } from 'react-icons/fa6'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function ParentPortal() {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    setNotified(true)
    setEmail('')
    setTimeout(() => setNotified(false), 3000)
  }

  const features = [
    { icon: <FaChartSimple />, title: 'Real-time Tracking', desc: 'Monitor attendance and academic progress in real-time', color: 'bg-theme-color1' },
    { icon: <FaCreditCard />, title: 'Online Payments', desc: 'Secure fee payment through multiple payment options', color: 'bg-theme-color2' },
    { icon: <FaMobileScreen />, title: 'Mobile App', desc: 'Access the portal anytime, anywhere with our app', color: 'bg-theme-color3' },
    { icon: <FaShieldHalved />, title: 'Data Security', desc: 'Bank-grade encryption for data protection', color: 'bg-theme-color4' },
    { icon: <FaCommentDots />, title: 'Communication', desc: 'Direct messaging with teachers and administration', color: 'bg-theme-color5' },
    { icon: <FaFileLines />, title: 'Documents', desc: 'Access and download certificates and reports', color: 'bg-theme-color6' }
  ]

  return (
    <>
      <SeoHead
        title="Parent Portal"
        description="Springboard Indian School Parent Portal - Coming Soon. Access fee payments, attendance, and report cards."
        noIndex={true}
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-1.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Parent Portal</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Parent Portal</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <section className="space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={fadeInUp}
                className="vs-service text-center bg-color6 rounded p-5 relative overflow-hidden transition-all shadow-sm"
              >
                <div className="text-theme-color3 mb-4" style={{ fontSize: '80px' }}>
                  <FaRocket />
                </div>

                <h2 className="sec-title mb-3">Coming Soon</h2>
                <p className="text-muted fs-md mb-4 pb-2">
                  We're building an enhanced Parent Portal to make school communication and management easier for you. Soon you'll be able to:
                </p>

                <div className="row justify-content-center text-start mb-4">
                  <div className="col-md-10">
                    <ul className="vs-list style2 column-count-1 mb-4">
                      <li><FaCheck className="text-theme-color1 me-2" /> View real-time attendance records</li>
                      <li><FaCheck className="text-theme-color2 me-2" /> Access digital report cards and progress reports</li>
                      <li><FaCheck className="text-theme-color3 me-2" /> Make online fee payments securely</li>
                      <li><FaCheck className="text-theme-color4 me-2" /> Communicate directly with teachers</li>
                      <li><FaCheck className="text-theme-color5 me-2" /> View academic calendar and announcements</li>
                      <li><FaCheck className="text-theme-color1 me-2" /> Track assignments and homework</li>
                    </ul>
                  </div>
                </div>

                {/* Notification Form */}
                <form onSubmit={handleNotifyMe} className="vs-side-form widget bg-white text-start mb-4">
                  <h4 className="wp-block-heading border-0 pb-0 h5">Get notified when it launches</h4>
                  <div className="vs-side-form__group d-flex align-items-center bg-white border border-light rounded">
                    <input
                      type="email"
                      className="form-control border-0 bg-transparent flex-grow-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <button type="submit" className="vs-btn py-3 px-4 rounded-end">Notify Me</button>
                  </div>
                  {notified && (
                    <div className="text-success small mt-2 fw-bold">
                      <FaCheck className="me-1" /> Thank you! We'll notify you soon.
                    </div>
                  )}
                </form>

                <p className="text-muted small mb-0">
                  In the meantime, contact us at <a href="mailto:info@springboardschool.com" className="text-theme-color1">info@springboardschool.com</a> for any queries.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="space-extra-bottom">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">Portal Preview</span>
              <h2 className="vs-title__main">Key Features</h2>
            </div>
          </div>
          <div className="row">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="col-lg-4 col-md-6 mb-30"
              >
                <div className="feature-style1 text-center bg-color6 h-100 rounded p-4 border-0 feature-card hover-lift transition-all">
                  <div className={`feature-style1__icon ${feature.color} text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4`} style={{ width: '80px', height: '80px', fontSize: '36px' }}>
                    {feature.icon}
                  </div>
                  <h4 className="feature-style1__title">{feature.title}</h4>
                  <p className="feature-style1__text">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space bg-color6">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">Coming Soon</span>
              <h2 className="vs-title__main">Rollout Timeline</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {[
                { month: 'Q2 2026', title: 'Beta Testing', desc: 'Limited rollout with selected parents', color: 'text-theme-color1' },
                { month: 'Q3 2026', title: 'Full Launch', desc: 'Portal available to all parents', color: 'text-theme-color2' },
                { month: 'Ongoing', title: 'Enhancements', desc: 'Regular updates and new features', color: 'text-theme-color3' },
              ].map((phase, idx) => (
                <motion.div 
                  key={idx} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                  }}
                  className="d-flex bg-white rounded shadow-sm p-4 mb-3 align-items-center"
                >
                  <div className="me-4 pe-4 border-end border-light text-center" style={{ minWidth: '150px' }}>
                    <h3 className={`${phase.color} mb-0 h2 fw-bold`}>{idx + 1}</h3>
                    <span className="text-muted small fw-bold text-uppercase">{phase.month}</span>
                  </div>
                  <div>
                    <h4 className="mb-2 h5 fw-bold">{phase.title}</h4>
                    <p className="mb-0 text-muted">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AdmissionCta />
    </>
  )
}
