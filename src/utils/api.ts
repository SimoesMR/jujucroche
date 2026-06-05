import type { Peca, PecaFormValues } from '@/types'
import { getToken, removeToken } from '@/hooks/useAuth'

export interface CatalogoItem {
  id: string
  nome: string
  imagemBase64: string | null
  preco: number
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  if (res.status === 401) {
    removeToken()
    window.location.href = '/login'
    return undefined as T
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? `Erro ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

function toApiBody(values: PecaFormValues) {
  return {
    nome: values.nome,
    categoria: values.categoria,
    descricao: values.descricao,
    receita: values.receita,
    imagemBase64: values.imagemBase64,
    precoVenda: parseFloat(values.precoVenda) || 0,
    visivelCatalogo: values.visivelCatalogo,
    materiais: values.materiais.map((m) => ({
      nome: m.nome,
      quantidade: parseFloat(m.quantidade) || 0,
      unidade: m.unidade,
      custoUnitario: parseFloat(m.custoUnitario) || 0,
    })),
  }
}

export const api = {
  getCatalogo: () => fetch('/api/catalogo').then((r) => r.json()) as Promise<CatalogoItem[]>,
  getPecas: () => request<Peca[]>('/api/pecas'),
  getPecaById: (id: string) => request<Peca>(`/api/pecas/${id}`),
  criarPeca: (values: PecaFormValues) =>
    request<Peca>('/api/pecas', { method: 'POST', body: JSON.stringify(toApiBody(values)) }),
  atualizarPeca: (id: string, values: PecaFormValues) =>
    request<Peca>(`/api/pecas/${id}`, { method: 'PUT', body: JSON.stringify(toApiBody(values)) }),
  excluirPeca: (id: string) =>
    request<void>(`/api/pecas/${id}`, { method: 'DELETE' }),
}
