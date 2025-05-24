import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Reporte = ({ onGenerate }) => {
  const [reportType, setReportType] = useState('completo');
  const [format, setFormat] = useState('pdf');

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Reporte</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Reporte</label>
          <div className="flex flex-col space-y-2">
            {['completo', 'resumido', 'detallado'].map(type => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-500 bg-gray-800 border-gray-600"
                  name="reportType"
                  value={type}
                  checked={reportType === type}
                  onChange={() => setReportType(type)}
                />
                <span className="ml-2 text-white capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Formato</label>
          <select 
            className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 w-full"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="word">Word</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            onClick={() => onGenerate({ type: reportType, format })}
          >
            Generar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

Reporte.propTypes = {
  onGenerate: PropTypes.func.isRequired
};

export default React.memo(Reporte);