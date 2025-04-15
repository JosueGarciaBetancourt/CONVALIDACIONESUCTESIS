"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import { SyllabusComparisonView } from "@/components/validations/syllabus-comparison-view"

export function SimilarityDetailsDialog({ course, open, onOpenChange }) {
  const [justification, setJustification] = useState("")
  const { toast } = useToast()

  // Datos simulados para el análisis de similitud
  const keyConceptsData = [
    { concept: "Programación orientada a objetos", match: true, weight: "Alto" },
    { concept: "Herencia y polimorfismo", match: true, weight: "Alto" },
    { concept: "Estructuras de control", match: true, weight: "Medio" },
    { concept: "Manejo de excepciones", match: true, weight: "Medio" },
    { concept: "Patrones de diseño", match: false, weight: "Bajo" },
    { concept: "Programación funcional", match: false, weight: "Bajo" },
  ]

  const topicsData = [
    {
      topic: "Fundamentos de POO",
      originalCoverage: "Completo",
      targetCoverage: "Completo",
      match: true,
    },
    {
      topic: "Clases y objetos",
      originalCoverage: "Completo",
      targetCoverage: "Completo",
      match: true,
    },
    {
      topic: "Herencia",
      originalCoverage: "Completo",
      targetCoverage: "Completo",
      match: true,
    },
    {
      topic: "Polimorfismo",
      originalCoverage: "Completo",
      targetCoverage: "Parcial",
      match: true,
    },
    {
      topic: "Interfaces",
      originalCoverage: "Completo",
      targetCoverage: "Parcial",
      match: true,
    },
    {
      topic: "Patrones de diseño",
      originalCoverage: "Parcial",
      targetCoverage: "No cubierto",
      match: false,
    },
    {
      topic: "Programación funcional",
      originalCoverage: "Parcial",
      targetCoverage: "No cubierto",
      match: false,
    },
  ]

  const textualAnalysisData = {
    originalSyllabus: `
      <p class="font-semibold mb-2">Sumilla del curso:</p>
      <p class="mb-4">Este curso introduce a los estudiantes a los conceptos fundamentales de la <span class="bg-green-100 px-1">programación orientada a objetos</span>. Los estudiantes aprenderán sobre <span class="bg-green-100 px-1">clases, objetos, herencia, polimorfismo</span> y encapsulamiento. El curso también cubre <span class="bg-green-100 px-1">estructuras de control</span> y <span class="bg-green-100 px-1">manejo de excepciones</span>.</p>
      
      <p class="font-semibold mb-2">Objetivos:</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Comprender los principios de la <span class="bg-green-100 px-1">programación orientada a objetos</span></li>
        <li>Implementar <span class="bg-green-100 px-1">clases y objetos</span> en aplicaciones prácticas</li>
        <li>Utilizar <span class="bg-green-100 px-1">herencia y polimorfismo</span> para crear código reutilizable</li>
        <li>Aplicar <span class="bg-yellow-100 px-1">patrones de diseño</span> básicos</li>
      </ul>
    `,
    targetSyllabus: `
      <p class="font-semibold mb-2">Sumilla del curso:</p>
      <p class="mb-4">Fundamentos de Programación es un curso que introduce los conceptos básicos de la <span class="bg-green-100 px-1">programación orientada a objetos</span>. Se estudian <span class="bg-green-100 px-1">clases, objetos, herencia, polimorfismo</span> y abstracción. También se cubren <span class="bg-green-100 px-1">estructuras de control</span> y <span class="bg-green-100 px-1">manejo de excepciones</span>.</p>
      
      <p class="font-semibold mb-2">Objetivos:</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Entender los fundamentos de la <span class="bg-green-100 px-1">programación orientada a objetos</span></li>
        <li>Crear <span class="bg-green-100 px-1">clases y objetos</span> para resolver problemas</li>
        <li>Implementar <span class="bg-green-100 px-1">herencia y polimorfismo</span> en programas</li>
        <li>Desarrollar aplicaciones utilizando los conceptos aprendidos</li>
      </ul>
    `,
  }

  // Datos simulados para la comparación detallada de sílabos
  const syllabusComparisonData = {
    originalCourse: {
      code: course.originalCode,
      name: course.originalName,
      credits: 4,
    },
    targetCourse: {
      code: course.targetCode,
      name: course.targetName,
      credits: 4,
    },
    syllabusComparison: {
      generalInfo: {
        original: {
          code: course.originalCode,
          credits: 4,
          hours: { theory: 2, practice: 4 },
          prerequisites: ["Fundamentos de Programación"],
          academicYear: "2025",
        },
        target: {
          code: course.targetCode,
          credits: 4,
          hours: { theory: 2, practice: 4 },
          prerequisites: ["Introducción a la Programación"],
          academicYear: "2025",
        },
        matchPercentage: 90,
      },
      description: {
        original:
          "Programación Orientada a Objetos es una asignatura obligatoria de especialidad, ubicada en el cuarto periodo académico de la carrera profesional de la Ingeniería de Sistemas e Informática y tiene como prerrequisito Fundamentos de Programación. Es prerrequisito de Construcción de Software. Con esta asignatura se desarrolla en un nivel intermedio la competencia transversal Conocimientos de Ingeniería; y en un nivel inicial la competencia específica uso de Herramientas modernas. La relevancia reside en elaborar programas de entorno visual haciendo uso de los principios fundamentales de la programación orientada a objetos.\n\nLos contenidos generales que la asignatura desarrolla son: Conceptos básicos de programación orientada a objetos: clase, objeto, herencia, encapsulamiento, polimorfismo. Entorno visual. Funciones avanzadas de entorno visual. Conexión a base de datos. Fundamentos de interacción hombre-computador: interacción, paradigmas, proceso de diseño, modelos y teorías. Diseño centrado en el usuario.",
        target:
          "Este curso introduce a los estudiantes a los conceptos fundamentales de la programación orientada a objetos. Los estudiantes aprenderán sobre clases, objetos, herencia, polimorfismo y encapsulamiento. El curso también cubre estructuras de control, manejo de excepciones y acceso a bases de datos. Se enfatiza el desarrollo de aplicaciones prácticas utilizando un entorno de desarrollo integrado moderno y técnicas de diseño centrado en el usuario.",
        matchPercentage: 85,
      },
      learningOutcomes: {
        original:
          "Al finalizar la asignatura, el estudiante será capaz de implementar aplicaciones usando los fundamentos de la programación orientada a objetos.",
        target:
          "Al finalizar el curso, el estudiante podrá desarrollar aplicaciones de software utilizando los principios de la programación orientada a objetos y aplicando buenas prácticas de diseño de interfaces.",
        matchPercentage: 90,
      },
      units: {
        original: [
          {
            title: "Fundamentos de Programación Orientada a Objetos",
            duration: 24,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de analizar el uso de los fundamentos de la programación orientados a objetos en el desarrollo de aplicaciones.",
            topics: [
              "Tipos de datos y estructuras de programación",
              "Objetos y Clases. Constructores y Destructores",
              "Herencia. Clases Abstractas. Polimorfismo",
              "Clases internas e interfaces",
            ],
            matchPercentage: 95,
          },
          {
            title: "Fundamentos de la Interacción Hombre-Computador",
            duration: 24,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de aplicar fundamentos de la Interacción Hombre – Computador en la construcción de interfaces usuario-computador.",
            topics: [
              "Principios Generales de IHC y usabilidad.",
              "Diseño y prototipeo centrado en el usuario",
              "Evaluación de la interfaz de usuario",
              "Uso de Layouts y distribución de componentes gráficos.",
            ],
            matchPercentage: 80,
          },
          {
            title: "Programación Visual y Basada en Eventos",
            duration: 24,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de desarrollar aplicaciones de programación visual y basada en eventos para mejorar la interacción con el usuario",
            topics: [
              "Excepciones. Manejo de errores.",
              "Programación multihilos. Multithreading vs Multiprocessing.",
              "Programación visual. Componentes Gráficos.",
              "Programación con eventos.",
            ],
            matchPercentage: 85,
          },
          {
            title: "Acceso a Base de Datos",
            duration: 24,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de implementar aplicaciones con acceso a base de datos para el almacenamiento de información.",
            topics: [
              "Conexión a base de datos.",
              "API JDBC.",
              "Consultas SQL",
              "Manipulación de Base de Datos. CRUD a tablas.",
            ],
            matchPercentage: 90,
          },
        ],
        target: [
          {
            title: "Introducción a la Programación Orientada a Objetos",
            duration: 20,
            learningOutcome:
              "Al finalizar la unidad, el estudiante comprenderá los conceptos fundamentales de la programación orientada a objetos y su aplicación en el desarrollo de software.",
            topics: [
              "Paradigmas de programación",
              "Clases y objetos",
              "Encapsulamiento y abstracción",
              "Herencia y polimorfismo",
            ],
            matchPercentage: 95,
          },
          {
            title: "Diseño de Interfaces de Usuario",
            duration: 20,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de diseñar interfaces de usuario efectivas aplicando principios de usabilidad y experiencia de usuario.",
            topics: [
              "Principios de diseño de interfaces",
              "Usabilidad y experiencia de usuario",
              "Prototipado y evaluación",
              "Componentes gráficos y layouts",
            ],
            matchPercentage: 80,
          },
          {
            title: "Programación Avanzada en Java",
            duration: 20,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de implementar aplicaciones utilizando características avanzadas del lenguaje Java.",
            topics: [
              "Manejo de excepciones",
              "Programación concurrente",
              "Interfaces gráficas con JavaFX",
              "Manejo de eventos",
            ],
            matchPercentage: 85,
          },
          {
            title: "Persistencia de Datos",
            duration: 20,
            learningOutcome:
              "Al finalizar la unidad, el estudiante será capaz de implementar soluciones que integren bases de datos relacionales con aplicaciones orientadas a objetos.",
            topics: [
              "Fundamentos de bases de datos relacionales",
              "Conexión a bases de datos desde Java",
              "Operaciones CRUD",
              "Mapeo objeto-relacional básico",
            ],
            matchPercentage: 90,
          },
        ],
        overallMatchPercentage: 88,
      },
      methodology: {
        original:
          "La metodología por utilizarse en la asignatura se basa en el aprendizaje colaborativo y experiencial y es orientada en proyectos y como parte de su aplicación se desarrollará un trabajo grupal, el cual implicará la implementación de un aplicativo. La asignatura utiliza sesiones de teoría, prácticas de laboratorio, resolución de ejercicios, problemas y desarrollo de proyecto.",
        target:
          "El curso utiliza una metodología activa centrada en el estudiante, combinando clases teóricas con prácticas de laboratorio. Se enfatiza el aprendizaje basado en proyectos, donde los estudiantes desarrollarán una aplicación completa a lo largo del semestre. Se utilizan técnicas de aprendizaje colaborativo y resolución de problemas.",
        matchPercentage: 85,
      },
      evaluation: {
        original: {
          components: [
            {
              name: "Evaluación de entrada",
              percentage: 0,
              description: "Evaluación individual teórico-práctico / Prueba objetiva",
            },
            {
              name: "Consolidado 1",
              percentage: 20,
              description: "Evaluaciones individuales teórico-prácticas y prácticas de laboratorio",
            },
            {
              name: "Evaluación parcial",
              percentage: 25,
              description: "Trabajo grupal de un proceso de la realidad / Rúbrica de evaluación",
            },
            {
              name: "Consolidado 2",
              percentage: 20,
              description: "Evaluaciones individuales teórico-prácticas y prácticas de laboratorio",
            },
            {
              name: "Evaluación final",
              percentage: 35,
              description: "Trabajo grupal de un proceso de la realidad / Rúbrica de evaluación",
            },
          ],
        },
        target: {
          components: [
            {
              name: "Participación en clase",
              percentage: 10,
              description: "Asistencia y participación activa en discusiones y actividades",
            },
            {
              name: "Prácticas de laboratorio",
              percentage: 20,
              description: "Ejercicios prácticos individuales realizados en laboratorio",
            },
            {
              name: "Examen parcial",
              percentage: 25,
              description: "Evaluación teórico-práctica individual",
            },
            {
              name: "Proyecto de curso",
              percentage: 25,
              description: "Desarrollo grupal de una aplicación completa",
            },
            {
              name: "Examen final",
              percentage: 20,
              description: "Evaluación teórico-práctica individual",
            },
          ],
        },
        matchPercentage: 75,
      },
      bibliography: {
        original: {
          basic: [
            "Gervais, L. (2019). Aprender la programación orientada a objetos con el lenguaje Java. Ediciones ENI.",
          ],
          complementary: [
            "Deitel, P., Deitel H. (2016). Java. Como programar. (10.ª ed.). México. Pearson Education.",
            "Schildt, H. (2017). Java: The Complete Reference. (11.° ed.). New York, USA: McGraw-Hill Education",
          ],
          digitalResources: [
            "Bizagi. (2023). Folder en Google Drive.",
            "NetBeans. (2023). Folder en Google Drive.",
            "Oracle Xpress. (2023). Folder en Google Drive.",
            "Visual Paradigm. (2023). Folder en Google Drive.",
          ],
        },
        target: {
          basic: ["Deitel, P., Deitel H. (2016). Java. Como programar. (10.ª ed.). México. Pearson Education."],
          complementary: [
            "Schildt, H. (2017). Java: The Complete Reference. (11.° ed.). New York, USA: McGraw-Hill Education",
            "Horstmann, C. S. (2019). Core Java Volume I—Fundamentals, 11th Edition. Prentice Hall.",
          ],
          digitalResources: [
            "Oracle Java Documentation",
            "JavaFX Documentation",
            "MySQL Documentation",
            "GitHub Repository with course examples",
          ],
        },
        matchPercentage: 70,
      },
      overallMatchPercentage: course.similarity,
    },
  }

  const handleSaveJustification = () => {
    toast({
      title: "Justificación guardada",
      description: "La justificación ha sido guardada correctamente",
    })
    onOpenChange(false)
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 85) return "text-green-600 dark:text-[#00C853]"
    if (similarity >= 70) return "text-yellow-600 dark:text-[#FFD600]"
    return "text-red-600 dark:text-[#FF5252]"
  }

  const getSimilarityBg = (similarity: number) => {
    if (similarity >= 85) return "bg-green-100 dark:bg-[#00C853]/20"
    if (similarity >= 70) return "bg-yellow-100 dark:bg-[#FFD600]/20"
    return "bg-red-100 dark:bg-[#FF5252]/20"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto dark:bg-[#1E1E1E] dark:text-[#E0E0E0]">
        <DialogHeader className="pb-4 border-b dark:border-[#2A2A2A]">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Detalles de convalidación - {course.similarity}%</span>
              <Badge
                variant="outline"
                className={`
          ${
            course.similarity >= 85
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-[#00C853]/20 dark:text-[#00C853] dark:border-[#00C853]/30"
              : course.similarity >= 70
                ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-[#FFD600]/20 dark:text-[#FFD600] dark:border-[#FFD600]/30"
                : "bg-red-50 text-red-700 border-red-200 dark:bg-[#FF5252]/20 dark:text-[#FF5252] dark:border-[#FF5252]/30"
          }
          px-3 py-1 text-sm font-medium
        `}
              >
                {course.similarity >= 85
                  ? "Alta similitud"
                  : course.similarity >= 70
                    ? "Similitud media"
                    : "Baja similitud"}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <SyllabusComparisonView
            originalCourse={syllabusComparisonData.originalCourse}
            targetCourse={syllabusComparisonData.targetCourse}
            syllabusComparison={syllabusComparisonData.syllabusComparison}
          />

          <div className="mt-6 space-y-2">
            <h4 className="font-medium">Justificación de la similitud</h4>
            <Textarea
              placeholder="Ingrese una justificación para el porcentaje de similitud calculado..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="min-h-[100px] dark:bg-[#2A2A2A] dark:text-[#E0E0E0] dark:border-[#2A2A2A]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="dark:bg-[#2A2A2A] dark:text-[#E0E0E0] dark:border-[#2A2A2A] dark:hover:bg-[#2D2D2D]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveJustification}
            className="dark:bg-[#7C4DFF] dark:text-[#E0E0E0] dark:hover:bg-[#7C4DFF]/90"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Justificación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
