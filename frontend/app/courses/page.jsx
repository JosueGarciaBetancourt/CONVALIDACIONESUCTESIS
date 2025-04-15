// Eliminada importación de Metadata
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CoursesManagement } from "@/components/courses/courses-management"

export const metadata = {
  title: "Gestión de Cursos | Sistema de Convalidaciones",
  description: "Administración de cursos locales para convalidaciones",
}

export default function CoursesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestión de Cursos"
        text="Administre los cursos locales disponibles para convalidación"
      />
      <div className="grid gap-6">
        <CoursesManagement />
      </div>
    </DashboardShell>
  )
}
