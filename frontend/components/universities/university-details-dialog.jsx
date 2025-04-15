"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UniversityForm } from "@/components/universities/university-form"

export function UniversityDetailsDialog({ open, onOpenChange, university, onSave }) {
  const isEditing = !!university

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Universidad" : "Agregar Universidad"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifique los datos de la universidad y guarde los cambios."
              : "Complete el formulario para agregar una nueva universidad al sistema."}
          </DialogDescription>
        </DialogHeader>
        <UniversityForm university={university} onSave={onSave} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
