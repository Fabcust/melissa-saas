import axios from 'axios'

const api = axios.create({
  baseURL: 'https://melissa-saas-production.up.railway.app/api'
})

console.log('BASE_URL QUE TÁ USANDO:', api.defaults.baseURL) 

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
