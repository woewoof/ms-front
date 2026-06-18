// Navbar principal del sistema RedNorte
// Contiene el logo y los enlaces de navegación
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Dashboard' },
  { to: '/pacientes',   label: 'Pacientes' },
  { to: '/citas',       label: 'Citas' },
  { to: '/solicitudes',label: 'Lista de Espera' },
  { to: '/reasignacion',label: 'Reasignación' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Links escritorio */}
        <div className="hidden md:flex gap-6">
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
        </div>
      )}
    </nav>
  )
}
