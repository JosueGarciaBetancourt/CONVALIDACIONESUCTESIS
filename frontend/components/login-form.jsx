"use client"

import * as ReactRouterDOM from "react-router-dom"
import React from "react"

// Componente de formulario de inicio de sesión
const LoginForm = () => {
  const navigate = ReactRouterDOM.useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulación de inicio de sesión
    setTimeout(() => {
      const email = e.target.email.value
      const password = e.target.password.value

      // Validación simple
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("isAuthenticated", "true")
        navigate("/")
      } else {
        setError("Credenciales inválidas. Intente de nuevo.")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ingrese sus credenciales para acceder al sistema</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/50 dark:text-red-300">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-blue-600"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  )
}
