import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
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

export const searchEstudiante = async (searchText) => {
	try {
		const res = await api.get(`/estudiantes/buscar?search=${searchText}`);

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
