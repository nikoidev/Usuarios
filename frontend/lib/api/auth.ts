import axiosInstance from '../axios'
import { User, PasswordResetRequest, PasswordResetConfirm, PasswordChangeRequest, MessageResponse } from '@/types'

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    
    const response = await axiosInstance.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/api/auth/refresh', {
      refresh_token: refreshToken
    })
    return response.data
  },

  logout: async (refreshToken: string): Promise<MessageResponse> => {
    const response = await axiosInstance.post('/api/auth/logout', {
      refresh_token: refreshToken
    })
    return response.data
  },

  me: async (): Promise<User> => {
    const response = await axiosInstance.get('/api/auth/me')
    return response.data
  },

  forgotPassword: async (email: string): Promise<MessageResponse> => {
    const response = await axiosInstance.post('/api/auth/forgot-password', {
      email
    })
    return response.data
  },

  resetPassword: async (data: PasswordResetConfirm): Promise<MessageResponse> => {
    const response = await axiosInstance.post('/api/auth/reset-password', data)
    return response.data
  },

  changePassword: async (data: PasswordChangeRequest): Promise<MessageResponse> => {
    const response = await axiosInstance.post('/api/auth/change-password', data)
    return response.data
  },
}
