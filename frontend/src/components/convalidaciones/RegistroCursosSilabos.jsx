import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegistroCursosSilabos = ({ 
  student, 
  universityMap, 
  careers,
  onNext,  // Nueva prop para avanzar
  onPrev   // Nueva prop para retroceder
}) => {
  const originCareer = careers.find(c => c.idCarrera === student.idCarreraOrigen);
  const [courses, setCourses] = useState([]);
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
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
      setNewCourse({ codigo: '', nombre: '', creditos: '' });
    }
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Aquí iría la lógica para procesar el PDF con OCR
      // Por ahora solo simulamos que extraemos datos
      alert(`Archivo ${selectedFile.name} subido. Procesando con OCR...`);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Registro de Cursos y Sílabos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Universidad de Origen</label>
          <p className="text-white">{universityMap[student.idUniversidadOrigen]?.nombre || 'No especificada'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Carrera de Origen</label>
          <p className="text-white">{originCareer?.nombre || 'No especificada'}</p>
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
            className="bg-gray-800 text-white p-2 rounded border border-gray-700"
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-3 text-white">{course.codigo}</td>
                  <td className="px-4 py-3 text-white">{course.nombre}</td>
                  <td className="px-4 py-3 text-white">{course.creditos}</td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => removeCourse(course.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Eliminar
                    </button>
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
          disabled={courses.length === 0 && !file} // Deshabilitar si no hay cursos ni archivo
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

RegistroCursosSilabos.propTypes = {
  student: PropTypes.object.isRequired,
  universityMap: PropTypes.object.isRequired,
  careers: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,  // Validación para la nueva prop
  onPrev: PropTypes.func.isRequired   // Validación para la nueva prop
};

export default React.memo(RegistroCursosSilabos);