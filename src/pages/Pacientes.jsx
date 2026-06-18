import { useEffect, useState } from 'react'
import api from '../api/api'

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargar = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get('/pacientes')
      const data = res.data?.data || res.data

      setPacientes(Array.isArray(data) ? data : [])

    } catch (err) {
      setError('Error conectando con BFF')

      setPacientes([
        {
          id: 1,
          nombre: 'Carlos Mendoza',
          rut: '15.432.123-K',
          email: 'carlos@rednorte.cl',
          telefono: '+56988887777'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Pacientes
      </h1>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-amber-600">{error}</p>}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Contacto</th>
              <th>Historial</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">#{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.rut}</td>
                <td>{p.contacto}</td>
                <td>{p.historial}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}