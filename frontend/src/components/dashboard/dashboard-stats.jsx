import { CheckCircle, Clock, FileCheck, Users } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Validaciones",
      value: "12",
      icon: FileCheck,
      description: "Validaciones realizadas",
    },
    {
      title: "Pendientes",
      value: "3",
      icon: Clock,
      description: "Esperando revisión",
    },
    {
      title: "Completadas",
      value: "9",
      icon: CheckCircle,
      description: "Validaciones aprobadas",
    },
    {
      title: "Estudiantes",
      value: "15",
      icon: Users,
      description: "Registrados en el sistema",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{stat.title}</span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default DashboardStats