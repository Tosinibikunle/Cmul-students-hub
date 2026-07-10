import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

// Export API methods
export const studentApi = {
  getAll: () => apiClient.get('/students/'),
  get: (id) => apiClient.get(`/students/${id}/`),
  create: (data) => apiClient.post('/students/', data),
  update: (id, data) => apiClient.put(`/students/${id}/`, data),
  delete: (id) => apiClient.delete(`/students/${id}/`),
}

export const courseApi = {
  getAll: () => apiClient.get('/courses/'),
  get: (id) => apiClient.get(`/courses/${id}/`),
  create: (data) => apiClient.post('/courses/', data),
  update: (id, data) => apiClient.put(`/courses/${id}/`, data),
  delete: (id) => apiClient.delete(`/courses/${id}/`),
}

export const enrollmentApi = {
  getAll: () => apiClient.get('/enrollments/'),
  get: (id) => apiClient.get(`/enrollments/${id}/`),
  create: (data) => apiClient.post('/enrollments/', data),
  update: (id, data) => apiClient.put(`/enrollments/${id}/`, data),
  delete: (id) => apiClient.delete(`/enrollments/${id}/`),
}

export default apiClient
