import axios from 'axios'

// Usa o IP do servidor, não localhost
const api = axios.create({
  baseURL: 'http://192.168.0.15:3001/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
