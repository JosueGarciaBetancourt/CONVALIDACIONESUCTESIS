// services/api.js - Mejorado
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Interceptor de solicitud para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores de autorización
    if (error.response) {
      // Token expirado o inválido
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
      // Permiso denegado
      if (error.response.status === 403) {
        console.error('Acceso denegado')
      }
    }
    return Promise.reject(error)
  }
)

export default api