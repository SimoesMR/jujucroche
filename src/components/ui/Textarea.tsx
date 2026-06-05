import type { TextareaHTMLAttributes } from 'react'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9' }

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="font-sans text-[10px] font-light"
        style={{ color: C.medio, letterSpacing: '0.2em' }}
      >
        {label.toUpperCase()}
      </label>
      <textarea
        id={inputId}
        rows={4}
        className={`font-sans text-sm px-3 py-2.5 outline-none transition-colors resize-y bg-white ${className}`}
        style={{ border: `1px solid ${error ? '#fca5a5' : C.borda}`, color: C.escuro }}
        onFocus={e => (e.currentTarget.style.borderColor = error ? '#f87171' : C.champanhe)}
        onBlur={e => (e.currentTarget.style.borderColor = error ? '#fca5a5' : C.borda)}
        {...props}
      />
      {error && <p className="font-sans text-xs" style={{ color: '#dc2626' }}>{error}</p>}
    </div>
  )
}
