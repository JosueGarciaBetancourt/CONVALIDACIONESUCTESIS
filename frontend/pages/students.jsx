const StudentsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estudiantes</h1>
          <p className="text-muted-foreground">Gestiona los estudiantes en el sistema</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
          Agregar Estudiante
        </button>
      </div>
      <div className="rounded-lg border bg-card shadow">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Lista de Estudiantes</h3>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">Implementación pendiente...</p>
        </div>
      </div>
    </div>
  )
}
