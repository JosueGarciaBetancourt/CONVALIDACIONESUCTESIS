import * as ReactRouterDOM from "react-router-dom"
import { Link } from "react-router-dom"

// Componente de barra lateral
const Sidebar = () => {
  const location = ReactRouterDOM.useLocation()

  // Definir los enlaces de navegación
  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: (
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
          className="h-5 w-5"
        >
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
      ),
    },
    {
      title: "Universidades",
      href: "/universities",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M2 22V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v15"></path>
          <path d="M18 22H6a2 2 0 0 1-2-2V4"></path>
          <path d="M22 7H2"></path>
          <path d="M12 2v5"></path>
          <path d="M2 7v15"></path>
          <path d="M22 7v15"></path>
        </svg>
      ),
    },
    {
      title: "Carreras",
      href: "/careers",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
    },
    {
      title: "Mallas Curriculares",
      href: "/curriculums",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
          <path d="M12 11h4"></path>
          <path d="M12 16h4"></path>
          <path d="M8 11h.01"></path>
          <path d="M8 16h.01"></path>
        </svg>
      ),
    },
    {
      title: "Estudiantes",
      href: "/students",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Cursos",
      href: "/courses",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      title: "Nueva Validación",
      href: "/validations/new",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
          <line x1="12" x2="12" y1="11" y2="17"></line>
          <line x1="9" x2="15" y1="14" y2="14"></line>
        </svg>
      ),
    },
    {
      title: "Historial",
      href: "/history",
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M12 8v4l3 3"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
    },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Sistema de Convalidación</h2>
      </div>
      <nav className="grid gap-1 px-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
