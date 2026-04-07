/**
 * RichTextEditor.tsx
 * Direct Quill v1 integration — no react-quill wrapper.
 *
 * react-quill@2 calls ReactDOM.findDOMNode() which was removed in React 19,
 * causing a crash any time the editor renders.  By driving quill directly
 * via a ref + useEffect we bypass that entirely and stay compatible with
 * any React version.
 */
import { useEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'
import './RichTextEditor.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
}

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

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here…',
  minHeight = 320,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null)

  // Keep latest onChange in a ref so the Quill listener never goes stale
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  // Track the last value we pushed into Quill from outside (to avoid loops)
  const lastExternalValue = useRef(value)

  // ── Initialise Quill once on mount ──────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || quillRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('quill').then(({ default: Quill }: { default: any }) => {
      if (!containerRef.current || quillRef.current) return

      const quill = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: TOOLBAR,
          clipboard: { matchVisual: false },
        },
        formats: FORMATS,
      })

      quillRef.current = quill

      // Load the initial value
      if (lastExternalValue.current) {
        quill.root.innerHTML = lastExternalValue.current
      }

      // Notify parent on every user edit
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      quill.on('text-change', (_delta: any, _old: any, source: string) => {
        if (source !== 'user') return
        const html = quill.root.innerHTML
        const val = html === '<p><br></p>' ? '' : html
        lastExternalValue.current = val
        onChangeRef.current(val)
      })
    })

    return () => {
      // On unmount just clear the ref; the DOM is cleaned up by React
      quillRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally empty — Quill must only be created once

  // ── Sync external value changes (e.g. switching between Edit rows) ──────
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    if (value !== lastExternalValue.current) {
      lastExternalValue.current = value
      quill.root.innerHTML = value || ''
    }
  }, [value])

  return (
    <div
      className="rte-wrapper"
      style={{ '--rte-min-height': `${minHeight}px` } as React.CSSProperties}
    >
      {/* Quill mounts its toolbar + editor inside this div */}
      <div ref={containerRef} />
    </div>
  )
}
