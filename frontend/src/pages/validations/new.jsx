const NewValidationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nueva Validación</h1>
        <p className="text-muted-foreground">Crea una nueva solicitud de validación de cursos</p>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Información del Estudiante</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Nombre completo</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
                placeholder="Nombre del estudiante"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Código</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
                placeholder="Código del estudiante"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Universidad de origen</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800">
                <option value="">Seleccionar universidad</option>
                <option value="1">Universidad Nacional</option>
                <option value="2">Universidad Autónoma</option>
                <option value="3">Universidad Tecnológica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Carrera</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800">
                <option value="">Seleccionar carrera</option>
                <option value="1">Ingeniería de Sistemas</option>
                <option value="2">Ingeniería Civil</option>
                <option value="3">Administración de Empresas</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Documentos</h3>
          <div className="rounded-md border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
            <div className="flex flex-col items-center justify-center space-y-2">
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
                className="h-8 w-8 text-gray-400"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M12 12v6"></path>
                <path d="m15 15-3-3-3 3"></path>
              </svg>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  <span>Subir archivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX hasta 10MB</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
            Crear Validación
          </button>
        </div>
      </div>
    </div>
  )
}

export default  NewValidationPage
