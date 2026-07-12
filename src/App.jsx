import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { estaLogueado } from './auth/auth'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListaEspera from './pages/ListaEspera'
import Reasignacion from './pages/Reasignacion'
import Pacientes from './pages/Pacientes'
import Citas from './pages/Citas'

// Envuelve las paginas privadas: exige sesion y muestra el Navbar
function Privada({ children }) {
  if (!estaLogueado()) {
    return <Navigate to="/login" replace />
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Privada><Dashboard /></Privada>} />
        <Route path="/lista-espera" element={<Privada><ListaEspera /></Privada>} />
        <Route path="/solicitudes" element={<Privada><ListaEspera /></Privada>} />
        <Route path="/reasignacion" element={<Privada><Reasignacion /></Privada>} />
        <Route path="/pacientes" element={<Privada><Pacientes /></Privada>} />
        <Route path="/citas" element={<Privada><Citas /></Privada>} />
      </Routes>
    </BrowserRouter>
  )
}