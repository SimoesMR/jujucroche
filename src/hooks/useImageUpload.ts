import { useState } from 'react'
import { validateImageFile, fileToBase64, resizeImageBase64 } from '@/utils/imageUtils'

export function useImageUpload(initialBase64?: string | null) {
  const [imagemBase64, setImagemBase64] = useState<string | null>(initialBase64 ?? null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsProcessing(true)
    try {
      const raw = await fileToBase64(file)
      const resized = await resizeImageBase64(raw)
      setImagemBase64(resized)
    } catch {
      setError('Erro ao processar imagem.')
    } finally {
      setIsProcessing(false)
    }
  }

  const clearImage = () => setImagemBase64(null)

  return { imagemBase64, isProcessing, error, handleFileChange, clearImage }
}
