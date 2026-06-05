import { Link } from 'react-router-dom'
import type { Peca } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatBRL, calcularCustoTotal } from '@/utils/formatters'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9', carbono: '#2C2826' }

interface PecaCardProps {
  peca: Peca
}

export function PecaCard({ peca }: PecaCardProps) {
  const total = calcularCustoTotal(peca.materiais)

  return (
    <Link
      to={`/admin/peca/${peca.id}`}
      className="group bg-white overflow-hidden block transition-all duration-200 hover:-translate-y-0.5"
      style={{ border: `1px solid ${C.borda}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)')}
    >
      <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: C.carbono }}>
        {peca.imagemBase64 ? (
          <img
            src={peca.imagemBase64}
            alt={peca.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-px h-8" style={{ backgroundColor: `${C.champanhe}66` }} />
            <span className="font-serif text-2xl font-light tracking-widest" style={{ color: `${C.champanhe}80` }}>JR</span>
            <div className="w-px h-8" style={{ backgroundColor: `${C.champanhe}66` }} />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif text-base font-light leading-tight" style={{ color: C.escuro }}>{peca.nome}</h3>
          <Badge categoria={peca.categoria} />
        </div>
        {peca.descricao && (
          <p className="font-sans text-xs font-light line-clamp-1 mb-2" style={{ color: C.medio }}>{peca.descricao}</p>
        )}
        <div className="flex items-center justify-between mt-2" style={{ borderTop: `1px solid ${C.borda}`, paddingTop: '0.5rem' }}>
          {peca.materiais.length > 0 && (
            <span className="font-sans text-xs" style={{ color: C.medio }}>
              Custo: {formatBRL(total)}
            </span>
          )}
          {peca.precoVenda > 0 && (
            <span className="font-sans text-xs font-medium" style={{ color: C.champanhe }}>
              Venda: {formatBRL(peca.precoVenda)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
