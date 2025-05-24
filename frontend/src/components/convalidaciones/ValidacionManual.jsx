import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ValidacionManual = ({ studentId }) => {
  const [validationResults, setValidationResults] = useState([]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Validación Manual</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Curso Origen</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Curso Destino</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {validationResults.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-white">{item.originCourse}</td>
                <td className="px-4 py-2 text-white">{item.destinationCourse}</td>
                <td className="px-4 py-2">
                  <select className="bg-gray-800 text-white border border-gray-700 rounded p-1 text-sm">
                    <option>Validar</option>
                    <option>Rechazar</option>
                    <option>Modificar</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ValidacionManual.propTypes = {
  studentId: PropTypes.string.isRequired
};

export default React.memo(ValidacionManual);