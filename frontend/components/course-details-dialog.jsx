"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, GraduationCap, ListChecks } from "lucide-react"

export function CourseDetailsDialog({ course, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                {course.code} - {course.name}
              </span>
              {course.active ? (
                <Badge
                  variant="outline"
                  className="bg-[#00C896]/10 text-[#00C896] border-[#00C896]/30 dark:bg-[#00C896]/10 dark:text-[#00C896] dark:border-[#00C896]/30"
                >
                  Activo
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                >
                  Inactivo
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Datos básicos del curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Código:</p>
                  <p className="text-sm">{course.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Nombre:</p>
                  <p className="text-sm">{course.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Créditos:</p>
                  <p className="text-sm">{course.credits}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Departamento:</p>
                  <p className="text-sm">{course.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="syllabus">Sumilla</TabsTrigger>
              <TabsTrigger value="topics">Temas</TabsTrigger>
              <TabsTrigger value="bibliography">Bibliografía</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Descripción del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line">{course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Sumilla del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line">{course.syllabus}</p>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Resultados de Aprendizaje
                    </h4>
                    <p className="text-sm whitespace-pre-line">{course.learningOutcomes}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    Temas del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="text-sm">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bibliography" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Bibliografía
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.bibliography.map((book, index) => (
                      <li key={index} className="text-sm">
                        {book}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
