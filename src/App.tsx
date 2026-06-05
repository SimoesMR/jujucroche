import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { CatalogoPage } from '@/pages/CatalogoPage'
import { LoginPage } from '@/pages/LoginPage'
import { ListaPage } from '@/pages/ListaPage'
import { NovaPecaPage } from '@/pages/NovaPecaPage'
import { EditarPecaPage } from '@/pages/EditarPecaPage'
import { DetalhePage } from '@/pages/DetalhePage'

// Layout da área admin (header + conteúdo)
function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <Header />
      <Routes>
        <Route index element={<Navigate to="pecas" replace />} />
        <Route path="pecas" element={<ListaPage />} />
        <Route path="nova" element={<NovaPecaPage />} />
        <Route path="peca/:id" element={<DetalhePage />} />
        <Route path="editar/:id" element={<EditarPecaPage />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<CatalogoPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
