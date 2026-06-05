import { Button } from './Button'

const C = { escuro: '#1A1A1A', medio: '#6B6058', borda: '#E8E2D9' }

interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function ConfirmDialog({ title, message, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div
        className="bg-white max-w-sm w-full p-8 flex flex-col gap-5"
        style={{ border: `1px solid ${C.borda}` }}
      >
        <div>
          <div className="w-8 h-px mb-4" style={{ backgroundColor: '#dc2626' }} />
          <h2 className="font-serif text-xl font-light" style={{ color: C.escuro }}>{title}</h2>
          <p className="font-sans text-sm font-light mt-2 leading-relaxed" style={{ color: C.medio }}>{message}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading} autoFocus>
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </div>
    </div>
  )
}
