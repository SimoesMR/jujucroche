import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/hooks/useAuth'

const C = {
  champanhe: '#C9A96E',
  escuro:    '#1A1A1A',
  medio:     '#6B6058',
  borda:     '#E8E2D9',
  carbono:   '#2C2826',
  creme:     '#FAF8F5',
}

export function LoginPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!usuario || !senha) {
      setError('Preencha usuário e senha')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await login(usuario, senha)
      navigate('/admin/pecas', { replace: true })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: C.carbono }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" style={{ width: 600, height: 600 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" style={{ width: 350, height: 350 }} />
      </div>

      <div
        className="relative w-full max-w-sm p-10 flex flex-col gap-8"
        style={{ backgroundColor: C.creme }}
      >
        {/* Borda interna decorativa */}
        <div className="absolute inset-3 pointer-events-none" style={{ border: `1px solid ${C.champanhe}33` }} />

        {/* Logo */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-px h-8" style={{ backgroundColor: C.champanhe }} />
          <div>
            <h1
              className="font-serif text-xl font-normal tracking-widest"
              style={{ color: C.escuro, letterSpacing: '0.25em' }}
            >
              JULIETA RISSATO
            </h1>
            <p
              className="font-sans text-[10px] font-light mt-1"
              style={{ color: C.medio, letterSpacing: '0.3em' }}
            >
              ÁREA ADMINISTRATIVA
            </p>
          </div>
          <div className="w-8 h-px" style={{ backgroundColor: C.champanhe }} />
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-[10px] font-light"
              style={{ color: C.medio, letterSpacing: '0.2em' }}
            >
              USUÁRIO
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              autoComplete="username"
              className="font-sans text-sm px-4 py-3 outline-none transition-colors bg-white"
              style={{
                border: `1px solid ${C.borda}`,
                color: C.escuro,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = C.champanhe)}
              onBlur={e => (e.currentTarget.style.borderColor = C.borda)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-[10px] font-light"
              style={{ color: C.medio, letterSpacing: '0.2em' }}
            >
              SENHA
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              className="font-sans text-sm px-4 py-3 outline-none transition-colors bg-white"
              style={{
                border: `1px solid ${C.borda}`,
                color: C.escuro,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = C.champanhe)}
              onBlur={e => (e.currentTarget.style.borderColor = C.borda)}
            />
          </div>

          {error && (
            <p
              className="font-sans text-xs py-2 px-3 text-center"
              style={{ color: '#b91c1c', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-sans text-xs py-3 mt-2 transition-all duration-300 disabled:opacity-50"
            style={{
              backgroundColor: C.carbono,
              color: C.champanhe,
              letterSpacing: '0.25em',
              border: `1px solid ${C.carbono}`,
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = C.champanhe
                e.currentTarget.style.color = C.carbono
                e.currentTarget.style.borderColor = C.champanhe
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = C.carbono
              e.currentTarget.style.color = C.champanhe
              e.currentTarget.style.borderColor = C.carbono
            }}
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        <div className="w-8 h-px mx-auto" style={{ backgroundColor: C.champanhe }} />
      </div>
    </div>
  )
}
