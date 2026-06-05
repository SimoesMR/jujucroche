import { PageWrapper } from '@/components/layout/PageWrapper'
import { PecaForm } from '@/forms/PecaForm'

export function NovaPecaPage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <div className="w-8 h-px mb-3" style={{ backgroundColor: '#C9A96E' }} />
        <h1 className="font-serif text-2xl font-light" style={{ color: '#1A1A1A' }}>Nova Peça</h1>
      </div>
      <PecaForm />
    </PageWrapper>
  )
}
