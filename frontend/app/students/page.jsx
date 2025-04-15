// Eliminar la importación de Metadata
// Eliminada importación de Metadata
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StudentsManagement } from "@/components/students/students-management"

// Eliminar la definición de metadata con tipos
export const metadata = {
  title: "Estudiantes | Sistema de Convalidaciones",
  description: "Gestión de estudiantes para el sistema de convalidaciones",
}

export default function StudentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Gestión de Estudiantes" text="Administre los estudiantes registrados en el sistema" />
      <div className="grid gap-6">
        <StudentsManagement />
      </div>
    </DashboardShell>
  )
}
