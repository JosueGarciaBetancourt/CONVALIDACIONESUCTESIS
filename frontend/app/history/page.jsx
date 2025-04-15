import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ValidationHistory } from "@/components/history/validation-history"

export const metadata = {
  title: "Historial | Sistema de Convalidaciones",
  description: "Historial de convalidaciones realizadas",
}

export default function HistoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Historial de Convalidaciones"
        text="Consulte el historial de convalidaciones realizadas"
      />
      <div className="grid gap-6">
        <ValidationHistory />
      </div>
    </DashboardShell>
  )
}
