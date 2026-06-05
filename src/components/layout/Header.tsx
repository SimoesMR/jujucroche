import { Link } from 'react-router-dom'
import { logout } from '@/hooks/useAuth'

const C = {
  champanhe: '#C9A96E',
  escuro:    '#1A1A1A',
  medio:     '#6B6058',
  borda:     '#E8E2D9',
  carbono:   '#2C2826',
}

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(44,40,38,0.97)', borderBottom: `1px solid rgba(201,169,110,0.2)` }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/admin/pecas"
          className="flex flex-col transition-opacity hover:opacity-80"
        >
          <span
            className="font-serif text-sm font-normal tracking-widest leading-none"
            style={{ color: 'white', letterSpacing: '0.2em' }}
          >
            JULIETA RISSATO
          </span>
          <span
            className="font-sans text-[9px] font-light mt-0.5"
            style={{ color: `${C.champanhe}cc`, letterSpacing: '0.2em' }}
          >
            ADMIN
          </span>
        </Link>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/nova"
            className="font-sans text-[10px] px-5 py-2 transition-all duration-200"
            style={{
              border: `1px solid ${C.champanhe}`,
              color: C.champanhe,
              letterSpacing: '0.2em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = C.champanhe
              e.currentTarget.style.color = C.carbono
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = C.champanhe
            }}
          >
            + NOVA PEÇA
          </Link>

          <button
            onClick={logout}
            className="font-sans text-[10px] px-4 py-2 transition-all duration-200"
            style={{
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.15em',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            SAIR
          </button>
        </div>
      </div>
    </header>
  )
}
