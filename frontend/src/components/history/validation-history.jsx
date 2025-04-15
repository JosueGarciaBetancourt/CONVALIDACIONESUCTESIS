"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Download, Eye, FileText, Search } from "lucide-react"

export function ValidationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const validations = [
    {
      id: "VAL-2023-0125",
      studentName: "Carlos Mendoza",
      studentId: "20210389",
      university: "Universidad Nacional Mayor de San Marcos",
      status: "completed",
      date: "2023-04-12",
      courses: 8,
      approvedCourses: 4,
      rejectedCourses: 2,
      pendingCourses: 2,
    },
    {
      id: "VAL-2023-0124",
      studentName: "María Fernández",
      studentId: "20210456",
      university: "Universidad de Lima",
      status: "completed",
      date: "2023-04-10",
      courses: 6,
      approvedCourses: 5,
      rejectedCourses: 1,
      pendingCourses: 0,
    },
    {
      id: "VAL-2023-0123",
      studentName: "Juan Pérez",
      studentId: "20210123",
      university: "Pontificia Universidad Católica del Perú",
      status: "completed",
      date: "2023-04-08",
      courses: 4,
      approvedCourses: 3,
      rejectedCourses: 1,
      pendingCourses: 0,
    },
    {
      id: "VAL-2023-0122",
      studentName: "Ana García",
      studentId: "20210234",
      university: "Universidad Peruana de Ciencias Aplicadas",
      status: "completed",
      date: "2023-04-05",
      courses: 5,
      approvedCourses: 4,
      rejectedCourses: 1,
      pendingCourses: 0,
    },
    {
      id: "VAL-2023-0121",
      studentName: "Luis Torres",
      studentId: "20210567",
      university: "Universidad Nacional de Ingeniería",
      status: "in_progress",
      date: "2023-04-03",
      courses: 7,
      approvedCourses: 2,
      rejectedCourses: 1,
      pendingCourses: 4,
    },
    {
      id: "VAL-2023-0120",
      studentName: "Sofía Ramírez",
      studentId: "20210678",
      university: "Universidad del Pacífico",
      status: "in_progress",
      date: "2023-04-01",
      courses: 6,
      approvedCourses: 0,
      rejectedCourses: 0,
      pendingCourses: 6,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
          >
            Completado
          </Badge>
        )
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
          >
            En Progreso
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const filteredValidations = validations.filter((validation) => {
    const matchesSearch =
      validation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      validation.studentId.includes(searchTerm) ||
      validation.id.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || validation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Convalidaciones</CardTitle>
        <CardDescription>Busque y consulte el historial completo de convalidaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-full items-center space-x-2 md:w-2/3">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre, código o ID de convalidación..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full items-center space-x-2 md:w-1/3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                  <SelectItem value="in_progress">En Progreso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Universidad</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Fecha</TableHead>
                  <TableHead className="text-center">Cursos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredValidations.length > 0 ? (
                  filteredValidations.map((validation) => (
                    <TableRow key={validation.id}>
                      <TableCell className="font-medium">{validation.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{validation.studentName}</p>
                          <p className="text-xs text-muted-foreground">{validation.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{validation.university}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(validation.status)}</TableCell>
                      <TableCell className="text-center">{validation.date}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col">
                          <span className="font-medium">{validation.courses} total</span>
                          <div className="flex justify-center gap-1 text-xs text-muted-foreground">
                            <span className="text-green-600">{validation.approvedCourses} ✓</span>
                            <span>|</span>
                            <span className="text-red-600">{validation.rejectedCourses} ✗</span>
                            {validation.pendingCourses > 0 && (
                              <>
                                <span>|</span>
                                <span className="text-yellow-600">{validation.pendingCourses} ?</span>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/validations/report/${validation.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Ver</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <p className="text-lg font-medium">No se encontraron resultados</p>
                        <p className="text-sm text-muted-foreground">
                          No hay convalidaciones que coincidan con los criterios de búsqueda
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
