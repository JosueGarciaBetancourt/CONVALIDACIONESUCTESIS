"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { CoursesList } from "@/components/courses/courses-list"
import { CourseForm } from "@/components/courses/course-form"
import { useToast } from "@/hooks/use-toast"
import { Course } from "@/types/course"

// Definición de Course eliminada (ahora es un objeto JS normal)

export function CoursesManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "INF101",
      name: "Fundamentos de Programación",
      credits: 4,
      description:
        "Este curso introduce a los estudiantes a los conceptos fundamentales de la programación orientada a objetos. Los estudiantes aprenderán sobre clases, objetos, herencia, polimorfismo y encapsulamiento. El curso también cubre estructuras de control y manejo de excepciones.",
      syllabus:
        "Introducción a la programación, Variables y tipos de datos, Estructuras de control, Funciones, Programación orientada a objetos, Clases y objetos, Herencia y polimorfismo, Manejo de excepciones",
      learningOutcomes:
        "Al finalizar el curso, el estudiante podrá desarrollar aplicaciones de software utilizando los principios de la programación orientada a objetos y aplicando buenas prácticas de diseño de interfaces.",
      topics: [
        "Paradigmas de programación",
        "Clases y objetos",
        "Encapsulamiento y abstracción",
        "Herencia y polimorfismo",
      ],
      bibliography: [
        "Deitel, P., Deitel H. (2016). Java. Como programar. (10.ª ed.). México. Pearson Education.",
        "Schildt, H. (2017). Java: The Complete Reference. (11.° ed.). New York, USA: McGraw-Hill Education",
      ],
      department: "Ingeniería de Software",
      active: true,
    },
    {
      id: "2",
      code: "INF102",
      name: "Estructuras de Datos y Algoritmos",
      credits: 4,
      description:
        "Este curso cubre las estructuras de datos fundamentales y los algoritmos para manipularlas. Se estudian listas, pilas, colas, árboles, grafos y tablas hash, así como algoritmos de búsqueda y ordenamiento.",
      syllabus:
        "Análisis de algoritmos, Recursividad, Estructuras de datos lineales, Estructuras de datos no lineales, Algoritmos de ordenamiento, Algoritmos de búsqueda",
      learningOutcomes:
        "Al finalizar el curso, el estudiante será capaz de seleccionar e implementar las estructuras de datos y algoritmos adecuados para resolver problemas computacionales de manera eficiente.",
      topics: [
        "Análisis de complejidad",
        "Listas, pilas y colas",
        "Árboles y grafos",
        "Tablas hash",
        "Algoritmos de ordenamiento y búsqueda",
      ],
      bibliography: [
        "Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms (3rd ed.). MIT Press.",
        "Sedgewick, R., & Wayne, K. (2011). Algorithms (4th ed.). Addison-Wesley Professional.",
      ],
      department: "Ingeniería de Software",
      active: true,
    },
    {
      id: "3",
      code: "INF201",
      name: "Análisis y Diseño de Algoritmos",
      credits: 4,
      description:
        "Este curso profundiza en el análisis y diseño de algoritmos eficientes para resolver problemas computacionales complejos. Se estudian técnicas de diseño como divide y vencerás, programación dinámica, algoritmos voraces y backtracking.",
      syllabus:
        "Análisis de complejidad, Técnicas de diseño de algoritmos, Algoritmos de grafos, Algoritmos de optimización",
      learningOutcomes:
        "Al finalizar el curso, el estudiante será capaz de analizar, diseñar e implementar algoritmos eficientes para resolver problemas computacionales complejos.",
      topics: [
        "Análisis de complejidad avanzado",
        "Divide y vencerás",
        "Programación dinámica",
        "Algoritmos voraces",
        "Backtracking",
      ],
      bibliography: [
        "Kleinberg, J., & Tardos, É. (2005). Algorithm Design. Pearson Education.",
        "Dasgupta, S., Papadimitriou, C. H., & Vazirani, U. V. (2008). Algorithms. McGraw-Hill Education.",
      ],
      department: "Ingeniería de Software",
      active: true,
    },
  ])
  const [editingCourse, setEditingCourse] = (useState < Course) | (null > null)
  const { toast } = useToast()

  const handleAddCourse = (course: Omit<Course, "id">) => {
    const newCourse = {
      ...course,
      id: Math.random().toString(36).substring(7),
    }
    setCourses([...courses, newCourse])
    setActiveTab("list")
    toast({
      title: "Curso agregado",
      description: `El curso ${course.code} - ${course.name} ha sido agregado correctamente.`,
    })
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setActiveTab("edit")
  }

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)))
    setActiveTab("list")
    setEditingCourse(null)
    toast({
      title: "Curso actualizado",
      description: `El curso ${updatedCourse.code} - ${updatedCourse.name} ha sido actualizado correctamente.`,
    })
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
    toast({
      title: "Curso eliminado",
      description: "El curso ha sido eliminado correctamente.",
    })
  }

  const handleToggleStatus = (id: string) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, active: !course.active } : course)))
    const course = courses.find((course) => course.id === id)
    toast({
      title: course?.active ? "Curso desactivado" : "Curso activado",
      description: `El curso ${course?.code} - ${course?.name} ha sido ${course?.active ? "desactivado" : "activado"} correctamente.`,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Cursos Locales</CardTitle>
          <CardDescription>Gestione los cursos disponibles para convalidación</CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditingCourse(null)
            setActiveTab("add")
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Curso
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Cursos</TabsTrigger>
            <TabsTrigger value="add">Agregar Curso</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingCourse}>
              Editar Curso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <CoursesList
              courses={courses}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              onToggleStatus={handleToggleStatus}
            />
          </TabsContent>

          <TabsContent value="add">
            <CourseForm onSubmit={handleAddCourse} />
          </TabsContent>

          <TabsContent value="edit">
            {editingCourse && <CourseForm initialData={editingCourse} onSubmit={handleUpdateCourse} isEditing={true} />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
