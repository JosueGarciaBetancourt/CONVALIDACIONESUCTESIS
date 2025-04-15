import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ValidationReview } from "@/components/validations/validation-review"

export const metadata = {
  title: "Revisión de Convalidación | Sistema de Convalidaciones",
  description: "Revisar y aprobar convalidaciones de cursos",
}

export default function ValidationReviewPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Revisión de Convalidación"
        text="Revise las sugerencias generadas por el sistema y apruebe o rechace cada curso"
      />
      <div className="grid gap-6">
        <ValidationReview />
      </div>
    </DashboardShell>
  )
}
