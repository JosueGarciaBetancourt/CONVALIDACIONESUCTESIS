import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
}

export const getCarreras = async () => {
	try {
		const res = await api.get('/carreras');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getCarrera = async (id) => {
	try {
		const res = await api.get(`/carreras/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getCarrerasByUniversidad = async (idUniversidad) => {
	try {
		const res = await api.get(`/carreras/universidad/${idUniversidad}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}	
