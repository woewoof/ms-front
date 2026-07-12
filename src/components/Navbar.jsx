// Navbar principal del sistema RedNorte
// Contiene el logo, los enlaces de navegación y la sesión del usuario
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { obtenerUsuario, cerrarSesion } from '../auth/auth'

const links = [
  { to: '/',            label: 'Dashboard' },
  { to: '/pacientes',   label: 'Pacientes' },
  { to: '/citas',       label: 'Citas' },
  { to: '/solicitudes', label: 'Lista de Espera' },
  { to: '/reasignacion',label: 'Reasignación' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const usuario = obtenerUsuario()
  const [menuOpen, setMenuOpen] = useState(false)

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-blue-800 font-bold text-lg px-3 py-1 rounded-lg">
            RN
          </div>
          <span className="text-xl font-bold tracking-wide">RedNorte</span>
        </div>

        {/* Zona derecha escritorio */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium hover:text-blue-200 transition-colors ${
                location.pathname === link.to
                  ? 'text-blue-200 border-b-2 border-blue-200 pb-1'
                  : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {usuario && (
            <div className="flex items-center gap-3 pl-4 border-l border-blue-600">
              <span className="text-sm text-blue-100">Hola, {usuario.nombre}</span>
              <button
                onClick={salir}
                className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
              >
                Salir
              </button>
            </div>
          )}
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 px-4 pb-4 flex flex-col gap-3">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {usuario && (
            <button
              onClick={salir}
              className="text-left text-white text-sm bg-blue-700 px-3 py-2 rounded"
            >
              Salir ({usuario.nombre})
            </button>
          )}
        </div>
      )}
    </nav>
  )
}