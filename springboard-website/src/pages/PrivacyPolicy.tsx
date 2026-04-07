import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SeoHead from '../components/seo/SeoHead'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 36 }}>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1B4F8E', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #e2e8f0' }}>
      {title}
    </h3>
    <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <>
      <SeoHead
        title="Privacy Policy"
        description="Springboard Indian School's Privacy Policy — how we collect, use, and protect your personal information."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff" />
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Privacy Policy</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Privacy Policy</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="space space-bottom z-index-common">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ maxWidth: 860, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '48px 52px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>

            <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 4 }}>Last updated: April 2026</p>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, margin: 0 }}>
                At <strong>Springboard Indian School</strong>, we are committed to protecting the privacy and security of
                your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                information when you visit our website or interact with our school's services.
              </p>
            </div>

            <Section title="1. Information We Collect">
              <p><strong>Information you provide directly:</strong></p>
              <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 12 }}>
                <li style={{ marginBottom: 6 }}>Name, email address, phone number submitted via enquiry or contact forms</li>
                <li style={{ marginBottom: 6 }}>Child's name, date of birth, grade level for admission enquiries</li>
                <li style={{ marginBottom: 6 }}>Parent/guardian details provided during the admissions process</li>
                <li style={{ marginBottom: 6 }}>Messages or feedback submitted through our website</li>
              </ul>
              <p><strong>Information collected automatically:</strong></p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}>Browser type, IP address, device type, and operating system</li>
                <li style={{ marginBottom: 6 }}>Pages visited, time spent on site, and referring URLs</li>
                <li style={{ marginBottom: 6 }}>Cookies and similar tracking technologies (see Section 6)</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}>Respond to your enquiries and provide requested information</li>
                <li style={{ marginBottom: 6 }}>Process admission applications and communicate admission status</li>
                <li style={{ marginBottom: 6 }}>Send school newsletters, event updates, and important notices</li>
                <li style={{ marginBottom: 6 }}>Improve our website experience and services</li>
                <li style={{ marginBottom: 6 }}>Comply with legal obligations and protect the school's interests</li>
                <li style={{ marginBottom: 6 }}>Conduct internal analytics and reporting</li>
              </ul>
              <p style={{ marginTop: 10 }}>We will <strong>never</strong> sell your personal information to third parties.</p>
            </Section>

            <Section title="3. Sharing of Information">
              <p>We may share your information in the following limited circumstances:</p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}><strong>Service Providers:</strong> Trusted third-party vendors who assist in operating our website and services (e.g., email providers, analytics platforms) under strict confidentiality agreements</li>
                <li style={{ marginBottom: 6 }}><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                <li style={{ marginBottom: 6 }}><strong>School Operations:</strong> Authorised school staff and management for administrative purposes</li>
              </ul>
            </Section>

            <Section title="4. Data Retention">
              <p>We retain personal information for as long as necessary to fulfil the purposes for which it was collected,
                including legal, accounting, or reporting requirements. Admission-related data for enrolled students is
                retained for the duration of enrolment and as required by applicable education regulations thereafter.
                Enquiry data from non-enrolled individuals is retained for up to 2 years.</p>
            </Section>

            <Section title="5. Data Security">
              <p>We implement appropriate technical and organisational security measures to protect your personal information
                against unauthorised access, disclosure, alteration, or destruction. These include:</p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}>HTTPS encryption for all data transmitted through the website</li>
                <li style={{ marginBottom: 6 }}>Restricted access to personal data on a need-to-know basis</li>
                <li style={{ marginBottom: 6 }}>Regular security reviews of our systems and processes</li>
              </ul>
              <p style={{ marginTop: 10 }}>While we strive to protect your information, no method of transmission over
                the internet is 100% secure. We cannot guarantee absolute security.</p>
            </Section>

            <Section title="6. Cookies Policy">
              <p>Our website uses cookies — small text files stored on your device — to enhance your browsing experience.
                We use the following types of cookies:</p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}><strong>Essential Cookies:</strong> Required for the website to function correctly</li>
                <li style={{ marginBottom: 6 }}><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (e.g., Google Analytics)</li>
                <li style={{ marginBottom: 6 }}><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p style={{ marginTop: 10 }}>You can control or disable cookies through your browser settings. Note that
                disabling certain cookies may affect website functionality.</p>
            </Section>

            <Section title="7. Children's Privacy">
              <p>Our website is not directed to children under 13 years of age, and we do not knowingly collect personal
                information directly from children. Information about students is collected from parents or guardians only.
                If you believe we have inadvertently collected information from a child, please contact us immediately.</p>
            </Section>

            <Section title="8. Your Rights">
              <p>You have the right to:</p>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={{ marginBottom: 6 }}><strong>Access</strong> the personal information we hold about you</li>
                <li style={{ marginBottom: 6 }}><strong>Correct</strong> inaccurate or incomplete information</li>
                <li style={{ marginBottom: 6 }}><strong>Request deletion</strong> of your personal data (subject to legal obligations)</li>
                <li style={{ marginBottom: 6 }}><strong>Withdraw consent</strong> for marketing communications at any time</li>
                <li style={{ marginBottom: 6 }}><strong>Lodge a complaint</strong> with a relevant data protection authority</li>
              </ul>
              <p style={{ marginTop: 10 }}>To exercise any of these rights, please contact us using the details in Section 10.</p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
                the new policy on this page with an updated revision date. We encourage you to review this policy
                periodically. Your continued use of the website after changes are posted constitutes acceptance of the
                updated policy.</p>
            </Section>

            <Section title="10. Contact Us">
              <p>For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:</p>
              <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 20px', marginTop: 12, border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>Springboard Indian School — Data Privacy</p>
                <p style={{ margin: '4px 0 0' }}>Hyderabad, Telangana, India</p>
                <p style={{ margin: '4px 0 0' }}>Email: <a href="mailto:info@springboardschool.com" style={{ color: '#1B4F8E' }}>info@springboardschool.com</a></p>
                <p style={{ margin: '4px 0 0' }}>Phone: +91-40-XXXXXXXX</p>
              </div>
              <p style={{ marginTop: 12 }}>
                Also see our <Link to="/terms-and-conditions" style={{ color: '#1B4F8E', fontWeight: 600 }}>Terms &amp; Conditions</Link>.
              </p>
            </Section>

          </motion.div>
        </div>
      </section>
    </>
  )
}
