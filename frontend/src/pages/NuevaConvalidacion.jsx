import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getEstudiante, getEstudianteWithUniversidadCarrera, searchEstudiante, createEstudiante } from '../services/estudiantes';
import { getUniversidades } from '../services/universidades';
import { getCarrera, getCarrerasByUniversidad } from '../services/carreras';
import { getMallasByCarrera } from '../services/mallas';
import { createSolicitud } from '../services/solicitudes';

// Componentes
import InformacionEstudiante from '../components/convalidaciones/InformacionEstudiante';
import RegistroCursosSilabos from '../components/convalidaciones/RegistroCursosSilabos';
import SugerenciaCursos from '../components/convalidaciones/SugerenciaCursos';
import ValidacionManual from '../components/convalidaciones/ValidacionManual';
import Reporte from '../components/convalidaciones/Reporte';

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

const FORM_CONFIG = {
  isUniversidadDestinoDisabled: true,
  isCarreraDestinoDisabled: true,
  isMallaDestinoDisabled: true,
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

// Definimos los pasos del proceso
const STEPS = {
  STUDENT_INFO: {
    step: 1,
    label: "Información del Estudiante"
  },
  COURSES_REGISTRATION: {
    step: 2,
    label: "Registro de Cursos"
  },
  COURSES_SUGGESTION: {
    step: 3,
    label: "Sugerencia de Cursos"
  },
  MANUAL_VALIDATION: {
    step: 4,
    label: "Validación Manual"
  },
  REPORT: {
    step: 5,
    label: "Reporte Final"
  }
};

  const NuevaConvalidacion = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.STUDENT_INFO.step);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Función para avanzar al siguiente paso
  const nextStep = useCallback(() => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    setCurrentStep(prev => Math.min(prev + 1, STEPS.REPORT.step));
  }, [currentStep]);

  // Función para retroceder al paso anterior
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, STEPS.STUDENT_INFO.step));
  }, []);

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
  const [destinationUniversity, setDestinationUniversity] = useState(1);
  
  // Referencias para cleanup
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

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

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

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

  // Efectos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.length > 1) {
        searchStudents();
      }
    }, FORM_CONSTRAINTS.SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput, searchStudents]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [uniData, careersData, destinationCareersData, destinationStudiesPlanData] = await Promise.all([
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
  }, []);

  // Handlers
  const handleSelectStudent = useCallback(async (student) => {
    try {
      const estudianteCompleto = await getEstudianteWithUniversidadCarrera(student.idEstudiante);
      setSelectedStudent(estudianteCompleto);
      setNewSolicitud(prev => ({ ...prev, idEstudiante: student.idEstudiante.toString() }));
      setShowDropdown(false);
      setSearchInput(`${estudianteCompleto.nombre} ${estudianteCompleto.apellido} (${estudianteCompleto.DNI})`);
    } catch (error) {
      console.error('Error al obtener los detalles del estudiante:', error);
    }
  }, []);

  const handleNewStudentChange = useCallback(async (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
    
    if (name === "idUniversidadOrigen") {
      const careersData = await getCarrerasByUniversidad(value);
      setCareers(careersData || []);
    }
  }, []);

  const handleNewSolicitudChange = useCallback(async (e) => {
    const { name, value } = e.target;
    
    try {
      setNewSolicitud(prev => ({ ...prev, [name]: value }));
  
      if (name === "idUniversidadDestino") {
        // Resetear dependencias
        setNewSolicitud(prev => ({
          ...prev,
          idCarreraDestino: "",
          idMallaConvalidar: ""
        }));
        
        if (!value) {
          setDestinationCareers([]);
          setDestinationStudiesPlan([]);
          return;
        }
  
        const destCareersData = await getCarrerasByUniversidad(value);
        setDestinationCareers(destCareersData || []);
        
      } else if (name === "idCarreraDestino") {
        // Resetear malla si cambia la carrera
        setNewSolicitud(prev => ({ ...prev, idMallaConvalidar: "" }));
  
        if (!value) {
          setDestinationStudiesPlan([]);
          return;
        }
  
        const studiesPlanData = await getMallasByCarrera(value);
        setDestinationStudiesPlan(studiesPlanData || []);
      }
    } catch (error) {
      console.error(`Error al cargar datos para ${name}:`, error);
      // Mostrar feedback al usuario (ej: toast, mensaje en UI)
      setErrors(prev => ({
        ...prev,
        [name]: `Error al cargar opciones: ${error.message}`
      }));
    }
  }, []);

  const handleCreateStudent = useCallback(async () => {
    try {
      const response = await createEstudiante(newStudent);
      setSelectedStudent(response.data);
      setActiveTab(TABS.SEARCH);
      setErrors({});
    } catch (error) {
      setErrors(error?.errors || { general: "Error al crear estudiante" });
    }
  }, [newStudent]);
  
  const handleCreateSolicitud = useCallback(async () => {
    try {
      await createSolicitud(newSolicitud);
      setErrors({});
    } catch (error) {
      setErrors(error?.errors || { general: "Error al crear solicitud" });
    }
  }, [newSolicitud]);

  // Validaciones
  const isCreateStudentValid = useMemo(() => 
    Object.values(newStudent).every(Boolean), 
    [newStudent]
  );

  const isCreateSolicitudValid = useMemo(() => 
    Object.values(newSolicitud).every(Boolean), 
    [newSolicitud]
  );

  // Componente para mostrar el progreso (siempre visible)
  const ProgressSteps = () => (
    <div className="flex justify-between items-center mb-8">
      {Object.values(STEPS).map(({step, label}) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${currentStep === step ? 'bg-blue-600 text-white' : 
              completedSteps.has(step) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            {step}
          </div>
          <span className={`mt-2 text-xs ${currentStep === step ? 'text-white' : 'text-gray-400'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  // Renderizar el paso actual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.STUDENT_INFO.step:
        return (
          <InformacionEstudiante
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            universityFilter={universityFilter}
            setUniversityFilter={setUniversityFilter}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            filteredStudents={filteredStudents}
            isLoading={isLoading}
            universities={universities}
            universityMap={universityMap}
            selectedStudent={selectedStudent}
            handleSelectStudent={handleSelectStudent}
            newStudent={newStudent}
            handleNewStudentChange={handleNewStudentChange}
            errors={errors}
            isCreateStudentValid={isCreateStudentValid}
            handleCreateStudent={handleCreateStudent}
            newSolicitud={newSolicitud}
            handleNewSolicitudChange={handleNewSolicitudChange}
            isCreateSolicitudValid={isCreateSolicitudValid}
            handleCreateSolicitud={handleCreateSolicitud}
            destinationUniversity={destinationUniversity}
            destinationCareers={destinationCareers}
            destinationStudiesPlan={destinationStudiesPlan}
            careers={careers}
            isUniversidadDestinoDisabled={FORM_CONFIG.isUniversidadDestinoDisabled}
            isCarreraDestinoDisabled={FORM_CONFIG.isCarreraDestinoDisabled}
            isMallaDestinoDisabled={FORM_CONFIG.isMallaDestinoDisabled}
            onNext={nextStep}
          />
        );
      case STEPS.COURSES_REGISTRATION.step:
        return (
          <RegistroCursosSilabos 
            student={selectedStudent}
            universityMap={universityMap}
            careers={careers}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case STEPS.COURSES_SUGGESTION.step:
        return (
          <SugerenciaCursos 
            originUniversity={selectedStudent.idUniversidadOrigen}
            destinationUniversity={destinationUniversity}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case STEPS.MANUAL_VALIDATION.step:
        return (
          <ValidacionManual 
            studentId={selectedStudent.idEstudiante}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case STEPS.REPORT.step:
        return (
          <Reporte 
            onGenerate={handleCreateSolicitud}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-7">Nueva Convalidación</h1>
        <ProgressSteps />
      </div>

      {renderCurrentStep()}
    </div>
  );
};

export default NuevaConvalidacion;