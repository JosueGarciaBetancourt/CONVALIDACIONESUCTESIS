import Link from "next/link"
// Componente de encabezado del dashboard
const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al sistema de convalidación de cursos</p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/validations/new"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
            <line x1="12" x2="12" y1="11" y2="17"></line>
            <line x1="9" x2="15" y1="14" y2="14"></line>
          </svg>
          Nueva Validación
        </Link>
      </div>
    </div>
  )
}
