import { useState, useEffect } from 'react'
import api from '../../lib/api'
import DataTable, { Column } from '../components/DataTable'

interface Enquiry {
  id: number
  parent_name: string
  child_name: string
  email: string
  phone: string
  grade: string
  message: string
  status: string
  created_at: string
}

const STATUS_OPTIONS = ['new', 'contacted', 'enrolled', 'closed']

export default function EnquiryTable() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/admin/enquiries/')
      setEnquiries(res.data.results || res.data)
    } catch {
      setEnquiries([
        { id: 1, parent_name: 'Priya Sharma', child_name: 'Aarav', email: 'priya@email.com', phone: '9876543210', grade: 'Grade 1', message: 'Interested in admission for 2026-27', status: 'new', created_at: '2026-03-30' },
        { id: 2, parent_name: 'Rahul Kumar', child_name: 'Ananya', email: 'rahul@email.com', phone: '9876543211', grade: 'Pre-K', message: 'Looking for pre-school program', status: 'contacted', created_at: '2026-03-29' },
        { id: 3, parent_name: 'Meena Reddy', child_name: 'Karthik', email: 'meena@email.com', phone: '9876543212', grade: 'Grade 3', message: 'Transfer from another school', status: 'new', created_at: '2026-03-28' },
        { id: 4, parent_name: 'Suresh Patel', child_name: 'Diya', email: 'suresh@email.com', phone: '9876543213', grade: 'Grade 5', message: 'Enquiring about CBSE curriculum', status: 'enrolled', created_at: '2026-03-27' },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEnquiries() }, [])

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await api.patch(`/admin/enquiries/${id}/`, { status: newStatus })
    } catch { /* offline mode */ }
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: newStatus } : e))
  }

  const handleDelete = async (row: Enquiry) => {
    if (!window.confirm(`Delete enquiry from ${row.parent_name}?`)) return
    try {
      await api.delete(`/admin/enquiries/${row.id}/`)
    } catch { /* offline mode */ }
    setEnquiries((prev) => prev.filter((e) => e.id !== row.id))
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      new: { bg: '#dbeafe', color: '#1d4ed8' },
      contacted: { bg: '#fef3c7', color: '#92400e' },
      enrolled: { bg: '#d1fae5', color: '#065f46' },
      closed: { bg: '#f3f4f6', color: '#6b7280' },
    }
    const c = colors[status] || colors.new
    return (
      <span style={{
        padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
        background: c.bg, color: c.color, textTransform: 'capitalize',
      }}>
        {status}
      </span>
    )
  }

  const columns: Column<Enquiry>[] = [
    { key: 'parent_name', label: 'Parent', render: (v) => <span style={{ fontWeight: 500, color: '#1e293b' }}>{v}</span> },
    { key: 'child_name', label: 'Child' },
    { key: 'grade', label: 'Grade' },
    { key: 'phone', label: 'Phone' },
    { key: 'created_at', label: 'Date' },
    {
      key: 'status', label: 'Status',
      render: (_, row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          style={{
            padding: '4px 8px', borderRadius: 6, border: '1px solid #d1d5db',
            fontSize: 12, background: '#fff', cursor: 'pointer',
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      ),
    },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Enquiries</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Manage admission enquiries from parents.</p>
      </div>

      <DataTable
        title="All Enquiries"
        columns={columns}
        data={enquiries}
        searchPlaceholder="Search by name, grade..."
        onEdit={(row) => { setSelectedEnquiry(row); setShowModal(true) }}
        onDelete={handleDelete}
      />

      {/* Detail Modal */}
      {showModal && selectedEnquiry && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 520,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Enquiry Details</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Parent Name', value: selectedEnquiry.parent_name },
                { label: 'Child Name', value: selectedEnquiry.child_name },
                { label: 'Email', value: selectedEnquiry.email },
                { label: 'Phone', value: selectedEnquiry.phone },
                { label: 'Grade', value: selectedEnquiry.grade },
                { label: 'Status', value: selectedEnquiry.status },
                { label: 'Date', value: selectedEnquiry.created_at },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: '#1e293b' }}>
                    {item.label === 'Status' ? getStatusBadge(item.value) : item.value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Message</div>
              <div style={{ fontSize: 14, color: '#1e293b', background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                {selectedEnquiry.message || 'No message provided.'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '8px 20px', borderRadius: 8, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 13, cursor: 'pointer',
                }}
              >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
