"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { UniversitiesList } from "@/components/universities/universities-list"
import { UniversityDetailsDialog } from "@/components/universities/university-details-dialog"

export function UniversitiesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(null)

  // Datos simulados de universidades
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "Universidad Nacional Mayor de San Marcos",
      acronym: "UNMSM",
      country: "Perú",
      city: "Lima",
      type: "Pública",
      website: "https://www.unmsm.edu.pe",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Pontificia Universidad Católica del Perú",
      acronym: "PUCP",
      country: "Perú",
      city: "Lima",
      type: "Privada",
      website: "https://www.pucp.edu.pe",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Universidad Nacional de Ingeniería",
      acronym: "UNI",
      country: "Perú",
      city: "Lima",
      type: "Pública",
      website: "https://www.uni.edu.pe",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Universidad Peruana Cayetano Heredia",
      acronym: "UPCH",
      country: "Perú",
      city: "Lima",
      type: "Privada",
      website: "https://www.cayetano.edu.pe",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Universidad del Pacífico",
      acronym: "UP",
      country: "Perú",
      city: "Lima",
      type: "Privada",
      website: "https://www.up.edu.pe",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleAddUniversity = () => {
    setSelectedUniversity(null)
    setIsDialogOpen(true)
  }

  const handleEditUniversity = (university) => {
    setSelectedUniversity(university)
    setIsDialogOpen(true)
  }

  const handleSaveUniversity = (universityData) => {
    if (selectedUniversity) {
      // Editar universidad existente
      setUniversities(
        universities.map((univ) => (univ.id === selectedUniversity.id ? { ...univ, ...universityData } : univ)),
      )
    } else {
      // Agregar nueva universidad
      const newUniversity = {
        id: universities.length + 1,
        ...universityData,
        logo: "/placeholder.svg?height=40&width=40",
      }
      setUniversities([...universities, newUniversity])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteUniversity = (id) => {
    setUniversities(universities.filter((univ) => univ.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Universidades</h2>
          <p className="text-sm text-muted-foreground">
            Gestione las universidades para el proceso de convalidación de cursos
          </p>
        </div>
        <Button onClick={handleAddUniversity}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Universidad
        </Button>
      </div>

      <UniversitiesList universities={universities} onEdit={handleEditUniversity} onDelete={handleDeleteUniversity} />

      <UniversityDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        university={selectedUniversity}
        onSave={handleSaveUniversity}
      />
    </div>
  )
}
