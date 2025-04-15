import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentValidations } from "@/components/dashboard/recent-validations"

export const metadata = {
  title: "Dashboard | Sistema de Convalidaciones",
  description: "Panel de control del sistema de convalidaciones",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Panel de Control" text="Gestione las convalidaciones de cursos para estudiantes" />
      <div className="grid gap-6">
        <DashboardStats />
        <RecentValidations />
      </div>
    </DashboardShell>
  )
}
