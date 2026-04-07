import { useState } from 'react'

export interface Column<T = any> {
  key: string
  label: string
  render?: (value: any, row: T) => React.ReactNode
  width?: number | string
}

interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  searchPlaceholder?: string
  title?: string
  onAdd?: () => void
  addLabel?: string
}

export default function DataTable<T extends { id?: number | string }>({
  columns, data, onEdit, onDelete, onView, searchPlaceholder = 'Search...', title, onAdd, addLabel = 'Add New',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = (row as any)[col.key]
      return val && String(val).toLowerCase().includes(search.toLowerCase())
    })
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', margin: 0 }}>{title}</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            style={{
              padding: '8px 14px', borderRadius: 8, border: '1px solid #d1d5db',
              fontSize: 13, outline: 'none', width: 220,
            }}
          />
          {onAdd && (
            <button
              onClick={onAdd}
              style={{
                padding: '8px 16px', borderRadius: 8, background: '#1B4F8E', color: '#fff',
                border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <i className="fa-solid fa-plus" /> {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {columns.map((col) => (
                <th key={col.key} style={{
                  padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#64748b',
                  textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px',
                  width: col.width,
                }}>{col.label}</th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th style={{
                  padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#64748b',
                  textAlign: 'center', textTransform: 'uppercase', width: 140,
                }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={(row as any).id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>
                    {col.render ? col.render((row as any)[col.key], row) : (row as any)[col.key]}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          style={{
                            padding: '6px 10px', borderRadius: 6, background: '#f0fdf4',
                            color: '#16a34a', border: 'none', cursor: 'pointer', fontSize: 12,
                          }}
                          title="View on site"
                        >
                          <i className="fa-solid fa-eye" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          style={{
                            padding: '6px 10px', borderRadius: 6, background: '#eff6ff',
                            color: '#1d4ed8', border: 'none', cursor: 'pointer', fontSize: 12,
                          }}
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          style={{
                            padding: '6px 10px', borderRadius: 6, background: '#fef2f2',
                            color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: 12,
                          }}
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          padding: '12px 20px', borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              style={{
                padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db',
                background: '#fff', cursor: currentPage === 1 ? 'default' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1, fontSize: 13,
              }}
            >Prev</button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db',
                background: '#fff', cursor: currentPage === totalPages ? 'default' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1, fontSize: 13,
              }}
            >Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
