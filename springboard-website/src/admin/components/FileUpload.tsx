import { useState, useRef, useCallback } from 'react'
import api from '../../lib/api'

interface UploadedFile {
  id: number
  name: string
  url: string
  file_type: string
  size_display: string
}

interface FileUploadProps {
  value?: string                          // current URL shown as preview
  onUpload: (file: UploadedFile) => void  // called after successful upload
  onPickFromLibrary?: () => void          // optional: open media picker modal
  accept?: string                         // e.g. "image/*" or "*/*"
  label?: string
  hint?: string
}

export default function FileUpload({
  value,
  onUpload,
  onPickFromLibrary,
  accept = 'image/*',
  label = 'Featured Image',
  hint = 'JPG, PNG, WebP up to 5MB',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i.test(url)

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true)
    setError('')
    setProgress(0)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', file.name)
    try {
      const res = await api.post('/admin/media/', formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100))
        },
      })
      onUpload(res.data)
      setProgress(100)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>

      {/* Current preview */}
      {value && (
        <div style={{ marginBottom: 10, position: 'relative', display: 'inline-block' }}>
          {isImage(value) ? (
            <img src={value} alt="preview"
              style={{ height: 100, maxWidth: 200, borderRadius: 8, objectFit: 'cover', border: '2px solid #e2e8f0' }} />
          ) : (
            <div style={{ padding: '8px 14px', background: '#f0f9ff', borderRadius: 8, border: '1px solid #bae6fd', fontSize: 13, color: '#0369a1' }}>
              <i className="fa-solid fa-file" style={{ marginRight: 6 }} />
              {value.split('/').pop()}
            </div>
          )}
          <button onClick={() => onUpload({ id: 0, name: '', url: '', file_type: '', size_display: '' })}
            style={{
              position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%',
              background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#1B4F8E' : '#d1d5db'}`,
          borderRadius: 10, padding: '20px 16px', textAlign: 'center',
          background: dragOver ? '#eff6ff' : '#fafafa',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        {uploading ? (
          <div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
              Uploading... {progress}%
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: 99, height: 6, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: '#1B4F8E', transition: 'width 0.3s', borderRadius: 99 }} />
            </div>
          </div>
        ) : (
          <>
            <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: 28, color: '#94a3b8', marginBottom: 8, display: 'block' }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Click to upload or drag & drop</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{hint}</div>
          </>
        )}
      </div>

      <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange}
        style={{ display: 'none' }} />

      {/* Pick from library button */}
      {onPickFromLibrary && (
        <button type="button" onClick={onPickFromLibrary}
          style={{
            marginTop: 8, padding: '6px 14px', borderRadius: 7, border: '1px solid #d1d5db',
            background: '#fff', fontSize: 12, cursor: 'pointer', color: '#475569',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
          <i className="fa-solid fa-photo-film" /> Pick from Media Library
        </button>
      )}

      {error && (
        <div style={{ marginTop: 6, fontSize: 12, color: '#dc2626' }}>
          <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 4 }} />{error}
        </div>
      )}
    </div>
  )
}
