"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Settings } from "lucide-react"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
        aria-label="Open user menu"
      >
        <User className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <div className="border-b px-2 py-2">
              <p className="text-sm font-medium">Administrador</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
            <div className="mt-2 space-y-1">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
