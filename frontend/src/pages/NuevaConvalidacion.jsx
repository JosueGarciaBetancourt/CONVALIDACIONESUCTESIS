import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import { getEstudiante, searchEstudiante, createEstudiante } from '../services/estudiantes';
import { getUniversidades } from '../services/universidades';
import { getCarreras, getCarrerasByUniversidad } from '../services/carreras';
import { getMallas, getMallasByCarrera } from '../services/mallas';
import { createSolicitud } from '../services/solicitudes';

const NuevaConvalidacion = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [universityFilter, setUniversityFilter] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [destinationUniversity, setDestinationUniversity] = useState(1);
  const [destination_universities, setDestinationUniversities] = useState([]);
  const [destination_careers, setDestinationCareers] = useState([]);
  const [destination_studiesPlan, setDestinationStudiesPlan] = useState([]);
  const [errors, setErrors] = useState({});
  const [newStudent, setNewStudent] = useState({
    DNI: '87654321',
    nombre: 'Alberto',
    apellido: 'Espinoza Contreras',
    email: 'alberto@utp.edu.pe',
    celular: '999888777',
    idCarreraOrigen: '2',
    idUniversidadOrigen: '2'
  });
  const [newSolicitud, setNewSolicitud] = useState({
    idEstudiante: '',
    idCarreraDestino: '1',
    idMallaConvalidar: '3'
  });
  const isUniversidadDestinoDisabled = true;
  const isCarreraDestinoDisabled = true;
  const isMallaConvalidarDisabled = true;


  // Obtener universidades y carreras al montar el componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const uniData = await getUniversidades();
        const careersData = await getCarrerasByUniversidad(newStudent.idUniversidadOrigen || null);
        const destinationCareersData = await getCarrerasByUniversidad(destinationUniversity || null);
        const destinationStudiesPlanData = await getMallasByCarrera(newSolicitud.idCarreraDestino || null);

        setUniversities(uniData);
        setCareers(careersData);

        setDestinationUniversities(uniData);
        setDestinationCareers(destinationCareersData);
        setDestinationStudiesPlan(destinationStudiesPlanData);
      } catch (error) {
        console.error('Error al obttener datos iniciales:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Buscar estudiantes en la API con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.length > 1) {
        searchStudents();
      } else {
        setFilteredStudents([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, universityFilter]);

  const searchStudents = async () => {
    setIsLoading(true);
    try {
      const params = {
        search: searchInput,
        universidad: universityFilter
      };
      
      const res = await searchEstudiante(params);
      const estudiantes = res.data;

      setFilteredStudents(estudiantes.slice(0, 5));
      setShowDropdown(true);
    } catch (error) {
      console.error('Error buscando estudiantes:', error);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectStudent = async (student) => {
    try {
      const estudianteCompleto = await getEstudiante(student.idEstudiante);
      setSelectedStudent(estudianteCompleto);
      const updatedSolicitud = { ...newSolicitud, idEstudiante: student.idEstudiante.toString() };
      setNewSolicitud(updatedSolicitud);
      setShowDropdown(false);
      setSearchInput(`${estudianteCompleto.nombre} ${estudianteCompleto.apellido} (${estudianteCompleto.DNI})`);
    } catch (error) {
      console.error('Error al obtener los detalles del estudiante:', error);
    }
  };

  const handleNewStudentChange = async (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "idUniversidadOrigen") {
      if (!value) {
        setNewStudent(prev => ({
          ...prev,
          idUniversidadOrigen: "",
          idCarreraOrigen: ""
        }));
        setCareers([]);
        return;
      } 

      const careersData = await getCarrerasByUniversidad(value);
      setCareers(careersData);
    }
  };

  const handleNewSolicitudChange = async (e) => {
    const { name, value } = e.target;
    setNewSolicitud(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "idUniversidadDestino") {
      if (!value) {
        setNewSolicitud(prev => ({
          ...prev,
          idCarreraDestino: "",
          idMallaConvalidar: ""
        }));
        setDestinationUniversity("");
        setDestinationCareers([]);
        setDestinationStudiesPlan([]);
        return;
      } 

      setDestinationUniversity(value);

      const destination_careers = await getCarrerasByUniversidad(value);
      setDestinationCareers(destination_careers);
    } else if (name === "idCarreraDestino") {
      if (!value) {
        setNewSolicitud(prev => ({
          ...prev,
          idMallaConvalidar: ""
        }));
        setDestinationStudiesPlan([]);
        return;
      } 

      const destination_studiesPlan = await getMallasByCarrera(value);
      setDestinationStudiesPlan(destination_studiesPlan);
    }
  };

  const handleCreateStudent = async () => {
    try {
      const response = await createEstudiante(newStudent);
      console.log('Estudiante creado:', response.data);
      setSelectedStudent(response.data);
      setActiveTab('search');
      setErrors({});
    } catch (error) {
      if (error && error.errors) {
        console.error('Error creando estudiante:', error.errors);
        setErrors(error.errors);
      } else {
        setErrors({ general: "Ocurrió un error al crear el estudiante." });
      }
    }
  };
  
  const handleCreateSolicitud = async () => {
    try {
      const response = await createSolicitud(newSolicitud);
      console.log('Solicitud creada:', response.data);
      setErrors({});
    } catch (error) {
      if (error && error.errors) {
        console.error('Error creando solicitud de convalidación:', error.errors);
        setErrors(error.errors);
      } else {
        setErrors({ general: "Ocurrió un error al crear la solicitud de convalidación." });
      }
    }
  };

  const validateEmptyFieldsCreateStudent = () => {
    try {
      return Object.values(newStudent).every(value => value);
    } catch (error) {
      console.error('Error validando campos vacíos en creación de estudiante:', error);
    }
  };

  const validateEmptyFieldsCreateSolicitud = () => {
    try {
      return Object.values(newSolicitud).every(value => value);
    } catch (error) {
      console.error('Error validando campos vacíos en creación de solicitud:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Nueva Convalidación</h1>
    </div>

      {/* Sección de Información del Estudiante */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-2">Información del Estudiante</h2>
        <p className="text-gray-300 mb-6">
          Busque un estudiante existente o cree uno nuevo
        </p>

        {/* Pestañas */}
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
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setShowDropdown(searchInput.length > 0 && filteredStudents.length > 0)}
                />
                
                {/* Dropdown de resultados */}
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
                              {student.DNI} • {universities.find(u => u.idUniversidad === student.idUniversidadOrigen)?.abreviatura || 'Universidad'}
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
                    <p className="text-white">{selectedStudent.DNI}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Universidad</p>
                    <p className="text-white">
                      {universities.find(u => u.idUniversidad === selectedStudent.idUniversidadOrigen)?.nombre || 'No especificada'}
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
            )}

            {/* Sección de Solicitud de Convalidación */}
            {selectedStudent && (
              <div className="bg-gray-900 rounded-lg shadow-md mt-8">
              <h2 className="text-lg font-semibold text-white mb-2">Generación de Solicitud</h2>
              <p className="text-gray-300 mb-6">
                Complete todos los campos
              </p>

              <div>
                <div className="flex gap-4 flex-nowrap mb-5">
                  <div className="w-4/5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Universidad Destino</label>
                    <select 
                      name="idUniversidadDestino"
                      value={destinationUniversity}
                      disabled={isUniversidadDestinoDisabled}
                      onChange={handleNewSolicitudChange}
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${isUniversidadDestinoDisabled ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <option value="" >Seleccione universidad destino</option>
                      {destination_universities.map((uni) => (
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
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${isCarreraDestinoDisabled ? 'cursor-default' : 'cursor-pointer'}`}
                 >
                      <option value="">Seleccione carrera destino</option>
                      {destination_careers.map((car) => (
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
                      disabled={isMallaConvalidarDisabled}
                      onChange={handleNewSolicitudChange}
                      className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${isMallaConvalidarDisabled ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <option value="">Seleccione plan de estudios destino</option>
                      {destination_studiesPlan.map((destStuPlan) => (
                        <option key={`destStuPlan-${destStuPlan.idMalla}`} value={destStuPlan.idMalla}>
                          {destStuPlan.semestre_inicio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            )}
           
            
            {/* Botones para guardar o cancelar Solicitud */}
            <div className="flex justify-end space-x-3 mt-6">
              <Link
                to={routes.convalidaciones}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Cancelar
              </Link>
              <button
                className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50
                            ${validateEmptyFieldsCreateSolicitud() ? 'cursor-pointer' : ''}`}
                disabled={!validateEmptyFieldsCreateSolicitud()}
                onClick={handleCreateSolicitud}
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
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                />
                { errors.DNI && (<p className="text-red-500 text-sm mt-1">{errors.DNI[0]}</p>) }
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Universidad de Procedencia</label>
                <select 
                  name="idUniversidadOrigen"
                  value={newStudent.idUniversidadOrigen}
                  onChange={handleNewStudentChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                >
                  <option value="" >Seleccione universidad</option>
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
                { errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>) }
              </div>
              <div className="w-40">
                <label className="block text-sm font-medium text-gray-300 mb-1">Celular</label>
                <input
                  type="text"
                  name="celular"
                  value={newStudent.celular}
                  onChange={handleNewStudentChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={9}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    if (e.target.value.length > 9) {
                      e.target.value = e.target.value.slice(0, 9);
                    }
                  }}
                />
              </div>
            </div>

            {/* Botón para el tab de crear */}
            <div className="flex justify-end">
              <button
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50
                            ${validateEmptyFieldsCreateStudent() ? 'cursor-pointer' : ''}`}
                disabled={!validateEmptyFieldsCreateStudent()} 
                onClick={handleCreateStudent}
              >
                Crear Estudiante
              </button>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default NuevaConvalidacion;