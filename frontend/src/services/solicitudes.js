import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
}

export const getSolicitudes = async () => {
	try {
		const res = await api.get('/solicitudes');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getSolicitud = async (id) => {
	try {
		const res = await api.get(`/solicitudes/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const createSolicitud = async (data) => {
	try {
		const res = await api.post(`/solicitudes`, data);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}
