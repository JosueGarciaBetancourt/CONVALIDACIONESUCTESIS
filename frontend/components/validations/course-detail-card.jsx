"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  ListChecks,
  GraduationCap,
  BookMarked,
} from "lucide-react"

export function CourseDetailCard({ course, type }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("justification")

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 85) return "text-green-600 dark:text-green-400"
    if (similarity >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getSimilarityBg = (similarity: number) => {
    if (similarity >= 85) return "bg-green-100 dark:bg-green-900/30"
    if (similarity >= 70) return "bg-yellow-100 dark:bg-yellow-900/30"
    return "bg-red-100 dark:bg-red-900/30"
  }

  // Datos simulados para la comparación de sílabos si no existen
  const syllabusData = course.syllabusComparison || {
    description: {
      original:
        "Este curso introduce a los estudiantes a los conceptos fundamentales de la programación orientada a objetos. Los estudiantes aprenderán sobre clases, objetos, herencia, polimorfismo y encapsulamiento.",
      target:
        "Fundamentos de Programación es un curso que introduce los conceptos básicos de la programación orientada a objetos. Se estudian clases, objetos, herencia, polimorfismo y abstracción.",
      matchPercentage: 90,
    },
    content: {
      original: {
        units: [
          {
            title: "Unidad 1: Introducción a la POO",
            topics: ["Paradigmas de programación", "Fundamentos de POO", "Clases y objetos", "Atributos y métodos"],
            matchPercentage: 95,
          },
          {
            title: "Unidad 2: Herencia y Polimorfismo",
            topics: [
              "Herencia simple y múltiple",
              "Sobrecarga de métodos",
              "Polimorfismo",
              "Clases abstractas e interfaces",
            ],
            matchPercentage: 90,
          },
          {
            title: "Unidad 3: Estructuras de Control",
            topics: [
              "Estructuras condicionales",
              "Estructuras iterativas",
              "Manejo de excepciones",
              "Depuración de código",
            ],
            matchPercentage: 85,
          },
          {
            title: "Unidad 4: Patrones de Diseño",
            topics: [
              "Introducción a patrones",
              "Patrones creacionales",
              "Patrones estructurales",
              "Patrones de comportamiento",
            ],
            matchPercentage: 40,
          },
        ],
      },
      target: {
        units: [
          {
            title: "Unidad 1: Fundamentos de POO",
            topics: ["Paradigmas de programación", "Principios de POO", "Clases y objetos", "Atributos y métodos"],
            matchPercentage: 95,
          },
          {
            title: "Unidad 2: Herencia y Polimorfismo",
            topics: ["Herencia", "Sobrecarga y sobreescritura", "Polimorfismo", "Interfaces"],
            matchPercentage: 90,
          },
          {
            title: "Unidad 3: Control de Flujo",
            topics: [
              "Estructuras condicionales",
              "Estructuras iterativas",
              "Manejo de excepciones",
              "Buenas prácticas",
            ],
            matchPercentage: 85,
          },
          {
            title: "Unidad 4: Aplicaciones Prácticas",
            topics: [
              "Desarrollo de aplicaciones",
              "Integración con bases de datos",
              "Interfaces gráficas",
              "Proyecto final",
            ],
            matchPercentage: 30,
          },
        ],
      },
      overallMatchPercentage: 75,
    },
    learningOutcomes: {
      original: [
        "Comprender los principios de la programación orientada a objetos",
        "Implementar clases y objetos en aplicaciones prácticas",
        "Utilizar herencia y polimorfismo para crear código reutilizable",
        "Aplicar patrones de diseño básicos",
      ],
      target: [
        "Entender los fundamentos de la programación orientada a objetos",
        "Crear clases y objetos para resolver problemas",
        "Implementar herencia y polimorfismo en programas",
        "Desarrollar aplicaciones utilizando los conceptos aprendidos",
      ],
      matchPercentage: 85,
    },
    competencies: {
      original: [
        "Capacidad para diseñar soluciones utilizando POO",
        "Habilidad para implementar código modular y reutilizable",
        "Capacidad para aplicar principios de diseño de software",
        "Habilidad para depurar y optimizar código",
      ],
      target: [
        "Capacidad para diseñar soluciones utilizando POO",
        "Habilidad para implementar código modular y reutilizable",
        "Capacidad para desarrollar aplicaciones completas",
        "Habilidad para trabajar en equipo en proyectos de software",
      ],
      matchPercentage: 75,
    },
    methodology: {
      original: "Clases teóricas, laboratorios prácticos, proyectos individuales y grupales, exposiciones.",
      target: "Clases teórico-prácticas, laboratorios, desarrollo de proyectos, aprendizaje basado en problemas.",
      matchPercentage: 80,
    },
    evaluation: {
      original: "Exámenes parcial y final (40%), prácticas de laboratorio (30%), proyecto (20%), participación (10%).",
      target: "Evaluación continua (30%), exámenes (40%), proyecto final (30%).",
      matchPercentage: 70,
    },
    bibliography: {
      original: [
        "Deitel, H. M., & Deitel, P. J. (2017). Java How to Program, 11th Edition. Pearson.",
        "Eckel, B. (2006). Thinking in Java, 4th Edition. Prentice Hall.",
        "Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). Design Patterns. Addison-Wesley.",
      ],
      target: [
        "Deitel, H. M., & Deitel, P. J. (2017). Java How to Program, 11th Edition. Pearson.",
        "Horstmann, C. S. (2019). Core Java Volume I—Fundamentals, 11th Edition. Prentice Hall.",
        "Bloch, J. (2018). Effective Java, 3rd Edition. Addison-Wesley.",
      ],
      matchPercentage: 60,
    },
  }

  return (
    <Card className={`border-l-4 ${type === "approved" ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardContent className="p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Original Course */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Curso Original</h3>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-semibold">{course.originalCode}</p>
                <p className="text-sm">{course.originalName}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline">{course.originalCredits} créditos</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Nota: {course.originalGrade}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Similarity */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <div
                  className={`flex items-center justify-center rounded-full ${getSimilarityBg(course.similarity)} px-2 py-1`}
                >
                  <span className={`text-sm font-medium ${getSimilarityColor(course.similarity)}`}>
                    {course.similarity}% Similitud
                  </span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>

              <Badge
                variant="outline"
                className={`
                  ${
                    type === "approved"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                `}
              >
                {type === "approved" ? "Aprobado" : "Rechazado"}
              </Badge>
            </div>

            {/* Target Course */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Curso Equivalente</h3>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-semibold">{course.targetCode}</p>
                <p className="text-sm">{course.targetName}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline">{course.targetCredits} créditos</Badge>
                </div>
              </div>
            </div>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-2 w-full">
              {isOpen ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
              {isOpen ? "Ocultar detalles" : "Ver detalles"}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="justification">Justificación</TabsTrigger>
                <TabsTrigger value="content">Contenidos</TabsTrigger>
                <TabsTrigger value="outcomes">Objetivos y Competencias</TabsTrigger>
                <TabsTrigger value="methodology">Metodología y Evaluación</TabsTrigger>
              </TabsList>

              <TabsContent value="justification" className="mt-4 space-y-4">
                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    Justificación
                  </h4>
                  <p className="text-sm">{course.justification}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <h4 className="mb-2 font-medium">Conceptos Clave Coincidentes</h4>
                    <ul className="space-y-1">
                      {course.keyMatches.map((match, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          {match}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {course.keyDifferences && (
                    <div className="rounded-md border p-3">
                      <h4 className="mb-2 font-medium">Diferencias Significativas</h4>
                      <ul className="space-y-1">
                        {course.keyDifferences.map((diff, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            {diff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="content" className="mt-4 space-y-4">
                <h4 className="mb-2 font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Sumilla del Curso
                </h4>
                <div className="rounded-md border p-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <p className="text-sm">{syllabusData.description.original}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <p className="text-sm">{syllabusData.description.target}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.description.matchPercentage)} ${getSimilarityColor(syllabusData.description.matchPercentage)}`}
                    >
                      {syllabusData.description.matchPercentage}%
                    </Badge>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                    Contenidos Temáticos
                  </h4>

                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium">Coincidencia general de contenidos:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.content.overallMatchPercentage)} ${getSimilarityColor(syllabusData.content.overallMatchPercentage)}`}
                    >
                      {syllabusData.content.overallMatchPercentage}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h5 className="mb-2 text-sm font-medium">Curso Original:</h5>
                      <div className="space-y-4">
                        {syllabusData.content.original.units.map((unit, index) => (
                          <div key={index} className="rounded border p-2">
                            <div className="flex items-center justify-between">
                              <h6 className="text-xs font-medium">{unit.title}</h6>
                              <Badge
                                variant="outline"
                                className={`${getSimilarityBg(unit.matchPercentage)} ${getSimilarityColor(unit.matchPercentage)}`}
                              >
                                {unit.matchPercentage}%
                              </Badge>
                            </div>
                            <ul className="mt-1 space-y-1">
                              {unit.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="text-xs">
                                  • {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="mb-2 text-sm font-medium">Curso Equivalente:</h5>
                      <div className="space-y-4">
                        {syllabusData.content.target.units.map((unit, index) => (
                          <div key={index} className="rounded border p-2">
                            <div className="flex items-center justify-between">
                              <h6 className="text-xs font-medium">{unit.title}</h6>
                              <Badge
                                variant="outline"
                                className={`${getSimilarityBg(unit.matchPercentage)} ${getSimilarityColor(unit.matchPercentage)}`}
                              >
                                {unit.matchPercentage}%
                              </Badge>
                            </div>
                            <ul className="mt-1 space-y-1">
                              {unit.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="text-xs">
                                  • {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <BookMarked className="h-4 w-4 text-muted-foreground" />
                    Bibliografía
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.bibliography.original.map((book, index) => (
                          <li key={index} className="text-xs">
                            • {book}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.bibliography.target.map((book, index) => (
                          <li key={index} className="text-xs">
                            • {book}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.bibliography.matchPercentage)} ${getSimilarityColor(syllabusData.bibliography.matchPercentage)}`}
                    >
                      {syllabusData.bibliography.matchPercentage}%
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-4 space-y-4">
                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    Objetivos de Aprendizaje
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.learningOutcomes.original.map((outcome, index) => (
                          <li key={index} className="text-xs">
                            • {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.learningOutcomes.target.map((outcome, index) => (
                          <li key={index} className="text-xs">
                            • {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.learningOutcomes.matchPercentage)} ${getSimilarityColor(syllabusData.learningOutcomes.matchPercentage)}`}
                    >
                      {syllabusData.learningOutcomes.matchPercentage}%
                    </Badge>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    Competencias
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.competencies.original.map((competency, index) => (
                          <li key={index} className="text-xs">
                            • {competency}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <ul className="mt-1 space-y-1">
                        {syllabusData.competencies.target.map((competency, index) => (
                          <li key={index} className="text-xs">
                            • {competency}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.competencies.matchPercentage)} ${getSimilarityColor(syllabusData.competencies.matchPercentage)}`}
                    >
                      {syllabusData.competencies.matchPercentage}%
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="methodology" className="mt-4 space-y-4">
                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    Metodología de Enseñanza
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <p className="text-xs">{syllabusData.methodology.original}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <p className="text-xs">{syllabusData.methodology.target}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.methodology.matchPercentage)} ${getSimilarityColor(syllabusData.methodology.matchPercentage)}`}
                    >
                      {syllabusData.methodology.matchPercentage}%
                    </Badge>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                    Sistema de Evaluación
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium">Curso Original:</h5>
                      <p className="text-xs">{syllabusData.evaluation.original}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Curso Equivalente:</h5>
                      <p className="text-xs">{syllabusData.evaluation.target}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">Coincidencia:</span>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityBg(syllabusData.evaluation.matchPercentage)} ${getSimilarityColor(syllabusData.evaluation.matchPercentage)}`}
                    >
                      {syllabusData.evaluation.matchPercentage}%
                    </Badge>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="mb-2 font-medium">Análisis Comparativo</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aspecto</TableHead>
                        <TableHead className="text-center">Coincidencia</TableHead>
                        <TableHead className="text-right">Impacto en Decisión</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sumilla del Curso</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`${getSimilarityBg(syllabusData.description.matchPercentage)} ${getSimilarityColor(syllabusData.description.matchPercentage)}`}
                          >
                            {syllabusData.description.matchPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">Medio</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resultados de Aprendizaje</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`${getSimilarityBg(syllabusData.learningOutcomes.matchPercentage)} ${getSimilarityColor(syllabusData.learningOutcomes.matchPercentage)}`}
                          >
                            {syllabusData.learningOutcomes.matchPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">Alto</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Contenidos por Unidades</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`${getSimilarityBg(syllabusData.content.overallMatchPercentage)} ${getSimilarityColor(syllabusData.content.overallMatchPercentage)}`}
                          >
                            {syllabusData.content.overallMatchPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">Alto</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bibliografía</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`${getSimilarityBg(syllabusData.bibliography.matchPercentage)} ${getSimilarityColor(syllabusData.bibliography.matchPercentage)}`}
                          >
                            {syllabusData.bibliography.matchPercentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">Medio</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
