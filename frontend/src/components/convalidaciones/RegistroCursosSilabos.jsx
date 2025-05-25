import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useModal } from '../ui';
import EditCourseModal from '../ui/EditCourseModal';

const RegistroCursosSilabos = ({ 
  student, 
  universityMap, 
  careers,
  onNext,
  onPrev
}) => {
  const originCareer = careers.find(c => c.idCarrera === student.idCarreraOrigen);
  const [courses, setCourses] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    codigo: '',
    nombre: '',
    creditos: ''
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const addCourse = () => {
    if (newCourse.codigo && newCourse.nombre) {
      setCourses([...courses, { 
        ...newCourse, 
        id: Date.now(),
        silabo: null // Campo para almacenar el sílabo
      }]);
      setNewCourse({ codigo: '', nombre: '', creditos: '' });
    }
  };

  const startEditing = (course) => {
    setEditingCourse(course); // Guarda el curso completo en el estado
    openModal(); // Abre el modal
  };
  
  const cancelEditing = () => {
    setEditingCourse(null);
    closeModal(); // Cierra el modal
  };
  
  const saveEdit = (formData) => {
    if (editingCourse) {
      const updatedCourse = {
        ...editingCourse,
        ...formData
      };
      setCourses(courses.map(c => 
        c.id === editingCourse.id ? updatedCourse : c
      ));
      setEditingCourse(null);
      closeModal(); // Cierra el modal después de guardar
    }
  };

  const handleSilaboUpload = (e, courseId) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCourses(courses.map(course => 
        course.id === courseId 
          ? { ...course, silabo: selectedFile }
          : course
      ));
      alert(`Sílabo ${selectedFile.name} cargado para el curso ${courses.find(c => c.id === courseId)?.nombre}`);
    }
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      alert(`Archivo ${selectedFile.name} subido. Procesando con OCR...`);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Registro de Cursos y Sílabos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Estudiante</label>
          <p className="text-white">{`${student?.nombre} ${student?.apellido}` || 'No seleccionado'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Universidad de Origen</label>
          <p className="text-white">{student.universidad?.nombre || 'No especificada'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Carrera de Origen</label>
          <p className="text-white">{student.carrera?.nombre || 'No especificada'}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium text-white mb-3">Registrar Curso Manualmente</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={newCourse.codigo}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Curso"
            value={newCourse.nombre}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 md:col-span-2"
          />
          <input
            type="text"
            name="creditos"
            placeholder="Créditos"
            value={newCourse.creditos}
            onChange={handleInputChange}
            maxLength={2}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
            }}
          />
        </div>
        <button 
          onClick={addCourse}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer"
        >
          Agregar Curso
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium text-white mb-3">Subir Boleta de Notas (PDF)</h3>
        <div className="flex items-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer mr-3"
          >
            Seleccionar Archivo
          </label>
          <span className="text-gray-300">{file ? file.name : 'No se ha seleccionado archivo'}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">El sistema extraerá automáticamente los cursos usando OCR</p>
      </div>

      {courses.length > 0 && (
        <div className="overflow-x-auto">
          <h3 className="text-md font-medium text-white mb-3">Cursos Registrados</h3>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Código</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Nombre del Curso</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Créditos</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Sílabo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-3">
                    <span className="text-white">{course.codigo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white">{course.nombre}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white">{course.creditos}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">
                      {course.silabo ? course.silabo.name : 'No cargado'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEditing(course)}
                        className="text-blue-500 hover:text-blue-400 text-sm font-medium cursor-pointer"
                      >
                        Editar
                      </button>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleSilaboUpload(e, course.id)}
                          className="hidden"
                          id={`silabo-upload-${course.id}`}
                        />
                        <label 
                          htmlFor={`silabo-upload-${course.id}`}
                          className="text-purple-500 hover:text-purple-400 text-sm font-medium cursor-pointer"
                        >
                          Cargar Sílabo
                        </label>
                      </div>
                      <button 
                        onClick={() => removeCourse(course.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-medium cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md cursor-pointer"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          disabled={courses.length === 0 && !file}
        >
          Continuar
        </button>
      </div>

      {/* Modal de Edición */}
      <EditCourseModal
        isOpen={isOpen}
        onClose={cancelEditing}
        course={editingCourse}
        onSave={saveEdit}
      />
    </div>
  );
};

RegistroCursosSilabos.propTypes = {
  student: PropTypes.object.isRequired,
  universityMap: PropTypes.object.isRequired,
  careers: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

export default React.memo(RegistroCursosSilabos);