import type { Material } from '@/types'

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function calcularCustoTotal(materiais: Pick<Material, 'quantidade' | 'custoUnitario'>[]): number {
  return materiais.reduce((sum, m) => sum + m.quantidade * m.custoUnitario, 0)
}
