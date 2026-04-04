import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'

interface AdmissionCtaProps {
  title?: string
  subtitle?: string
  primaryBtn?: string
  primaryLink?: string
  secondaryBtn?: string
  secondaryLink?: string
}

export default function AdmissionCta({
  title = 'Admissions 2026-27 Are Now Open',
  subtitle = "Seats filling fast for Play Group, Nursery & KG. Secure your child's place today.",
  primaryBtn = 'Apply Now',
  primaryLink = '/admissions',
  secondaryBtn = 'Book a School Visit',
  secondaryLink = '/contact?type=visit',
}: AdmissionCtaProps) {
  return (
    <section className="cta-area z-index-common space-extra" style={{ backgroundColor: '#2b2a63' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="row align-items-center justify-content-center text-center"
        >
          <div className="col-xl-8 col-lg-10">
            <h2 className="vs-title__main text-white mb-4" style={{ fontSize: '42px' }}>
              {title}
            </h2>
            <p className="text-white mb-4 pb-2" style={{ fontSize: '18px', opacity: 0.9 }}>
              {subtitle}
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to={primaryLink} className="vs-btn">
                {primaryBtn} 
                <FaArrowRight className="ms-2" />
              </Link>
              <Link to={secondaryLink} className="vs-btn style3">
                {secondaryBtn}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Optional template shapes */}
      <div className="vs-balls" data-balls-bottom="20px" data-balls-color="#f5e8d6"></div>
    </section>
  )
}
