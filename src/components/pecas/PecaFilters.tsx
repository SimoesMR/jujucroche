import type { FiltroState, Categoria } from '@/types'
import { CATEGORIAS } from '@/constants'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9', carbono: '#2C2826' }

interface PecaFiltersProps {
  filtro: FiltroState
  onChange: (filtro: FiltroState) => void
}

const ALL_CATEGORIAS = [
  { value: 'todas' as const, label: 'Todas' },
  ...Object.entries(CATEGORIAS).map(([value, { label }]) => ({ value: value as Categoria, label })),
]

export function PecaFilters({ filtro, onChange }: PecaFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <input
        type="search"
        placeholder="Buscar peça..."
        value={filtro.busca}
        onChange={(e) => onChange({ ...filtro, busca: e.target.value })}
        className="w-full px-4 py-2.5 text-sm bg-white outline-none transition-colors font-sans"
        style={{ border: `1px solid ${C.borda}`, color: C.escuro }}
        onFocus={e => (e.currentTarget.style.borderColor = C.champanhe)}
        onBlur={e => (e.currentTarget.style.borderColor = C.borda)}
      />
      <div className="flex gap-2 flex-wrap">
        {ALL_CATEGORIAS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange({ ...filtro, categoria: value })}
            className="font-sans text-xs px-3 py-1.5 transition-all duration-200"
            style={
              filtro.categoria === value
                ? { backgroundColor: C.carbono, color: C.champanhe, border: `1px solid ${C.carbono}`, letterSpacing: '0.05em' }
                : { backgroundColor: 'white', color: C.medio, border: `1px solid ${C.borda}`, letterSpacing: '0.05em' }
            }
            onMouseEnter={e => {
              if (filtro.categoria !== value) {
                e.currentTarget.style.borderColor = C.champanhe
                e.currentTarget.style.color = C.escuro
              }
            }}
            onMouseLeave={e => {
              if (filtro.categoria !== value) {
                e.currentTarget.style.borderColor = C.borda
                e.currentTarget.style.color = C.medio
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
