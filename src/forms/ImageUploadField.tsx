import { useRef } from 'react'
import { useImageUpload } from '@/hooks/useImageUpload'

const C = { champanhe: '#C9A96E', medio: '#6B6058', borda: '#E8E2D9', carbono: '#2C2826' }

interface ImageUploadFieldProps {
  value: string | null
  onChange: (base64: string | null) => void
}

export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { imagemBase64, isProcessing, error, handleFileChange, clearImage } = useImageUpload(value)
  const currentImage = imagemBase64 ?? value

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(e)
    const file = e.target.files?.[0]
    if (!file) return
    const { validateImageFile, fileToBase64, resizeImageBase64 } = await import('@/utils/imageUtils')
    if (validateImageFile(file)) return
    const raw = await fileToBase64(file)
    const resized = await resizeImageBase64(raw)
    onChange(resized)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="font-sans text-[10px] font-light"
        style={{ color: C.medio, letterSpacing: '0.2em' }}
      >
        FOTO DA PEÇA
      </span>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChange} />

      {currentImage ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ border: `1px solid ${C.borda}` }}>
          <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { clearImage(); onChange(null) }}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center font-sans text-xs font-bold transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'white')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)')}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-3 transition-colors"
          style={{ border: `1px dashed ${C.borda}`, backgroundColor: '#FDFCFA' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = C.champanhe
            e.currentTarget.style.backgroundColor = '#FAF8F5'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = C.borda
            e.currentTarget.style.backgroundColor = '#FDFCFA'
          }}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 animate-pulse" style={{ backgroundColor: C.champanhe }} />
              <span className="font-sans text-xs font-light" style={{ color: C.medio }}>Processando...</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-6" style={{ backgroundColor: `${C.champanhe}80` }} />
                <span className="font-serif text-lg font-light" style={{ color: `${C.champanhe}99` }}>+</span>
                <div className="w-px h-6" style={{ backgroundColor: `${C.champanhe}80` }} />
              </div>
              <div className="text-center">
                <p className="font-sans text-xs font-light" style={{ color: C.medio, letterSpacing: '0.1em' }}>CLIQUE PARA ADICIONAR FOTO</p>
                <p className="font-sans text-[10px] mt-1" style={{ color: `${C.medio}99` }}>JPG, PNG ou WebP · Máx 2MB</p>
              </div>
            </>
          )}
        </button>
      )}
      {error && <p className="font-sans text-xs" style={{ color: '#dc2626' }}>{error}</p>}
    </div>
  )
}
