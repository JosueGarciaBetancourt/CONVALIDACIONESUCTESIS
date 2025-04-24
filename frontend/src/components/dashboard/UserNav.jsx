"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Settings } from "lucide-react"

export function UserNav() {
  // Estado para manejar la visibilidad del menú
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="relative">
      {/* Información del usuario */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-left space-y-2">
          <p className="text-white text-sm font-medium">Administrador</p>
          <p className="text-white text-xs text-muted-foreground">admin@example.com</p>
        </div>
       
        {/* Botón para abrir el menú de usuario */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-white cursor-pointer"
          aria-label="Open user menu"
        >
          <User className="h-4 w-4" />
        </button>
      </div>

      {/* Menú de usuario, solo visible cuando isOpen es true */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border bg-card shadow-lg ring-1 ring-gray-950 ring-opacity-5 focus:outline-none">
          <div className="p-2 bg-gray-950">
            {/* Información de usuario en el menú */}
            <div className="border-b px-2 py-2">
              <p className="text-white text-sm font-medium">Administrador</p>
              <p className="text-white text-xs text-muted-foreground">admin@example.com</p>
            </div>

            {/* Opciones de configuración y cerrar sesión */}
            <div className="mt-2 space-y-1">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">
                <Settings className="text-white h-4 w-4" />
                <span className="text-white">Configuración</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="text-white h-4 w-4" />
                <span className="text-white">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav
