import type { Categoria } from '@/types'

// Paleta neutra e sofisticada por categoria
const BADGE_STYLES: Record<Categoria, { label: string; bg: string; color: string }> = {
  bolsa:     { label: 'Bolsa',      bg: '#F5F0EB', color: '#6B5B45' },
  roupa:     { label: 'Roupa',      bg: '#EEF0F5', color: '#4A506B' },
  acessorio: { label: 'Acessório',  bg: '#F5EEF0', color: '#6B4550' },
  decoracao: { label: 'Decoração',  bg: '#EEF5EE', color: '#456B45' },
  brinquedo: { label: 'Brinquedo',  bg: '#F0F5EE', color: '#4A6B45' },
  outro:     { label: 'Outro',      bg: '#F2F0ED', color: '#6B6058' },
}

interface BadgeProps { categoria: Categoria }

export function Badge({ categoria }: BadgeProps) {
  const { label, bg, color } = BADGE_STYLES[categoria]
  return (
    <span
      className="inline-block font-sans text-[10px] font-medium px-2.5 py-0.5 whitespace-nowrap"
      style={{ backgroundColor: bg, color, letterSpacing: '0.08em' }}
    >
      {label.toUpperCase()}
    </span>
  )
}
