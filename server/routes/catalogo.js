import { Router } from 'express'
import { sql } from '../db.js'

const router = Router()

// GET /api/catalogo — público, retorna só id, nome, foto e preço de venda
// Apenas peças marcadas como visíveis no catálogo
router.get('/', async (req, res) => {
  try {
    const items = await sql`
      SELECT
        p.id,
        p.nome,
        p.imagem_base64 AS "imagemBase64",
        p.preco_venda::float AS preco
      FROM pecas p
      WHERE p.visivel_catalogo = true
      ORDER BY p.atualizada_em DESC
    `
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar catálogo' })
  }
})

export default router
