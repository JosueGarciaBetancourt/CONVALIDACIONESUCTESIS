import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export function StudentSummary() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Información del Estudiante</CardTitle>
        <CardDescription>Datos del estudiante para el proceso de convalidación</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Carlos Mendoza</p>
              <p className="text-sm text-muted-foreground">Código: 20210389</p>
              <p className="text-sm text-muted-foreground">carlos.mendoza@ejemplo.com</p>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm font-medium">Universidad de Origen:</p>
              <p className="text-sm">Universidad Nacional Mayor de San Marcos</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm font-medium">Carrera:</p>
              <p className="text-sm">Ciencias de la Computación</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="text-sm font-medium">Semestre de Ingreso:</p>
              <p className="text-sm">2023-2</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
