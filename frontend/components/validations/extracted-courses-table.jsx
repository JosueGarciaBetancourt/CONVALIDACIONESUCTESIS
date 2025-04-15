"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2, Save } from "lucide-react"

export function ExtractedCoursesTable() {
  const [courses, setCourses] = useState([
    { id: 1, code: "CS101", name: "Introducción a la Programación", grade: "16", credits: "4", editing: false },
    { id: 2, code: "CS102", name: "Estructuras de Datos", grade: "15", credits: "4", editing: false },
    { id: 3, code: "CS201", name: "Algoritmos Avanzados", grade: "17", credits: "4", editing: false },
    { id: 4, code: "CS202", name: "Bases de Datos", grade: "18", credits: "4", editing: false },
    { id: 5, code: "CS301", name: "Ingeniería de Software", grade: "16", credits: "4", editing: false },
    { id: 6, code: "CS302", name: "Inteligencia Artificial", grade: "15", credits: "4", editing: false },
    { id: 7, code: "CS401", name: "Redes de Computadoras", grade: "14", credits: "3", editing: false },
    { id: 8, code: "CS402", name: "Sistemas Operativos", grade: "16", credits: "3", editing: false },
  ])

  const toggleEdit = (id) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, editing: !course.editing } : course)))
  }

  const updateCourse = (id, field, value) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Nombre del Curso</TableHead>
            <TableHead className="w-[80px] text-center">Nota</TableHead>
            <TableHead className="w-[80px] text-center">Créditos</TableHead>
            <TableHead className="w-[100px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                {course.editing ? (
                  <Input
                    value={course.code}
                    onChange={(e) => updateCourse(course.id, "code", e.target.value)}
                    className="h-8 w-full"
                  />
                ) : (
                  course.code
                )}
              </TableCell>
              <TableCell>
                {course.editing ? (
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    className="h-8 w-full"
                  />
                ) : (
                  course.name
                )}
              </TableCell>
              <TableCell className="text-center">
                {course.editing ? (
                  <Input
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    className="h-8 w-full text-center"
                  />
                ) : (
                  course.grade
                )}
              </TableCell>
              <TableCell className="text-center">
                {course.editing ? (
                  <Input
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                    className="h-8 w-full text-center"
                  />
                ) : (
                  course.credits
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => toggleEdit(course.id)}>
                  {course.editing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
