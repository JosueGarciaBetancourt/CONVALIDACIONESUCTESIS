"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, Home, Search, Settings, BookOpen } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/validations",
      label: "Convalidaciones",
      icon: FileText,
      active: pathname.includes("/validations"),
    },
    {
      href: "/courses",
      label: "Cursos",
      icon: BookOpen,
      active: pathname.includes("/courses"),
    },
    {
      href: "/history",
      label: "Historial",
      icon: Search,
      active: pathname.includes("/history"),
    },
    {
      href: "/settings",
      label: "Configuración",
      icon: Settings,
      active: pathname.includes("/settings"),
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="font-bold text-xl">ConvaliNLP</span>
      </Link>
      <div className="flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
