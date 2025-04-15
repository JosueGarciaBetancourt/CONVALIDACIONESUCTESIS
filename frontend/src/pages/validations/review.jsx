"use client"

import * as ReactRouterDOM from "react-router-dom"
// import { validators } from "tailwind-merge"

// Página de revisión de validación
const ValidationReviewPage = () => {
  // Obtener el ID de la validación de la URL
  const params = ReactRouterDOM.useParams()
  const validationId = params.id

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revisión de Validación #{validationId}</h1>
          <p className="text-muted-foreground">Revisa y valida los cursos del estudiante</p>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
              className="mr-2 h-4 w-4"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            Aprobar
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
              className="mr-2 h-4 w-4"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            Rechazar
          </button>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow">
        <h3 className="text-lg font-semibold">Información del Estudiante</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="text-base">Juan Pérez</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Código</p>
            <p className="text-base">20210123</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Universidad de origen</p>
            <p className="text-base">Universidad Nacional</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Carrera</p>
            <p className="text-base">Ingeniería de Sistemas</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card shadow">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Cursos a Validar</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                <th className="px-4 py-3">Curso Origen</th>
                <th className="px-4 py-3">Curso Destino</th>
                <th className="px-4 py-3">Similitud</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <td className="px-4 py-3">Programación I</td>
                <td className="px-4 py-3">Fundamentos de Programación</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "85%" }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">85%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Pendiente
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline dark:text-blue-400">Ver detalles</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <td className="px-4 py-3">Cálculo I</td>
                <td className="px-4 py-3">Matemáticas Avanzadas</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "65%" }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">65%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Pendiente
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline dark:text-blue-400">Ver detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default  ValidationReviewPage
