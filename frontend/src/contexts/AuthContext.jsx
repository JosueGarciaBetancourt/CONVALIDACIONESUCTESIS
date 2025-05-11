import { createContext, useEffect, useState, useContext } from "react"
import * as authService from '../services/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const userData = await authService.getAuthenticatedUser()
        setUser(userData)
      } catch (err) {
        setError('Error al verificar la autenticación')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authService.login(credentials)
      
      // Verifica si la respuesta contiene los datos esperados
      if (response && response.data) {
        // Guarda el usuario
        setUser(response.data.user || response.data)
        return { success: true }
      } else {
        throw new Error('Respuesta de login inválida')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
    } catch (err) {
      console.error("Error al cerrar sesión", err)
    } finally {
      setUser(null)
      setLoading(false)
    }
  }

  // Método para actualizar datos del usuario
  const updateUserData = async () => {
    try {
      const userData = await authService.getAuthenticatedUser()
      setUser(userData)
    } catch (err) {
      console.error("Error al actualizar datos del usuario", err)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      error,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)