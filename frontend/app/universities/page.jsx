import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UniversitiesManagement } from "@/components/universities/universities-management"

export const metadata = {
  title: "Universidades | Sistema de Convalidaciones",
  description: "Gestión de universidades para el sistema de convalidaciones",
}

export default function UniversitiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestión de Universidades"
        text="Administre las universidades para el proceso de convalidación"
      />
      <div className="grid gap-6">
        <UniversitiesManagement />
      </div>
    </DashboardShell>
  )
}
