import axios from 'axios'

const normalizeApiBaseUrl = (value) => {
  const raw = (value || 'http://localhost:5000').trim().replace(/\/+$/, '')
  if (raw.endsWith('/api')) return raw
  return `${raw}/api`
}

const API = axios.create({ baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL) })

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('garud_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default API
