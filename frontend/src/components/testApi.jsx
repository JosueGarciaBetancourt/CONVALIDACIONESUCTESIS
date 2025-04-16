import React, { useState } from 'react';
import axios from 'axios';

function TestApi() {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [param, setParam] = useState('');

	const handleRequest = () => {
		setLoading(true);
		axios
			.get(`http://localhost:8000/api/test/${param}`)
			.then((res) => {
				setResponse(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setResponse({ mensaje: 'Error al conectar con la API' });
				setLoading(false);
			});
	};

	return (
		<div className="min-h-screen bg-primary p-6 font-sans">
			<div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">Probador de API</h1>

				<div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
					<label className="text-gray-700 font-medium">Parámetro (opcional):</label>
					<input
						type="text"
						value={param}
						onChange={(e) => setParam(e.target.value)}
						className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						onClick={handleRequest}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
					>
						Enviar
					</button>
				</div>

				<div>
					{loading && <p className="text-yellow-600">Cargando respuesta...</p>}

					{!loading && response && (
						<div className="bg-black text-green-400 p-4 rounded-md mt-4 overflow-auto">
							<strong className="block text-white mb-2">Respuesta:</strong>
							<pre className="whitespace-pre-wrap break-words">
								{JSON.stringify(response, null, 2)}
							</pre>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default TestApi;
