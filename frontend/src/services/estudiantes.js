import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error.response.data;
}

export const getEstudiantes = async () => {
	try {
		const res = await api.get('/estudiantes');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getEstudiante = async (id) => {
	try {
		const res = await api.get(`/estudiantes/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getEstudianteWithUniversidadCarrera = async (id) => {
	try {
		const res = await api.get(`/estudiantes/full/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const searchEstudiante = async (params) => {
	try {
		const res = await api.get('/estudiantes/buscar', {
								params: {
									search: params.search,
									idUniversidad: params.universidad
								}
							});
		return res.data;
	} catch (error) {
		handleError(error);
	}
}
  
export const createEstudiante = async (data) => {
	try {
		const res = await api.post(`/estudiantes`, data);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}
