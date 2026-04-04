import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarDays, FaFileArrowUp } from 'react-icons/fa6'
import { useEnquiryForm } from '../hooks/useEnquiryForm'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Admissions() {
  const { form, onSubmit, isPending, isSuccess, error } = useEnquiryForm()

  return (
    <>
      <SeoHead
        title="Admissions"
        description="Join Springboard Indian School. Apply now for Play Group to Grade 7. Limited seats available for 2026-27."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Enrollment Form</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Registration</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Urgency Banner */}
      <section style={{ backgroundColor: '#fff3cd', padding: '20px 0', borderBottom: '1px solid #ffeeba' }}>
        <div className="container">
          <div className="text-center">
            <h3 style={{ color: '#856404', fontWeight: 'bold', marginBottom: '10px' }}>
              ⏰ LIMITED SEATS AVAILABLE
            </h3>
            <p style={{ color: '#856404', marginBottom: 0 }}>
              Admissions 2026-27 are open. Seats filling fast for Play Group, Nursery & KG. Secure your child's place today!
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="vs-event--page bg-color6 space z-index-common">
        <div className="vs-event--ele1">
          <img src="/assets/img/elements/events-page-ele1.png" alt="event page ele1" />
        </div>
        <div className="vs-event--ele2">
          <img src="/assets/img/elements/events-page-ele2.png" alt="event page ele2" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2 mb-0 pb-4">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Registration</span>
                  <h2 className="vs-title__main">Apply For Admission</h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {isSuccess ? (
                <div className="alert alert-success text-center p-4">
                  <h3>Thank You!</h3>
                  <p className="mb-0">We'll call you within 24 hours to discuss admissions and answer your questions.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="vs-side-form vs-side-form--reg bg-white">
                  {error && <div className="alert alert-danger">{String(error)}</div>}
                  
                  <div className="vs-side-form__group--inline">
                    <div className="vs-side-form__group">
                      <input type="text" className="vs-side-form__input" placeholder="Child Name" {...form.register('child_name')} />
                    </div>
                    <div className="vs-side-form__group">
                      <span className="vs-side-form__icon-wrapper"><FaCalendarDays /></span>
                      <input type="text" className="vs-side-form__input" placeholder="Birth date (DD/MM/YYYY)" />
                    </div>
                  </div>

                  <div className="vs-side-form__group--inline">
                    <div className="vs-side-form__group w-100">
                      <select className="vs-side-form__input" style={{ width: '100%' }} {...form.register('grade_applying')}>
                        <option value="">Select Grade Applying For</option>
                        <option value="play-group">Play Group</option>
                        <option value="nursery">Nursery</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        <option value="grade-1">Grade 1</option>
                        <option value="grade-2">Grade 2</option>
                        <option value="grade-3">Grade 3</option>
                        <option value="grade-4">Grade 4</option>
                        <option value="grade-5">Grade 5</option>
                        <option value="grade-6">Grade 6</option>
                        <option value="grade-7">Grade 7</option>
                      </select>
                    </div>
                  </div>

                  <div className="vs-side-form__group--inline">
                    <div className="vs-side-form__group">
                      <input type="text" className="vs-side-form__input" placeholder="Child's parent Name *" {...form.register('parent_name')} required />
                      {form.formState.errors.parent_name && <span className="text-danger small">{form.formState.errors.parent_name.message}</span>}
                    </div>
                    <div className="vs-side-form__group">
                      <input type="tel" className="vs-side-form__input" placeholder="Phone Number *" {...form.register('phone')} required />
                      {form.formState.errors.phone && <span className="text-danger small">{form.formState.errors.phone.message}</span>}
                    </div>
                    <div className="vs-side-form__group">
                      <input type="email" className="vs-side-form__input" placeholder="Email Address" {...form.register('email')} />
                    </div>
                  </div>

                  <h3 className="wp-block-heading mt-4 mb-3" style={{ fontSize: '20px' }}>Who has permission to pick up your child?</h3>
                  <div className="vs-side-form__group--inline">
                    <div className="vs-side-form__group">
                      <input type="text" className="vs-side-form__input" placeholder="Name & relationship" />
                    </div>
                    <div className="vs-side-form__group">
                      <input type="text" className="vs-side-form__input" placeholder="Address" />
                    </div>
                    <div className="vs-side-form__group">
                      <input type="tel" className="vs-side-form__input" placeholder="Phone #" />
                    </div>
                  </div>

                  <div className="vs-side-form__group--inline">
                    <div className="vs-side-form__group">
                      <span className="vs-side-form__icon-wrapper"><FaFileArrowUp /></span>
                      <input type="file" className="vs-side-form__input" title="Pictures of your child" />
                    </div>
                    <div className="vs-side-form__group">
                      <span className="vs-side-form__icon-wrapper"><FaFileArrowUp /></span>
                      <input type="file" className="vs-side-form__input" title="Pictures of parents/guardian" />
                    </div>
                  </div>

                  <div className="vs-side-form__group w-100 mt-3">
                    <textarea className="vs-side-form__input" placeholder="Additional Message" rows={4} {...form.register('message')}></textarea>
                  </div>

                  <div className="vs-side-form__group vs-side-form__group--checkbox">
                    <label className="vs-side-form__checkbox-label">
                      <input type="checkbox" className="vs-side-form__checkbox" name="emergency-permission" />
                      <span className="vs-side-form__custom-box"></span>
                      I give permission that my child may be given first aid/emergency treatment.
                    </label>
                  </div>

                  <div className="vs-side-form__group--btn mt-4 pt-2">
                    <button type="submit" className="vs-btn" disabled={isPending}>
                      <span className="vs-btn__border"></span>
                      {isPending ? 'Submitting...' : 'Apply For Admission'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="space-extra-bottom">
        <div className="container">
          <div className="vs-title text-center title-anime animation-style2">
            <div className="title-anime__wrap">
              <span className="vs-title__sub">How to apply</span>
              <h2 className="vs-title__main">Admission Process</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { step: 1, title: 'Fill Enquiry Form', desc: 'Submit your details through our online form', icon: '📝' },
              { step: 2, title: 'School Visit', desc: 'Schedule and attend a campus tour', icon: '🏫' },
              { step: 3, title: 'Admission Test', desc: 'Age-appropriate assessment (for Grade 1+)', icon: '📝' },
              { step: 4, title: 'Final Confirmation', desc: 'Complete documentation and fee payment', icon: '✅' },
            ].map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-4">
                <div className="feature-style1 text-center h-100 shadow-sm rounded p-4 border">
                  <div className="feature-style1__icon bg-theme-color1 text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                    {item.step}
                  </div>
                  <h4 className="feature-style1__title">{item.title}</h4>
                  <p className="feature-style1__text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seats Available Table */}
      <section className="space bg-color6">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">Current Status</span>
                  <h2 className="vs-title__main">Availability by Grade</h2>
                </div>
              </div>
              
              <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table table-hover mb-0">
                  <thead className="bg-theme-color3 text-white">
                    <tr>
                      <th className="p-3 border-0 text-white">Grade</th>
                      <th className="p-3 border-0 text-white">Total Seats</th>
                      <th className="p-3 border-0 text-white">Available</th>
                      <th className="p-3 border-0 text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { grade: 'Play Group', total: 30, available: 5, status: 'Filling Fast' },
                      { grade: 'Nursery', total: 35, available: 8, status: 'Filling Fast' },
                      { grade: 'LKG', total: 40, available: 12, status: 'Limited' },
                      { grade: 'UKG', total: 40, available: 15, status: 'Available' },
                      { grade: 'Grade 1', total: 45, available: 20, status: 'Available' },
                      { grade: 'Grade 2', total: 45, available: 18, status: 'Available' },
                      { grade: 'Grade 3', total: 50, available: 25, status: 'Available' },
                      { grade: 'Grade 4', total: 50, available: 22, status: 'Available' },
                      { grade: 'Grade 5', total: 55, available: 30, status: 'Available' },
                      { grade: 'Grade 6', total: 55, available: 28, status: 'Available' },
                      { grade: 'Grade 7', total: 60, available: 32, status: 'Available' },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-3 fw-bold">{row.grade}</td>
                        <td className="p-3">{row.total}</td>
                        <td className="p-3 text-theme-color1 fw-bold">{row.available}</td>
                        <td className={`p-3 fw-bold ${row.status === 'Available' ? 'text-success' : 'text-warning'}`}>
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & FAQ */}
      <section className="space">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h3 className="mb-4 text-theme-color2">Documents Required</h3>
              <div className="row">
                <div className="col-sm-6">
                  <h5 className="mb-3">For Admission:</h5>
                  <ul className="list-unstyled">
                    {[
                      'Birth Certificate (original + copy)',
                      'Aadhar Card of child',
                      'Parent/Guardian ID proof',
                      'Parent/Guardian address proof',
                      'Passport-size photographs (4)',
                    ].map((doc, idx) => (
                      <li key={idx} className="mb-2"><i className="fas fa-check-circle text-theme-color1 me-2"></i>{doc}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-sm-6">
                  <h5 className="mb-3">Additional (if applicable):</h5>
                  <ul className="list-unstyled">
                    {[
                      'Previous school reports',
                      'Immunization certificate',
                      'Medical fitness certificate',
                      'TC from previous school',
                    ].map((doc, idx) => (
                      <li key={idx} className="mb-2"><i className="fas fa-check-circle text-theme-color3 me-2"></i>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <h3 className="mb-4 text-theme-color2">Admission FAQs</h3>
              <div className="accordion" id="admissionFaq">
                {[
                  {
                    q: 'What is the admission age for Play Group?',
                    a: 'Children aged 2.5 to 3 years are eligible for Play Group. Birth certificate is mandatory for verification.',
                  },
                  {
                    q: 'What is the admission process?',
                    a: 'Fill the enquiry form, attend a campus tour, take the admission assessment (if applicable), and complete documentation.',
                  },
                  {
                    q: 'When does the academic year start?',
                    a: 'Our academic year typically starts in April and ends in March, following CBSE guidelines.',
                  },
                  {
                    q: 'Do you offer scholarships?',
                    a: 'Yes, we offer merit-based scholarships for deserving students. Apply with your academic records.',
                  },
                ].map((faq, idx) => (
                  <div className="accordion-item border-0 mb-3 shadow-sm rounded" key={idx}>
                    <h2 className="accordion-header">
                      <button className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} bg-white fw-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                        {faq.q}
                      </button>
                    </h2>
                    <div id={`collapse${idx}`} className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} data-bs-parent="#admissionFaq">
                      <div className="accordion-body text-muted">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdmissionCta title="Ready to Secure Your Child's Seat?" subtitle="Don't miss out! Limited seats available for 2026-27." />
    </>
  )
}
