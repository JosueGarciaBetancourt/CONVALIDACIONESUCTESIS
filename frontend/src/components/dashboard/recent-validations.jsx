import { Link } from "react-router-dom"
import { formatDate } from "../../lib/utils"

export function RecentValidations() {
  // Mock data
  const validations = [
    {
      id: "1",
      student: "Juan Pérez",
      university: "Universidad Nacional",
      status: "Completada",
      date: "2023-11-15T10:30:00",
    },
    {
      id: "2",
      student: "María López",
      university: "Universidad Católica",
      status: "Pendiente",
      date: "2023-11-14T14:45:00",
    },
    {
      id: "3",
      student: "Carlos Rodríguez",
      university: "Universidad de Lima",
      status: "Completada",
      date: "2023-11-12T09:15:00",
    },
  ]

  return (
    <div className="rounded-xl border bg-card">
      <div className="p-6">
        <h3 className="text-lg font-medium">Validaciones recientes</h3>
      </div>
      <div className="px-6">
        <div className="divide-y rounded-md border">
          {validations.map((validation) => (
            <div key={validation.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{validation.student}</p>
                <p className="text-sm text-muted-foreground">{validation.university}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">{formatDate(validation.date)}</div>
                <Link
                  to={`/validations/review/${validation.id}`}
                  className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <Link to="/history" className="text-sm font-medium text-primary hover:underline">
          Ver todas las validaciones
        </Link>
      </div>
    </div>
  )
}

export default RecentValidations