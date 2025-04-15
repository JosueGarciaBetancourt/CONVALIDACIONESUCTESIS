"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { FileUp, Loader2, Upload } from "lucide-react"
import { StudentInfoForm } from "@/components/validations/student-info-form"
import { ExtractedCoursesTable } from "@/components/validations/extracted-courses-table"

export function DocumentUploadForm() {
  const [activeTab, setActiveTab] = useState("student-info")
  const [isLoading, setIsLoading] = useState(false)
  const [transcriptUploaded, setTranscriptUploaded] = useState(false)
  const [syllabiUploaded, setSyllabiUploaded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleTranscriptUpload = () => {
    setIsLoading(true)
    // Simulate document processing
    setTimeout(() => {
      setIsLoading(false)
      setTranscriptUploaded(true)
      toast({
        title: "Documento procesado",
        description: "Se han extraído 8 cursos de la boleta de notas",
      })
    }, 2000)
  }

  const handleSyllabiUpload = () => {
    setIsLoading(true)
    // Simulate document processing
    setTimeout(() => {
      setIsLoading(false)
      setSyllabiUploaded(true)
      toast({
        title: "Sílabos procesados",
        description: "Se han procesado 8 sílabos correctamente",
      })
    }, 2000)
  }

  const handleContinue = () => {
    if (activeTab === "student-info") {
      // Aquí deberíamos verificar si hay un estudiante seleccionado
      // Para esta demo, simplemente continuamos
      setActiveTab("transcript")
    } else if (activeTab === "transcript" && transcriptUploaded) {
      setActiveTab("syllabi")
    } else if (activeTab === "syllabi" && syllabiUploaded) {
      router.push("/validations/review/VAL-2023-0125")
    }
  }

  return (
    <Card className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student-info">Información del Estudiante</TabsTrigger>
          <TabsTrigger value="transcript" disabled={activeTab === "student-info"}>
            Boleta de Notas
          </TabsTrigger>
          <TabsTrigger value="syllabi" disabled={!transcriptUploaded || activeTab === "student-info"}>
            Sílabos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student-info">
          <StudentInfoForm />
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Cancelar
            </Button>
            <Button onClick={handleContinue}>Continuar</Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="transcript">
          <CardHeader>
            <CardTitle>Boleta de Notas</CardTitle>
            <CardDescription>Suba la boleta de notas del estudiante para extraer los cursos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!transcriptUploaded ? (
              <div className="grid w-full gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <FileUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col space-y-1 text-center">
                      <h3 className="text-lg font-semibold">Arrastre el archivo o haga clic para seleccionar</h3>
                      <p className="text-sm text-muted-foreground">Soporta archivos PDF, JPG o PNG</p>
                    </div>
                    <Input id="transcript" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    <Button onClick={handleTranscriptUpload} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Subir Boleta
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <ExtractedCoursesTable />
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" onClick={() => setActiveTab("student-info")}>
              Atrás
            </Button>
            <Button onClick={handleContinue} disabled={!transcriptUploaded}>
              Continuar
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="syllabi">
          <CardHeader>
            <CardTitle>Sílabos de Cursos</CardTitle>
            <CardDescription>Suba los sílabos de los cursos para el análisis de similitud</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!syllabiUploaded ? (
              <div className="grid w-full gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <FileUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col space-y-1 text-center">
                      <h3 className="text-lg font-semibold">Arrastre los archivos o haga clic para seleccionar</h3>
                      <p className="text-sm text-muted-foreground">Soporta múltiples archivos PDF o TXT</p>
                    </div>
                    <Input id="syllabi" type="file" className="hidden" accept=".pdf,.txt" multiple />
                    <Button onClick={handleSyllabiUpload} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Subir Sílabos
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Sílabos procesados correctamente</h3>
                    <p className="text-sm text-muted-foreground">
                      Se han procesado 8 sílabos y están listos para el análisis de similitud
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <FileUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" onClick={() => setActiveTab("transcript")}>
              Atrás
            </Button>
            <Button onClick={handleContinue} disabled={!syllabiUploaded}>
              Continuar a Revisión
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
