"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit2, MoreHorizontal, Search, Trash2 } from "lucide-react"

export function UniversitiesList({ universities, onEdit, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar universidad..."
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
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Universidad</TableHead>
              <TableHead>Siglas</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUniversities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron universidades
                </TableCell>
              </TableRow>
            ) : (
              filteredUniversities.map((university) => (
                <TableRow key={university.id}>
                  <TableCell>
                    <img
                      src={university.logo || "/placeholder.svg"}
                      alt={university.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{university.name}</TableCell>
                  <TableCell>{university.acronym}</TableCell>
                  <TableCell>{university.country}</TableCell>
                  <TableCell>{university.city}</TableCell>
                  <TableCell>{university.type}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(university)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(university.id)}>
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
  )
}
