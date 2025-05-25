import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const EditCourseModal = ({ isOpen, onClose, onSave, course }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    creditos: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        codigo: course.codigo || '',
        nombre: course.nombre || '',
        creditos: course.creditos || ''
      });
      setErrors({});
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del curso es obligatorio';
    }
    
    if (formData.creditos && (isNaN(formData.creditos) || formData.creditos < 1 || formData.creditos > 10)) {
      newErrors.creditos = 'Los créditos deben ser un número entre 1 y 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const canSave = formData.codigo.trim() && formData.nombre.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      title="Editar Curso"
      canSave={canSave}
      size="md"
      saveButtonClass="bg-blue-600 hover:bg-blue-700"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Código del Curso <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleInputChange}
            className={`w-full bg-gray-700 text-white p-3 rounded border ${
              errors.codigo ? 'border-red-500' : 'border-gray-600'
            } focus:border-blue-500 focus:outline-none transition-colors`}
            placeholder="Ej: CS101"
          />
          {errors.codigo && (
            <p className="text-red-400 text-sm mt-1">{errors.codigo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre del Curso <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`w-full bg-gray-700 text-white p-3 rounded border ${
              errors.nombre ? 'border-red-500' : 'border-gray-600'
            } focus:border-blue-500 focus:outline-none transition-colors`}
            placeholder="Ej: Introducción a la Programación"
          />
          {errors.nombre && (
            <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Créditos
          </label>
          <input
            type="number"
            name="creditos"
            value={formData.creditos}
            onChange={handleInputChange}
            className={`w-full bg-gray-700 text-white p-3 rounded border ${
              errors.creditos ? 'border-red-500' : 'border-gray-600'
            } focus:border-blue-500 focus:outline-none transition-colors`}
            placeholder="Ej: 3"
            min="1"
            max="10"
          />
          {errors.creditos && (
            <p className="text-red-400 text-sm mt-1">{errors.creditos}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

EditCourseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  course: PropTypes.object
};

export default EditCourseModal;