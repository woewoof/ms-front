import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { obtenerUsuario, rutaPorRol } from './auth/auth'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListaEspera from './pages/ListaEspera'
import Reasignacion from './pages/Reasignacion'
import Pacientes from './pages/Pacientes'
import Citas from './pages/Citas'
import Agendar from './pages/Agendar'
import MisCitas from './pages/MisCitas'

// Exige sesion y, si se indican roles, que el usuario tenga el rol correcto
function Privada({ children, roles }) {
  const usuario = obtenerUsuario()
  if (!usuario) {
    return <Navigate to="/login" replace />
  }
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to={rutaPorRol(usuario.rol)} replace />
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

        {/* Paciente */}
        <Route path="/mis-citas" element={<Privada roles={['PACIENTE']}><MisCitas /></Privada>} />
        <Route path="/agendar" element={<Privada roles={['PACIENTE']}><Agendar /></Privada>} />

        {/* Admin */}
        <Route path="/" element={<Privada roles={['ADMIN']}><Dashboard /></Privada>} />
        <Route path="/pacientes" element={<Privada roles={['ADMIN']}><Pacientes /></Privada>} />
        <Route path="/citas" element={<Privada roles={['ADMIN']}><Citas /></Privada>} />
        <Route path="/solicitudes" element={<Privada roles={['ADMIN']}><ListaEspera /></Privada>} />
        <Route path="/lista-espera" element={<Privada roles={['ADMIN']}><ListaEspera /></Privada>} />
        <Route path="/reasignacion" element={<Privada roles={['ADMIN']}><Reasignacion /></Privada>} />
      </Routes>
    </BrowserRouter>
  )
}