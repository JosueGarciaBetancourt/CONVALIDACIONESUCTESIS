import { Link } from "react-router-dom"

// Página de historial
const HistoryPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historial de Validaciones</h1>
        <p className="text-muted-foreground">Revisa el historial de validaciones realizadas</p>
      </div>
      <div className="rounded-lg border bg-card shadow">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Validaciones</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
            />
            <select className="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800">
              <option value="all">Todos los estados</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Estudiante</th>
                <th className="px-4 py-3">Universidad</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <td className="px-4 py-3">VAL-001</td>
                <td className="px-4 py-3">Ana García</td>
                <td className="px-4 py-3">Universidad Nacional</td>
                <td className="px-4 py-3">15/05/2023</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Aprobada
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link to="/validations/report/VAL-001" className="text-blue-600 hover:underline dark:text-blue-400">
                    Ver reporte
                  </Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <td className="px-4 py-3">VAL-002</td>
                <td className="px-4 py-3">Carlos Pérez</td>
                <td className="px-4 py-3">Universidad Autónoma</td>
                <td className="px-4 py-3">14/05/2023</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                    Rechazada
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link to="/validations/report/VAL-002" className="text-blue-600 hover:underline dark:text-blue-400">
                    Ver reporte
                  </Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <td className="px-4 py-3">VAL-003</td>
                <td className="px-4 py-3">María López</td>
                <td className="px-4 py-3">Universidad Tecnológica</td>
                <td className="px-4 py-3">13/05/2023</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    En revisión
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link to="/validations/review/VAL-003" className="text-blue-600 hover:underline dark:text-blue-400">
                    Revisar
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Mostrando 1-3 de 3 resultados</div>
          <div className="flex space-x-2">
            <button
              className="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
              disabled
            >
              Anterior
            </button>
            <button
              className="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
              disabled
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage