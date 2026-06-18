import { useEffect, useState } from 'react'
import api from '../api/api'

export default function ListaEspera() {

  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarSolicitudes = async () => {

    try {

      setLoading(true)
      setError(null)


      // BFF
      const res = await api.get('/solicitudes')

      // ApiResponseDTO
      const data = res.data?.data ?? []

      setSolicitudes(data)

    } catch (err) {

      console.error(err)

      setError('No se pudo conectar al BFF')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  const colorEstado = (estado) => {

    switch (estado) {

      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800'

      case 'ASIGNADO':
        return 'bg-green-100 text-green-800'

      case 'CANCELADO':
        return 'bg-red-100 text-red-800'

      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const colorPrioridad = (prioridad) => {

    switch (prioridad) {

      case 'URGENTE':
        return 'bg-red-100 text-red-800'

      case 'NORMAL':
        return 'bg-blue-100 text-blue-800'

      case 'BAJA':
        return 'bg-gray-100 text-gray-800'

      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Lista de Espera
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (

        <p>Cargando...</p>

      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 flex justify-between border-b">

            <h2 className="font-semibold">
              Solicitudes ({solicitudes.length})
            </h2>

            <button
              onClick={cargarSolicitudes}
              className="text-blue-600 hover:underline"
            >
              Actualizar
            </button>

          </div>

          <table className="w-full text-sm">

            <thead className="bg-gray-50">

              <tr>
                <th className="p-3">Pos</th>
                <th>Paciente</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Días</th>
                <th>Acción</th>
              </tr>

            </thead>

            <tbody>

              {solicitudes.map((s) => (
                <tr>
                  <td className="p-3">{s.id}</td>
                  <td>Paciente #{s.pacienteId}</td>
                  <td>{s.tipo}</td>

                  <td>

                    <span className={`px-2 py-1 rounded text-xs ${colorPrioridad(s.prioridad)}`}>
                      {s.prioridad}
                    </span>

                  </td>

                  <td>

                    <span className={`px-2 py-1 rounded text-xs ${colorEstado(s.estado)}`}>
                      {s.estado}
                    </span>
                  </td>

                  <td>
                    {s.creadoEn
                      ? new Date(s.creadoEn).toLocaleDateString('es-CL')
                      : '—'}
                  </td>

                  <td>{s.diasEsperaEstimados ?? '—'}</td>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  )
}