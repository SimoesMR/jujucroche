import { useState, useEffect, useCallback } from 'react'
import type { Peca, PecaFormValues, FiltroState } from '@/types'
import { api } from '@/utils/api'

export function usePecas() {
  const [pecas, setPecas] = useState<Peca[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const carregarPecas = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getPecas()
      setPecas(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregarPecas()
  }, [carregarPecas])

  const adicionarPeca = async (values: PecaFormValues): Promise<Peca> => {
    const nova = await api.criarPeca(values)
    setPecas((prev) => [nova, ...prev])
    return nova
  }

  const atualizarPeca = async (id: string, values: PecaFormValues): Promise<Peca> => {
    const atualizada = await api.atualizarPeca(id, values)
    setPecas((prev) => prev.map((p) => (p.id === id ? atualizada : p)))
    return atualizada
  }

  const excluirPeca = async (id: string): Promise<void> => {
    await api.excluirPeca(id)
    setPecas((prev) => prev.filter((p) => p.id !== id))
  }

  const getPecaById = (id: string): Peca | undefined => pecas.find((p) => p.id === id)

  const filtrar = (filtro: FiltroState): Peca[] => {
    return pecas.filter((p) => {
      const matchCategoria = filtro.categoria === 'todas' || p.categoria === filtro.categoria
      const busca = filtro.busca.toLowerCase()
      const matchBusca =
        !busca ||
        p.nome.toLowerCase().includes(busca) ||
        p.descricao.toLowerCase().includes(busca)
      return matchCategoria && matchBusca
    })
  }

  return { pecas, loading, error, adicionarPeca, atualizarPeca, excluirPeca, getPecaById, filtrar, recarregar: carregarPecas }
}
