import type { Categoria } from '@/types'

export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const CATEGORIAS: Record<Categoria, { label: string; bg: string; text: string }> = {
  bolsa:     { label: 'Bolsa',      bg: 'bg-pink-100',   text: 'text-pink-800' },
  roupa:     { label: 'Roupa',      bg: 'bg-purple-100', text: 'text-purple-800' },
  acessorio: { label: 'Acessório',  bg: 'bg-yellow-100', text: 'text-yellow-800' },
  decoracao: { label: 'Decoração',  bg: 'bg-green-100',  text: 'text-green-800' },
  brinquedo: { label: 'Brinquedo',  bg: 'bg-blue-100',   text: 'text-blue-800' },
  outro:     { label: 'Outro',      bg: 'bg-gray-100',   text: 'text-gray-700' },
}

export const CATEGORIA_OPTIONS = (Object.entries(CATEGORIAS) as [Categoria, { label: string }][]).map(
  ([value, { label }]) => ({ value, label })
)
