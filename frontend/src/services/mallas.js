import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
}

export const getMallas = async () => {
	try {
		const res = await api.get('/mallas');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getMalla = async (id) => {
	try {
		const res = await api.get(`/mallas/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getMallasByCarrera = async (idMalla) => {
	try {
		const res = await api.get(`/mallas/carrera/${idMalla}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}	
