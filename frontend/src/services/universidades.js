import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
}

export const getUniversidades = async () => {
	try {
		const res = await api.get('/universidades');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getUniversidad = async (id) => {
	try {
		const res = await api.get(`/universidades/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}
