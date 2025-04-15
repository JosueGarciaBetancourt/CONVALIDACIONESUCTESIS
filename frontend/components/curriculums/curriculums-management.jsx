"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { CurriculumsList } from "@/components/curriculums/curriculums-list"
import { CurriculumForm } from "@/components/curriculums/curriculum-form"
import { useToast } from "@/hooks/use-toast"

export function CurriculumsManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [curriculums, setCurriculums] = useState([
    {
      id: "1",
      name: "Malla 2020",
      code: "IS-2020",
      year: "2020",
      universityId: "1",
      universityName: "Universidad Nacional Mayor de San Marcos",
      careerId: "1",
      careerName: "Ingeniería de Software",
      description: "Malla curricular 2020 para la carrera de Ingeniería de Software.",
      active: true,
    },
    {
      id: "2",
      name: "Malla 2021",
      code: "CC-2021",
      year: "2021",
      universityId: "2",
      universityName: "Pontificia Universidad Católica del Perú",
      careerId: "2",
      careerName: "Ciencias de la Computación",
      description: "Malla curricular 2021 para la carrera de Ciencias de la Computación.",
      active: true,
    },
    {
      id: "3",
      name: "Malla 2019",
      code: "IS-2019",
      year: "2019",
      universityId: "3",
      universityName: "Universidad Nacional de Ingeniería",
      careerId: "3",
      careerName: "Ingeniería de Sistemas",
      description: "Malla curricular 2019 para la carrera de Ingeniería de Sistemas.",
      active: true,
    },
  ])
  const [editingCurriculum, setEditingCurriculum] = useState(null)
  const { toast } = useToast()

  const handleAddCurriculum = (curriculum) => {
    const newCurriculum = {
      ...curriculum,
      id: Math.random().toString(36).substring(7),
    }
    setCurriculums([...curriculums, newCurriculum])
    setActiveTab("list")
    toast({
      title: "Malla curricular agregada",
      description: `La malla curricular ${curriculum.name} ha sido agregada correctamente.`,
    })
  }

  const handleEditCurriculum = (curriculum) => {
    setEditingCurriculum(curriculum)
    setActiveTab("edit")
  }

  const handleUpdateCurriculum = (updatedCurriculum) => {
    setCurriculums(curriculums.map((curr) => (curr.id === updatedCurriculum.id ? updatedCurriculum : curr)))
    setActiveTab("list")
    setEditingCurriculum(null)
    toast({
      title: "Malla curricular actualizada",
      description: `La malla curricular ${updatedCurriculum.name} ha sido actualizada correctamente.`,
    })
  }

  const handleDeleteCurriculum = (id) => {
    setCurriculums(curriculums.filter((curr) => curr.id !== id))
    toast({
      title: "Malla curricular eliminada",
      description: "La malla curricular ha sido eliminada correctamente.",
    })
  }

  const handleToggleStatus = (id) => {
    setCurriculums(curriculums.map((curr) => (curr.id === id ? { ...curr, active: !curr.active } : curr)))
    const curriculum = curriculums.find((curr) => curr.id === id)
    toast({
      title: curriculum?.active ? "Malla curricular desactivada" : "Malla curricular activada",
      description: `La malla curricular ${curriculum?.name} ha sido ${curriculum?.active ? "desactivada" : "activada"} correctamente.`,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mallas Curriculares</CardTitle>
          <CardDescription>Gestione las mallas curriculares disponibles para convalidación</CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditingCurriculum(null)
            setActiveTab("add")
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Malla Curricular
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Mallas Curriculares</TabsTrigger>
            <TabsTrigger value="add">Agregar Malla Curricular</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingCurriculum}>
              Editar Malla Curricular
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <CurriculumsList
              curriculums={curriculums}
              onEdit={handleEditCurriculum}
              onDelete={handleDeleteCurriculum}
              onToggleStatus={handleToggleStatus}
            />
          </TabsContent>

          <TabsContent value="add">
            <CurriculumForm onSubmit={handleAddCurriculum} />
          </TabsContent>

          <TabsContent value="edit">
            {editingCurriculum && (
              <CurriculumForm initialData={editingCurriculum} onSubmit={handleUpdateCurriculum} isEditing={true} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
