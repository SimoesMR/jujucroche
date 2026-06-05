import type { Peca } from '@/types'
import { PecaCard } from './PecaCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface PecaGridProps {
  pecas: Peca[]
  hasFilters: boolean
}

export function PecaGrid({ pecas, hasFilters }: PecaGridProps) {
  if (pecas.length === 0) {
    return <EmptyState filtered={hasFilters} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {pecas.map((peca) => (
        <PecaCard key={peca.id} peca={peca} />
      ))}
    </div>
  )
}
