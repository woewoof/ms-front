import { useEffect, useState } from 'react'
import api from '../api/api'

export default function Citas() {
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargar = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get('/citas')
      const data = res.data?.data ?? res.data

      setCitas(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Error conectando con BFF')
      setCitas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Citas Médicas</h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-amber-600">{error}</p>}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-3">#{c.id}</td>
                <td>{c.pacienteId}</td>
                <td>{c.fecha}</td>
                <td>{c.hora}</td>
                <td>{c.nombreMedico}</td>
                <td>{c.especialidad}</td>
                <td>{c.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}