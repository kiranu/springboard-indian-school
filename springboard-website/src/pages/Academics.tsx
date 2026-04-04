import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaChalkboardUser, FaLaptopCode, FaEarthAsia, FaPalette, FaMicroscope, FaPersonRunning, FaMusic } from 'react-icons/fa6'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Academics() {
  const programs = [
    {
      id: 'play-group',
      grade: 'Play Group',
      age: 'Age 2.5 - 3 years',
      subjects: 'Play, Language, Numbers, Art, Music',
      approach: 'Play-based learning with focus on social skills',
      color: 'theme-color1'
    },
    {
      id: 'nursery',
      grade: 'Nursery',
      age: 'Age 3 - 4 years',
      subjects: 'English, Hindi, Maths, EVS, Art, Music',
      approach: 'Introduction to academics with play integration',
      color: 'theme-color2'
    },
    {
      id: 'kg',
      grade: 'KG (LKG & UKG)',
      age: 'Age 4 - 6 years',
      subjects: 'English, Hindi, Maths, EVS, Art, PT',
      approach: 'Foundation building with structured learning',
      color: 'theme-color3'
    },
    {
      id: 'grade-1-4',
      grade: 'Grade 1 - 4',
      age: 'Age 6 - 10 years',
      subjects: 'English, Maths, EVS, Art, Computer',
      approach: 'Comprehensive CBSE curriculum with practicals',
      color: 'theme-color4'
    },
    {
      id: 'grade-5-7',
      grade: 'Grade 5 - 7',
      age: 'Age 10 - 13 years',
      subjects: 'English, Math, Science, Social, IT, Art',
      approach: 'Advanced CBSE with subject specialization',
      color: 'theme-color5'
    },
  ]

  const timetable = [
    { time: '08:00 AM', activity: 'School Opens & Assembly' },
    { time: '08:15 AM - 09:15 AM', activity: 'First Period' },
    { time: '09:15 AM - 10:15 AM', activity: 'Second Period' },
    { time: '10:15 AM - 10:45 AM', activity: 'Break & Snack Time' },
    { time: '10:45 AM - 11:45 AM', activity: 'Third Period' },
    { time: '11:45 AM - 12:45 PM', activity: 'Fourth Period / Lunch' },
    { time: '12:45 PM - 01:45 PM', activity: 'Activity / Play Time' },
    { time: '01:45 PM - 02:45 PM', activity: 'Fifth Period' },
    { time: '02:45 PM - 03:30 PM', activity: 'Closing & Dismissal' },
  ]

  return (
    <>
      <SeoHead
        title="Academics"
        description="Explore Springboard Indian School's comprehensive CBSE curriculum covering Play Group to Grade 7 with activity-based learning approaches."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-1.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Academics</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Academics</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Intro */}
      <section className="space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h2 className="sec-title mb-4">Our Educational Philosophy</h2>
                <p className="fs-md text-muted mb-4">
                  Springboard Indian School follows the CBSE curriculum, one of the most comprehensive
                  and well-structured education systems in India. Our academic program is designed to develop
                  critical thinking, creativity, and a lifelong love for learning in every student.
                </p>
                <p className="fs-md text-muted">
                  We seamlessly combine traditional teaching methods with modern, interactive approaches to create an
                  engaging learning environment where every child can thrive and reach their full potential.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade-wise Programs */}
      <section className="space-extra-bottom">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">Our Classes</span>
              <h2 className="vs-title__main">Grade-Wise Programs</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {programs.map((program, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div className="vs-service text-center h-100 bg-color6 rounded p-5 relative overflow-hidden transition-all hover-lift">
                  <div className={`bg-${program.color} position-absolute top-0 start-0 w-100`} style={{ height: '4px' }}></div>
                  <h3 className={`text-${program.color} mb-1`}>{program.grade}</h3>
                  <span className="d-block mb-4 fw-bold text-muted">{program.age}</span>
                  <div className="text-start mb-3">
                    <h4 className="h6 fw-bold mb-2">Key Subjects:</h4>
                    <p className="text-muted small mb-0">{program.subjects}</p>
                  </div>
                  <div className="text-start">
                    <h4 className="h6 fw-bold mb-2">Learning Approach:</h4>
                    <p className="text-muted small mb-0">{program.approach}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Based Learning */}
      <section className="space bg-color6">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <motion.img 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&h=600&fit=crop" 
                alt="Activity Based Learning" 
                className="w-100 rounded shadow" 
              />
            </div>
            <div className="col-lg-6 ps-xl-5">
              <div className="vs-title title-anime animation-style2 mb-4">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Active Engagement</span>
                  <h2 className="vs-title__main">Activity-Based Learning</h2>
                </div>
              </div>
              <p className="text-muted mb-4">
                We believe that children learn best through doing. Our activity-based approach incorporates
                hands-on projects, experiments, field trips, and interactive classroom activities.
              </p>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center gap-3 bg-white p-3 rounded shadow-sm border-start border-4 border-primary">
                    <div className="text-primary fs-3"><FaPalette /></div>
                    <span className="fw-bold">Art & Craft</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center gap-3 bg-white p-3 rounded shadow-sm border-start border-4 border-success">
                    <div className="text-success fs-3"><FaMicroscope /></div>
                    <span className="fw-bold">Science Labs</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center gap-3 bg-white p-3 rounded shadow-sm border-start border-4 border-warning">
                    <div className="text-warning fs-3"><FaPersonRunning /></div>
                    <span className="fw-bold">Sports & PE</span>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center gap-3 bg-white p-3 rounded shadow-sm border-start border-4 border-danger">
                    <div className="text-danger fs-3"><FaMusic /></div>
                    <span className="fw-bold">Drama & Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="space">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">Why Choose Us</span>
              <h2 className="vs-title__main">Curriculum Highlights</h2>
            </div>
          </div>
          <div className="row">
            {[
              { icon: <FaBookOpen />, title: 'CBSE Aligned', desc: 'Following National Board of Education standards', color: 'bg-theme-color1' },
              { icon: <FaChalkboardUser />, title: 'Qualified Teachers', desc: 'Experienced and trained educators guiding students', color: 'bg-theme-color2' },
              { icon: <FaLaptopCode />, title: 'Tech Integration', desc: 'Modern tools and digital learning platforms', color: 'bg-theme-color3' },
              { icon: <FaEarthAsia />, title: 'Multilingual', desc: 'English, Hindi, and regional language exposure', color: 'bg-theme-color4' },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="col-lg-3 col-md-6 mb-4"
              >
                <div className="feature-style1 text-center bg-white h-100 shadow-sm rounded p-4 border feature-card hover-lift transition-all">
                  <div className={`feature-style1__icon ${item.color} text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4`} style={{ width: '80px', height: '80px', fontSize: '36px' }}>
                    {item.icon}
                  </div>
                  <h4 className="feature-style1__title">{item.title}</h4>
                  <p className="feature-style1__text">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Overview */}
      <section className="space bg-color6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Daily Routine</span>
                  <h2 className="vs-title__main">School Timetable</h2>
                </div>
              </div>
              <div className="bg-white rounded p-4 shadow-sm border">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-theme-color1 text-white">
                      <tr>
                        <th className="py-3 px-4 border-0 text-white rounded-start" style={{ width: '40%' }}>Time</th>
                        <th className="py-3 px-4 border-0 text-white rounded-end">Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-4 fw-bold text-theme-color1">{row.time}</td>
                          <td className="py-3 px-4 text-muted">{row.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AdmissionCta />
    </>
  )
}
