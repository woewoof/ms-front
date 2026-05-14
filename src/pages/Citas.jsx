import { useState } from 'react'

export default function Citas() {
  const [citas] = useState([
    { id: 1, estado: 'PENDIENTE', tipo: 'CONSULTA' },
    { id: 2, estado: 'CONFIRMADA', tipo: 'CIRUGIA' }
  ])

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Citas Médicas
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {citas.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-3">#{c.id}</td>
                <td>{c.tipo}</td>
                <td>{c.estado}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}