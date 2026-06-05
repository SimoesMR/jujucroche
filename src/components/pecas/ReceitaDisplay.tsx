interface ReceitaDisplayProps {
  receita: string
}

export function ReceitaDisplay({ receita }: ReceitaDisplayProps) {
  if (!receita.trim()) {
    return <p className="text-gray-400 text-sm italic">Receita não cadastrada.</p>
  }

  const linhas = receita.split('\n')

  return (
    <div className="flex flex-col gap-2">
      {linhas.map((linha, i) => {
        if (!linha.trim()) return <div key={i} className="h-2" />
        const isStep = /^\d+[.)]\s/.test(linha)
        return (
          <p
            key={i}
            className={isStep
              ? 'text-sm text-gray-800 font-medium pl-0'
              : 'text-sm text-gray-700 leading-relaxed'
            }
          >
            {linha}
          </p>
        )
      })}
    </div>
  )
}
