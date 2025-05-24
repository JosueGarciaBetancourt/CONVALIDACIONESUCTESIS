import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import { getEstudiante, searchEstudiante, createEstudiante } from '../services/estudiantes';
import { getUniversidades } from '../services/universidades';
import { getCarrerasByUniversidad } from '../services/carreras';
import { getMallasByCarrera } from '../services/mallas';
import { createSolicitud } from '../services/solicitudes';

// Constantes
const TABS = {
  SEARCH: 'search',
  CREATE: 'create'
};

const FORM_CONSTRAINTS = {
  DNI_MAX_LENGTH: 8,
  CELULAR_MAX_LENGTH: 9,
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_RESULTS: 5
};

const INITIAL_NEW_STUDENT = {
  DNI: '87654321',
  nombre: 'Alberto',
  apellido: 'Espinoza Contreras',
  email: 'alberto@utp.edu.pe',
  celular: '999888777',
  idCarreraOrigen: '2',
  idUniversidadOrigen: '2'
};

const INITIAL_NEW_SOLICITUD = {
  idEstudiante: '',
  idCarreraDestino: '1',
  idMallaConvalidar: '3'
};

const NuevaConvalidacion = () => {
  // Estados principales
  const [activeTab, setActiveTab] = useState(TABS.SEARCH);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errors, setErrors] = useState({});
  
  // Estados de búsqueda
  const [searchInput, setSearchInput] = useState('');
  const [universityFilter, setUniversityFilter] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados de datos
  const [universities, setUniversities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [destinationCareers, setDestinationCareers] = useState([]);
  const [destinationStudiesPlan, setDestinationStudiesPlan] = useState([]);
  
  // Estados de formularios
  const [newStudent, setNewStudent] = useState(INITIAL_NEW_STUDENT);
  const [newSolicitud, setNewSolicitud] = useState(INITIAL_NEW_SOLICITUD);
  const [destinationUniversity] = useState(1);
  
  // Referencias para cleanup
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Constantes de configuración (simulando props)
  const formConfig = useMemo(() => ({
    isUniversidadDestinoDisabled: true,
    isCarreraDestinoDisabled: true,
    isMallaConvalidarDisabled: true
  }), []);

  // Memoización de datos derivados
  const universityMap = useMemo(() => {
    return universities.reduce((acc, uni) => {
      acc[uni.idUniversidad] = uni;
      return acc;
    }, {});
  }, [universities]);

  // Función de búsqueda optimizada con abort controller
  const searchStudents = useCallback(async () => {
    if (searchInput.length <= 1) {
      setFilteredStudents([]);
      setShowDropdown(false);
      return;
    }

    // Cancelar búsqueda anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo abort controller
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    try {
      const params = {
        search: searchInput,
        universidad: universityFilter
      };
      
      const res = await searchEstudiante(params, {
        signal: abortControllerRef.current.signal
      });
      
      if (!abortControllerRef.current.signal.aborted) {
        const estudiantes = res.data || [];
        setFilteredStudents(estudiantes.slice(0, FORM_CONSTRAINTS.MAX_SEARCH_RESULTS));
        setShowDropdown(true);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error buscando estudiantes:', error);
        setFilteredStudents([]);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [searchInput, universityFilter]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchStudents();
    }, FORM_CONSTRAINTS.SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchStudents]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Carga inicial de datos
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          uniData,
          careersData,
          destinationCareersData,
          destinationStudiesPlanData
        ] = await Promise.all([
          getUniversidades(),
          getCarrerasByUniversidad(newStudent.idUniversidadOrigen || null),
          getCarrerasByUniversidad(destinationUniversity || null),
          getMallasByCarrera(newSolicitud.idCarreraDestino || null)
        ]);

        setUniversities(uniData || []);
        setCareers(careersData || []);
        setDestinationCareers(destinationCareersData || []);
        setDestinationStudiesPlan(destinationStudiesPlanData || []);
      } catch (error) {
        console.error('Error al obtener datos iniciales:', error);
      }
    };

    fetchInitialData();
  }, []); // Removido dependencies innecesarias

  // Handlers optimizados
  const handleSelectStudent = useCallback(async (student) => {
    try {
      const estudianteCompleto = await getEstudiante(student.idEstudiante);
      setSelectedStudent(estudianteCompleto);
      setNewSolicitud(prev => ({
        ...prev,
        idEstudiante: student.idEstudiante.toString()
      }));
      setShowDropdown(false);
      setSearchInput(`${estudianteCompleto.nombre} ${estudianteCompleto.apellido} (${estudianteCompleto.DNI})`);
    } catch (error) {
      console.error('Error al obtener los detalles del estudiante:', error);
    }
  }, []);

  const handleNewStudentChange = useCallback(async (e) => {
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

      try {
        const careersData = await getCarrerasByUniversidad(value);
        setCareers(careersData || []);
      } catch (error) {
        console.error('Error al obtener carreras:', error);
        setCareers([]);
      }
    }
  }, []);

  const handleNewSolicitudChange = useCallback(async (e) => {
    const { name, value } = e.target;
    
    setNewSolicitud(prev => ({
      ...prev,
      [name]: value
    }));
    
    try {
      if (name === "idUniversidadDestino") {
        if (!value) {
          setNewSolicitud(prev => ({
            ...prev,
            idCarreraDestino: "",
            idMallaConvalidar: ""
          }));
          setDestinationCareers([]);
          setDestinationStudiesPlan([]);
          return;
        } 

        const destinationCareersData = await getCarrerasByUniversidad(value);
        setDestinationCareers(destinationCareersData || []);
      } else if (name === "idCarreraDestino") {
        if (!value) {
          setNewSolicitud(prev => ({
            ...prev,
            idMallaConvalidar: ""
          }));
          setDestinationStudiesPlan([]);
          return;
        } 

        const destinationStudiesPlanData = await getMallasByCarrera(value);
        setDestinationStudiesPlan(destinationStudiesPlanData || []);
      }
    } catch (error) {
      console.error(`Error al procesar cambio en ${name}:`, error);
    }
  }, []);

  const handleCreateStudent = useCallback(async () => {
    try {
      const response = await createEstudiante(newStudent);
      setSelectedStudent(response.data);
      setActiveTab(TABS.SEARCH);
      setErrors({});
    } catch (error) {
      const errorMessages = error?.errors || { general: "Ocurrió un error al crear el estudiante." };
      setErrors(errorMessages);
      console.error('Error creando estudiante:', errorMessages);
    }
  }, [newStudent]);
  
  const handleCreateSolicitud = useCallback(async () => {
    try {
      const response = await createSolicitud(newSolicitud);
      console.log('Solicitud creada:', response.data);
      setErrors({});
    } catch (error) {
      const errorMessages = error?.errors || { general: "Ocurrió un error al crear la solicitud de convalidación." };
      setErrors(errorMessages);
      console.error('Error creando solicitud de convalidación:', errorMessages);
    }
  }, [newSolicitud]);

  // Validaciones memoizadas
  const isCreateStudentValid = useMemo(() => {
    return Object.values(newStudent).every(value => value);
  }, [newStudent]);

  const isCreateSolicitudValid = useMemo(() => {
    return Object.values(newSolicitud).every(value => value);
  }, [newSolicitud]);

  // Handlers de input numérico optimizados
  const handleNumericInput = useCallback((e, maxLength) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  }, []);

  const handleDNIInput = useCallback((e) => {
    handleNumericInput(e, FORM_CONSTRAINTS.DNI_MAX_LENGTH);
  }, [handleNumericInput]);

  const handleCelularInput = useCallback((e) => {
    handleNumericInput(e, FORM_CONSTRAINTS.CELULAR_MAX_LENGTH);
  }, [handleNumericInput]);

  // Componentes memoizados
  const SearchContent = useMemo(() => (
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
                        {student.DNI} • {universityMap[student.idUniversidadOrigen]?.abreviatura || 'Universidad'}
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
                <p className="text-sm text-gray-400">Universidad</p>
                <p className="text-white">
                  {universityMap[selectedStudent.idUniversidadOrigen]?.nombre || 'No especificada'}
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

          {/* Sección de Solicitud de Convalidación */}
          <div className="bg-gray-900 rounded-lg shadow-md mt-8">
            <h2 className="text-lg font-semibold text-white mb-2">Generación de Solicitud</h2>
            <p className="text-gray-300 mb-6">Complete todos los campos</p>

            <div className="flex gap-4 flex-nowrap mb-5">
              <div className="w-4/5">
                <label className="block text-sm font-medium text-gray-300 mb-1">Universidad Destino</label>
                <select 
                  name="idUniversidadDestino"
                  value={destinationUniversity}
                  disabled={formConfig.isUniversidadDestinoDisabled}
                  onChange={handleNewSolicitudChange}
                  className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${formConfig.isUniversidadDestinoDisabled ? 'cursor-default' : 'cursor-pointer'}`}
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
                  disabled={formConfig.isCarreraDestinoDisabled}
                  onChange={handleNewSolicitudChange}
                  className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${formConfig.isCarreraDestinoDisabled ? 'cursor-default' : 'cursor-pointer'}`}
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
                  disabled={formConfig.isMallaConvalidarDisabled}
                  onChange={handleNewSolicitudChange}
                  className={`w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${formConfig.isMallaConvalidarDisabled ? 'cursor-default' : 'cursor-pointer'}`}
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
      
      {/* Botones para guardar o cancelar Solicitud */}
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
          onClick={handleCreateSolicitud}
        >
          Continuar
        </button>
      </div>
    </div>
  ), [
    searchInput, showDropdown, isLoading, filteredStudents, universityFilter, 
    universities, selectedStudent, universityMap, newSolicitud, destinationCareers, 
    destinationStudiesPlan, destinationUniversity, formConfig, isCreateSolicitudValid,
    handleSelectStudent, handleNewSolicitudChange, handleCreateSolicitud
  ]);

  const CreateContent = useMemo(() => (
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
            maxLength={FORM_CONSTRAINTS.DNI_MAX_LENGTH}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            onInput={handleDNIInput}
          />
          {errors.DNI && (<p className="text-red-500 text-sm mt-1">{errors.DNI[0]}</p>)}
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
          {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>)}
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
            maxLength={FORM_CONSTRAINTS.CELULAR_MAX_LENGTH}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            onInput={handleCelularInput}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 ${isCreateStudentValid ? 'cursor-pointer' : ''}`}
          disabled={!isCreateStudentValid} 
          onClick={handleCreateStudent}
        >
          Crear Estudiante
        </button>
      </div>
    </div>
  ), [
    newStudent, universities, careers, errors, isCreateStudentValid,
    handleNewStudentChange, handleCreateStudent, handleDNIInput, handleCelularInput
  ]);

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
            className={`pb-3 px-4 font-medium ${activeTab === TABS.SEARCH ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white cursor-pointer'}`}
            onClick={() => setActiveTab(TABS.SEARCH)}
          >
            Buscar Estudiante
          </button>
          <button
            className={`pb-3 px-4 font-medium ${activeTab === TABS.CREATE ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300 hover:text-white cursor-pointer'}`}
            onClick={() => setActiveTab(TABS.CREATE)}
          >
            Crear Nuevo
          </button>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === TABS.SEARCH ? SearchContent : CreateContent}
      </div>

      {/* Sección de Registro de Cursos y Sílabos */}

      {/* Sección de Selección de Sugerencia de Cursos */}
        
      {/* Sección de Selección de Validación Manual de Comparación */}

      {/* Sección de Selección de Reporte */}
    </div>
  );
};

export default NuevaConvalidacion;