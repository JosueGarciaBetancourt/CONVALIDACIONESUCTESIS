import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CareersManagement } from "@/components/careers/careers-management"

export const metadata = {
  title: "Carreras | Sistema de Convalidaciones",
  description: "Gestión de carreras para el sistema de convalidaciones",
}

export default function CareersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gestión de Carreras"
        text="Administre las carreras universitarias para el proceso de convalidación"
      />
      <div className="grid gap-6">
        <CareersManagement />
      </div>
    </DashboardShell>
  )
}
