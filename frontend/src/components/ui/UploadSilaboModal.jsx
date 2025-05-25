import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const UploadSilaboModal = ({ isOpen, onClose, onSave, courseName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    setError('');
    
    // Validar tipo de archivo
    if (file && file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF');
      return;
    }
    
    // Validar tamaño (máximo 10MB)
    if (file && file.size > 10 * 1024 * 1024) {
      setError('El archivo no debe superar los 10MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        // Simular carga (en producción aquí iría la lógica real de upload)
        await new Promise(resolve => setTimeout(resolve, 2000));
        onSave(selectedFile);
        setSelectedFile(null);
        setError('');
      } catch (err) {
        setError('Error al subir el archivo. Inténtalo de nuevo.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null);
      setError('');
      onClose();
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canSave = selectedFile !== null && !error;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onSave={handleSave}
      title={`Cargar Sílabo - ${courseName}`}
      canSave={canSave}
      isLoading={isUploading}
      saveText="Subir Archivo"
      saveButtonClass="bg-purple-600 hover:bg-purple-700"
      size="md"
    >
      <div className="space-y-4">
        {/* Zona de drag and drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-purple-500 bg-purple-500 bg-opacity-10' 
              : error
              ? 'border-red-500 bg-red-500 bg-opacity-5'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <svg 
              className={`w-12 h-12 mb-4 ${
                error ? 'text-red-400' : dragActive ? 'text-purple-400' : 'text-gray-400'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            
            <div className="text-gray-300">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleInputChange}
                className="hidden"
                id="silabo-upload"
              />
              <label
                htmlFor="silabo-upload"
                className="cursor-pointer text-purple-500 hover:text-purple-400 font-medium transition-colors"
              >
                Seleccionar archivo PDF
              </label>
              <p className="text-sm text-gray-400 mt-2">
                o arrastra y suelta aquí
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Máximo 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {/* Archivo seleccionado */}
        {selectedFile && !error && (
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{selectedFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-400 hover:text-red-400 transition-colors p-1"
                disabled={isUploading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 rounded-lg p-3">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10.5A1.5,1.5 0 0,1 10.5,9A1.5,1.5 0 0,1 12,7.5A1.5,1.5 0 0,1 13.5,9A1.5,1.5 0 0,1 12,10.5Z"/>
            </svg>
            <div>
              <p className="text-blue-400 text-sm font-medium">Información</p>
              <p className="text-blue-300 text-xs mt-1">
                El sílabo se utilizará para el análisis de equivalencias de cursos. 
                Asegúrate de que el archivo sea legible y contenga toda la información del curso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

UploadSilaboModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired
};

export default UploadSilaboModal;