import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SugerenciaCursos = ({ originUniversity, destinationUniversity }) => {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Sugerencia de Cursos</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-md font-medium text-white mb-2">Cursos de Origen</h3>
          <div className="max-h-64 overflow-y-auto border border-gray-700 rounded p-2">
            {/* Lista de cursos de origen */}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-md font-medium text-white mb-2">Cursos de Destino</h3>
          <div className="max-h-64 overflow-y-auto border border-gray-700 rounded p-2">
            {/* Lista de cursos de destino */}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          onClick={() => setSuggestions([])}
        >
          Generar Sugerencias
        </button>
      </div>
    </div>
  );
};

SugerenciaCursos.propTypes = {
  originUniversity: PropTypes.string.isRequired,
  destinationUniversity: PropTypes.string.isRequired
};

export default React.memo(SugerenciaCursos);