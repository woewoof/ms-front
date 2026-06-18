import { useEffect, useState } from 'react'
import api from '../api/api'

export default function Reasignacion() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  // 📌 CARGAR
  const cargar = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get('/reasignaciones')

      const body = res.data?.data ?? res.data

      setData(Array.isArray(body) ? body : [])

    } catch (err) {
      setError('No se pudo conectar al BFF')

      setData([
        {
          id: 1,
          estado: 'PROCESADA',
          descripcion: 'Reasignación automática (mock)'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // 📌 PROCESAR
  const procesar = async () => {
    try {
      setProcesando(true)
      setMensaje(null)

      await api.post('/reasignaciones', {
        citaId: 1,
        pacienteCanceladorId: 1,
        motivoCancelacion: 'Imprevisto del paciente'
      })

      setMensaje('✔ Reasignación ejecutada correctamente')

      await cargar()

      setTimeout(() => setMensaje(null), 3000)

    } catch (err) {
      setError('Error al procesar reasignación')
    } finally {
      setProcesando(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Reasignación
      </h1>

      {/* BOTÓN */}
      <button
        onClick={procesar}
        disabled={procesando}
        className="bg-blue-700 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {procesando ? 'Procesando...' : 'Procesar Reasignación'}
      </button>

      {/* MENSAJES */}
      {mensaje && (
        <p className="text-green-600 mb-2">{mensaje}</p>
      )}

      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow">

        {loading && <p className="p-4">Cargando...</p>}

        {!loading && (
          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left">Estado</th>
                <th className="text-left">Descripción</th>
              </tr>
            </thead>

            <tbody>
              {data.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">

                  <td className="p-3 font-mono text-gray-500">
                    #{r.id}
                  </td>

                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                      {r.estado}
                    </span>
                  </td>

                  <td className="text-gray-600">
                    {r.descripcion}
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