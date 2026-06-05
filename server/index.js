import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pecasRouter from './routes/pecas.js'
import authRouter from './routes/auth.js'
import catalogoRouter from './routes/catalogo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/api/auth', authRouter)
app.use('/api/catalogo', catalogoRouter)
app.use('/api/pecas', pecasRouter)

// Em produção: servir o build do React (frontend + backend no mesmo servidor)
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  // React Router: toda rota não-API retorna o index.html
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
