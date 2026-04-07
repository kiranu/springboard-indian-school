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

export default function TermsAndConditions() {
  return (
    <>
      <SeoHead
        title="Terms & Conditions"
        description="Read the Terms and Conditions governing the use of Springboard Indian School's website and services."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff" />
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Terms &amp; Conditions</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Terms &amp; Conditions</li>
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
                Welcome to the website of <strong>Springboard Indian School</strong>, Hyderabad. By accessing or using our website,
                you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
              </p>
            </div>

            <Section title="1. Acceptance of Terms">
              <p>By accessing and using the Springboard Indian School website (<strong>springboardindianschool.edu.in</strong>),
                you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using
                or accessing this website.</p>
            </Section>

            <Section title="2. Use of Website">
              <p>This website is intended for informational purposes about Springboard Indian School, its programs, admissions
                process, events, and related services. You agree to use this site only for lawful purposes and in a manner
                that does not infringe upon the rights of others. You must not:</p>
              <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                <li style={{ marginBottom: 6 }}>Use the site in any way that is unlawful or fraudulent</li>
                <li style={{ marginBottom: 6 }}>Transmit unsolicited or unauthorised advertising material</li>
                <li style={{ marginBottom: 6 }}>Attempt to gain unauthorised access to any part of the website</li>
                <li style={{ marginBottom: 6 }}>Reproduce, distribute, or modify content without prior written permission</li>
                <li style={{ marginBottom: 6 }}>Engage in any conduct that could harm the reputation of the school</li>
              </ul>
            </Section>

            <Section title="3. Admissions & Enquiries">
              <p>Information submitted through our online admission enquiry forms is subject to verification and review by
                the school administration. Submitting an enquiry or application does not guarantee admission. The school
                reserves the right to accept or decline any application based on its admissions criteria, availability of
                seats, and applicable policies.</p>
              <p style={{ marginTop: 10 }}>All fees, admission criteria, and program details are subject to change without
                prior notice. Parents and guardians are advised to confirm current details directly with the school office.</p>
            </Section>

            <Section title="4. Intellectual Property">
              <p>All content on this website — including text, images, logos, graphics, video, and audio — is the property
                of Springboard Indian School or its content suppliers and is protected by applicable intellectual property
                laws. Unauthorised use, reproduction, or distribution of any content is strictly prohibited.</p>
              <p style={{ marginTop: 10 }}>The Springboard Indian School name, logo, and all related marks are trademarks
                of the school. Nothing on this website should be construed as granting any licence or right to use any
                trademark without prior written consent.</p>
            </Section>

            <Section title="5. Third-Party Links">
              <p>Our website may contain links to third-party websites for your convenience. These links do not constitute
                an endorsement of, or responsibility for, the content, privacy practices, or views of those sites.
                We encourage you to review the terms and privacy policies of any third-party sites you visit.</p>
            </Section>

            <Section title="6. Disclaimer of Warranties">
              <p>This website and its content are provided "as is" without any warranty, express or implied, including but
                not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. While
                we strive to keep information accurate and up to date, we make no representations or warranties about the
                completeness, accuracy, or reliability of any information on the site.</p>
            </Section>

            <Section title="7. Limitation of Liability">
              <p>To the fullest extent permitted by law, Springboard Indian School shall not be liable for any indirect,
                incidental, special, or consequential damages arising from your use of or inability to use this website,
                even if the school has been advised of the possibility of such damages.</p>
            </Section>

            <Section title="8. Privacy">
              <p>Your use of this website is also governed by our <Link to="/privacy-policy" style={{ color: '#1B4F8E', fontWeight: 600 }}>Privacy Policy</Link>,
                which is incorporated into these Terms and Conditions by reference. Please review our Privacy Policy to
                understand our practices regarding the collection and use of your information.</p>
            </Section>

            <Section title="9. Governing Law">
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes
                arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts in
                Hyderabad, Telangana, India.</p>
            </Section>

            <Section title="10. Changes to Terms">
              <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately
                upon posting to the website. Your continued use of the website after any changes constitutes your acceptance
                of the revised terms. We encourage you to review these terms periodically.</p>
            </Section>

            <Section title="11. Contact Us">
              <p>If you have any questions about these Terms and Conditions, please contact us:</p>
              <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 20px', marginTop: 12, border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>Springboard Indian School</p>
                <p style={{ margin: '4px 0 0' }}>Hyderabad, Telangana, India</p>
                <p style={{ margin: '4px 0 0' }}>Email: <a href="mailto:info@springboardschool.com" style={{ color: '#1B4F8E' }}>info@springboardschool.com</a></p>
                <p style={{ margin: '4px 0 0' }}>Phone: +91-40-XXXXXXXX</p>
              </div>
            </Section>

          </motion.div>
        </div>
      </section>
    </>
  )
}
