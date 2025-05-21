import api from './api'

const handleError = (error) => {
	console.error(error);
	throw error;
}

export const getUsers = async () => {
	try {
		const res = await api.get('/users');
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getUser = async (id) => {
	try {
		const res = await api.get(`/users/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

export const getAuthenticatedUser = async () => {
	try {
		const res = await api.get('/users-authenticated');
		return res.data
	} catch (error) {
		console.error(error)
		throw error
	}
  }

