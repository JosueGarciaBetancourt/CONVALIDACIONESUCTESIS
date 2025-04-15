"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UniversityForm({ university, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    acronym: "",
    country: "Perú",
    city: "",
    type: "Privada",
    website: "",
  })

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || "",
        acronym: university.acronym || "",
        country: university.country || "Perú",
        city: university.city || "",
        type: university.type || "Privada",
        website: university.website || "",
      })
    }
  }, [university])

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la Universidad</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="acronym">Siglas</Label>
          <Input
            id="acronym"
            value={formData.acronym}
            onChange={(e) => handleChange("acronym", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Seleccione el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pública">Pública</SelectItem>
              <SelectItem value="Privada">Privada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://www.ejemplo.com"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
