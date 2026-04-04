import { useState, useEffect, useRef, useCallback } from 'react'
import api from '../../lib/api'

interface MediaFile {
  id: number
  name: string
  url: string
  file_type: string
  mime_type: string
  size: number
  size_display: string
  alt_text: string
  uploaded_at: string
}

const FILE_TYPES = ['all', 'image', 'video', 'audio', 'pdf', 'document', 'other']

const TYPE_ICONS: Record<string, string> = {
  image: 'fa-solid fa-image',
  video: 'fa-solid fa-film',
  audio: 'fa-solid fa-music',
  pdf: 'fa-solid fa-file-pdf',
  document: 'fa-solid fa-file-word',
  other: 'fa-solid fa-file',
}

const TYPE_COLORS: Record<string, string> = {
  image: '#3b82f6',
  video: '#8b5cf6',
  audio: '#f59e0b',
  pdf: '#ef4444',
  document: '#3b82f6',
  other: '#64748b',
}

const ACCEPT_MAP: Record<string, string> = {
  all: '*/*',
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  pdf: 'application/pdf',
  document: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv',
  other: '*/*',
}

interface MediaLibraryProps {
  pickerMode?: boolean
  pickerFilter?: string
  onPick?: (file: MediaFile) => void
}

export default function MediaLibrary({ pickerMode = false, pickerFilter, onPick }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [activeType, setActiveType] = useState(pickerFilter || 'all')
  const [search, setSearch] = useState('')
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchFiles = useCallback(async () => {
    try {
      const params: Record<string, string> = {}
      if (activeType !== 'all') params.file_type = activeType
      if (search) params.search = search
      const res = await api.get('/admin/media/', { params })
      setFiles(res.data.results || res.data)
    } catch {
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [activeType, search])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  const uploadFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setUploading(true)
    setUploadProgress(0)
    const newFiles: MediaFile[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', file.name)
      try {
        const res = await api.post('/admin/media/', formData, {
          onUploadProgress: (e) => {
            if (e.total) setUploadProgress(Math.round(((i + e.loaded / e.total) / fileList.length) * 100))
          },
        })
        newFiles.push(res.data)
      } catch { /* skip failed files */ }
    }
    setFiles((prev) => [...newFiles, ...prev])
    setUploading(false)
    setUploadProgress(100)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (file: MediaFile) => {
    if (!window.confirm(`Delete "${file.name}"? This cannot be undone.`)) return
    try { await api.delete(`/admin/media/${file.id}/`) } catch { /* offline */ }
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
    if (selectedFile?.id === file.id) setSelectedFile(null)
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const filtered = files.filter((f) => {
    const matchType = activeType === 'all' || f.file_type === activeType
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const renderFileIcon = (file: MediaFile) => {
    if (file.file_type === 'image' && file.url) {
      return (
        <img src={file.url} alt={file.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
        <i className={TYPE_ICONS[file.file_type] || TYPE_ICONS.other}
          style={{ fontSize: 36, color: TYPE_COLORS[file.file_type] || '#64748b' }} />
        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
          {file.name.split('.').pop()}
        </span>
      </div>
    )
  }

  return (
    <div style={pickerMode ? {} : undefined}>
      {!pickerMode && (
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Media Library</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
            Upload and manage images, documents, videos, audio, and more.
          </p>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files) }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#1B4F8E' : '#cbd5e1'}`,
          borderRadius: 12, padding: '28px 20px', textAlign: 'center',
          background: dragOver ? '#eff6ff' : '#f8fafc',
          cursor: 'pointer', transition: 'all 0.2s', marginBottom: 20,
        }}
      >
        {uploading ? (
          <div>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 28, color: '#1B4F8E', marginBottom: 8, display: 'block' }} />
            <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>Uploading... {uploadProgress}%</div>
            <div style={{ background: '#e2e8f0', borderRadius: 99, height: 8, maxWidth: 300, margin: '0 auto', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#1B4F8E', borderRadius: 99, transition: 'width 0.3s' }} />
            </div>
          </div>
        ) : (
          <>
            <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: 36, color: '#94a3b8', marginBottom: 10, display: 'block' }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
              Drop files here or <span style={{ color: '#1B4F8E' }}>click to upload</span>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
              Images, PDFs, Word docs, Excel, Videos, Audio — any file up to 50MB
            </div>
          </>
        )}
      </div>
      <input ref={fileInputRef} type="file" multiple accept={ACCEPT_MAP[activeType]}
        onChange={(e) => uploadFiles(e.target.files)} style={{ display: 'none' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Type filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {FILE_TYPES.map((t) => (
            <button key={t} onClick={() => setActiveType(t)}
              style={{
                padding: '5px 14px', borderRadius: 20, border: '1px solid',
                borderColor: activeType === t ? '#1B4F8E' : '#d1d5db',
                background: activeType === t ? '#1B4F8E' : '#fff',
                color: activeType === t ? '#fff' : '#475569',
                fontSize: 12, cursor: 'pointer', fontWeight: activeType === t ? 600 : 400,
                textTransform: 'capitalize',
              }}>
              {t !== 'all' && <i className={TYPE_ICONS[t]} style={{ marginRight: 4 }} />}
              {t === 'all' ? 'All Files' : t}
            </button>
          ))}
        </div>

        {/* Search */}
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files..."
          style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, width: 200 }} />

        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: 7, overflow: 'hidden' }}>
          {(['grid', 'list'] as const).map((v) => (
            <button key={v} onClick={() => setViewMode(v)}
              style={{
                padding: '6px 10px', border: 'none', cursor: 'pointer',
                background: viewMode === v ? '#1B4F8E' : '#fff',
                color: viewMode === v ? '#fff' : '#64748b', fontSize: 14,
              }}>
              <i className={v === 'grid' ? 'fa-solid fa-grip' : 'fa-solid fa-list'} />
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
        {filtered.length} file{filtered.length !== 1 ? 's' : ''}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#1B4F8E' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
          <i className="fa-solid fa-photo-film" style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>No files yet</div>
          <div style={{ fontSize: 13 }}>Upload your first file using the area above</div>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {filtered.map((file) => (
            <div key={file.id}
              onClick={() => pickerMode ? onPick?.(file) : setSelectedFile(file)}
              style={{
                background: '#fff', borderRadius: 10, overflow: 'hidden',
                boxShadow: selectedFile?.id === file.id ? '0 0 0 3px #1B4F8E' : '0 1px 3px rgba(0,0,0,0.08)',
                cursor: 'pointer', transition: 'box-shadow 0.15s',
              }}>
              <div style={{ height: 120, background: '#f1f5f9', position: 'relative' }}>
                {renderFileIcon(file)}
                {pickerMode && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(27,79,142,0)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(27,79,142,0.25)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(27,79,142,0)' }}
                  >
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, opacity: 0 }}>Select</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>
                  {file.name}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{file.size_display}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['File', 'Type', 'Size', 'Uploaded', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#64748b', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((file) => (
                <tr key={file.id} style={{ borderBottom: '1px solid #f1f5f9', cursor: pickerMode ? 'pointer' : 'default' }}
                  onClick={() => pickerMode && onPick?.(file)}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {file.file_type === 'image' && file.url ? (
                        <img src={file.url} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={TYPE_ICONS[file.file_type] || TYPE_ICONS.other} style={{ color: TYPE_COLORS[file.file_type] || '#64748b' }} />
                        </div>
                      )}
                      <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{file.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: '#f1f5f9', color: '#475569', textTransform: 'capitalize' }}>
                      {file.file_type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748b' }}>{file.size_display}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748b' }}>
                    {new Date(file.uploaded_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank') }}
                        style={{ padding: '4px 8px', borderRadius: 6, background: '#f0f9ff', color: '#0369a1', border: 'none', cursor: 'pointer', fontSize: 12 }} title="Open">
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); copyUrl(file.url) }}
                        style={{ padding: '4px 8px', borderRadius: 6, background: '#f0fdf4', color: '#16a34a', border: 'none', cursor: 'pointer', fontSize: 12 }} title="Copy URL">
                        <i className="fa-solid fa-copy" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(file) }}
                        style={{ padding: '4px 8px', borderRadius: 6, background: '#fef2f2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: 12 }} title="Delete">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail panel / grid actions */}
      {!pickerMode && selectedFile && viewMode === 'grid' && (
        <div style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 300,
          background: '#fff', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', zIndex: 200,
          padding: 24, overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>File Details</h3>
            <button onClick={() => setSelectedFile(null)}
              style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }}>×</button>
          </div>

          {selectedFile.file_type === 'image' && (
            <img src={selectedFile.url} alt={selectedFile.name}
              style={{ width: '100%', borderRadius: 10, marginBottom: 16, objectFit: 'cover' }} />
          )}

          {[
            { label: 'Name', value: selectedFile.name },
            { label: 'Type', value: selectedFile.file_type },
            { label: 'Size', value: selectedFile.size_display },
            { label: 'Uploaded', value: new Date(selectedFile.uploaded_at).toLocaleString() },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: '#1e293b', wordBreak: 'break-all' }}>{item.value}</div>
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>URL</div>
            <div style={{ fontSize: 12, color: '#475569', wordBreak: 'break-all', background: '#f8fafc', padding: 8, borderRadius: 6, fontFamily: 'monospace' }}>
              {selectedFile.url}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => copyUrl(selectedFile.url)}
              style={{ padding: '9px', borderRadius: 8, background: '#1B4F8E', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              <i className="fa-solid fa-copy" style={{ marginRight: 6 }} />Copy URL
            </button>
            <button onClick={() => window.open(selectedFile.url, '_blank')}
              style={{ padding: '9px', borderRadius: 8, background: '#f0f9ff', color: '#0369a1', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: 6 }} />Open File
            </button>
            <button onClick={() => handleDelete(selectedFile)}
              style={{ padding: '9px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              <i className="fa-solid fa-trash" style={{ marginRight: 6 }} />Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
