import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Dashboard from './pages/Dashboard'
import ListaEspera from './pages/ListaEspera'
import Reasignacion from './pages/Reasignacion'
import Pacientes from './pages/Pacientes'
import Citas from './pages/Citas'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/lista-espera" element={<ListaEspera />} />
        <Route path="/solicitudes" element={<ListaEspera />} />

        <Route path="/reasignacion" element={<Reasignacion />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>

    </BrowserRouter>
  )
}