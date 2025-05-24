import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import PropTypes from 'prop-types';

const InformacionEstudiante = ({
  activeTab,
  setActiveTab,
  searchInput,
  setSearchInput,
  universityFilter,
  setUniversityFilter,
  showDropdown,
  setShowDropdown,
  filteredStudents,
  isLoading,
  universities,
  selectedStudent,
  handleSelectStudent,
  newStudent,
  handleNewStudentChange,
  errors,
  isCreateStudentValid,
  handleCreateStudent,
  newSolicitud,
  handleNewSolicitudChange,
  isCreateSolicitudValid,
  handleCreateSolicitud,
  destinationUniversity,
  destinationCareers,
  destinationStudiesPlan,
  careers,
  isUniversidadDestinoDisabled,
  isCarreraDestinoDisabled,
  isMallaDestinoDisabled,
  onNext // Nueva prop para manejar el avance
}) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-2">Información del Estudiante</h2>
      <p className="text-gray-300 mb-6">Busque un estudiante existente o cree uno nuevo</p>

      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`pb-3 px-4 font-medium ${activeTab === 'search' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white cursor-pointer'}`}
          onClick={() => setActiveTab('search')}
        >
          Buscar Estudiante
        </button>
        <button
          className={`pb-3 px-4 font-medium ${activeTab === 'create' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white cursor-pointer'}`}
          onClick={() => setActiveTab('create')}
        >
          Crear Nuevo
        </button>
      </div>

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
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowDropdown(searchInput.length > 0 && filteredStudents.length > 0)}
              />
              
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  {isLoading ? (
                    <div className="px-4 py-2 text-gray-400">Buscando...</div>
                  ) : filteredStudents.length > 0 ? (
                    <ul className="py-1 max-h-60 overflow-auto">
                      {filteredStudents.map(student => (
                        <li 
                          key={student.idEstudiante}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                          onClick={() => handleSelectStudent(student)}
                        >
                          <div className="font-medium">{student.nombre} {student.apellido}</div>
                          <div className="text-sm text-gray-400">
                            {student.DNI} • {student.universidad?.abreviatura || 'Universidad'}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-2 text-gray-400">No se encontraron resultados</div>
                  )}
                </div>
              )}
            </div>
            
            <select
              className="block w-full sm:w-100 pl-3 pr-10 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
            >
              <option value="">Todas las universidades</option>
              {universities.map((uni) => (
                <option key={`filter-uni-${uni.idUniversidad}`} value={uni.idUniversidad}>
                  {uni.abreviatura} - {uni.nombre}
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <>
              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Datos del Estudiante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre completo</p>
                    <p className="text-white">{selectedStudent.nombre} {selectedStudent.apellido}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">DNI</p>
                    <p className="text-white">{selectedStudent.DNI}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Universidad de Origen</p>
                    <p className="text-white">
                      {selectedStudent.universidad?.nombre || 'No especificada'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Carrera de Origen</p>
                    <p className="text-white">
                      {selectedStudent.carrera?.nombre || 'No especificada'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Correo institucional</p>
                    <p className="text-white">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Celular</p>
                    <p className="text-white">{selectedStudent.celular}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-md mt-8">
                <h2 className="text-lg font-semibold text-white mb-2">Generación de Solicitud</h2>
                <p className="text-gray-300 mb-6">Complete todos los campos</p>

                <div className="flex gap-4 flex-nowrap mb-5">
                  <div className="w-4/5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Universidad Destino</label>
                    <select 
                      name="idUniversidadDestino"
                      value={destinationUniversity}
                      disabled={isUniversidadDestinoDisabled}
                      onChange={handleNewSolicitudChange}
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500
                                  ${isUniversidadDestinoDisabled ? 'cursor-default': 'cursor-pointer'}`}
                    >
                      <option value="">Seleccione universidad destino</option>
                      {universities.map((uni) => (
                        <option key={`uni-${uni.idUniversidad}`} value={uni.idUniversidad}>
                          {uni.abreviatura} - {uni.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-3/5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Carrera Destino</label>
                    <select 
                      name="idCarreraDestino"
                      value={newSolicitud.idCarreraDestino}
                      disabled={isCarreraDestinoDisabled}
                      onChange={handleNewSolicitudChange}
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500
                                  ${isCarreraDestinoDisabled ? 'cursor-default': 'cursor-pointer'}`}
                      >
                      <option value="">Seleccione carrera destino</option>
                      {destinationCareers.map((car) => (
                        <option key={`car-${car.idCarrera}`} value={car.idCarrera}>
                          {car.nombre} - {car.abreviatura}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-2/5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Plan de Estudios Destino</label>
                    <select 
                      name="idMallaConvalidar"
                      value={newSolicitud.idMallaConvalidar}
                      disabled={isMallaDestinoDisabled}
                      onChange={handleNewSolicitudChange}
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500
                                  ${isMallaDestinoDisabled ? 'cursor-default': 'cursor-pointer'}`}
                  >
                      <option value="">Seleccione plan de estudios destino</option>
                      {destinationStudiesPlan.map((destStuPlan) => (
                        <option key={`destStuPlan-${destStuPlan.idMalla}`} value={destStuPlan.idMalla}>
                          {destStuPlan.semestre_inicio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 mt-6">
            <Link
              to={routes.convalidaciones}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              Cancelar
            </Link>
            <button
              className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50 ${isCreateSolicitudValid ? 'cursor-pointer' : ''}`}
              disabled={!isCreateSolicitudValid}
              onClick={() => {
                handleCreateSolicitud();
                onNext(); // Llamar a onNext después de crear la solicitud
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-4 mb-5">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={newStudent.nombre}
                onChange={handleNewStudentChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={newStudent.apellido}
                onChange={handleNewStudentChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-300 mb-1">DNI</label>
              <input
                type="text"
                name="DNI"
                value={newStudent.DNI}
                onChange={handleNewStudentChange}
                maxLength={8}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
                }}
              />
              {errors.DNI && <p className="text-red-500 text-sm mt-1">{errors.DNI[0]}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Universidad de Procedencia</label>
              <select 
                name="idUniversidadOrigen"
                value={newStudent.idUniversidadOrigen}
                onChange={handleNewStudentChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
              >
                <option value="">Seleccione universidad</option>
                {universities.map((uni) => (
                  <option key={`uni-${uni.idUniversidad}`} value={uni.idUniversidad}>
                    {uni.abreviatura} - {uni.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Carrera de Procedencia</label>
              <select 
                name="idCarreraOrigen"
                value={newStudent.idCarreraOrigen}
                onChange={handleNewStudentChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
              >
                <option value="">Seleccione carrera</option>
                {careers.map((car) => (
                  <option key={`car-${car.idCarrera}`} value={car.idCarrera}>
                    {car.nombre} - {car.abreviatura}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Correo Institucional</label>
              <input
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleNewStudentChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
            </div>
            <div className="w-40">
              <label className="block text-sm font-medium text-gray-300 mb-1">Celular</label>
              <input
                type="text"
                name="celular"
                value={newStudent.celular}
                onChange={handleNewStudentChange}
                maxLength={9}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 ${isCreateStudentValid ? 'cursor-pointer' : ''}`}
              disabled={!isCreateStudentValid} 
              onClick={() => {
                handleCreateStudent();
                onNext(); // Llamar a onNext después de crear el estudiante
              }}
            >
              Crear Estudiante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

InformacionEstudiante.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  universityFilter: PropTypes.string.isRequired,
  setUniversityFilter: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
  filteredStudents: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  universities: PropTypes.array.isRequired,
  universityMap: PropTypes.object.isRequired,
  selectedStudent: PropTypes.object,
  handleSelectStudent: PropTypes.func.isRequired,
  newStudent: PropTypes.object.isRequired,
  handleNewStudentChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isCreateStudentValid: PropTypes.bool.isRequired,
  handleCreateStudent: PropTypes.func.isRequired,
  newSolicitud: PropTypes.object.isRequired,
  handleNewSolicitudChange: PropTypes.func.isRequired,
  isCreateSolicitudValid: PropTypes.bool.isRequired,
  handleCreateSolicitud: PropTypes.func.isRequired,
  destinationUniversity: PropTypes.string.isRequired,
  destinationCareers: PropTypes.array.isRequired,
  destinationStudiesPlan: PropTypes.array.isRequired,
  careers: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired // Nueva prop para manejar el avance
};

export default React.memo(InformacionEstudiante);