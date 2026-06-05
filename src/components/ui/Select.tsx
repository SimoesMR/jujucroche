import type { SelectHTMLAttributes } from 'react'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9' }

interface SelectOption { value: string; label: string }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export function Select({ label, options, error, id, className = '', ...props }: SelectProps) {
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
      <select
        id={inputId}
        className={`font-sans text-sm px-3 py-2.5 outline-none transition-colors bg-white ${className}`}
        style={{ border: `1px solid ${error ? '#fca5a5' : C.borda}`, color: C.escuro }}
        onFocus={e => (e.currentTarget.style.borderColor = C.champanhe)}
        onBlur={e => (e.currentTarget.style.borderColor = error ? '#fca5a5' : C.borda)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="font-sans text-xs" style={{ color: '#dc2626' }}>{error}</p>}
    </div>
  )
}
