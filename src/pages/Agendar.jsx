import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { obtenerUsuario } from '../auth/auth'

export default function Agendar() {
  const usuario = obtenerUsuario()
  const navigate = useNavigate()

  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [nombreMedico, setNombreMedico] = useState('')
  const [centroSalud, setCentroSalud] = useState('')
  const [motivo, setMotivo] = useState('')

  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      const res = await api.post('/citas', {
        pacienteId: usuario.pacienteId,
        fecha,
        hora,
        especialidad,
        nombreMedico,
        centroSalud,
        motivo
      })
      const body = res.data

      if (body.success) {
        navigate('/mis-citas')
      } else {
        setError(body.message || 'No se pudo agendar la cita')
      }
    } catch (err) {
      setError('No se pudo agendar. Revisa los datos e intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Agendar Cita</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={enviar} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Fecha</label>
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Hora</label>
          <input type="time" value={hora} onChange={e => setHora(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Especialidad</label>
          <input type="text" value={especialidad} onChange={e => setEspecialidad(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Médico</label>
          <input type="text" value={nombreMedico} onChange={e => setNombreMedico(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Centro de salud</label>
          <input type="text" value={centroSalud} onChange={e => setCentroSalud(e.target.value)}
            className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Motivo</label>
          <input type="text" value={motivo} onChange={e => setMotivo(e.target.value)}
            className="w-full border rounded px-3 py-2" />
        </div>

        <button type="submit" disabled={enviando}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50">
          {enviando ? 'Agendando...' : 'Agendar'}
        </button>
      </form>
    </div>
  )
}