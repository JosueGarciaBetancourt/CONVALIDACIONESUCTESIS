import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { BarChart3, GraduationCap, History, Home, Library, School, User, FileCheck } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"

export function Sidebar() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/universities", icon: School, label: "Universidades" },
    { href: "/careers", icon: GraduationCap, label: "Carreras" },
    { href: "/curriculums", icon: Library, label: "Mallas Curriculares" },
    { href: "/students", icon: User, label: "Estudiantes" },
    { href: "/courses", icon: BarChart3, label: "Cursos" },
    { href: "/validations/new", icon: FileCheck, label: "Nueva Validación" },
    { href: "/history", icon: History, label: "Historial" },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <School className="h-6 w-6" />
          <span>Convalidaciones</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Admin</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
