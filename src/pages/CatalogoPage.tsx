import { useEffect, useRef, useState } from 'react'
import { api, type CatalogoItem } from '@/utils/api'
import { formatBRL } from '@/utils/formatters'

const INSTAGRAM_URL = 'https://www.instagram.com/julietarissato'

// Paleta de luxo
const C = {
  creme:     '#FAF8F5',
  champanhe: '#C9A96E',
  escuro:    '#1A1A1A',
  medio:     '#6B6058',
  borda:     '#E8E2D9',
  carbono:   '#2C2826',
} as const

// ─── Ícone Instagram ──────────────────────────────────────────────────────────
function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Linha decorativa dourada ─────────────────────────────────────────────────
function LinhaDourada({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-12 h-px mx-auto ${className}`}
      style={{ backgroundColor: C.champanhe }}
    />
  )
}

// ─── Card do catálogo ─────────────────────────────────────────────────────────
function CatalogoCard({ item }: { item: CatalogoItem }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="cursor-default overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Foto */}
      <div className="relative aspect-[3/4] overflow-hidden" style={{ backgroundColor: C.carbono }}>
        {item.imagemBase64 ? (
          <>
            <img
              src={item.imagemBase64}
              alt={item.nome}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            />
            {/* Overlay gradiente */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)',
                opacity: hovered ? 1 : 0,
              }}
            />
            {/* Preço no hover */}
            <div
              className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-400"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <p className="font-serif text-white text-lg font-light tracking-wide">
                {item.preco > 0 ? formatBRL(item.preco) : 'Consultar'}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-px h-12" style={{ backgroundColor: `${C.champanhe}66` }} />
            <span
              className="font-serif text-4xl font-light tracking-widest"
              style={{ color: `${C.champanhe}99` }}
            >
              JR
            </span>
            <div className="w-px h-12" style={{ backgroundColor: `${C.champanhe}66` }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 pb-6 px-1">
        <h3 className="font-serif text-base font-light tracking-wide uppercase" style={{ color: C.escuro }}>
          {item.nome}
        </h3>
        <p className="font-sans text-xs tracking-widest mt-1" style={{ color: C.champanhe }}>
          {item.preco > 0 ? formatBRL(item.preco) : 'Consultar preço'}
        </p>
      </div>
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────
export function CatalogoPage() {
  const [items, setItems] = useState<CatalogoItem[]>([])
  const [loading, setLoading] = useState(true)
  const colecaoRef = useRef<HTMLElement>(null)

  useEffect(() => {
    api.getCatalogo()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  const scrollParaColecao = () => {
    colecaoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: C.creme }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.96)', borderBottom: `1px solid ${C.borda}` }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-10" />

          <div className="text-center">
            <p
              className="font-serif text-lg font-normal leading-none"
              style={{ color: C.escuro, letterSpacing: '0.3em' }}
            >
              JULIETA RISSATO
            </p>
            <p
              className="font-sans text-[10px] font-light mt-0.5"
              style={{ color: C.medio, letterSpacing: '0.25em' }}
            >
              CROCHÊ ARTESANAL
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: C.medio }}
            title="Instagram"
            onMouseEnter={e => (e.currentTarget.style.color = C.escuro)}
            onMouseLeave={e => (e.currentTarget.style.color = C.medio)}
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="min-h-[75vh] flex items-center justify-center px-6 relative overflow-hidden"
        style={{ backgroundColor: C.carbono }}
      >
        {/* Decoração de fundo */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
            style={{ width: 600, height: 600 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
            style={{ width: 380, height: 380 }}
          />
        </div>

        <div className="text-center max-w-3xl relative z-10">
          <LinhaDourada className="mb-8" />

          <h1 className="font-serif font-light leading-tight">
            <span
              className="block text-4xl sm:text-5xl lg:text-6xl italic text-white"
              style={{ fontStyle: 'italic' }}
            >
              Arte tecida à mão,
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-white mt-1">
              peça por peça.
            </span>
          </h1>

          <p
            className="font-sans font-light text-sm mt-8"
            style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em' }}
          >
            CROCHÊ ARTESANAL DE ALTA QUALIDADE
          </p>

          <LinhaDourada className="my-8" />

          <button
            onClick={scrollParaColecao}
            className="font-sans text-xs transition-colors duration-300"
            style={{ color: C.champanhe, letterSpacing: '0.25em' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = C.champanhe)}
          >
            EXPLORAR COLEÇÃO ↓
          </button>
        </div>
      </section>

      {/* ── COLEÇÃO ────────────────────────────────────────────────────────── */}
      <section
        ref={colecaoRef}
        id="colecao"
        className="py-20 px-6"
        style={{ backgroundColor: C.creme }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-16">
            <LinhaDourada className="mb-6" />
            <p
              className="font-sans text-[10px] font-light mb-3"
              style={{ color: C.medio, letterSpacing: '0.3em' }}
            >
              EXCLUSIVIDADE
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-light"
              style={{ color: C.escuro }}
            >
              Nossa Coleção
            </h2>
            <p
              className="font-sans text-sm font-light mt-3 tracking-wide"
              style={{ color: C.medio }}
            >
              Peças únicas, criadas com dedicação e amor
            </p>
            <LinhaDourada className="mt-6" />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex flex-col items-center py-20 gap-6">
              <div className="w-px h-16 animate-pulse" style={{ backgroundColor: `${C.champanhe}55` }} />
              <span className="font-serif text-lg italic font-light" style={{ color: C.medio }}>
                Carregando coleção...
              </span>
              <div className="w-px h-16 animate-pulse" style={{ backgroundColor: `${C.champanhe}55` }} />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <LinhaDourada className="mb-6" />
              <h3 className="font-serif text-2xl font-light italic" style={{ color: C.escuro }}>
                Em breve novas peças
              </h3>
              <p className="font-sans text-sm mt-3 font-light tracking-wide" style={{ color: C.medio }}>
                Volte em breve para conhecer nossa coleção.
              </p>
              <LinhaDourada className="mt-6" />
            </div>
          ) : (
            <>
              <p
                className="text-center font-sans text-xs mb-10"
                style={{ color: C.medio, letterSpacing: '0.2em' }}
              >
                {items.length} {items.length === 1 ? 'PEÇA DISPONÍVEL' : 'PEÇAS DISPONÍVEIS'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {items.map((item) => (
                  <CatalogoCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SOBRE ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Imagem placeholder */}
          <div
            className="aspect-[4/5] flex flex-col items-center justify-center gap-4 relative overflow-hidden"
            style={{ backgroundColor: C.carbono }}
          >
            <div
              className="absolute inset-5 pointer-events-none"
              style={{ border: `1px solid ${C.champanhe}33` }}
            />
            <div className="w-px h-14" style={{ backgroundColor: `${C.champanhe}80` }} />
            <div className="text-center">
              <p
                className="font-serif text-5xl font-light tracking-widest"
                style={{ color: C.champanhe }}
              >
                JR
              </p>
              <div className="w-8 h-px mx-auto mt-3" style={{ backgroundColor: `${C.champanhe}80` }} />
            </div>
            <div className="w-px h-14" style={{ backgroundColor: `${C.champanhe}80` }} />
            <p
              className="font-sans text-[10px] absolute bottom-5"
              style={{ color: `${C.champanhe}66`, letterSpacing: '0.2em' }}
            >
              SUBSTITUIR PELA SUA FOTO
            </p>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-12 h-px mb-5" style={{ backgroundColor: C.champanhe }} />
              <p
                className="font-sans text-[10px] font-light mb-4"
                style={{ color: C.medio, letterSpacing: '0.3em' }}
              >
                SOBRE A ARTESÃ
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-light italic leading-snug"
                style={{ color: C.escuro }}
              >
                Julieta Rissato
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-sans text-sm font-light leading-relaxed" style={{ color: C.medio }}>
              <p>
                Cada peça nascida das minhas mãos carrega uma história. Aprendi
                crochê como tradição de família e transformei essa paixão em arte —
                criando peças únicas que unem técnica refinada e estética
                contemporânea.
              </p>
              <p>
                Da escolha cuidadosa dos fios ao ponto final, cada detalhe é
                pensado para que você use algo verdadeiramente especial.
              </p>
            </div>

            <div className="w-12 h-px" style={{ backgroundColor: C.borda }} />

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs w-fit transition-colors duration-300"
              style={{ color: C.escuro, letterSpacing: '0.2em' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.champanhe)}
              onMouseLeave={e => (e.currentTarget.style.color = C.escuro)}
            >
              <InstagramIcon className="w-4 h-4" />
              @julietarissato
            </a>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: C.carbono }}>
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-7">
          <LinhaDourada />

          <div>
            <p
              className="font-sans text-[10px] font-light mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em' }}
            >
              SIGA NO INSTAGRAM
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-light italic text-white"
            >
              Acompanhe nossas criações
            </h2>
            <p
              className="font-sans text-sm font-light mt-4 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Novidades, bastidores e peças exclusivas no nosso perfil.
            </p>
          </div>

          <p
            className="font-serif text-xl font-light tracking-wider"
            style={{ color: C.champanhe }}
          >
            @julietarissato
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-xs px-8 py-3 transition-all duration-300"
            style={{
              border: `1px solid ${C.champanhe}`,
              color: C.champanhe,
              letterSpacing: '0.25em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = C.champanhe
              e.currentTarget.style.color = C.carbono
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = C.champanhe
            }}
          >
            <InstagramIcon className="w-4 h-4" />
            SEGUIR NO INSTAGRAM
          </a>

          <LinhaDourada />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="bg-white py-10 px-6"
        style={{ borderTop: `1px solid ${C.borda}` }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p
              className="font-serif text-sm font-normal"
              style={{ color: C.escuro, letterSpacing: '0.25em' }}
            >
              JULIETA RISSATO
            </p>
            <p
              className="font-sans text-[10px] font-light mt-0.5"
              style={{ color: C.medio, letterSpacing: '0.2em' }}
            >
              CROCHÊ ARTESANAL
            </p>
          </div>

          <p className="font-sans text-xs font-light tracking-wide text-center" style={{ color: C.medio }}>
            © {new Date().getFullYear()} Julieta Rissato. Todos os direitos reservados.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-xs tracking-wide transition-colors"
            style={{ color: C.medio }}
            onMouseEnter={e => (e.currentTarget.style.color = C.escuro)}
            onMouseLeave={e => (e.currentTarget.style.color = C.medio)}
          >
            <InstagramIcon className="w-4 h-4" />
            Instagram
          </a>
        </div>
      </footer>
    </div>
  )
}
