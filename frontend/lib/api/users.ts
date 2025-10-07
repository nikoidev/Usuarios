import axiosInstance from '../axios'
import { User, UserCreate, UserUpdate } from '@/types'

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/api/users/')
    return response.data
  },

  getById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get(`/api/users/${id}`)
    return response.data
  },

  create: async (data: UserCreate): Promise<User> => {
    const response = await axiosInstance.post('/api/users/', data)
    return response.data
  },

  update: async (id: number, data: UserUpdate): Promise<User> => {
    const response = await axiosInstance.put(`/api/users/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/users/${id}`)
  },
}
