import { Link } from 'react-router-dom'
import { Button } from './Button'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058' }

interface EmptyStateProps { filtered?: boolean }

export function EmptyState({ filtered = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-px h-12" style={{ backgroundColor: `${C.champanhe}55` }} />
      <div className="flex flex-col items-center gap-2">
        <span className="font-serif text-3xl font-light tracking-widest" style={{ color: `${C.champanhe}80` }}>JR</span>
        <div className="w-8 h-px" style={{ backgroundColor: `${C.champanhe}55` }} />
      </div>
      {filtered ? (
        <>
          <h3 className="font-serif text-xl font-light italic" style={{ color: C.escuro }}>Nenhuma peça encontrada</h3>
          <p className="font-sans text-sm font-light" style={{ color: C.medio }}>Tente ajustar os filtros de busca.</p>
        </>
      ) : (
        <>
          <h3 className="font-serif text-xl font-light italic" style={{ color: C.escuro }}>Nenhuma peça cadastrada ainda</h3>
          <p className="font-sans text-sm font-light" style={{ color: C.medio }}>Adicione sua primeira criação.</p>
          <Link to="/admin/nova" className="mt-2">
            <Button>+ Nova Peça</Button>
          </Link>
        </>
      )}
      <div className="w-px h-12" style={{ backgroundColor: `${C.champanhe}55` }} />
    </div>
  )
}
