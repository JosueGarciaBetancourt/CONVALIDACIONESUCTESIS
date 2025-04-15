"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, X } from "lucide-react"

export function CourseForm({ initialData, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
    credits: initialData?.credits || 4,
    description: initialData?.description || "",
    syllabus: initialData?.syllabus || "",
    learningOutcomes: initialData?.learningOutcomes || "",
    topics: initialData?.topics || [],
    bibliography: initialData?.bibliography || [],
    department: initialData?.department || "",
    active: initialData?.active ?? true,
  })

  const [newTopic, setNewTopic] = useState("")
  const [newBibliography, setNewBibliography] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCreditsChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setFormData({ ...formData, credits: value })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, active: value === "active" })
  }

  const addTopic = () => {
    if (newTopic.trim()) {
      setFormData({ ...formData, topics: [...formData.topics, newTopic.trim()] })
      setNewTopic("")
    }
  }

  const removeTopic = (index: number) => {
    const updatedTopics = [...formData.topics]
    updatedTopics.splice(index, 1)
    setFormData({ ...formData, topics: updatedTopics })
  }

  const addBibliography = () => {
    if (newBibliography.trim()) {
      setFormData({ ...formData, bibliography: [...formData.bibliography, newBibliography.trim()] })
      setNewBibliography("")
    }
  }

  const removeBibliography = (index: number) => {
    const updatedBibliography = [...formData.bibliography]
    updatedBibliography.splice(index, 1)
    setFormData({ ...formData, bibliography: updatedBibliography })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing && initialData) {
      onSubmit({ ...formData, id: initialData.id })
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code">Código del Curso</Label>
          <Input
            id="code"
            name="code"
            placeholder="Ej. INF101"
            value={formData.code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Curso</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ej. Fundamentos de Programación"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="credits">Créditos</Label>
          <Input
            id="credits"
            name="credits"
            type="number"
            min="1"
            max="10"
            value={formData.credits}
            onChange={handleCreditsChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Departamento</Label>
          <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Seleccione un departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ingeniería de Software">Ingeniería de Software</SelectItem>
              <SelectItem value="Ciencias de la Computación">Ciencias de la Computación</SelectItem>
              <SelectItem value="Sistemas de Información">Sistemas de Información</SelectItem>
              <SelectItem value="Matemáticas">Matemáticas</SelectItem>
              <SelectItem value="Ciencias Básicas">Ciencias Básicas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select value={formData.active ? "active" : "inactive"} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccione un estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descripción detallada del curso..."
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="syllabus">Sumilla</Label>
        <Textarea
          id="syllabus"
          name="syllabus"
          placeholder="Sumilla del curso..."
          value={formData.syllabus}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningOutcomes">Resultados de Aprendizaje</Label>
        <Textarea
          id="learningOutcomes"
          name="learningOutcomes"
          placeholder="Resultados de aprendizaje esperados..."
          value={formData.learningOutcomes}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Temas</Label>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Agregar nuevo tema..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())}
              />
              <Button type="button" onClick={addTopic} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {formData.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {topic}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeTopic(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {formData.topics.length === 0 && <p className="text-sm text-muted-foreground">No hay temas agregados</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label>Bibliografía</Label>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Agregar nueva referencia bibliográfica..."
                value={newBibliography}
                onChange={(e) => setNewBibliography(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBibliography())}
              />
              <Button type="button" onClick={addBibliography} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {formData.bibliography.map((book, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                  <span className="text-sm">{book}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeBibliography(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {formData.bibliography.length === 0 && (
                <p className="text-sm text-muted-foreground">No hay referencias bibliográficas agregadas</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Actualizar Curso" : "Guardar Curso"}
        </Button>
      </div>
    </form>
  )
}
