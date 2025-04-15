"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { StudentsList } from "@/components/students/students-list"
import { StudentForm } from "@/components/students/student-form"
import { useToast } from "@/hooks/use-toast"
import { Student } from "@/types/student"

// Definición de Student eliminada (ahora es un objeto JS normal)

export function StudentsManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      firstName: "Juan",
      lastName: "Pérez",
      studentId: "20210123",
      email: "juan.perez@ejemplo.com",
      universityId: "1",
      universityName: "Universidad Nacional Mayor de San Marcos",
      careerId: "1",
      careerName: "Ingeniería de Software",
      curriculumId: "1",
      curriculumName: "Malla 2020",
      semester: "2023-1",
      active: true,
    },
    {
      id: "2",
      firstName: "María",
      lastName: "Fernández",
      studentId: "20210456",
      email: "maria.fernandez@ejemplo.com",
      universityId: "2",
      universityName: "Pontificia Universidad Católica del Perú",
      careerId: "2",
      careerName: "Ciencias de la Computación",
      curriculumId: "2",
      curriculumName: "Malla 2021",
      semester: "2023-2",
      active: true,
    },
    {
      id: "3",
      firstName: "Carlos",
      lastName: "Mendoza",
      studentId: "20210789",
      email: "carlos.mendoza@ejemplo.com",
      universityId: "3",
      universityName: "Universidad Nacional de Ingeniería",
      careerId: "3",
      careerName: "Ingeniería de Sistemas",
      curriculumId: "3",
      curriculumName: "Malla 2019",
      semester: "2024-1",
      active: true,
    },
  ])
  const [editingStudent, setEditingStudent] = (useState < Student) | (null > null)
  const { toast } = useToast()

  const handleAddStudent = (student: Omit<Student, "id">) => {
    const newStudent = {
      ...student,
      id: Math.random().toString(36).substring(7),
    }
    setStudents([...students, newStudent])
    setActiveTab("list")
    toast({
      title: "Estudiante agregado",
      description: `El estudiante ${student.firstName} ${student.lastName} ha sido agregado correctamente.`,
    })
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setActiveTab("edit")
  }

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map((stu) => (stu.id === updatedStudent.id ? updatedStudent : stu)))
    setActiveTab("list")
    setEditingStudent(null)
    toast({
      title: "Estudiante actualizado",
      description: `El estudiante ${updatedStudent.firstName} ${updatedStudent.lastName} ha sido actualizado correctamente.`,
    })
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((stu) => stu.id !== id))
    toast({
      title: "Estudiante eliminado",
      description: "El estudiante ha sido eliminado correctamente.",
    })
  }

  const handleToggleStatus = (id: string) => {
    setStudents(students.map((stu) => (stu.id === id ? { ...stu, active: !stu.active } : stu)))
    const student = students.find((stu) => stu.id === id)
    toast({
      title: student?.active ? "Estudiante desactivado" : "Estudiante activado",
      description: `El estudiante ${student?.firstName} ${student?.lastName} ha sido ${student?.active ? "desactivado" : "activado"} correctamente.`,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Estudiantes</CardTitle>
          <CardDescription>Gestione los estudiantes registrados en el sistema</CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditingStudent(null)
            setActiveTab("add")
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Estudiante
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Estudiantes</TabsTrigger>
            <TabsTrigger value="add">Agregar Estudiante</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingStudent}>
              Editar Estudiante
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <StudentsList
              students={students}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onToggleStatus={handleToggleStatus}
            />
          </TabsContent>

          <TabsContent value="add">
            <StudentForm onSubmit={handleAddStudent} />
          </TabsContent>

          <TabsContent value="edit">
            {editingStudent && (
              <StudentForm initialData={editingStudent} onSubmit={handleUpdateStudent} isEditing={true} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
