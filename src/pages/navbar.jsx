import { Link } from 'react-router-dom'

export default function Navbar() {
  const links = [
    { id: 'dashboard', nombre: 'Dashboard', path: '/' },
    { id: 'pacientes', nombre: 'Pacientes', path: '/pacientes' },
    { id: 'lista-espera', nombre: 'Lista Espera', path: '/lista-espera' },
    { id: 'reasignacion', nombre: 'Reasignación', path: '/reasignacion' },
    { id: 'citas', nombre: 'Citas', path: '/citas' },
  ]

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between py-4">

          <h1 className="text-2xl font-bold">RedNorte</h1>

          <div className="flex gap-3 flex-wrap">
            {links.map(link => (
              <Link
                key={link.id}
                to={link.path}
                className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600"
              >
                {link.nombre}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  )
}