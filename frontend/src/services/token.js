export const getToken = () => localStorage.getItem('token')

export const setToken = (token) => {
  localStorage.setItem('token', token)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeToken = () => {
  localStorage.removeItem('token')
  delete api.defaults.headers.common['Authorization']
}