import { useEffect, useState } from 'react'
import api from '../api/api'

export default function Dashboard() {
  const [lista, setLista] = useState([])
  const [reasignaciones, setReasignaciones] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try {
      setLoading(true)

      const [l, r] = await Promise.all([
        api.get('/lista-espera'),
        api.get('/reasignaciones')
      ])

      const listaBody = l.data?.data ?? l.data
      const reasigBody = r.data?.data ?? r.data

      setLista(Array.isArray(listaBody) ? listaBody : [])
      setReasignaciones(Array.isArray(reasigBody) ? reasigBody : [])

    } catch (err) {
      setLista([])
      setReasignaciones([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const enEspera = lista.length
  const reasig = reasignaciones.length
  const urgentes = lista.filter(x => x.prioridad === 'ALTA').length

  const cards = [
    {
      titulo: 'En Espera',
      valor: enEspera,
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      titulo: 'Urgentes',
      valor: urgentes,
      color: 'from-red-500 to-red-700',
    },
    {
      titulo: 'Reasignadas',
      valor: reasig,
      color: 'from-purple-500 to-purple-700',
    },
  ]

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Panel en tiempo real del sistema RedNorte
      </p>

      {loading && <p>Cargando datos...</p>}

      {!loading && (
        <>
          {/* CARDS REALES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {cards.map(card => (
              <div
                key={card.titulo}
                className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-3xl shadow-lg`}
              >
                <p className="text-sm opacity-80">{card.titulo}</p>
                <h2 className="text-4xl font-bold">{card.valor}</h2>
              </div>
            ))}
          </div>

          {/* PANEL INFO */}
          <div className="card-rednorte">
            <h2 className="text-xl font-semibold mb-3">
              Estado del sistema
            </h2>

            <p className="text-gray-500">
              Total en lista de espera: {enEspera} pacientes activos.
              Actualmente hay {urgentes} casos urgentes.
            </p>
          </div>
        </>
      )}

    </div>
  )
}