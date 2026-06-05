export type Categoria =
  | 'bolsa'
  | 'roupa'
  | 'acessorio'
  | 'decoracao'
  | 'brinquedo'
  | 'outro'

export interface Material {
  id: string
  nome: string
  quantidade: number
  unidade: string
  custoUnitario: number
  ordem?: number
}

export interface Peca {
  id: string
  nome: string
  categoria: Categoria
  descricao: string
  receita: string
  materiais: Material[]
  imagemBase64: string | null
  precoVenda: number
  visivelCatalogo: boolean
  criadaEm: string
  atualizadaEm: string
}

export interface PecaFormValues {
  nome: string
  categoria: Categoria
  descricao: string
  receita: string
  materiais: MaterialFormRow[]
  imagemBase64: string | null
  precoVenda: string
  visivelCatalogo: boolean
}

export interface MaterialFormRow {
  id: string
  nome: string
  quantidade: string
  unidade: string
  custoUnitario: string
}

export interface FiltroState {
  busca: string
  categoria: Categoria | 'todas'
}
