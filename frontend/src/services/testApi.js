import api from './api'

// Petición sin parámetros
export const testApi = () => api.get('/test')

// Petición con parámetro dinámico
export const testApiWithParam = (param) => api.get(`/test/${param}`)
