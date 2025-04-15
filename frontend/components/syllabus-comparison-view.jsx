"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

export function SyllabusComparisonView({ originalCourse, targetCourse, syllabusComparison }) {
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
    <Card className="w-full dark:bg-[#1E1E1E] dark:text-[#E0E0E0] dark:border-[#2A2A2A]">
      <CardContent className="p-4 space-y-6">
        <div className="rounded-md border p-4 dark:border-[#2A2A2A]">
          <h3 className="mb-4 text-lg font-medium">Información de los Cursos</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground dark:text-[#A0A0A0]" />
                Curso Original: {originalCourse.name}
              </h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm">Código: {syllabusComparison.generalInfo.original.code}</p>
                <p className="text-sm">Créditos: {syllabusComparison.generalInfo.original.credits}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground dark:text-[#A0A0A0]" />
                Curso Equivalente: {targetCourse.name}
              </h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm">Código: {syllabusComparison.generalInfo.target.code}</p>
                <p className="text-sm">Créditos: {syllabusComparison.generalInfo.target.credits}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4 dark:border-[#2A2A2A]">
          <h3 className="mb-4 text-lg font-medium">Sumilla del Curso</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Original:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm whitespace-pre-line">
                  {syllabusComparison.description.original
                    .split("\n\n")[0]
                    .split(" ")
                    .map((word, index) => {
                      const isMatch =
                        syllabusComparison.description.target.toLowerCase().includes(word.toLowerCase()) &&
                        word.length > 3
                      return (
                        <span
                          key={index}
                          className={isMatch ? "bg-[#00C896]/20 px-1 rounded dark:bg-[#00C896]/20" : ""}
                        >
                          {word}{" "}
                        </span>
                      )
                    })}
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Equivalente:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm whitespace-pre-line">
                  {syllabusComparison.description.target.split(" ").map((word, index) => {
                    const isMatch =
                      syllabusComparison.description.original
                        .split("\n\n")[0]
                        .toLowerCase()
                        .includes(word.toLowerCase()) && word.length > 3
                    return (
                      <span key={index} className={isMatch ? "bg-[#00C896]/20 px-1 rounded dark:bg-[#00C896]/20" : ""}>
                        {word}{" "}
                      </span>
                    )
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="text-sm text-muted-foreground dark:text-[#A0A0A0]">Coincidencia de sumilla:</span>
            <Badge
              variant="outline"
              className={`${getSimilarityBg(syllabusComparison.description.matchPercentage)} ${getSimilarityColor(
                syllabusComparison.description.matchPercentage,
              )} dark:border-transparent`}
            >
              {syllabusComparison.description.matchPercentage}%
            </Badge>
          </div>
        </div>

        <div className="rounded-md border p-4 dark:border-[#2A2A2A]">
          <h3 className="mb-4 text-lg font-medium">Resultados de Aprendizaje</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Original:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm whitespace-pre-line">{syllabusComparison.learningOutcomes.original}</p>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Equivalente:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm whitespace-pre-line">{syllabusComparison.learningOutcomes.target}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="text-sm text-muted-foreground dark:text-[#A0A0A0]">
              Coincidencia de resultados de aprendizaje:
            </span>
            <Badge
              variant="outline"
              className={`${getSimilarityBg(
                syllabusComparison.learningOutcomes.matchPercentage,
              )} ${getSimilarityColor(syllabusComparison.learningOutcomes.matchPercentage)} dark:border-transparent`}
            >
              {syllabusComparison.learningOutcomes.matchPercentage}%
            </Badge>
          </div>
        </div>

        <div className="rounded-md border p-4 dark:border-[#2A2A2A]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Contenidos por Unidades</h3>
            <Badge
              variant="outline"
              className={`${getSimilarityBg(syllabusComparison.units.overallMatchPercentage)} ${getSimilarityColor(
                syllabusComparison.units.overallMatchPercentage,
              )} dark:border-transparent`}
            >
              Coincidencia global: {syllabusComparison.units.overallMatchPercentage}%
            </Badge>
          </div>

          <div className="space-y-6">
            {syllabusComparison.units.original.map((originalUnit, index) => {
              const targetUnit = syllabusComparison.units.target[index] || {
                title: "No hay unidad equivalente",
                duration: 0,
                learningOutcome: "N/A",
                topics: ["N/A"],
                matchPercentage: 0,
              }

              return (
                <div key={index} className="rounded-md border dark:border-[#2A2A2A]">
                  <div
                    className={`flex items-center justify-between border-b p-3 ${getSimilarityBg(
                      originalUnit.matchPercentage,
                    )} dark:border-[#2A2A2A]`}
                  >
                    <h4 className="font-medium">Unidad {index + 1}</h4>
                    <Badge
                      variant="outline"
                      className={`${getSimilarityColor(originalUnit.matchPercentage)} dark:border-transparent`}
                    >
                      Coincidencia: {originalUnit.matchPercentage}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    <div>
                      <h5 className="mb-2 text-sm font-medium">Curso Original:</h5>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-medium">Título:</span>
                          <p className="text-sm">{originalUnit.title}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium">Temas:</span>
                          <ul className="mt-1 list-inside list-disc space-y-1">
                            {originalUnit.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="text-sm">
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-2 text-sm font-medium">Curso Equivalente:</h5>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-medium">Título:</span>
                          <p className="text-sm">{targetUnit.title}</p>
                        </div>
                        <div>
                          <span className="text-xs font-medium">Temas:</span>
                          <ul className="mt-1 list-inside list-disc space-y-1">
                            {targetUnit.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="text-sm">
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-md border p-4 dark:border-[#2A2A2A]">
          <h3 className="mb-4 text-lg font-medium">Bibliografía</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Original:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <ul className="list-inside list-disc space-y-2">
                  {syllabusComparison.bibliography.original.basic.map((book, index) => (
                    <li key={index} className="text-sm">
                      {book}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Curso Equivalente:</h4>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <ul className="list-inside list-disc space-y-2">
                  {syllabusComparison.bibliography.target.basic.map((book, index) => (
                    <li key={index} className="text-sm">
                      {book}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="text-sm text-muted-foreground dark:text-[#A0A0A0]">Coincidencia de bibliografía:</span>
            <Badge
              variant="outline"
              className={`${getSimilarityBg(syllabusComparison.bibliography.matchPercentage)} ${getSimilarityColor(
                syllabusComparison.bibliography.matchPercentage,
              )} dark:border-transparent`}
            >
              {syllabusComparison.bibliography.matchPercentage}%
            </Badge>
          </div>
        </div>

        <div className="mt-6 rounded-md border p-4 dark:border-[#2A2A2A]">
          <h3 className="mb-4 text-lg font-medium">Resumen de Coincidencias</h3>
          <Table>
            <TableHeader>
              <TableRow className="dark:border-[#2A2A2A]">
                <TableHead className="dark:text-[#E0E0E0]">Aspecto</TableHead>
                <TableHead className="text-center dark:text-[#E0E0E0]">Coincidencia</TableHead>
                <TableHead className="text-right dark:text-[#E0E0E0]">Impacto en Decisión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="dark:border-[#2A2A2A]">
                <TableCell className="dark:text-[#E0E0E0]">Sumilla del Curso</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`${getSimilarityBg(syllabusComparison.description.matchPercentage)} ${getSimilarityColor(
                      syllabusComparison.description.matchPercentage,
                    )} dark:border-transparent`}
                  >
                    {syllabusComparison.description.matchPercentage}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right dark:text-[#E0E0E0]">Medio</TableCell>
              </TableRow>
              <TableRow className="dark:border-[#2A2A2A]">
                <TableCell className="dark:text-[#E0E0E0]">Resultados de Aprendizaje</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`${getSimilarityBg(
                      syllabusComparison.learningOutcomes.matchPercentage,
                    )} ${getSimilarityColor(syllabusComparison.learningOutcomes.matchPercentage)} dark:border-transparent`}
                  >
                    {syllabusComparison.learningOutcomes.matchPercentage}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right dark:text-[#E0E0E0]">Alto</TableCell>
              </TableRow>
              <TableRow className="dark:border-[#2A2A2A]">
                <TableCell className="dark:text-[#E0E0E0]">Contenidos por Unidades</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`${getSimilarityBg(syllabusComparison.units.overallMatchPercentage)} ${getSimilarityColor(
                      syllabusComparison.units.overallMatchPercentage,
                    )} dark:border-transparent`}
                  >
                    {syllabusComparison.units.overallMatchPercentage}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right dark:text-[#E0E0E0]">Alto</TableCell>
              </TableRow>
              <TableRow className="dark:border-[#2A2A2A]">
                <TableCell className="dark:text-[#E0E0E0]">Bibliografía</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`${getSimilarityBg(syllabusComparison.bibliography.matchPercentage)} ${getSimilarityColor(
                      syllabusComparison.bibliography.matchPercentage,
                    )} dark:border-transparent`}
                  >
                    {syllabusComparison.bibliography.matchPercentage}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right dark:text-[#E0E0E0]">Medio</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
