import type { MaterialFormRow } from '@/types'
import { formatBRL, calcularCustoTotal } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'

const C = { champanhe: '#C9A96E', escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9', carbono: '#2C2826', creme: '#FAF8F5' }

interface MateriaisTableProps {
  materiais: MaterialFormRow[]
  onChange: (materiais: MaterialFormRow[]) => void
}

function novaLinha(): MaterialFormRow {
  return { id: crypto.randomUUID(), nome: '', quantidade: '', unidade: 'novelo', custoUnitario: '' }
}

export function MateriaisTable({ materiais, onChange }: MateriaisTableProps) {
  const update = (id: string, field: keyof MaterialFormRow, value: string) => {
    onChange(materiais.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }
  const remove = (id: string) => onChange(materiais.filter((m) => m.id !== id))
  const total = calcularCustoTotal(
    materiais.map((m) => ({ quantidade: parseFloat(m.quantidade) || 0, custoUnitario: parseFloat(m.custoUnitario) || 0 }))
  )

  return (
    <div className="flex flex-col gap-3">
      <span
        className="font-sans text-[10px] font-light"
        style={{ color: C.medio, letterSpacing: '0.2em' }}
      >
        MATERIAIS
      </span>
      <div className="overflow-x-auto" style={{ border: `1px solid ${C.borda}` }}>
        <table className="w-full text-sm min-w-[560px]">
          <thead style={{ backgroundColor: C.creme }}>
            <tr>
              {['Material', 'Qtd', 'Unidade', 'Custo unit.', ''].map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left font-sans text-[10px] font-medium"
                  style={{ color: C.medio, letterSpacing: '0.15em', borderBottom: `1px solid ${C.borda}` }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {materiais.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-5 text-center font-sans text-sm italic font-light" style={{ color: C.medio }}>
                  Nenhum material adicionado
                </td>
              </tr>
            )}
            {materiais.map((m, i) => (
              <tr key={m.id} style={{ backgroundColor: i % 2 === 1 ? C.creme : 'white' }}>
                {(['nome', 'quantidade', 'unidade', 'custoUnitario'] as const).map((field) => (
                  <td key={field} className="px-2 py-1.5">
                    <input
                      type={field === 'quantidade' || field === 'custoUnitario' ? 'number' : 'text'}
                      min={field === 'quantidade' ? '0' : undefined}
                      step={field === 'quantidade' ? '0.1' : field === 'custoUnitario' ? '0.01' : undefined}
                      value={m[field]}
                      onChange={(e) => update(m.id, field, e.target.value)}
                      placeholder={field === 'nome' ? 'Ex: Fio algodão' : field === 'unidade' ? 'novelo' : '0'}
                      className="w-full bg-transparent outline-none font-sans text-sm"
                      style={{ color: C.escuro }}
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    className="font-sans text-base leading-none transition-colors"
                    style={{ color: '#d1a0a0' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#dc2626')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#d1a0a0')}
                    title="Remover"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {materiais.length > 0 && (
              <tr style={{ borderTop: `1px solid ${C.borda}`, backgroundColor: C.creme }}>
                <td colSpan={3} className="px-3 py-2 text-right font-sans text-xs font-medium" style={{ color: C.medio, letterSpacing: '0.1em' }}>
                  TOTAL EM MATERIAIS:
                </td>
                <td colSpan={2} className="px-3 py-2 font-sans text-sm font-medium" style={{ color: C.champanhe }}>
                  {formatBRL(total)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...materiais, novaLinha()])}>
        + Adicionar Material
      </Button>
    </div>
  )
}
