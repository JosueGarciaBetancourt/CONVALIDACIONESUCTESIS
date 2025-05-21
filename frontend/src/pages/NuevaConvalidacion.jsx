import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NuevaConvalidacion = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [universityFilter, setUniversityFilter] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Datos de ejemplo más completos
  const students = [
    { 
      id: 1, 
      nombre: 'Juan', 
      apellido: 'Pérez', 
      dni: '71234567', 
      universidad: 'UNMSM', 
      carrera: 'Ingeniería de Software',
      correo: 'jperez@unmsm.edu.pe',
      celular: '987654321'
    },
    { 
      id: 2, 
      nombre: 'María', 
      apellido: 'García', 
      dni: '76543210', 
      universidad: 'PUCP', 
      carrera: 'Derecho',
      correo: 'mgarcia@pucp.edu.pe',
      celular: '912345678'
    },
    { 
      id: 3, 
      nombre: 'Carlos', 
      apellido: 'López', 
      dni: '72345678', 
      universidad: 'UNMSM', 
      carrera: 'Medicina',
      correo: 'clopez@unmsm.edu.pe',
      celular: '934567890'
    },
    { 
      id: 4, 
      nombre: 'Ana', 
      apellido: 'Martínez', 
      dni: '73456789', 
      universidad: 'PUCP', 
      carrera: 'Economía',
      correo: 'amartinez@pucp.edu.pe',
      celular: '945678901'
    },
    { 
      id: 5, 
      nombre: 'Luis', 
      apellido: 'Rodríguez', 
      dni: '74567890', 
      universidad: 'UNI', 
      carrera: 'Arquitectura',
      correo: 'lrodriguez@uni.edu.pe',
      celular: '956789012'
    }
  ];

  const universities = [
    { id: 1, name: 'Universidad Nacional Mayor de San Marcos', acronym: 'UNMSM' },
    { id: 2, name: 'Pontificia Universidad Católica del Perú', acronym: 'PUCP' },
    { id: 3, name: 'Universidad Nacional de Ingeniería', acronym: 'UNI' },
  ];

  const careers = [
    { id: 1, name: 'Ingeniería de Sistemas e Informática', acronym: 'ISI' },
    { id: 2, name: 'Ingeniería de Sofware ', acronym: 'IS' },
  ];

  // Filtrar estudiantes según búsqueda
  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = 
        student.dni.includes(searchInput) ||
        `${student.nombre} ${student.apellido}`.toLowerCase().includes(searchInput.toLowerCase());
      
      const matchesUniversity = 
        !universityFilter || student.universidad === universities.find(u => u.id.toString() === universityFilter)?.acronym;
      
      return matchesSearch && matchesUniversity;
    });
    
    setFilteredStudents(filtered.slice(0, 5)); // Mostrar máximo 5 resultados
  }, [searchInput, universityFilter]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setShowDropdown(false);
    setSearchInput(`${student.nombre} ${student.apellido} (${student.dni})`);
  };

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
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'search' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white'}`}
            onClick={() => setActiveTab('search')}
          >
            Buscar Estudiante
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === 'create' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white'}`}
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
                  className="block w-full pl-10 pr-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Buscar por DNI o nombre..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowDropdown(searchInput.length > 0)}
                />
                
                {/* Dropdown de resultados */}
                {showDropdown && filteredStudents.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                    <ul className="py-1 max-h-60 overflow-auto">
                      {filteredStudents.map(student => (
                        <li 
                          key={student.id}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                          onClick={() => handleSelectStudent(student)}
                        >
                          <div className="font-medium">{student.nombre} {student.apellido}</div>
                          <div className="text-sm text-gray-400">{student.dni} • {student.universidad}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <select
                className="block w-full sm:w-60 pl-3 pr-10 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
              >
                <option value="">Todas las universidades</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.acronym}
                  </option>
                ))}
              </select>
            </div>

            {/* Mostrar datos del estudiante seleccionado */}
            {selectedStudent && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Datos del Estudiante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre completo</p>
                    <p className="text-white">{selectedStudent.nombre} {selectedStudent.apellido}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">DNI</p>
                    <p className="text-white">{selectedStudent.dni}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Universidad</p>
                    <p className="text-white">{selectedStudent.universidad}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Carrera</p>
                    <p className="text-white">{selectedStudent.carrera}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Correo institucional</p>
                    <p className="text-white">{selectedStudent.correo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Celular</p>
                    <p className="text-white">{selectedStudent.celular}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-5">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">Apellido</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-5">
              <div className="w-26">
                <label className="w-26 block text-sm font-medium text-gray-300 mb-1">DNI</label>
                <input
                  type="text"  // Usamos text en lugar de number para maxLength
                  inputMode="numeric" // Muestra teclado numérico en móviles
                  pattern="[0-9]*"    // Valida solo números
                  maxLength={8}
                  className="w-26 bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  onInput={(e) => {
                    // Filtra solo caracteres numéricos
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    // Limita a 9 caracteres
                    if (e.target.value.length > 9) {
                      e.target.value = e.target.value.slice(0, 9);
                    }
                  }}
                />
              </div>
              <div className="w-100">
                <label className="block text-sm font-medium text-gray-300 mb-1">Universidad de Procedencia</label>
                <select className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                  <option>Seleccione universidad</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-100">
                <label className="block text-sm font-medium text-gray-300 mb-1">Carrera de Procedencia</label>
                <select className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                  <option>Seleccione carrera</option>
                  {careers.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-100">
                  <label className="w-100 block text-sm font-medium text-gray-300 mb-1">Correo Institucional</label>
                  <input
                    type="email"
                    className="w-100 bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="w-50">
                <label className="w-50 block text-sm font-medium text-gray-300 mb-1">Celular</label>
                <input
                  type="text"  // Usamos text en lugar de number para maxLength
                  inputMode="numeric" // Muestra teclado numérico en móviles
                  pattern="[0-9]*"    // Valida solo números
                  maxLength={9}
                  className="w-50 bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  onInput={(e) => {
                    // Filtra solo caracteres numéricos
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    // Limita a 9 caracteres
                    if (e.target.value.length > 9) {
                      e.target.value = e.target.value.slice(0, 9);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <Link
          to={routes.convalidaciones}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
        >
          Cancelar
        </Link>
        <button
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
          disabled={!selectedStudent && activeTab === 'search'}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default NuevaConvalidacion;