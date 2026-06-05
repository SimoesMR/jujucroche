import { useParams, Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PecaForm } from '@/forms/PecaForm'
import { usePecas } from '@/hooks/usePecas'

export function EditarPecaPage() {
  const { id } = useParams<{ id: string }>()
  const { getPecaById, loading } = usePecas()
  const peca = id ? getPecaById(id) : undefined

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-20 text-pink-400 text-4xl animate-bounce">🧶</div>
      </PageWrapper>
    )
  }

  if (!peca) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Peça não encontrada.</p>
          <Link to="/admin/pecas" className="text-pink-500 hover:underline text-sm">← Voltar para a lista</Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <div className="w-8 h-px mb-3" style={{ backgroundColor: '#C9A96E' }} />
        <h1 className="font-serif text-2xl font-light" style={{ color: '#1A1A1A' }}>Editar: {peca.nome}</h1>
      </div>
      <PecaForm peca={peca} />
    </PageWrapper>
  )
}
