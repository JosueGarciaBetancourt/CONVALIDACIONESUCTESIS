import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NuevaConvalidacion = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [universityFilter, setUniversityFilter] = useState('');

  // Datos de ejemplo (deberías reemplazarlos con tus datos reales)
  const students = [
    { id: 1, name: 'Juan Pérez', dni: '71234567', university: 'UNMSM' },
    { id: 2, name: 'María García', dni: '76543210', university: 'PUCP' },
  ];

  const universities = [
    { id: 1, name: 'Universidad Nacional Mayor de San Marcos', acronym: 'UNMSM' },
    { id: 2, name: 'Pontificia Universidad Católica del Perú', acronym: 'PUCP' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Nueva Convalidación</h1>
        <p className="text-gray-300">
          Suba los documentos del estudiante para iniciar el proceso de convalidación
        </p>
      </div>

      {/* Sección de Información del Estudiante */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-2">Información del Estudiante</h2>
        <p className="text-gray-300 mb-6">
          Busque un estudiante existente o ingrese los datos para un nuevo estudiante
        </p>

        {/* Pestañas */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'search' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 cursor-pointer'}`}
            onClick={() => setActiveTab('search')}
          >
            Buscar Estudiante
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'create' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 cursor-pointer'}`}
            onClick={() => setActiveTab('create')}
          >
            Crear Nuevo
          </button>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'search' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 text-white border border-gray-300 rounded-md leading-5 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Buscar por DNI o nombre..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              
              <select
                className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base text-white bg-gray-900 border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
              >
                <option value="">Universidad</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.acronym}
                  </option>
                ))}
              </select>
              
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Buscar
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Seleccione un estudiante...</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-300 bg-gray-900 border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.dni}) - {student.university}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                DNI
              </label>
              <input
                type="text"
                id="dni"
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                Universidad
              </label>
              <select
                id="university"
                className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              >
                <option>Seleccione universidad</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <Link
          to={routes.convalidaciones}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Cancelar
        </Link>
        <button
          type="button"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default NuevaConvalidacion;