/**
 * RichTextEditor.tsx
 * Reusable Quill-based rich text editor for the admin panel.
 * ReactQuill is dynamically imported AFTER mount to avoid Quill's
 * document-access crash during Vite module initialisation.
 */
import { useState, useEffect, useRef, useMemo } from 'react'
import './RichTextEditor.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
}

/* Full toolbar configuration */
const TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
]

const FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'align',
  'list', 'bullet', 'indent',
  'blockquote', 'code-block',
  'link', 'image',
]

// Module-level cache so the dynamic import only runs once per session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _QuillComponent: any = null

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here…',
  minHeight = 320,
}: RichTextEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null)
  const [ready, setReady] = useState(!!_QuillComponent)

  useEffect(() => {
    if (_QuillComponent) { setReady(true); return }
    // Dynamically import react-quill + its CSS only after the component mounts
    // This prevents Quill from touching `document` during Vite module init
    Promise.all([
      import('react-quill'),
      // @ts-ignore – CSS-only side-effect import via dynamic path
      import('react-quill/dist/quill.snow.css'),
    ]).then(([mod]) => {
      _QuillComponent = mod.default
      setReady(true)
    })
  }, [])

  const modules = useMemo(() => ({
    toolbar: TOOLBAR,
    clipboard: { matchVisual: false },
  }), [])

  if (!ready || !_QuillComponent) {
    return (
      <div
        className="rte-wrapper"
        style={{
          minHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          color: '#94a3b8',
          fontSize: 14,
        }}
      >
        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }} />
        Loading editor…
      </div>
    )
  }

  const QE = _QuillComponent

  return (
    <div className="rte-wrapper" style={{ '--rte-min-height': `${minHeight}px` } as React.CSSProperties}>
      <QE
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={FORMATS}
        placeholder={placeholder}
      />
    </div>
  )
}
