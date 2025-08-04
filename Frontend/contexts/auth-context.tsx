"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authAPI } from "@/lib/api"

type UserType = "student" | "teacher"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: UserType
  username: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: UserType
  }) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsAuthenticated(true)
          
          // Verify token is still valid
          try {
            const currentUser = await authAPI.getCurrentUser()
            setUser(currentUser)
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
            setUser(null)
            setIsAuthenticated(false)
          }
        }
      } catch (error) {
        console.error("Error during auth initialization:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await authAPI.login(email, password)
      const { token, user: userData } = response
      
      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      setUser(userData)
      setIsAuthenticated(true)
      
      // Redirect based on user type
      if (userData.userType === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/teacher/dashboard")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again."
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: UserType
  }) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await authAPI.signup(userData)
      const { token, user: newUser } = response
      
      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(newUser))
      
      setUser(newUser)
      setIsAuthenticated(true)
      
      // Redirect based on user type
      if (newUser.userType === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/teacher/dashboard")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again."
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
      router.push("/")
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
