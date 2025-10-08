'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import { authApi } from '@/lib/api/auth'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authApi.me()
        setUser(userData)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh access token before it expires
  const scheduleTokenRefresh = () => {
    // Refresh 1 minute before expiration (access token expires in 30 min)
    const refreshTime = 29 * 60 * 1000 // 29 minutes in milliseconds
    
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
    }

    refreshTimerRef.current = setTimeout(async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const data = await authApi.refreshToken(refreshToken)
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          scheduleTokenRefresh() // Schedule next refresh
        }
      } catch (error) {
        console.error('Failed to refresh token:', error)
        await logout()
      }
    }, refreshTime)
  }

  useEffect(() => {
    refreshUser()
    
    // Start token refresh timer if user is logged in
    const token = localStorage.getItem('token')
    if (token) {
      scheduleTokenRefresh()
    }

    // Cleanup timer on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    const data = await authApi.login(username, password)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    await refreshUser()
    scheduleTokenRefresh() // Start auto-refresh
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        await authApi.logout(refreshToken)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
