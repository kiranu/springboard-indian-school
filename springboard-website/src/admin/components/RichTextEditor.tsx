/**
 * RichTextEditor.tsx
 * Reusable Quill-based rich text editor for the admin panel.
 * Supports full formatting toolbar: headings, bold, italic, lists,
 * links, images (URL), blockquote, code, alignment.
 */
import { useMemo, useRef } from 'react'
// @ts-ignore — react-quill has no bundled types for v2
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
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

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here…',
  minHeight = 320,
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null)

  const modules = useMemo(() => ({
    toolbar: TOOLBAR,
    clipboard: { matchVisual: false },
  }), [])

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image',
  ]

  return (
    <div className="rte-wrapper" style={{ '--rte-min-height': `${minHeight}px` } as React.CSSProperties}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  )
}
