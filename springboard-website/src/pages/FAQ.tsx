import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

interface FAQItem {
  q: string
  a: string
}

const FAQ_DATA: { category: string; items: FAQItem[] }[] = [
  {
    category: 'Admissions',
    items: [
      {
        q: 'What is the age criteria for admission to Play Group?',
        a: 'Children aged 2.5 to 3.5 years are eligible for Play Group admission. For Nursery, the child should be between 3 to 4 years of age as of June 1st of the academic year.'
      },
      {
        q: 'How do I apply for admission to Springboard Indian School?',
        a: 'You can apply online by filling the enquiry form on our Admissions page, or visit the school office directly. Our admissions team will guide you through the registration process, document submission, and interaction schedule.'
      },
      {
        q: 'What documents are required for admission?',
        a: 'Required documents include: child\'s birth certificate, previous school\'s Transfer Certificate (for Grade 1 and above), report card / progress report, passport-size photographs of the child and parents, and proof of residence (Aadhaar / utility bill).'
      },
      {
        q: 'Is there an entrance test for admission?',
        a: 'For Play Group to Grade 2, there is no formal entrance test. An informal interaction with the child is conducted to understand their readiness. For Grade 3 and above, a written assessment in English and Mathematics may be conducted.'
      },
      {
        q: 'Are seats available mid-year?',
        a: 'Mid-year admissions are considered subject to seat availability. Please contact our admissions office to check current availability for the desired grade.'
      },
    ]
  },
  {
    category: 'Curriculum & Academics',
    items: [
      {
        q: 'Which board does Springboard Indian School follow?',
        a: 'Springboard Indian School follows the CBSE (Central Board of Secondary Education) curriculum, which is nationally recognised and widely respected for its balanced, comprehensive approach to education.'
      },
      {
        q: 'What grades does the school offer?',
        a: 'We currently offer classes from Play Group through Grade 7. We are progressively expanding to higher grades in subsequent academic years.'
      },
      {
        q: 'What is the medium of instruction?',
        a: 'English is the primary medium of instruction. Hindi and Telugu are taught as second and third languages respectively, as per the CBSE three-language formula.'
      },
      {
        q: 'Does the school offer any special support for slow learners?',
        a: 'Yes. Our experienced faculty identifies students who need additional support and provides remedial classes, one-on-one attention, and personalised learning strategies to help every child progress at their own pace.'
      },
    ]
  },
  {
    category: 'Facilities & Safety',
    items: [
      {
        q: 'Is the school campus safe for young children?',
        a: 'Absolutely. The campus is fully secured with CCTV surveillance, controlled entry/exit points, and trained security personnel. All staff undergo background verification before joining. Child safety is our highest priority.'
      },
      {
        q: 'Does the school provide transportation?',
        a: 'Yes, we offer a GPS-tracked school bus service covering major areas of Hyderabad. All buses are equipped with a female attendant. Please contact the school office for route details and fee structure.'
      },
      {
        q: 'What sports and extracurricular facilities are available?',
        a: 'We have a spacious playground, indoor activity rooms, a library, science lab, computer lab, art & craft room, and a dedicated space for music and dance. Students are encouraged to participate in sports, cultural events, and clubs.'
      },
      {
        q: 'Are meals provided at school?',
        a: 'We have a hygienic canteen serving healthy, nutritious meals and snacks. A vegetarian menu is maintained. Parents may also pack a home lunch. Junk food is discouraged on campus.'
      },
    ]
  },
  {
    category: 'Fees & Payments',
    items: [
      {
        q: 'What are the fee structure and payment modes?',
        a: 'Fee details are shared during the admission process. Fees can be paid quarterly, half-yearly, or annually. We accept payment via online transfer (NEFT/UPI), demand draft, or at the school office. Please contact the accounts department for the current fee schedule.'
      },
      {
        q: 'Are there any scholarships available?',
        a: 'Yes, merit-based scholarships are available for students demonstrating academic excellence or exceptional talent in sports/arts. Additionally, sibling discounts are offered. Please enquire at the admissions office for eligibility criteria.'
      },
      {
        q: 'What is the refund policy if we withdraw before the academic year starts?',
        a: 'The refund policy varies based on the timing of withdrawal. Admission fees are generally non-refundable. Tuition fees paid in advance are partially refundable as per the school\'s withdrawal policy. Please refer to the admission agreement for full details.'
      },
    ]
  },
  {
    category: 'Parent Engagement',
    items: [
      {
        q: 'How does the school communicate with parents?',
        a: 'We use a combination of the Parent Portal on our website, WhatsApp notifications, email newsletters, and SMS alerts for important announcements. Parent-Teacher Meetings (PTMs) are held quarterly for one-on-one academic discussions.'
      },
      {
        q: 'Can parents visit the school during school hours?',
        a: 'Yes, parents are welcome to visit the school by scheduling an appointment with the school office or the relevant class teacher. Walk-in visits during class hours are not permitted to avoid disruption to the learning environment.'
      },
      {
        q: 'How do I report an issue or concern about my child?',
        a: 'You can reach out directly to the class teacher via the Parent Portal messaging system, call the school office, or request a meeting with the Principal. We take all concerns seriously and respond within 24–48 working hours.'
      },
    ]
  },
]

function AccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0', borderRadius: 10, marginBottom: 12,
      overflow: 'hidden', boxShadow: isOpen ? '0 2px 12px rgba(27,79,142,0.08)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      <button
        onClick={onClick}
        style={{
          width: '100%', padding: '18px 22px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: isOpen ? '#eff6ff' : '#fff',
          border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
          transition: 'background 0.2s',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? '#1B4F8E' : '#1e293b', lineHeight: 1.5, flex: 1 }}>
          {item.q}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: isOpen ? '#1B4F8E' : '#f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? '#fff' : '#64748b', fontSize: 12, transition: 'all 0.2s',
        }}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 22px 20px', fontSize: 15, color: '#475569', lineHeight: 1.8, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  const [activeTab, setActiveTab] = useState(0)

  const toggle = (key: string) => setOpenKey(openKey === key ? null : key)

  return (
    <>
      <SeoHead
        title="Frequently Asked Questions"
        description="Find answers to common questions about admissions, curriculum, fees, facilities, and more at Springboard Indian School Hyderabad."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff" />
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Frequently Asked Questions</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">FAQ</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="space space-bottom z-index-common">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="vs-title text-center title-anime animation-style2" style={{ marginBottom: 48 }}>
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Got Questions?</span>
                  <h2 className="vs-title__main">We Have <span>Answers</span></h2>
                </div>
                <p style={{ color: '#64748b', fontSize: 15, marginTop: 12 }}>
                  Can't find your answer here? <Link to="/contact" style={{ color: '#1B4F8E', fontWeight: 600 }}>Contact us</Link> — we're happy to help.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Category Tabs */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            {FAQ_DATA.map((cat, idx) => (
              <button key={idx} onClick={() => setActiveTab(idx)}
                style={{
                  padding: '9px 22px', borderRadius: 25, border: 'none', cursor: 'pointer',
                  background: activeTab === idx ? '#1B4F8E' : '#f1f5f9',
                  color: activeTab === idx ? '#fff' : '#475569',
                  fontSize: 14, fontWeight: activeTab === idx ? 600 : 400,
                  transition: 'all 0.2s',
                }}>
                {cat.category}
              </button>
            ))}
          </motion.div>

          {/* Accordion */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ maxWidth: 800, margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {FAQ_DATA[activeTab].items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    item={item}
                    isOpen={openKey === `${activeTab}-${idx}`}
                    onClick={() => toggle(`${activeTab}-${idx}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <AdmissionCta subtitle="Still have questions? Our admissions team is ready to help you!" />
    </>
  )
}
