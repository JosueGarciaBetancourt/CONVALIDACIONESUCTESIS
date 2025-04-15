"use client"

import * as ReactRouterDOM from "react-router-dom"
import ThemeToggle from "./theme-toggle"

// Componente de navegación de usuario
const UserNav = () => {
  const navigate = ReactRouterDOM.useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          className="flex items-center gap-2 rounded-full bg-gray-100 p-1 px-2 text-sm font-medium dark:bg-gray-800"
          onClick={handleLogout}
        >
          <span className="hidden md:inline">Cerrar sesión</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
