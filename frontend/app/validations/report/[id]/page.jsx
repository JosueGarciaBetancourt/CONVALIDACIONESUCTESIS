import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DetailedValidationReport } from "@/components/validations/detailed-validation-report"

export const metadata = {
  title: "Reporte Detallado de Convalidación | Sistema de Convalidaciones",
  description: "Reporte detallado de convalidación de cursos con justificaciones",
}

export default function DetailedValidationReportPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reporte Detallado de Convalidación"
        text="Reporte completo con justificaciones para cada curso convalidado"
      />
      <div className="grid gap-6">
        <DetailedValidationReport />
      </div>
    </DashboardShell>
  )
}
