import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Peca, PecaFormValues, Categoria } from '@/types'
import { CATEGORIA_OPTIONS } from '@/constants'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { MateriaisTable } from '@/components/pecas/MateriaisTable'
import { ImageUploadField } from './ImageUploadField'
import { usePecas } from '@/hooks/usePecas'

interface PecaFormProps {
  peca?: Peca
}

function pecaToFormValues(peca?: Peca): PecaFormValues {
  if (!peca) {
    return {
      nome: '',
      categoria: 'bolsa',
      descricao: '',
      receita: '',
      materiais: [],
      imagemBase64: null,
      precoVenda: '',
      visivelCatalogo: true,
    }
  }
  return {
    nome: peca.nome,
    categoria: peca.categoria,
    descricao: peca.descricao,
    receita: peca.receita,
    imagemBase64: peca.imagemBase64,
    precoVenda: peca.precoVenda > 0 ? String(peca.precoVenda) : '',
    visivelCatalogo: peca.visivelCatalogo ?? true,
    materiais: peca.materiais.map((m) => ({
      id: m.id,
      nome: m.nome,
      quantidade: String(m.quantidade),
      unidade: m.unidade,
      custoUnitario: String(m.custoUnitario),
    })),
  }
}

interface FormErrors {
  nome?: string
  precoVenda?: string
}

export function PecaForm({ peca }: PecaFormProps) {
  const navigate = useNavigate()
  const { adicionarPeca, atualizarPeca } = usePecas()
  const [values, setValues] = useState<PecaFormValues>(() => pecaToFormValues(peca))
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const set = <K extends keyof PecaFormValues>(field: K, value: PecaFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (field === 'nome') setErrors((e) => ({ ...e, nome: undefined }))
    if (field === 'precoVenda') setErrors((e) => ({ ...e, precoVenda: undefined }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!values.nome.trim()) errs.nome = 'Nome é obrigatório'
    if (!values.precoVenda || parseFloat(values.precoVenda) <= 0) {
      errs.precoVenda = 'Preço de venda é obrigatório'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setServerError(null)
    try {
      let salva: Peca
      if (peca) {
        salva = await atualizarPeca(peca.id, values)
      } else {
        salva = await adicionarPeca(values)
      }
      navigate(`/admin/peca/${salva.id}`)
    } catch (err) {
      setServerError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {/* Nome */}
      <Input
        label="Nome da peça *"
        value={values.nome}
        onChange={(e) => set('nome', e.target.value)}
        placeholder="Ex: Bolsa de praia"
        error={errors.nome}
      />

      {/* Categoria + Descrição */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Categoria"
          value={values.categoria}
          onChange={(e) => set('categoria', e.target.value as Categoria)}
          options={CATEGORIA_OPTIONS}
        />
        <Input
          label="Descrição curta"
          value={values.descricao}
          onChange={(e) => set('descricao', e.target.value)}
          placeholder="Uma breve descrição da peça"
        />
      </div>

      {/* Preço de venda + Toggle visível no catálogo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Input
          label="Preço de venda *"
          type="number"
          min="0"
          step="0.01"
          value={values.precoVenda}
          onChange={(e) => set('precoVenda', e.target.value)}
          placeholder="0,00"
          error={errors.precoVenda}
        />

        {/* Toggle visível no catálogo */}
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-[10px] font-light" style={{ color: '#6B6058', letterSpacing: '0.2em' }}>
            VISIBILIDADE NO CATÁLOGO
          </span>
          <button
            type="button"
            onClick={() => set('visivelCatalogo', !values.visivelCatalogo)}
            className="flex items-center gap-3 w-fit"
          >
            {/* Track */}
            <div
              className="relative w-11 h-6 transition-colors duration-200"
              style={{
                backgroundColor: values.visivelCatalogo ? '#C9A96E' : '#E8E2D9',
                borderRadius: 0,
              }}
            >
              {/* Thumb */}
              <div
                className="absolute top-1 w-4 h-4 bg-white shadow transition-transform duration-200"
                style={{ transform: values.visivelCatalogo ? 'translateX(1.5rem)' : 'translateX(0.25rem)' }}
              />
            </div>
            <span className="font-sans text-xs font-light" style={{ color: values.visivelCatalogo ? '#C9A96E' : '#6B6058', letterSpacing: '0.1em' }}>
              {values.visivelCatalogo ? 'Visível no catálogo' : 'Oculto do catálogo'}
            </span>
          </button>
        </div>
      </div>

      <ImageUploadField value={values.imagemBase64} onChange={(v) => set('imagemBase64', v)} />

      <MateriaisTable
        materiais={values.materiais}
        onChange={(m) => set('materiais', m)}
      />

      <Textarea
        label="Receita / Passo a passo"
        value={values.receita}
        onChange={(e) => set('receita', e.target.value)}
        placeholder="Passo 1: Monte 30 correntes de base..."
        rows={8}
      />

      {serverError && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{serverError}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : peca ? 'Salvar alterações' : 'Criar peça'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
