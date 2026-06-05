import type { ButtonHTMLAttributes } from 'react'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9', carbono: '#2C2826' }

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md'
}

const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2 text-xs' }

export function Button({ variant = 'primary', size = 'md', className = '', style, children, ...props }: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-1.5 font-sans font-medium tracking-widest transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${sizes[size]} ${className}`

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { backgroundColor: C.carbono, color: C.champanhe, border: `1px solid ${C.carbono}` }
      : variant === 'secondary'
      ? { backgroundColor: 'white', color: C.medio, border: `1px solid ${C.borda}` }
      : variant === 'danger'
      ? { backgroundColor: '#dc2626', color: 'white', border: '1px solid #dc2626' }
      : { backgroundColor: 'transparent', color: C.medio, border: '1px solid transparent' }

  return (
    <button
      className={base}
      style={{ ...variantStyle, ...style }}
      onMouseEnter={e => {
        if (props.disabled) return
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = C.champanhe
          e.currentTarget.style.color = C.carbono
          e.currentTarget.style.borderColor = C.champanhe
        } else if (variant === 'secondary') {
          e.currentTarget.style.borderColor = C.champanhe
          e.currentTarget.style.color = C.escuro
        } else if (variant === 'ghost') {
          e.currentTarget.style.backgroundColor = '#f5f4f1'
        }
      }}
      onMouseLeave={e => {
        if (props.disabled) return
        const vs = variant === 'primary'
          ? { backgroundColor: C.carbono, color: C.champanhe, borderColor: C.carbono }
          : variant === 'secondary'
          ? { backgroundColor: 'white', color: C.medio, borderColor: C.borda }
          : variant === 'ghost'
          ? { backgroundColor: 'transparent', color: C.medio, borderColor: 'transparent' }
          : {}
        Object.assign(e.currentTarget.style, vs)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
