import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { MateriaisReadonly } from '@/components/pecas/MateriaisReadonly'
import { ReceitaDisplay } from '@/components/pecas/ReceitaDisplay'
import { usePecas } from '@/hooks/usePecas'

export function DetalhePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getPecaById, excluirPeca, loading } = usePecas()
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  const handleExcluir = async () => {
    setDeleting(true)
    try {
      await excluirPeca(peca.id)
      navigate('/admin/pecas', { replace: true })
    } catch {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <PageWrapper>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/admin/pecas" className="font-sans text-xs font-light transition-colors" style={{ color: '#6B6058', letterSpacing: '0.1em' }} onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')} onMouseLeave={e=>(e.currentTarget.style.color='#6B6058')}>← VOLTAR</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna esquerda — foto */}
        <div>
          <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: '#2C2826' }}>
            {peca.imagemBase64 ? (
              <img src={peca.imagemBase64} alt={peca.nome} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <div className="w-px h-10" style={{ backgroundColor: '#C9A96E55' }} />
                <span className="font-serif text-4xl font-light tracking-widest" style={{ color: '#C9A96E80' }}>JR</span>
                <div className="w-px h-10" style={{ backgroundColor: '#C9A96E55' }} />
              </div>
            )}
          </div>
        </div>

        {/* Coluna direita — info */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="font-serif text-2xl font-light" style={{ color: '#1A1A1A' }}>{peca.nome}</h1>
              <Badge categoria={peca.categoria} />
            </div>
            {peca.descricao && <p className="font-sans text-sm font-light" style={{ color: '#6B6058' }}>{peca.descricao}</p>}
          </div>

          {/* Preço de venda + visibilidade */}
          <div className="flex items-center gap-3 flex-wrap pt-1">
            {peca.precoVenda > 0 && (
              <div className="px-4 py-2.5" style={{ border: '1px solid #E8E2D9', backgroundColor: '#FAF8F5' }}>
                <p className="font-sans text-[9px] font-light" style={{ color: '#6B6058', letterSpacing: '0.2em' }}>PREÇO DE VENDA</p>
                <p className="font-serif text-xl font-light mt-0.5" style={{ color: '#C9A96E' }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(peca.precoVenda)}</p>
              </div>
            )}
            <div
              className="font-sans text-[9px] font-medium px-3 py-1"
              style={peca.visivelCatalogo
                ? { backgroundColor: '#F0F5F0', color: '#4A6B45', letterSpacing: '0.1em' }
                : { backgroundColor: '#F2F0ED', color: '#6B6058', letterSpacing: '0.1em' }
              }
            >
              {peca.visivelCatalogo ? '● VISÍVEL NO CATÁLOGO' : '○ OCULTO DO CATÁLOGO'}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link to={`/admin/editar/${peca.id}`}>
              <Button variant="secondary" size="sm">✏️ Editar</Button>
            </Link>
            <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
              🗑️ Excluir
            </Button>
          </div>
        </div>
      </div>

      {/* Materiais */}
      <div className="mt-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-6 h-px" style={{ backgroundColor: '#C9A96E' }} />
          <h2 className="font-sans text-[10px] font-medium" style={{ color: '#6B6058', letterSpacing: '0.25em' }}>MATERIAIS</h2>
        </div>
        <MateriaisReadonly materiais={peca.materiais} />
      </div>

      {/* Receita */}
      <div className="mt-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-6 h-px" style={{ backgroundColor: '#C9A96E' }} />
          <h2 className="font-sans text-[10px] font-medium" style={{ color: '#6B6058', letterSpacing: '0.25em' }}>RECEITA</h2>
        </div>
        <div className="p-5" style={{ backgroundColor: 'white', border: '1px solid #E8E2D9' }}>
          <ReceitaDisplay receita={peca.receita} />
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Excluir peça"
          message={`Tem certeza que deseja excluir "${peca.nome}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleExcluir}
          onCancel={() => setShowConfirm(false)}
          loading={deleting}
        />
      )}
    </PageWrapper>
  )
}
