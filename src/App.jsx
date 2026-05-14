import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Dashboard from './pages/Dashboard'
import ListaEspera from './pages/ListaEspera'
import Reasignacion from './pages/Reasignacion'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lista-espera" element={<ListaEspera />} />
        <Route path="/reasignacion" element={<Reasignacion />} />
      </Routes>
    </BrowserRouter>
  )
}