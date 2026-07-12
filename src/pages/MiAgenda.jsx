import { useEffect, useState } from 'react'
import api from '../api/api'
import { obtenerUsuario } from '../auth/auth'

export default function MiAgenda() {
  const usuario = obtenerUsuario()
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargar = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get('/citas/medico', {
        params: { nombreMedico: usuario.nombre }
      })
      const body = res.data?.data ?? res.data
      setCitas(Array.isArray(body) ? body : [])
    } catch (err) {
      setError('No se pudo cargar tu agenda')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Mi Agenda</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="bg-white rounded-xl shadow">
        {loading && <p className="p-4">Cargando...</p>}

        {!loading && citas.length === 0 && (
          <p className="p-4 text-gray-500">No tienes citas asignadas.</p>
        )}

        {!loading && citas.length > 0 && (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left">Hora</th>
                <th className="text-left">Paciente</th>
                <th className="text-left">Especialidad</th>
                <th className="text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.fecha}</td>
                  <td>{c.hora}</td>
                  <td>#{c.pacienteId}</td>
                  <td>{c.especialidad}</td>
                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}