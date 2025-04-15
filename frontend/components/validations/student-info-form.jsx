"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Loader2, Search, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Datos simulados de universidades
const UNIVERSITIES = [
  {
    id: "1",
    name: "Universidad Nacional Mayor de San Marcos",
    acronym: "UNMSM",
    country: "Perú",
    city: "Lima",
  },
  {
    id: "2",
    name: "Pontificia Universidad Católica del Perú",
    acronym: "PUCP",
    country: "Perú",
    city: "Lima",
  },
  {
    id: "3",
    name: "Universidad Nacional de Ingeniería",
    acronym: "UNI",
    country: "Perú",
    city: "Lima",
  },
]

// Datos simulados de carreras
const CAREERS = [
  {
    id: "1",
    name: "Ingeniería de Software",
    universityId: "1",
  },
  {
    id: "2",
    name: "Ciencias de la Computación",
    universityId: "2",
  },
  {
    id: "3",
    name: "Ingeniería de Sistemas",
    universityId: "3",
  },
  {
    id: "4",
    name: "Ingeniería Informática",
    universityId: "1",
  },
  {
    id: "5",
    name: "Ingeniería de Computación",
    universityId: "2",
  },
]

// Datos simulados de mallas curriculares
const CURRICULUMS = [
  {
    id: "1",
    name: "Malla 2020",
    year: "2020",
    universityId: "1",
    careerId: "1",
  },
  {
    id: "2",
    name: "Malla 2021",
    year: "2021",
    universityId: "2",
    careerId: "2",
  },
  {
    id: "3",
    name: "Malla 2019",
    year: "2019",
    universityId: "3",
    careerId: "3",
  },
  {
    id: "4",
    name: "Malla 2022",
    year: "2022",
    universityId: "1",
    careerId: "4",
  },
]

// Datos simulados de estudiantes para la demostración
const ESTUDIANTES_MOCK = [
  {
    id: "1",
    codigo: "20210123",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@ejemplo.com",
    universityId: "1",
    careerId: "1",
    curriculumId: "1",
    semestre: "2023-1",
  },
  {
    id: "2",
    codigo: "20210456",
    nombre: "María",
    apellido: "Fernández",
    email: "maria.fernandez@ejemplo.com",
    universityId: "2",
    careerId: "2",
    curriculumId: "2",
    semestre: "2023-2",
  },
  {
    id: "3",
    codigo: "20210789",
    nombre: "Carlos",
    apellido: "Mendoza",
    email: "carlos.mendoza@ejemplo.com",
    universityId: "3",
    careerId: "3",
    curriculumId: "3",
    semestre: "2024-1",
  },
]

export function StudentInfoForm() {
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [openCombobox, setOpenCombobox] = useState(false)
  const { toast } = useToast()
  const [universityFilter, setUniversityFilter] = useState("all")

  // Formulario para nuevo estudiante
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    universityId: "",
    careerId: "",
    curriculumId: "",
    semester: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id, value) => {
    if (id === "universityId") {
      // Reset career and curriculum when university changes
      setFormData((prev) => ({ ...prev, [id]: value, careerId: "", curriculumId: "" }))
    } else if (id === "careerId") {
      // Reset curriculum when career changes
      setFormData((prev) => ({ ...prev, [id]: value, curriculumId: "" }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    // Simular búsqueda en la base de datos
    setTimeout(() => {
      setIsSearching(false)
      // Si no se encuentra, mostrar mensaje
      if (
        searchQuery &&
        !ESTUDIANTES_MOCK.some(
          (student) =>
            student.codigo.includes(searchQuery) ||
            student.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.apellido.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      ) {
        toast({
          title: "Estudiante no encontrado",
          description: "No se encontró ningún estudiante con los datos proporcionados",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  const handleSelectExistingStudent = (student) => {
    setSelectedStudent(student)
    setOpenCombobox(false)
    toast({
      title: "Estudiante seleccionado",
      description: `Se ha seleccionado a ${student.nombre} ${student.apellido} para la convalidación`,
    })
  }

  const handleCreateNewStudent = () => {
    // Aquí iría la lógica para crear un nuevo estudiante
    toast({
      title: "Estudiante creado",
      description: `Se ha creado el estudiante ${formData.firstName} ${formData.lastName} correctamente`,
    })
    // Simular la creación y selección del nuevo estudiante
    const newStudent = {
      id: Math.random().toString(36).substring(7),
      codigo: formData.studentId,
      nombre: formData.firstName,
      apellido: formData.lastName,
      email: formData.email,
      universityId: formData.universityId,
      careerId: formData.careerId,
      curriculumId: formData.curriculumId,
      semestre: formData.semester,
    }
    setSelectedStudent(newStudent)
    setActiveTab("search") // Volver a la pestaña de búsqueda
  }

  const filteredStudents = ESTUDIANTES_MOCK.filter((student) => {
    const matchesQuery =
      student.codigo.includes(searchQuery) ||
      student.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesUniversity = universityFilter === "all" || student.universityId === universityFilter

    return matchesQuery && matchesUniversity
  })

  // Filtrar carreras basadas en la universidad seleccionada
  const filteredCareers = CAREERS.filter((career) => career.universityId === formData.universityId)

  // Filtrar mallas curriculares basadas en la universidad y carrera seleccionadas
  const filteredCurriculums = CURRICULUMS.filter(
    (curriculum) => curriculum.universityId === formData.universityId && curriculum.careerId === formData.careerId,
  )

  // Obtener detalles de universidad, carrera y malla curricular para el estudiante seleccionado
  const getUniversityName = (id) => {
    const university = UNIVERSITIES.find((uni) => uni.id === id)
    return university ? university.name : "No especificada"
  }

  const getCareerName = (id) => {
    const career = CAREERS.find((car) => car.id === id)
    return career ? career.name : "No especificada"
  }

  const getCurriculumName = (id) => {
    const curriculum = CURRICULUMS.find((curr) => curr.id === id)
    return curriculum ? curriculum.name : "No especificada"
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Información del Estudiante</CardTitle>
        <CardDescription>Busque un estudiante existente o ingrese los datos para un nuevo estudiante</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Buscar Estudiante</TabsTrigger>
            <TabsTrigger value="create">Crear Nuevo</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6 pt-4">
            {!selectedStudent ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por DNI o nombre..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select onValueChange={(value) => setUniversityFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Universidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {UNIVERSITIES.map((university) => (
                        <SelectItem key={university.id} value={university.id}>
                          {university.acronym}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Buscar
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between"
                      >
                        {selectedStudent
                          ? `${selectedStudent.nombre} ${selectedStudent.apellido} (${selectedStudent.codigo})`
                          : "Seleccione un estudiante..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar estudiante..." />
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron estudiantes.
                            <Button variant="link" className="mt-2 w-full" onClick={() => setActiveTab("create")}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Crear nuevo estudiante
                            </Button>
                          </CommandEmpty>
                          <CommandGroup>
                            {filteredStudents.map((student) => (
                              <CommandItem
                                key={student.id}
                                value={`${student.nombre} ${student.apellido} ${student.codigo}`}
                                onSelect={() => handleSelectExistingStudent(student)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedStudent?.id === student.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>
                                    {student.nombre} {student.apellido}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {student.codigo} • {student.email}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            ) : (
              <div className="rounded-md border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Datos del Estudiante</h3>
                  <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                    Cambiar Estudiante
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">DNI:</p>
                    <p className="text-sm">{selectedStudent.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nombre Completo:</p>
                    \
