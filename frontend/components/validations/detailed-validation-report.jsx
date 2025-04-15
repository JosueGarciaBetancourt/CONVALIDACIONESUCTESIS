"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileCheck, Printer, Save } from "lucide-react"
import { CourseDetailCard } from "@/components/validations/course-detail-card"

export function DetailedValidationReport() {
  const [activeTab, setActiveTab] = useState("summary")
  const router = useRouter()

  // Datos simulados para el reporte
  const validationData = {
    id: "VAL-2023-0125",
    date: "12 de abril de 2023",
    status: "completed",
    student: {
      name: "Carlos Mendoza",
      id: "20210389",
      email: "carlos.mendoza@ejemplo.com",
      phone: "+51 987 654 321",
      originUniversity: "Universidad Nacional Mayor de San Marcos",
      originCareer: "Ciencias de la Computación",
      targetCareer: "Ingeniería de Software",
      incomingSemester: "2023-2",
    },
    summary: {
      totalCourses: 8,
      approvedCourses: 4,
      rejectedCourses: 4,
      totalCredits: 15,
      averageSimilarity: 87,
    },
    approvedCourses: [
      {
        id: 1,
        originalCode: "CS101",
        originalName: "Introducción a la Programación",
        originalCredits: 4,
        originalGrade: 16,
        targetCode: "INF101",
        targetName: "Fundamentos de Programación",
        targetCredits: 4,
        similarity: 92,
        justification:
          "Alto nivel de coincidencia en contenidos fundamentales de programación. Ambos cursos cubren los mismos conceptos básicos de programación orientada a objetos, estructuras de control y algoritmos básicos.",
        keyMatches: [
          "Programación orientada a objetos",
          "Estructuras de control",
          "Algoritmos básicos",
          "Tipos de datos",
        ],
        syllabusComparison: {
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
                  topics: [
                    "Paradigmas de programación",
                    "Fundamentos de POO",
                    "Clases y objetos",
                    "Atributos y métodos",
                  ],
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
                  topics: [
                    "Paradigmas de programación",
                    "Principios de POO",
                    "Clases y objetos",
                    "Atributos y métodos",
                  ],
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
            original:
              "Exámenes parcial y final (40%), prácticas de laboratorio (30%), proyecto (20%), participación (10%).",
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
        },
      },
      {
        id: 2,
        originalCode: "CS102",
        originalName: "Estructuras de Datos",
        originalCredits: 4,
        originalGrade: 15,
        targetCode: "INF102",
        targetName: "Estructuras de Datos y Algoritmos",
        targetCredits: 4,
        similarity: 88,
        justification:
          "Ambos cursos cubren las mismas estructuras de datos fundamentales y sus implementaciones. El curso de destino incluye más contenido sobre análisis de algoritmos, pero los temas principales coinciden.",
        keyMatches: ["Listas enlazadas", "Árboles binarios", "Tablas hash", "Algoritmos de ordenamiento"],
      },
      {
        id: 5,
        originalCode: "CS301",
        originalName: "Ingeniería de Software",
        originalCredits: 4,
        originalGrade: 16,
        targetCode: "INF301",
        targetName: "Ingeniería de Software",
        targetCredits: 4,
        similarity: 95,
        justification:
          "Coincidencia casi perfecta en contenidos. Ambos cursos cubren el ciclo de vida del desarrollo de software, metodologías ágiles, patrones de diseño y gestión de proyectos.",
        keyMatches: ["Metodologías ágiles", "Patrones de diseño", "Gestión de proyectos", "Pruebas de software"],
      },
      {
        id: 8,
        originalCode: "CS402",
        originalName: "Sistemas Operativos",
        originalCredits: 3,
        originalGrade: 16,
        targetCode: "INF402",
        targetName: "Sistemas Operativos",
        targetCredits: 3,
        similarity: 89,
        justification:
          "Alta coincidencia en contenidos sobre gestión de procesos, memoria, sistemas de archivos y seguridad. El enfoque práctico es similar en ambos cursos.",
        keyMatches: ["Gestión de procesos", "Gestión de memoria", "Sistemas de archivos", "Seguridad"],
      },
    ],
    rejectedCourses: [
      {
        id: 3,
        originalCode: "CS201",
        originalName: "Algoritmos Avanzados",
        originalCredits: 4,
        originalGrade: 17,
        targetCode: "INF201",
        targetName: "Análisis y Diseño de Algoritmos",
        targetCredits: 4,
        similarity: 65,
        justification:
          "Aunque hay coincidencia en algunos temas básicos, el curso original no cubre suficiente contenido sobre análisis de complejidad y técnicas avanzadas de diseño de algoritmos que son fundamentales en el curso de destino.",
        keyMatches: ["Algoritmos de grafos", "Programación dinámica"],
        keyDifferences: ["Análisis de complejidad avanzado", "Algoritmos aproximados", "Técnicas de optimización"],
      },
      {
        id: 4,
        originalCode: "CS202",
        originalName: "Bases de Datos",
        originalCredits: 4,
        originalGrade: 18,
        targetCode: "INF202",
        targetName: "Gestión de Bases de Datos",
        targetCredits: 4,
        similarity: 68,
        justification:
          "El curso original se enfoca principalmente en bases de datos relacionales, mientras que el curso de destino cubre también bases de datos NoSQL, distribuidas y aspectos avanzados de administración que no están presentes en el curso original.",
        keyMatches: ["Modelo relacional", "SQL básico", "Normalización"],
        keyDifferences: ["Bases de datos NoSQL", "Bases de datos distribuidas", "Administración avanzada", "Big Data"],
        syllabusComparison: {
          description: {
            original:
              "Este curso introduce los conceptos fundamentales de bases de datos relacionales, diseño de bases de datos y SQL.",
            target:
              "Este curso cubre los fundamentos de la gestión de bases de datos, incluyendo bases de datos relacionales, NoSQL, distribuidas y aspectos avanzados de administración.",
            matchPercentage: 60,
          },
          content: {
            original: {
              units: [
                {
                  title: "Unidad 1: Introducción a Bases de Datos",
                  topics: [
                    "Conceptos básicos",
                    "Modelos de datos",
                    "Arquitectura de SGBD",
                    "Usuarios y administradores",
                  ],
                  matchPercentage: 90,
                },
                {
                  title: "Unidad 2: Modelo Relacional",
                  topics: [
                    "Estructura del modelo relacional",
                    "Restricciones de integridad",
                    "Álgebra relacional",
                    "Cálculo relacional",
                  ],
                  matchPercentage: 85,
                },
                {
                  title: "Unidad 3: SQL",
                  topics: [
                    "DDL: Creación y modificación de tablas",
                    "DML: Consultas básicas y avanzadas",
                    "Vistas",
                    "Procedimientos almacenados",
                  ],
                  matchPercentage: 80,
                },
                {
                  title: "Unidad 4: Diseño de Bases de Datos",
                  topics: ["Modelo E-R", "Normalización", "Desnormalización", "Optimización"],
                  matchPercentage: 75,
                },
              ],
            },
            target: {
              units: [
                {
                  title: "Unidad 1: Fundamentos de Bases de Datos",
                  topics: ["Conceptos básicos", "Modelos de datos", "Arquitectura de SGBD", "Tipos de bases de datos"],
                  matchPercentage: 90,
                },
                {
                  title: "Unidad 2: Bases de Datos Relacionales",
                  topics: [
                    "Modelo relacional",
                    "SQL avanzado",
                    "Optimización de consultas",
                    "Transacciones y concurrencia",
                  ],
                  matchPercentage: 75,
                },
                {
                  title: "Unidad 3: Bases de Datos NoSQL",
                  topics: [
                    "Bases de datos documentales",
                    "Bases de datos de grafos",
                    "Bases de datos clave-valor",
                    "Bases de datos columnares",
                  ],
                  matchPercentage: 10,
                },
                {
                  title: "Unidad 4: Administración y Distribución",
                  topics: [
                    "Seguridad y auditoría",
                    "Respaldo y recuperación",
                    "Bases de datos distribuidas",
                    "Big Data y analítica",
                  ],
                  matchPercentage: 15,
                },
              ],
            },
            overallMatchPercentage: 48,
          },
          learningOutcomes: {
            original: [
              "Comprender los fundamentos de las bases de datos relacionales",
              "Diseñar bases de datos utilizando el modelo E-R",
              "Implementar bases de datos en SQL",
              "Optimizar consultas básicas",
            ],
            target: [
              "Comprender los diferentes tipos de bases de datos",
              "Diseñar e implementar bases de datos relacionales y NoSQL",
              "Administrar bases de datos en entornos empresariales",
              "Implementar soluciones para Big Data",
            ],
            matchPercentage: 55,
          },
          competencies: {
            original: [
              "Capacidad para diseñar bases de datos relacionales",
              "Habilidad para implementar consultas SQL",
              "Capacidad para normalizar esquemas de bases de datos",
              "Habilidad para optimizar consultas básicas",
            ],
            target: [
              "Capacidad para diseñar soluciones de datos empresariales",
              "Habilidad para implementar y administrar diferentes tipos de bases de datos",
              "Capacidad para diseñar soluciones escalables",
              "Habilidad para trabajar con grandes volúmenes de datos",
            ],
            matchPercentage: 50,
          },
          methodology: {
            original: "Clases teóricas, laboratorios prácticos con MySQL, proyectos individuales.",
            target:
              "Clases teórico-prácticas, laboratorios con múltiples SGBD, proyectos grupales, casos de estudio empresariales.",
            matchPercentage: 60,
          },
          evaluation: {
            original: "Exámenes (50%), prácticas de laboratorio (30%), proyecto final (20%).",
            target: "Evaluación continua (20%), exámenes (30%), proyecto empresarial (30%), casos prácticos (20%).",
            matchPercentage: 65,
          },
          bibliography: {
            original: [
              "Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). Database System Concepts, 7th Edition. McGraw-Hill.",
              "Elmasri, R., & Navathe, S. B. (2016). Fundamentals of Database Systems, 7th Edition. Pearson.",
              "Date, C. J. (2004). An Introduction to Database Systems, 8th Edition. Addison-Wesley.",
            ],
            target: [
              "Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). Database System Concepts, 7th Edition. McGraw-Hill.",
              "Sadalage, P. J., & Fowler, M. (2012). NoSQL Distilled. Addison-Wesley.",
              "Kleppmann, M. (2017). Designing Data-Intensive Applications. O'Reilly Media.",
              "White, T. (2015). Hadoop: The Definitive Guide, 4th Edition. O'Reilly Media.",
            ],
            matchPercentage: 40,
          },
        },
      },
      {
        id: 6,
        originalCode: "CS302",
        originalName: "Inteligencia Artificial",
        originalCredits: 4,
        originalGrade: 15,
        targetCode: "INF302",
        targetName: "Inteligencia Artificial",
        targetCredits: 4,
        similarity: 58,
        justification:
          "A pesar de tener el mismo nombre, el contenido difiere significativamente. El curso original se enfoca en conceptos básicos, mientras que el curso de destino profundiza en aprendizaje automático y redes neuronales que no están cubiertos en el curso original.",
        keyMatches: ["Búsqueda heurística", "Lógica de primer orden"],
        keyDifferences: [
          "Aprendizaje automático avanzado",
          "Redes neuronales profundas",
          "Procesamiento de lenguaje natural",
          "Visión por computadora",
        ],
      },
      {
        id: 7,
        originalCode: "CS401",
        originalName: "Redes de Computadoras",
        originalCredits: 3,
        originalGrade: 14,
        targetCode: "INF401",
        targetName: "Redes y Comunicaciones",
        targetCredits: 3,
        similarity: 55,
        justification:
          "El curso original se centra en aspectos teóricos de redes, mientras que el curso de destino tiene un enfoque más práctico e incluye seguridad de redes, configuración de equipos y protocolos avanzados que no están cubiertos en el curso original.",
        keyMatches: ["Modelo OSI", "Protocolos TCP/IP básicos"],
        keyDifferences: [
          "Seguridad de redes",
          "Configuración de equipos",
          "Redes inalámbricas avanzadas",
          "Virtualización de redes",
        ],
      },
    ],
    approvedBy: {
      name: "Admin Matrículas",
      position: "Coordinador de Convalidaciones",
      email: "admin.matriculas@universidad.edu",
      date: "12 de abril de 2023",
      time: "10:45 AM",
    },
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reporte de Convalidación: {validationData.id}</h2>
          <p className="text-muted-foreground">Generado el {validationData.date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/validations")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Información del Estudiante</CardTitle>
          <CardDescription>Datos del estudiante para el proceso de convalidación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Nombre completo:</p>
                <p className="text-sm">{validationData.student.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Código de estudiante:</p>
                <p className="text-sm">{validationData.student.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Correo electrónico:</p>
                <p className="text-sm">{validationData.student.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Teléfono:</p>
                <p className="text-sm">{validationData.student.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Universidad de origen:</p>
                <p className="text-sm">{validationData.student.originUniversity}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Carrera de origen:</p>
                <p className="text-sm">{validationData.student.originCareer}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Carrera de destino:</p>
                <p className="text-sm">{validationData.student.targetCareer}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm font-medium">Semestre de ingreso:</p>
                <p className="text-sm">{validationData.student.incomingSemester}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="approved">Cursos Aprobados</TabsTrigger>
          <TabsTrigger value="rejected">Cursos Rechazados</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Convalidación</CardTitle>
              <CardDescription>Resumen general del proceso de convalidación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-semibold">Estadísticas Generales</h3>
                    <div className="grid grid-cols-2 gap-y-2">
                      <p className="text-sm font-medium">Total de cursos evaluados:</p>
                      <p className="text-sm">{validationData.summary.totalCourses}</p>

                      <p className="text-sm font-medium">Cursos aprobados:</p>
                      <p className="text-sm">{validationData.summary.approvedCourses}</p>

                      <p className="text-sm font-medium">Cursos rechazados:</p>
                      <p className="text-sm">{validationData.summary.rejectedCourses}</p>

                      <p className="text-sm font-medium">Total de créditos convalidados:</p>
                      <p className="text-sm">{validationData.summary.totalCredits}</p>

                      <p className="text-sm font-medium">Similitud promedio:</p>
                      <p className="text-sm">{validationData.summary.averageSimilarity}%</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-semibold">Aprobación</h3>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Responsable:</p>
                      <p className="text-sm">{validationData.approvedBy.name}</p>
                      <p className="text-sm text-muted-foreground">{validationData.approvedBy.position}</p>
                      <p className="text-sm text-muted-foreground">{validationData.approvedBy.email}</p>

                      <p className="text-sm font-medium">Fecha y hora de aprobación:</p>
                      <p className="text-sm">
                        {validationData.approvedBy.date}, {validationData.approvedBy.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-semibold">Distribución de Cursos</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex w-full items-center gap-2">
                        <div className="h-4 w-full rounded-full bg-gray-100">
                          <div
                            className="h-4 rounded-full bg-green-500"
                            style={{
                              width: `${(validationData.summary.approvedCourses / validationData.summary.totalCourses) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round(
                            (validationData.summary.approvedCourses / validationData.summary.totalCourses) * 100,
                          )}
                          %
                        </span>
                      </div>

                      <div className="grid w-full grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Aprobados ({validationData.summary.approvedCourses})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Rechazados ({validationData.summary.rejectedCourses})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-semibold">Observaciones Generales</h3>
                    <p className="text-sm">
                      El estudiante ha obtenido una convalidación satisfactoria de{" "}
                      {validationData.summary.approvedCourses} cursos, lo que representa un{" "}
                      {Math.round((validationData.summary.approvedCourses / validationData.summary.totalCourses) * 100)}
                      % del total de cursos evaluados. Los cursos convalidados tienen una similitud promedio del{" "}
                      {validationData.summary.averageSimilarity}%, lo que indica una alta correspondencia entre los
                      contenidos académicos.
                    </p>
                    <p className="mt-2 text-sm">
                      Los cursos rechazados presentaron diferencias significativas en contenidos clave o enfoques
                      metodológicos que no permiten su convalidación según los criterios establecidos por la
                      universidad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Aprobados para Convalidación</CardTitle>
              <CardDescription>Detalle de los cursos que han sido aprobados para convalidación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {validationData.approvedCourses.map((course) => (
                  <CourseDetailCard key={course.id} course={course} type="approved" />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Rechazados para Convalidación</CardTitle>
              <CardDescription>Detalle de los cursos que han sido rechazados para convalidación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {validationData.rejectedCourses.map((course) => (
                  <CourseDetailCard key={course.id} course={course} type="rejected" />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Certificación y Firmas</CardTitle>
          <CardDescription>Información de certificación del proceso de convalidación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <p className="text-sm">
                Certifico que la presente convalidación ha sido realizada siguiendo los procedimientos y criterios
                establecidos por la universidad, basados en el análisis detallado de los sílabos y contenidos académicos
                de los cursos evaluados. El análisis de similitud se ha realizado utilizando tecnología de Procesamiento
                de Lenguaje Natural (NLP) y ha sido verificado manualmente por el personal académico responsable.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                <p className="text-center text-sm font-medium">{validationData.approvedBy.name}</p>
                <p className="text-center text-sm text-muted-foreground">{validationData.approvedBy.position}</p>
                <div className="my-4 h-px w-40 bg-border"></div>
                <p className="text-center text-sm">Firma del Responsable</p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                <p className="text-center text-sm font-medium">Dr. Juan Martínez Rodríguez</p>
                <p className="text-center text-sm text-muted-foreground">Director de Admisión y Registro</p>
                <div className="my-4 h-px w-40 bg-border"></div>
                <p className="text-center text-sm">Firma de Autorización</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Documento oficial de convalidación</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Fecha de emisión: {validationData.date}</p>
                <Badge variant="outline">Verificado</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={() => router.push("/validations")}>
            Volver a Convalidaciones
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar y Finalizar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
