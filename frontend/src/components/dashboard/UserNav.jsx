"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Settings } from "lucide-react"
import { logout } from '../../services/auth'
import { getAuthenticatedUser } from '../../services/users'

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Cargar usuario logueado al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getAuthenticatedUser()
        setUser(userData)
      } catch (err) {
        console.error("Error cargando usuario logeado:", err)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      const res = await logout();
      console.log(res);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-left space-y-2">
          <p className="text-white text-sm font-medium">
            {user ? user.name : 'Cargando...'}
          </p>
          <p className="text-white text-xs text-muted-foreground">
            {user ? user.email : ''}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-white cursor-pointer"
          aria-label="Open user menu"
        >
          <User className="h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border bg-card shadow-lg ring-1 ring-gray-950 ring-opacity-5 focus:outline-none">
          <div className="p-2 bg-gray-950">
            <div className="mt-2 space-y-1">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <Settings className="text-white h-4 w-4" />
                <span className="text-white">Configuración</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
