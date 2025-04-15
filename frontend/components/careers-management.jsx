"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, MoreHorizontal, PlusCircle, Search, Trash2 } from "lucide-react"

export function CareersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    faculty: "",
    university: "",
    degree: "Bachiller",
  })

  // Datos simulados de carreras
  const [careers, setCareers] = useState([
    {
      id: 1,
      name: "Ingeniería de Software",
      code: "IS",
      faculty: "Facultad de Ingeniería de Sistemas e Informática",
      university: "Universidad Nacional Mayor de San Marcos",
      degree: "Bachiller",
    },
    {
      id: 2,
      name: "Ciencias de la Computación",
      code: "CC",
      faculty: "Facultad de Ciencias",
      university: "Pontificia Universidad Católica del Perú",
      degree: "Bachiller",
      active: true,
    },
    {
      id: 3,
      name: "Ingeniería de Sistemas",
      code: "SIS",
      faculty: "Facultad de Ingeniería",
      university: "Universidad Nacional de Ingeniería",
      degree: "Bachiller",
      active: true,
    },
    {
      id: 4,
      name: "Ingeniería Informática",
      code: "INF",
      faculty: "Facultad de Ciencias e Ingeniería",
      university: "Pontificia Universidad Católica del Perú",
      degree: "Bachiller",
    },
    {
      id: 5,
      name: "Ingeniería de Telecomunicaciones",
      code: "TEL",
      faculty: "Facultad de Ingeniería Eléctrica y Electrónica",
      university: "Universidad Nacional de Ingeniería",
      degree: "Bachiller",
    },
  ])

  // Datos simulados de universidades
  const universities = [
    { id: 1, name: "Universidad Nacional Mayor de San Marcos" },
    { id: 2, name: "Pontificia Universidad Católica del Perú" },
    { id: 3, name: "Universidad Nacional de Ingeniería" },
    { id: 4, name: "Universidad Peruana Cayetano Heredia" },
    { id: 5, name: "Universidad del Pacífico" },
  ]

  const filteredCareers = careers.filter(
    (career) =>
      career.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.university.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCareer = () => {
    setSelectedCareer(null)
    setFormData({
      name: "",
      code: "",
      faculty: "",
      university: "",
      degree: "Bachiller",
    })
    setIsDialogOpen(true)
  }

  const handleEditCareer = (career) => {
    setSelectedCareer(career)
    setFormData({
      name: career.name,
      code: career.code,
      faculty: career.faculty,
      university: career.university,
      degree: career.degree,
    })
    setIsDialogOpen(true)
  }

  const handleSaveCareer = (e) => {
    e.preventDefault()

    if (selectedCareer) {
      // Editar carrera existente
      setCareers(careers.map((career) => (career.id === selectedCareer.id ? { ...career, ...formData } : career)))
    } else {
      // Agregar nueva carrera
      const newCareer = {
        id: careers.length + 1,
        ...formData,
      }
      setCareers([...careers, newCareer])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteCareer = (id) => {
    setCareers(careers.filter((career) => career.id !== id))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Carreras Universitarias</CardTitle>
            <CardDescription>Gestione las carreras para el proceso de convalidación</CardDescription>
          </div>
          <Button onClick={handleAddCareer}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Carrera
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar carrera..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Facultad</TableHead>
                    <TableHead>Universidad</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead className="w-[100px] text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCareers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No se encontraron carreras
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCareers.map((career) => (
                      <TableRow key={career.id}>
                        <TableCell className="font-medium">{career.code}</TableCell>
                        <TableCell>{career.name}</TableCell>
                        <TableCell>{career.faculty}</TableCell>
                        <TableCell>{career.university}</TableCell>
                        <TableCell>{career.degree}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCareer(career)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteCareer(career.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCareer ? "Editar Carrera" : "Agregar Carrera"}</DialogTitle>
            <DialogDescription>
              {selectedCareer
                ? "Modifique los datos de la carrera y guarde los cambios."
                : "Complete el formulario para agregar una nueva carrera al sistema."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCareer} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Carrera</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faculty">Facultad</Label>
                <Input
                  id="faculty"
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">Universidad</Label>
                <Select
                  value={formData.university}
                  onValueChange={(value) => setFormData({ ...formData, university: value })}
                >
                  <SelectTrigger id="university">
                    <SelectValue placeholder="Seleccione la universidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((university) => (
                      <SelectItem key={university.id} value={university.name}>
                        {university.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Grado</Label>
                <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                  <SelectTrigger id="degree">
                    <SelectValue placeholder="Seleccione el grado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachiller">Bachiller</SelectItem>
                    <SelectItem value="Licenciado">Licenciado</SelectItem>
                    <SelectItem value="Magíster">Magíster</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
