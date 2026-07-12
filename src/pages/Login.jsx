import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { guardarUsuario } from '../auth/auth'
import { guardarUsuario, rutaPorRol } from '../auth/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const enviar = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)

    try {
      const res = await api.post('/auth/login', { username, password })
      const body = res.data

      if (body.success) {
        guardarUsuario(body.data)
        navigate(rutaPorRol(body.data.rol))
      } else {
        setError(body.message || 'No se pudo iniciar sesion')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={enviar}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          RedNorte — Iniciar sesión
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label className="block text-sm text-gray-600 mb-1">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
          required
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50"
        >
          {cargando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}