import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DocumentUploadForm } from "@/components/validations/document-upload-form"

export const metadata = {
  title: "Nueva Convalidación | Sistema de Convalidaciones",
  description: "Crear una nueva solicitud de convalidación",
}

export default function NewValidationPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Nueva Convalidación"
        text="Suba los documentos del estudiante para iniciar el proceso de convalidación"
      />
      <div className="grid gap-6">
        <DocumentUploadForm />
      </div>
    </DashboardShell>
  )
}
