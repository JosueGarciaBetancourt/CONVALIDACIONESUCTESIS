import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const ConfirmDeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName, 
  itemType = "elemento",
  description,
  isDangerous = false 
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleConfirm}
      title="Confirmar Eliminación"
      saveText="Eliminar"
      cancelText="Cancelar"
      saveButtonClass={isDangerous ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"}
      size="sm"
    >
      <div className="text-center">
        {/* Ícono de advertencia */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <svg 
            className="h-8 w-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Título */}
        <h3 className="text-lg font-medium text-white mb-2">
          ¿Estás seguro?
        </h3>

        {/* Descripción principal */}
        <div className="text-gray-300 mb-4">
          <p className="mb-2">
            Esta acción eliminará permanentemente {itemType}{' '}
            <span className="font-semibold text-white">"{itemName}"</span>.
          </p>
          
          {description && (
            <p className="text-sm text-gray-400 mb-2">
              {description}
            </p>
          )}
          
          <p className="text-sm text-red-400 font-medium">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Información adicional para acciones peligrosas */}
        {isDangerous && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L13.09,8.26L22,9L17,14L18.18,22L12,19.27L5.82,22L7,14L2,9L10.91,8.26L12,2Z"/>
              </svg>
              <div className="text-left">
                <p className="text-red-400 text-sm font-medium">¡Cuidado!</p>
                <p className="text-red-300 text-xs mt-1">
                  Esta es una acción crítica que puede afectar otros elementos del sistema.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lista de consecuencias (opcional) */}
        {(itemType === 'curso' || itemType === 'el curso') && (
          <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-3 text-left">
            <p className="text-yellow-400 text-sm font-medium mb-2">
              Al eliminar este curso también se perderá:
            </p>
            <ul className="text-yellow-300 text-xs space-y-1">
              <li>• El sílabo asociado (si existe)</li>
              <li>• Cualquier análisis de equivalencia realizado</li>
              <li>• Los datos de créditos y código del curso</li>
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  itemType: PropTypes.string,
  description: PropTypes.string,
  isDangerous: PropTypes.bool
};

export default ConfirmDeleteModal;