import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CurriculumsManagement } from "@/components/curriculums/curriculums-management"

export const metadata = {
  title: "Mallas Curriculares | Sistema de Convalidaciones",
  description: "Gestión de mallas curriculares para el sistema de convalidaciones",
}

export default function CurriculumsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestión de Mallas Curriculares"
        text="Administre las mallas curriculares disponibles para convalidación"
      />
      <div className="grid gap-6">
        <CurriculumsManagement />
      </div>
    </DashboardShell>
  )
}
