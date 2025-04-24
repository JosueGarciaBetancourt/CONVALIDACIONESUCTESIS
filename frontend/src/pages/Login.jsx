import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/login'

function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('12345678')
  const [error, setError] = useState('')
  const [response, setResponse] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const data = {
      email,
      password
    }

    try {
      const res = await login(data)
      setResponse(res.data)
      setError('')
      console.log(res.data)
	  navigate('/dashboard')  // Redirige a /dashboard, cámbialo por la ruta que tengas configurada
    } catch (err) {
      console.error(err)
      setError('Credenciales inválidas o error en el servidor.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 cursor-pointer"
          >
            Ingresar
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 text-sm font-medium">{error}</p>
        )}

        {response && (
          <pre className="mt-4 p-2 bg-gray-50 border border-gray-200 rounded text-sm overflow-x-auto">{JSON.stringify(response, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}

export default Login
