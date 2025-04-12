import React, { useState } from 'react';
import axios from 'axios';

function TestApi() {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [param, setParam] = useState('');

	const handleRequest = () => {
	setLoading(true);
	axios.get(`http://localhost:8000/api/test/${param}`)
	
	.then(res => {
			setResponse(res.data);
			setLoading(false);
	})
	.catch(err => {
		console.error(err);
		setResponse({ mensaje: 'Error al conectar con la API' });
		setLoading(false);
	});
	};

	return (
		<div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
			<h1>Probador de API</h1>
			<div style={{ marginBottom: '1rem' }}>
				<label>Parámetro (opcional): </label>
				<input
					type="text"
					value={param}
					onChange={(e) => setParam(e.target.value)}
					style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
				/>
				<button
					onClick={handleRequest}
					style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
				>
					Enviar
				</button>
			</div>
			<div>
				{loading && <p>Cargando respuesta...</p>}
				{!loading && response && (
					<div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '8px' }}>
					<strong>Respuesta:</strong>
					<pre>{JSON.stringify(response, null, 2)}</pre>
					</div>
				)}
			</div>
		</div>
	);
}

export default TestApi;
