
// src/pages/ApiTester.jsx o src/components/ApiTester.jsx
import { useState } from 'react';
import { testApi, testApiWithParam } from '../services/testApi'; // Ajusta la ruta según tu estructura

export default function ApiTester() {
	const [endpoints, setEndpoints] = useState([
	  { id: 1, name: 'Test con parámetro', path: '/test/', hasParam: true, active: true },
	  { id: 2, name: 'Test sin parámetro', path: '/test', hasParam: false, active: false }
	]);
	const [param, setParam] = useState('Josué');
	const [loading, setLoading] = useState(false);
	const [responseHistory, setResponseHistory] = useState([]);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [newEndpoint, setNewEndpoint] = useState({ 
	  name: '', 
	  path: '', 
	  hasParam: true 
	});
  
	// Obtener el endpoint activo
	const activeEndpoint = endpoints.find(ep => ep.active) || endpoints[0];
  
	const handleTest = async () => {
	  setLoading(true);
	  setError(null);
	  
	  try {
		const startTime = Date.now();
		let response;
		
		// Decidir qué función usar según si el endpoint necesita parámetro o no
		if (activeEndpoint.hasParam) {
		  response = await testApiWithParam(param);
		} else {
		  response = await testApi();
		}
		
		const endTime = Date.now();
		
		const responseItem = {
		  id: Date.now(),
		  endpoint: activeEndpoint.name,
		  param: activeEndpoint.hasParam ? param : 'N/A',
		  data: response.data,
		  timestamp: new Date().toLocaleTimeString(),
		  duration: `${endTime - startTime}ms`
		};
		
		setResponseHistory(prev => [responseItem, ...prev].slice(0, 10));
	  } catch (err) {
		setError(err.message || 'Error desconocido al llamar a la API');
		console.error('Error al llamar a la API:', err);
	  } finally {
		setLoading(false);
	  }
	};
  
	const handleAddEndpoint = () => {
	  if (newEndpoint.name.trim() && newEndpoint.path.trim()) {
		setEndpoints([
		  ...endpoints,
		  { 
			id: Date.now(), 
			name: newEndpoint.name, 
			path: newEndpoint.path,
			hasParam: newEndpoint.hasParam,
			active: false 
		  }
		]);
		setNewEndpoint({ 
		  name: '', 
		  path: '', 
		  hasParam: true 
		});
		setShowAddForm(false);
	  }
	};
  
	const setActiveEndpoint = (id) => {
	  setEndpoints(endpoints.map(ep => ({
		...ep,
		active: ep.id === id
	  })));
	};
  
	const removeEndpoint = (id) => {
	  setEndpoints(endpoints.filter(ep => ep.id !== id));
	};
  
	const removeHistoryItem = (id) => {
	  setResponseHistory(responseHistory.filter(item => item.id !== id));
	};
  
	return (
	  <div className="min-h-screen bg-gray-900 text-gray-100">
		<div className="container mx-auto p-4">
		  <header className="mb-6 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-indigo-400">API Tester</h1>
			<div className="flex space-x-2">
			  <button 
				onClick={() => setResponseHistory([])}
				className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
			  >
				Limpiar historial
			  </button>
			</div>
		  </header>
  
		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Panel izquierdo: Controles */}
			<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
			  {/* Endpoints */}
			  <div className="mb-6">
				<div className="flex justify-between items-center mb-4">
				  <h2 className="text-xl font-semibold text-indigo-300">Endpoints</h2>
				  <button 
					onClick={() => setShowAddForm(!showAddForm)}
					className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
				  >
					{showAddForm ? 'Cancelar' : 'Añadir'}
				  </button>
				</div>
				
				{showAddForm && (
				  <div className="mb-4 p-3 bg-gray-700 rounded">
					<input
					  type="text"
					  placeholder="Nombre del endpoint"
					  value={newEndpoint.name}
					  onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
					  className="w-full mb-2 p-2 bg-gray-600 rounded text-white"
					/>
					<input
					  type="text"
					  placeholder="Ruta del endpoint (ej: /test)"
					  value={newEndpoint.path}
					  onChange={(e) => setNewEndpoint({...newEndpoint, path: e.target.value})}
					  className="w-full mb-2 p-2 bg-gray-600 rounded text-white"
					/>
					<div className="flex items-center mb-3">
					  <input
						type="checkbox"
						id="hasParam"
						checked={newEndpoint.hasParam}
						onChange={(e) => setNewEndpoint({...newEndpoint, hasParam: e.target.checked})}
						className="mr-2"
					  />
					  <label htmlFor="hasParam" className="text-sm">Requiere parámetro</label>
					</div>
					<button 
					  onClick={handleAddEndpoint}
					  className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
					>
					  Guardar endpoint
					</button>
				  </div>
				)}
				
				<ul className="space-y-2">
				  {endpoints.map(endpoint => (
					<li 
					  key={endpoint.id} 
					  className={`flex justify-between items-center p-2 rounded ${endpoint.active ? 'bg-indigo-700' : 'bg-gray-700'} hover:bg-indigo-600 transition-colors cursor-pointer`}
					  onClick={() => setActiveEndpoint(endpoint.id)}
					>
					  <div>
						<div className="font-medium">{endpoint.name}</div>
						<div className="flex items-center text-sm">
						  <span className="text-gray-400">{endpoint.path}</span>
						  {endpoint.hasParam && (
							<span className="ml-2 text-yellow-400">{`{parámetro}`}</span>
						  )}
						</div>
					  </div>
					  {endpoints.length > 1 && (
						<button 
						  onClick={(e) => {
							e.stopPropagation();
							removeEndpoint(endpoint.id);
						  }}
						  className="text-red-400 hover:text-red-300 cursor-pointer font-bold"
						>
						  x
						</button>
					  )}
					</li>
				  ))}
				</ul>
			  </div>
			  
			  {/* Formulario de prueba */}
			  <div>
				<h2 className="text-xl font-semibold mb-4 text-indigo-300">Probar API</h2>
				<div className="mb-4">
				  <div className="font-medium mb-1 text-gray-300">Endpoint activo</div>
				  <div className="p-2 bg-gray-700 rounded mb-4">
					<div className="font-bold">{activeEndpoint.name}</div>
					<div className="text-sm text-gray-400">
					  {activeEndpoint.path}
					  {activeEndpoint.hasParam && <span className="text-yellow-400">{`/{parámetro}`}</span>}
					</div>
				  </div>
				  
				  {activeEndpoint.hasParam && (
					<>
					  <label className="block mb-1 text-gray-300">Parámetro</label>
					  <input
						type="text"
						value={param}
						onChange={(e) => setParam(e.target.value)}
						className="w-full p-2 mb-4 bg-gray-700 rounded text-white border border-gray-600 focus:border-indigo-500 focus:outline-none"
						placeholder="Introduce un parámetro..."
					  />
					</>
				  )}
				  
				  <button 
					onClick={handleTest}
					disabled={loading || (activeEndpoint.hasParam && !param.trim())}
					className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
				  >
					{loading ? 'Enviando...' : 'Enviar solicitud'}
				  </button>
				</div>
				
				{error && (
				  <div className="p-3 bg-red-900 text-white rounded mt-4">
					<div className="font-bold">Error</div>
					<div>{error}</div>
				  </div>
				)}
			  </div>
			</div>
			
			{/* Panel derecho: Resultado más reciente */}
			<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
			  <h2 className="text-xl font-semibold mb-4 text-indigo-300">Respuesta actual</h2>
			  {responseHistory.length > 0 ? (
				<div className="overflow-hidden">
				  <div className="flex justify-between text-sm text-gray-400 mb-1">
					<div>{responseHistory[0].endpoint}</div>
					<div>{responseHistory[0].timestamp} ({responseHistory[0].duration})</div>
				  </div>
				  <div className="text-sm text-gray-400 mb-2">
					{responseHistory[0].param !== 'N/A' && (
					  <div>Parámetro: <span className="text-yellow-400">{responseHistory[0].param}</span></div>
					)}
				  </div>
				  <pre className="bg-gray-700 p-4 rounded overflow-auto max-h-64 text-green-300">
					{JSON.stringify(responseHistory[0].data, null, 2)}
				  </pre>
				</div>
			  ) : (
				<div className="text-gray-500 italic">No hay respuestas todavía</div>
			  )}
			</div>
		  </div>
		</div>
	  </div>
	);
  }