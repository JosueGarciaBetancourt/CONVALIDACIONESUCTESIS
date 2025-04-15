"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, Save } from "lucide-react"
import { StudentSummary } from "@/components/validations/student-summary"

export function ValidationReport() {
  const router = useRouter()

  const approvedCourses = [
    {
      id: 1,
      originalCode: "CS101",
      originalName: "Introducción a la Programación",
      targetCode: "INF101",
      targetName: "Fundamentos de Programación",
      similarity: 92,
      credits: 4,
    },
    {
      id: 2,
      originalCode: "CS102",
      originalName: "Estructuras de Datos",
      targetCode: "INF102",
      targetName: "Estructuras de Datos y Algoritmos",
      similarity: 88,
      credits: 4,
    },
    {
      id: 5,
      originalCode: "CS301",
      originalName: "Ingeniería de Software",
      targetCode: "INF301",
      targetName: "Ingeniería de Software",
      similarity: 95,
      credits: 4,
    },
    {
      id: 8,
      originalCode: "CS402",
      originalName: "Sistemas Operativos",
      targetCode: "INF402",
      targetName: "Sistemas Operativos",
      similarity: 89,
      credits: 3,
    },
  ]

  const rejectedCourses = [
    {
      id: 6,
      originalCode: "CS302",
      originalName: "Inteligencia Artificial",
      targetCode: "INF302",
      targetName: "Inteligencia Artificial",
      similarity: 78,
      credits: 4,
    },
    {
      id: 7,
      originalCode: "CS401",
      originalName: "Redes de Computadoras",
      targetCode: "INF401",
      targetName: "Redes y Comunicaciones",
      similarity: 65,
      credits: 3,
    },
  ]

  const totalCredits = approvedCourses.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reporte de Convalidación: VAL-2023-0125</h2>
          <p className="text-muted-foreground">Generado el 12 de abril de 2023</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <StudentSummary />

      <Card>
        <CardHeader>
          <CardTitle>Cursos Convalidados</CardTitle>
          <CardDescription>Listado de cursos aprobados para convalidación</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código Original</TableHead>
                <TableHead>Curso Original</TableHead>
                <TableHead>Código Equivalente</TableHead>
                <TableHead>Curso Equivalente</TableHead>
                <TableHead className="text-center">Similitud</TableHead>
                <TableHead className="text-center">Créditos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.originalCode}</TableCell>
                  <TableCell>{course.originalName}</TableCell>
                  <TableCell className="font-medium">{course.targetCode}</TableCell>
                  <TableCell>{course.targetName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {course.similarity}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5} className="text-right font-bold">
                  Total de Créditos Convalidados:
                </TableCell>
                <TableCell className="text-center font-bold">{totalCredits}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cursos Rechazados</CardTitle>
          <CardDescription>Listado de cursos rechazados para convalidación</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código Original</TableHead>
                <TableHead>Curso Original</TableHead>
                <TableHead>Código Propuesto</TableHead>
                <TableHead>Curso Propuesto</TableHead>
                <TableHead className="text-center">Similitud</TableHead>
                <TableHead className="text-center">Créditos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rejectedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.originalCode}</TableCell>
                  <TableCell>{course.originalName}</TableCell>
                  <TableCell className="font-medium">{course.targetCode}</TableCell>
                  <TableCell>{course.targetName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {course.similarity}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Firma y Aprobación</CardTitle>
          <CardDescription>Información de aprobación del proceso de convalidación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Responsable de Convalidación:</p>
              <p className="text-sm">Admin Matrículas</p>
              <p className="text-sm text-muted-foreground">admin.matriculas@universidad.edu</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Fecha de Aprobación:</p>
              <p className="text-sm">12 de abril de 2023</p>
              <p className="text-sm text-muted-foreground">10:45 AM</p>
            </div>
          </div>
          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Este documento certifica que los cursos listados como convalidados han sido aprobados por el área de
              matrículas y serán registrados en el historial académico del estudiante.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={() => router.push("/validations")}>
            Volver a Convalidaciones
          </Button>
          <Button onClick={() => router.push("/dashboard")}>
            <Save className="mr-2 h-4 w-4" />
            Guardar y Finalizar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
