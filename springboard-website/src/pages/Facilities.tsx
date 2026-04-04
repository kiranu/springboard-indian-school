import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaVideo, FaBook, FaComputer, FaMicroscope, FaFutbol, FaBus, FaUtensils, FaUserDoctor } from 'react-icons/fa6'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Facilities() {
  const facilities = [
    {
      icon: <FaVideo />,
      title: 'CCTV Security System',
      desc: 'Complete campus coverage with 24/7 monitoring for maximum safety and security.',
    },
    {
      icon: <FaBook />,
      title: 'Digital Library',
      desc: 'Extensive collection of books, educational resources, and digital learning materials.',
    },
    {
      icon: <FaComputer />,
      title: 'Computer Lab',
      desc: 'Modern lab with latest computers for coding, digital skills, and IT education.',
    },
    {
      icon: <FaMicroscope />,
      title: 'Science Laboratory',
      desc: 'Well-equipped lab for hands-on experiments in Physics, Chemistry, and Biology.',
    },
    {
      icon: <FaFutbol />,
      title: 'Sports Ground',
      desc: 'Spacious playground for outdoor games, athletics, and physical fitness activities.',
    },
    {
      icon: <FaBus />,
      title: 'School Bus Service',
      desc: 'Safe and comfortable transportation covering major areas with trained drivers.',
    },
    {
      icon: <FaUtensils />,
      title: 'Cafeteria',
      desc: 'Hygienic dining facilities with nutritious meals prepared by trained staff.',
    },
    {
      icon: <FaUserDoctor />,
      title: 'Medical Room',
      desc: 'First aid facility with trained medical staff and emergency protocols in place.',
    },
  ]

  return (
    <>
      <SeoHead
        title="Facilities"
        description="Explore Springboard Indian School's world-class facilities including CCTV security, library, labs, playground, and safe campus infrastructure."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Our Facilities</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Facilities</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Facilities Grid */}
      <section className="space-top space-extra-bottom">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">World Class Facilities</span>
              <h2 className="vs-title__main">Experience Our Campus</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {facilities.map((facility, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="col-xl-3 col-lg-4 col-sm-6 mb-30"
              >
                <div className="feature-style1 text-center h-100 shadow-sm rounded p-4 border feature-card hover-lift transition-all">
                  <div className="feature-style1__icon bg-theme-color1 text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', fontSize: '36px' }}>
                    {facility.icon}
                  </div>
                  <h4 className="feature-style1__title">{facility.title}</h4>
                  <p className="feature-style1__text">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Highlights */}
      <section className="space bg-color6 border-top border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&h=600&fit=crop" 
                className="w-100 rounded-3 shadow" 
                alt="Safety Concept" 
              />
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <div className="vs-title title-anime animation-style2 mb-4">
                  <div className="title-anime__wrap">
                    <span className="vs-title__sub">Our Priority</span>
                    <h2 className="vs-title__main">Safety Features</h2>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <h4 className="h5 text-theme-color1 fw-bold mb-3">Physical Security</h4>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color1 me-2"></i>Secure compound access</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color1 me-2"></i>Trained security personnel</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color1 me-2"></i>Fire safety drills</li>
                    </ul>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h4 className="h5 text-theme-color2 fw-bold mb-3">Health & Hygiene</h4>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color2 me-2"></i>Regular health checkups</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color2 me-2"></i>Clean & hygienic campus</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color2 me-2"></i>Nutritious meals</li>
                    </ul>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h4 className="h5 text-theme-color3 fw-bold mb-3">Child Safety</h4>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color3 me-2"></i>Background-checked staff</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color3 me-2"></i>Anti-bullying policies</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color3 me-2"></i>Parent communication</li>
                    </ul>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h4 className="h5 text-theme-color4 fw-bold mb-3">Tech & Monitoring</h4>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color4 me-2"></i>CCTV cameras</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color4 me-2"></i>Digital attendance</li>
                      <li className="mb-2"><i className="fas fa-check-circle text-theme-color4 me-2"></i>Parent notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Details */}
      <section className="space">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">Environment</span>
              <h2 className="vs-title__main">Campus Infrastructure</h2>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 mb-4">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border rounded shadow-sm p-5 h-100 relative overflow-hidden">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#ff6251' }}></div>
                <h4 className="text-theme-color1 mb-3">Academic Facilities</h4>
                <p className="text-muted">
                  Spacious, well-ventilated classrooms with age-appropriate furniture and modern teaching aids.
                  Interactive displays, educational charts, and technology-enabled learning spaces.
                </p>
                <p className="text-muted mb-0">
                  Dedicated areas for art, music, and physical education. Outdoor learning spaces for nature
                  studies and activity-based learning programs.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6 mb-4">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border rounded shadow-sm p-5 h-100 relative overflow-hidden">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#f69623' }}></div>
                <h4 className="text-theme-color2 mb-3">Support Services</h4>
                <p className="text-muted">
                  Administrative office with experienced staff for admissions, fee management, and enquiries.
                  Counseling services and student support for holistic development.
                </p>
                <p className="text-muted mb-0">
                  Rest areas for young children. Staff rooms and faculty areas. Adequate parking for parents
                  and visitors.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AdmissionCta subtitle="Visit our campus to experience our world-class facilities firsthand. Schedule your visit today!" />
    </>
  )
}
