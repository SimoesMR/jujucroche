import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body

  if (!usuario || !senha) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' })
  }

  if (usuario !== process.env.ADMIN_USER || senha !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '24h' })
  res.json({ token })
})

export default router
