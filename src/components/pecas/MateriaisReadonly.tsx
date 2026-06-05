import type { Material } from '@/types'
import { formatBRL, calcularCustoTotal } from '@/utils/formatters'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9', creme: '#FAF8F5' }

interface MateriaisReadonlyProps { materiais: Material[] }

export function MateriaisReadonly({ materiais }: MateriaisReadonlyProps) {
  if (materiais.length === 0) {
    return <p className="font-sans text-sm italic font-light" style={{ color: C.medio }}>Nenhum material cadastrado.</p>
  }

  const total = calcularCustoTotal(materiais)

  return (
    <div className="overflow-x-auto" style={{ border: `1px solid ${C.borda}` }}>
      <table className="w-full text-sm min-w-[400px]">
        <thead style={{ backgroundColor: C.creme }}>
          <tr>
            {['Material', 'Qtd', 'Unidade', 'Custo unit.', 'Total'].map((h, i) => (
              <th
                key={i}
                className={`px-3 py-2 font-sans text-[10px] font-medium ${i > 0 ? 'text-right' : 'text-left'}`}
                style={{ color: C.medio, letterSpacing: '0.15em', borderBottom: `1px solid ${C.borda}` }}
              >
                {h.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materiais.map((m, i) => (
            <tr key={m.id} style={{ backgroundColor: i % 2 === 1 ? C.creme : 'white' }}>
              <td className="px-3 py-2 font-sans text-sm" style={{ color: C.escuro }}>{m.nome}</td>
              <td className="px-3 py-2 text-right font-sans text-sm" style={{ color: C.medio }}>{m.quantidade}</td>
              <td className="px-3 py-2 font-sans text-sm" style={{ color: C.medio }}>{m.unidade}</td>
              <td className="px-3 py-2 text-right font-sans text-sm" style={{ color: C.medio }}>{formatBRL(m.custoUnitario)}</td>
              <td className="px-3 py-2 text-right font-sans text-sm font-medium" style={{ color: C.escuro }}>
                {formatBRL(m.quantidade * m.custoUnitario)}
              </td>
            </tr>
          ))}
          <tr style={{ borderTop: `1px solid ${C.borda}`, backgroundColor: C.creme }}>
            <td colSpan={4} className="px-3 py-2 text-right font-sans text-xs font-medium" style={{ color: C.medio, letterSpacing: '0.1em' }}>
              TOTAL:
            </td>
            <td className="px-3 py-2 text-right font-sans text-sm font-medium" style={{ color: C.champanhe }}>
              {formatBRL(total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
