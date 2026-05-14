import { useEffect, useState } from 'react'
import api from '../api/api'

export default function ListaEspera() {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 📌 CARGAR LISTA (SOLO LO QUE EXISTE EN BFF)
  const cargarSolicitudes = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get('/lista-espera')

      // BFF devuelve ApiResponseDTO
      const data = res.data?.data ?? res.data

      setSolicitudes(Array.isArray(data) ? data : [])

    } catch (err) {
      setError('No se pudo conectar al BFF')

      // fallback seguro (solo visual)
      setSolicitudes([
        {
          id: 201,
          posicion: 1,
          paciente: { nombre: 'Carlos Mendoza' },
          especialidad: 'Traumatología',
          prioridad: 'ALTA',
          estado: 'ACTIVO',
          fechaInscripcion: '2026-05-13T12:00:00Z',
          diasEsperaEstimados: 12
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  // 📌 CANCELAR (SOLO FRONT MOCK — porque backend no lo tiene)
  const handleCancelar = (id) => {
    setSolicitudes(prev =>
      prev.map(s =>
        s.id === id ? { ...s, estado: 'CANCELADO' } : s
      )
    )
  }

  // 📌 ESTILOS
  const colorEstado = (estado) => {
    switch (estado) {
      case 'ACTIVO':
        return 'bg-yellow-100 text-yellow-800'
      case 'ASIGNADO':
        return 'bg-green-100 text-green-800'
      case 'CANCELADO':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const colorPrioridad = (p) => {
    switch (p) {
      case 'ALTA':
        return 'bg-red-100 text-red-800'
      case 'MEDIA':
        return 'bg-blue-100 text-blue-800'
      case 'BAJA':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Lista de Espera
      </h1>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Cargando lista de espera...</p>
      )}

      {/* TABLA */}
      {!loading && (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {/* HEADER TABLE */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="font-semibold text-gray-700">
              Solicitudes ({solicitudes.length})
            </h2>

            <button
              onClick={cargarSolicitudes}
              className="text-blue-600 text-sm hover:underline"
            >
              Actualizar
            </button>
          </div>

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Pos</th>
                <th>Paciente</th>
                <th>Especialidad</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Días</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{s.posicion}</td>
                  <td>{s.paciente?.nombre ?? '—'}</td>
                  <td>{s.especialidad}</td>

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
                    {s.fechaInscripcion
                      ? new Date(s.fechaInscripcion).toLocaleDateString('es-CL')
                      : '—'}
                  </td>

                  <td>{s.diasEsperaEstimados ?? '—'}</td>

                  <td>
                    {s.estado !== 'CANCELADO' && (
                      <button
                        onClick={() => handleCancelar(s.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Cancelar
                      </button>
                    )}
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