"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Info } from "lucide-react"
import { CourseComparisonCard } from "@/components/validations/course-comparison-card"
import { StudentSummary } from "@/components/validations/student-summary"

export function ValidationReview() {
  const [activeTab, setActiveTab] = useState("pending")
  const [courses, setCourses] = useState([
    {
      id: 1,
      originalCode: "CS101",
      originalName: "Introducción a la Programación",
      targetCode: "INF101",
      targetName: "Fundamentos de Programación",
      similarity: 92,
      status: "pending",
    },
    {
      id: 2,
      originalCode: "CS102",
      originalName: "Estructuras de Datos",
      targetCode: "INF102",
      targetName: "Estructuras de Datos y Algoritmos",
      similarity: 88,
      status: "pending",
    },
    {
      id: 3,
      originalCode: "CS201",
      originalName: "Algoritmos Avanzados",
      targetCode: "INF201",
      targetName: "Análisis y Diseño de Algoritmos",
      similarity: 85,
      status: "pending",
    },
    {
      id: 4,
      originalCode: "CS202",
      originalName: "Bases de Datos",
      targetCode: "INF202",
      targetName: "Gestión de Bases de Datos",
      similarity: 90,
      status: "pending",
    },
    {
      id: 5,
      originalCode: "CS301",
      originalName: "Ingeniería de Software",
      targetCode: "INF301",
      targetName: "Ingeniería de Software",
      similarity: 95,
      status: "pending",
    },
    {
      id: 6,
      originalCode: "CS302",
      originalName: "Inteligencia Artificial",
      targetCode: "INF302",
      targetName: "Inteligencia Artificial",
      similarity: 78,
      status: "pending",
    },
    {
      id: 7,
      originalCode: "CS401",
      originalName: "Redes de Computadoras",
      targetCode: "INF401",
      targetName: "Redes y Comunicaciones",
      similarity: 65,
      status: "pending",
    },
    {
      id: 8,
      originalCode: "CS402",
      originalName: "Sistemas Operativos",
      targetCode: "INF402",
      targetName: "Sistemas Operativos",
      similarity: 89,
      status: "pending",
    },
  ])

  const router = useRouter()
  const { toast } = useToast()

  const updateCourseStatus = (id, status) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, status } : course)))
  }

  const handleFinishReview = () => {
    toast({
      title: "Convalidación completada",
      description: "Se ha generado el reporte final de convalidación",
    })
    router.push("/validations/report/VAL-2023-0125")
  }

  const pendingCourses = courses.filter((course) => course.status === "pending")
  const approvedCourses = courses.filter((course) => course.status === "approved")
  const rejectedCourses = courses.filter((course) => course.status === "rejected")

  const progress = Math.round(((approvedCourses.length + rejectedCourses.length) / courses.length) * 100)

  return (
    <div className="grid gap-6">
      <StudentSummary />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Progreso de Revisión</CardTitle>
              <CardDescription>{pendingCourses.length} cursos pendientes de revisión</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {approvedCourses.length} Aprobados
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {rejectedCourses.length} Rechazados
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {pendingCourses.length} Pendientes
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso: {progress}%</span>
              <span>
                {courses.length - pendingCourses.length} de {courses.length} cursos revisados
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cursos a Convalidar</CardTitle>
              <TabsList>
                <TabsTrigger value="pending">Pendientes ({pendingCourses.length})</TabsTrigger>
                <TabsTrigger value="approved">Aprobados ({approvedCourses.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rechazados ({rejectedCourses.length})</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Revise cada curso y apruebe o rechace la convalidación</CardDescription>
          </CardHeader>

          <TabsContent value="pending">
            <CardContent>
              <div className="grid gap-4">
                {pendingCourses.length > 0 ? (
                  pendingCourses.map((course) => (
                    <CourseComparisonCard
                      key={course.id}
                      course={course}
                      onApprove={() => updateCourseStatus(course.id, "approved")}
                      onReject={() => updateCourseStatus(course.id, "rejected")}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">¡Todos los cursos han sido revisados!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">No hay cursos pendientes de revisión</p>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="approved">
            <CardContent>
              <div className="grid gap-4">
                {approvedCourses.length > 0 ? (
                  approvedCourses.map((course) => (
                    <CourseComparisonCard
                      key={course.id}
                      course={course}
                      onApprove={() => {}}
                      onReject={() => updateCourseStatus(course.id, "pending")}
                      isApproved
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                      <Info className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No hay cursos aprobados</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Aún no ha aprobado ningún curso para convalidación
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="rejected">
            <CardContent>
              <div className="grid gap-4">
                {rejectedCourses.length > 0 ? (
                  rejectedCourses.map((course) => (
                    <CourseComparisonCard
                      key={course.id}
                      course={course}
                      onApprove={() => updateCourseStatus(course.id, "pending")}
                      onReject={() => {}}
                      isRejected
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                      <Info className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No hay cursos rechazados</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Aún no ha rechazado ningún curso para convalidación
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" onClick={() => router.push("/validations/new")}>
              Cancelar
            </Button>
            <Button onClick={handleFinishReview} disabled={pendingCourses.length > 0}>
              Finalizar Revisión
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  )
}
