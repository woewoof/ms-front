import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'

export default function Registro() {
  const navigate = useNavigate()
  const [rut, setRut] = useState('')
  const [nombre, setNombre] = useState('')
  const [contacto, setContacto] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [ok, setOk] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      const res = await api.post('/auth/registro-paciente', {
        rut, nombre, contacto, username, password
      })
      const body = res.data
      if (body.success) {
        setOk(true)
        setTimeout(() => navigate('/login'), 1500)
      } else {
        setError(body.message || 'No se pudo crear la cuenta')
      }
    } catch (err) {
      setError('No se pudo crear la cuenta. Revisa los datos.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={enviar} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Crear cuenta</h1>

        {ok && <p className="text-green-600 text-sm mb-4">Cuenta creada. Redirigiendo al login...</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label className="block text-sm text-gray-600 mb-1">RUT</label>
        <input type="text" value={rut} onChange={e => setRut(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />

        <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />

        <label className="block text-sm text-gray-600 mb-1">Contacto (email o teléfono)</label>
        <input type="text" value={contacto} onChange={e => setContacto(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />

        <label className="block text-sm text-gray-600 mb-1">Usuario</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4" required />

        <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6" required />

        <button type="submit" disabled={enviando}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50">
          {enviando ? 'Creando...' : 'Crear cuenta'}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-700">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}