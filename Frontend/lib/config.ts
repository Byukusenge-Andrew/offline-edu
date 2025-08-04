// Environment configuration for the frontend

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  users: {
    profile: '/users/profile',
  },
  courses: {
    all: '/courses',
    byId: (id: string) => `/courses/${id}`,
  },
  lessons: {
    all: '/lessons',
    byId: (id: string) => `/lessons/${id}`,
    byCourse: (courseId: string) => `/lessons/course/${courseId}`,
  },
  quizzes: {
    all: '/quizzes',
    byId: (id: string) => `/quizzes/${id}`,
    byLesson: (lessonId: string) => `/quizzes/lesson/${lessonId}`,
  },
}

export default config
