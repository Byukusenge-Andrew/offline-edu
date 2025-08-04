import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove it and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  signup: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: 'student' | 'teacher'
  }) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Even if logout fails on server, we should clear local storage
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    return response.data
  },
}

// User API functions
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  updateProfile: async (userData: any) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  },
}

// Course API functions
export const courseAPI = {
  getAllCourses: async () => {
    const response = await api.get('/courses')
    return response.data
  },

  getCourse: async (id: string) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  createCourse: async (courseData: any) => {
    const response = await api.post('/courses', courseData)
    return response.data
  },

  updateCourse: async (id: string, courseData: any) => {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
  },

  deleteCourse: async (id: string) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
  },
}

// Export the axios instance for custom requests
export default api
