"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, FileText, Info, ThumbsDown, ThumbsUp, XCircle } from "lucide-react"
import { SimilarityDetailsDialog } from "@/components/validations/similarity-details-dialog"

export function CourseComparisonCard({ course, onApprove, onReject, isApproved = false, isRejected = false }) {
  const [showDetails, setShowDetails] = useState(false)

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
    <>
      <Card
        className={`border-l-4 ${
          isApproved
            ? "border-l-[#00C896] dark:border-l-[#00C896]"
            : isRejected
              ? "border-l-[#FF5F5F] dark:border-l-[#FF5F5F]"
              : course.similarity >= 85
                ? "border-l-green-500 dark:border-l-[#00C853]"
                : course.similarity >= 70
                  ? "border-l-yellow-500 dark:border-l-[#FFD600]"
                  : "border-l-red-500 dark:border-l-[#FF5252]"
        }`}
      >
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Original Course */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground dark:text-[#A0A0A0]" />
                <h3 className="font-medium">Curso Original</h3>
              </div>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm font-semibold">{course.originalCode}</p>
                <p className="text-sm">{course.originalName}</p>
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
              <Progress value={course.similarity} className="h-2 w-full max-w-[150px]" />

              <Button
                variant="ghost"
                size="sm"
                className="text-xs dark:text-[#E0E0E0] dark:hover:bg-[#2D2D2D]"
                onClick={() => setShowDetails(true)}
              >
                <Info className="mr-1 h-3 w-3" />
                Ver detalles de similitud
              </Button>

              {!isApproved && !isRejected && (
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#00C896] bg-[#00C896]/10 text-[#00C896] hover:bg-[#00E6AA]/20 hover:text-[#00E6AA] dark:border-[#00C896] dark:bg-[#00C896]/10 dark:text-[#00C896] dark:hover:bg-[#00E6AA]/20 dark:hover:text-[#00E6AA] dark:hover:border-[#00E6AA]"
                    onClick={onApprove}
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#FF5F5F] bg-[#FF5F5F]/10 text-[#FF5F5F] hover:bg-[#FF7777]/20 hover:text-[#FF7777] dark:border-[#FF5F5F] dark:bg-[#FF5F5F]/10 dark:text-[#FF5F5F] dark:hover:bg-[#FF7777]/20 dark:hover:text-[#FF7777] dark:hover:border-[#FF7777]"
                    onClick={onReject}
                  >
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    Rechazar
                  </Button>
                </div>
              )}

              {isApproved && (
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 rounded-md bg-[#00C896]/10 px-2 py-1 text-[#00C896] dark:bg-[#00C896]/10 dark:text-[#00C896]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Aprobado</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs dark:text-[#E0E0E0] dark:hover:bg-[#2D2D2D]"
                    onClick={onReject}
                  >
                    Deshacer
                  </Button>
                </div>
              )}

              {isRejected && (
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 rounded-md bg-[#FF5F5F]/10 px-2 py-1 text-[#FF5F5F] dark:bg-[#FF5F5F]/10 dark:text-[#FF5F5F]">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Rechazado</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs dark:text-[#E0E0E0] dark:hover:bg-[#2D2D2D]"
                    onClick={onApprove}
                  >
                    Deshacer
                  </Button>
                </div>
              )}
            </div>

            {/* Target Course */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground dark:text-[#A0A0A0]" />
                <h3 className="font-medium">Curso Equivalente</h3>
              </div>
              <div className="rounded-md bg-muted p-3 dark:bg-[#2A2A2A]">
                <p className="text-sm font-semibold">{course.targetCode}</p>
                <p className="text-sm">{course.targetName}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SimilarityDetailsDialog course={course} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}
