import api from './api'

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials)
    
    if (response.data && response.data.token) {
      // Almacenar token
      localStorage.setItem('token', response.data.token)
      // Configurar token para futuras solicitudes
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    }
    
    return response
  } catch (error) {
    console.error('Error de inicio de sesión:', error.response?.data?.message || error.message)
    throw error
  }
}

export const logout = async () => {
  try {
    // Intenta hacer logout en el servidor
    const response = await api.post('/logout')
    return response
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response?.data?.message || error.message)
  } finally {
    // Siempre limpiar el token y los headers, incluso si falla la petición
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
}

export const getAuthenticatedUser = async () => {
  try {
    if (!localStorage.getItem('token')) {
      return null
    }
    
    const response = await api.get('/users-authenticated')
    return response.data
  } catch (error) {
    console.error('Error al verificar autenticación:', error.message)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    return null
  }
}