import Link from "next/link"
// Componente de validaciones recientes
const RecentValidations = () => {
  // Datos de ejemplo
  const validations = [
    {
      id: "VAL-001",
      student: "Ana García",
      university: "Universidad Nacional",
      status: "Aprobada",
      date: "2023-05-15",
    },
    {
      id: "VAL-002",
      student: "Carlos Pérez",
      university: "Universidad Autónoma",
      status: "Rechazada",
      date: "2023-05-14",
    },
    {
      id: "VAL-003",
      student: "María López",
      university: "Universidad Tecnológica",
      status: "En revisión",
      date: "2023-05-13",
    },
    {
      id: "VAL-004",
      student: "Juan Rodríguez",
      university: "Universidad Central",
      status: "Aprobada",
      date: "2023-05-12",
    },
    {
      id: "VAL-005",
      student: "Laura Martínez",
      university: "Universidad del Este",
      status: "En revisión",
      date: "2023-05-11",
    },
  ]

  // Función para obtener la clase de estado
  const getStatusClass = (status) => {
    switch (status) {
      case "Aprobada":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Rechazada":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
  }

  return (
    <div className="rounded-lg border bg-card shadow">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-semibold">Validaciones Recientes</h3>
        <Link to="/history" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Ver todas
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Estudiante</th>
              <th className="px-4 py-3">Universidad</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {validations.map((validation, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm">{validation.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{validation.student}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{validation.university}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(validation.status)}`}>
                    {validation.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{validation.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Link
                    to={`/validations/report/${validation.id}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
