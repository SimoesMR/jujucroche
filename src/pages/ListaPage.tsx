import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PecaFilters } from '@/components/pecas/PecaFilters'
import { PecaGrid } from '@/components/pecas/PecaGrid'
import type { FiltroState } from '@/types'
import { usePecas } from '@/hooks/usePecas'

const FILTRO_INICIAL: FiltroState = { busca: '', categoria: 'todas' }

export function ListaPage() {
  const { loading, error, filtrar } = usePecas()
  const [filtro, setFiltro] = useState<FiltroState>(FILTRO_INICIAL)

  const pecasFiltradas = filtrar(filtro)
  const hasFilters = filtro.busca !== '' || filtro.categoria !== 'todas'

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-px h-16 animate-pulse" style={{ backgroundColor: '#C9A96E55' }} />
          <span className="font-serif text-lg italic font-light" style={{ color: '#6B6058' }}>Carregando...</span>
          <div className="w-px h-16 animate-pulse" style={{ backgroundColor: '#C9A96E55' }} />
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="text-center py-20 text-red-500">
          <p className="font-semibold">Erro ao carregar peças</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PecaFilters filtro={filtro} onChange={setFiltro} />
      <PecaGrid pecas={pecasFiltradas} hasFilters={hasFilters} />
    </PageWrapper>
  )
}
