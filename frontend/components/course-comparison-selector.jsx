"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Datos simulados de cursos locales
const localCourses = [
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
]

export function CourseComparisonSelector({ originalCourse, onSelectEquivalent }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { toast } = useToast()

  // Get unique departments
  const departments = Array.from(new Set(localCourses.map((course) => course.department)))

  const filteredCourses = localCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter

    // Solo mostrar cursos activos
    return matchesSearch && matchesDepartment && course.active
  })

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
  }

  const handleConfirmSelection = () => {
    if (selectedCourse) {
      onSelectEquivalent(originalCourse.id, selectedCourse)
      toast({
        title: "Curso equivalente seleccionado",
        description: `Se ha seleccionado ${selectedCourse.code} - ${selectedCourse.name} como equivalente para ${originalCourse.code} - ${originalCourse.name}.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seleccionar Curso Equivalente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Curso Original</Label>
            <div className="rounded-md bg-muted p-2 dark:bg-[#2A2A2A]">
              <p className="text-sm font-medium">
                {originalCourse.code} - {originalCourse.name}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6 mx-4 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <Label>Curso Equivalente</Label>
            <div className="rounded-md bg-muted p-2 dark:bg-[#2A2A2A]">
              {selectedCourse ? (
                <p className="text-sm font-medium">
                  {selectedCourse.code} - {selectedCourse.name}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Seleccione un curso equivalente</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por código o nombre..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full items-center space-x-2 md:w-1/3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los departamentos</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto rounded-md border">
            {filteredCourses.length > 0 ? (
              <div className="divide-y">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex cursor-pointer items-center justify-between p-3 hover:bg-muted ${
                      selectedCourse?.id === course.id ? "bg-muted dark:bg-[#2A2A2A]" : ""
                    }`}
                    onClick={() => handleSelectCourse(course)}
                  >
                    <div>
                      <p className="font-medium">
                        {course.code} - {course.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.department} • {course.credits} créditos
                      </p>
                    </div>
                    {selectedCourse?.id === course.id && (
                      <Badge className="bg-[#00C896] hover:bg-[#00C896] text-white">
                        <Check className="mr-1 h-3 w-3" />
                        Seleccionado
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center">
                <p className="text-sm text-muted-foreground">No se encontraron cursos</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedCourse}
              className="bg-[#00C896] hover:bg-[#00E6AA] text-white"
            >
              Confirmar Selección
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
