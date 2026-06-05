import { Router } from 'express'
import { sql } from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Todas as rotas de /api/pecas exigem autenticação
router.use(authMiddleware)

// GET /api/pecas
router.get('/', async (req, res) => {
  try {
    const pecas = await sql`
      SELECT
        p.id,
        p.nome,
        p.categoria,
        p.descricao,
        p.receita,
        p.imagem_base64 AS "imagemBase64",
        p.preco_venda::float AS "precoVenda",
        p.visivel_catalogo AS "visivelCatalogo",
        p.criada_em    AS "criadaEm",
        p.atualizada_em AS "atualizadaEm",
        COALESCE(
          json_agg(
            json_build_object(
              'id',            m.id,
              'nome',          m.nome,
              'quantidade',    m.quantidade::float,
              'unidade',       m.unidade,
              'custoUnitario', m.custo_unitario::float,
              'ordem',         m.ordem
            ) ORDER BY m.ordem
          ) FILTER (WHERE m.id IS NOT NULL),
          '[]'
        ) AS materiais
      FROM pecas p
      LEFT JOIN materiais m ON m.peca_id = p.id
      GROUP BY p.id
      ORDER BY p.atualizada_em DESC
    `
    res.json(pecas)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar peças' })
  }
})

// GET /api/pecas/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const rows = await sql`
      SELECT
        p.id,
        p.nome,
        p.categoria,
        p.descricao,
        p.receita,
        p.imagem_base64 AS "imagemBase64",
        p.preco_venda::float AS "precoVenda",
        p.visivel_catalogo AS "visivelCatalogo",
        p.criada_em    AS "criadaEm",
        p.atualizada_em AS "atualizadaEm",
        COALESCE(
          json_agg(
            json_build_object(
              'id',            m.id,
              'nome',          m.nome,
              'quantidade',    m.quantidade::float,
              'unidade',       m.unidade,
              'custoUnitario', m.custo_unitario::float,
              'ordem',         m.ordem
            ) ORDER BY m.ordem
          ) FILTER (WHERE m.id IS NOT NULL),
          '[]'
        ) AS materiais
      FROM pecas p
      LEFT JOIN materiais m ON m.peca_id = p.id
      WHERE p.id = ${id}
      GROUP BY p.id
    `
    if (rows.length === 0) return res.status(404).json({ error: 'Peça não encontrada' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar peça' })
  }
})

// POST /api/pecas
router.post('/', async (req, res) => {
  const {
    nome, categoria, descricao = '', receita = '', imagemBase64 = null,
    precoVenda = 0, visivelCatalogo = true, materiais = []
  } = req.body
  if (!nome || !categoria) return res.status(400).json({ error: 'nome e categoria são obrigatórios' })

  try {
    const [peca] = await sql`
      INSERT INTO pecas (nome, categoria, descricao, receita, imagem_base64, preco_venda, visivel_catalogo)
      VALUES (${nome}, ${categoria}, ${descricao}, ${receita}, ${imagemBase64}, ${precoVenda}, ${visivelCatalogo})
      RETURNING id, nome, categoria, descricao, receita,
                imagem_base64 AS "imagemBase64",
                preco_venda::float AS "precoVenda",
                visivel_catalogo AS "visivelCatalogo",
                criada_em AS "criadaEm",
                atualizada_em AS "atualizadaEm"
    `
    if (materiais.length > 0) {
      await Promise.all(
        materiais.map((m, i) =>
          sql`
            INSERT INTO materiais (peca_id, nome, quantidade, unidade, custo_unitario, ordem)
            VALUES (${peca.id}, ${m.nome}, ${m.quantidade}, ${m.unidade}, ${m.custoUnitario}, ${i})
          `
        )
      )
    }
    res.status(201).json({ ...peca, materiais })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar peça' })
  }
})

// PUT /api/pecas/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const {
    nome, categoria, descricao = '', receita = '', imagemBase64 = null,
    precoVenda = 0, visivelCatalogo = true, materiais = []
  } = req.body
  if (!nome || !categoria) return res.status(400).json({ error: 'nome e categoria são obrigatórios' })

  try {
    const rows = await sql`
      UPDATE pecas
      SET nome = ${nome},
          categoria = ${categoria},
          descricao = ${descricao},
          receita = ${receita},
          imagem_base64 = ${imagemBase64},
          preco_venda = ${precoVenda},
          visivel_catalogo = ${visivelCatalogo},
          atualizada_em = NOW()
      WHERE id = ${id}
      RETURNING id, nome, categoria, descricao, receita,
                imagem_base64 AS "imagemBase64",
                preco_venda::float AS "precoVenda",
                visivel_catalogo AS "visivelCatalogo",
                criada_em AS "criadaEm",
                atualizada_em AS "atualizadaEm"
    `
    if (rows.length === 0) return res.status(404).json({ error: 'Peça não encontrada' })

    await sql`DELETE FROM materiais WHERE peca_id = ${id}`
    if (materiais.length > 0) {
      await Promise.all(
        materiais.map((m, i) =>
          sql`
            INSERT INTO materiais (peca_id, nome, quantidade, unidade, custo_unitario, ordem)
            VALUES (${id}, ${m.nome}, ${m.quantidade}, ${m.unidade}, ${m.custoUnitario}, ${i})
          `
        )
      )
    }
    res.json({ ...rows[0], materiais })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar peça' })
  }
})

// DELETE /api/pecas/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const rows = await sql`DELETE FROM pecas WHERE id = ${id} RETURNING id`
    if (rows.length === 0) return res.status(404).json({ error: 'Peça não encontrada' })
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao excluir peça' })
  }
})

export default router
