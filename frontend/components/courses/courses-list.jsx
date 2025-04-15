"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Eye, Search, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CourseDetailsDialog } from "@/components/courses/course-details-dialog"

export function CoursesList({ courses, onEdit, onDelete, onToggleStatus }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Get unique departments
  const departments = Array.from(new Set(courses.map((course) => course.department)))

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && course.active) ||
      (statusFilter === "inactive" && !course.active)

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleViewDetails = (course) => {
    setSelectedCourse(course)
    setShowDetails(true)
  }

  const handleDeleteClick = (id) => {
    setCourseToDelete(id)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      onDelete(courseToDelete)
      setCourseToDelete(null)
    }
  }

  return (
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-center">Créditos</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell className="text-center">
                    {course.active ? (
                      <Badge
                        variant="outline"
                        className="bg-[#00C896]/10 text-[#00C896] border-[#00C896]/30 dark:bg-[#00C896]/10 dark:text-[#00C896] dark:border-[#00C896]/30"
                      >
                        Activo
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                      >
                        Inactivo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(course)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(course)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onToggleStatus(course.id)}>
                        {course.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                        <span className="sr-only">Cambiar estado</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(course.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-lg font-medium">No se encontraron cursos</p>
                    <p className="text-sm text-muted-foreground">
                      No hay cursos que coincidan con los criterios de búsqueda
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <CourseDetailsDialog course={selectedCourse} open={showDetails} onOpenChange={setShowDetails} />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar este curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El curso será eliminado permanentemente del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
