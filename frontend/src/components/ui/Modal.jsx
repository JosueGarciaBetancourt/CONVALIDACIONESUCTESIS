import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  saveText = "Guardar",
  cancelText = "Cancelar",
  saveButtonClass = "bg-blue-600 hover:bg-blue-700",
  cancelButtonClass = "bg-gray-600 hover:bg-gray-700",
  size = "md",
  showFooter = true,
  isLoading = false,
  canSave = true
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (canSave && !isLoading) {
      onSave();
    }
  };

  // Manejar tecla Escape
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-700 bg-gray-750">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${cancelButtonClass}`}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${saveButtonClass} ${
                !canSave || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!canSave || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                saveText
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  saveText: PropTypes.string,
  cancelText: PropTypes.string,
  saveButtonClass: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showFooter: PropTypes.bool,
  isLoading: PropTypes.bool,
  canSave: PropTypes.bool
};

export default Modal;