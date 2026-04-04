import { useEffect, useState } from 'react'
import { useEnquiryForm } from '../../hooks/useEnquiryForm'

export default function EnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const { form, onSubmit, isPending, isSuccess } = useEnquiryForm()

  useEffect(() => {
    const timer = setTimeout(() => {
      const enquiryShown = localStorage.getItem('enquiry_shown')
      if (!enquiryShown) {
        setIsVisible(true)
        localStorage.setItem('enquiry_shown', 'true')
      }
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="modal-overlay"
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
      ></div>

      {/* Modal */}
      <div
        className="enquiry-modal"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '500px',
          width: '90%',
          zIndex: 1000,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          &times;
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#27ae60', marginBottom: '15px' }}>Thank You!</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              We'll call you within 24 hours to discuss admissions and answer your questions.
            </p>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: '#ff6b35',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Get Admission Information</h2>
            <p style={{ marginBottom: '25px', color: '#666' }}>
              Secure your child's seat. Limited availability for 2026-27.
            </p>

            <form onSubmit={onSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Parent Name *"
                  {...form.register('parent_name')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
                {form.formState.errors.parent_name && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {form.formState.errors.parent_name.message}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  {...form.register('phone')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
                {form.formState.errors.phone && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <select
                  {...form.register('grade_applying')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select Grade (Optional)</option>
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

              <div style={{ marginBottom: '15px' }}>
                <textarea
                  placeholder="Message (Optional)"
                  {...form.register('message')}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                style={{
                  width: '100%',
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  opacity: isPending ? 0.7 : 1,
                }}
              >
                {isPending ? 'Submitting...' : 'Apply Now'}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
