import axiosInstance from '../axios'
import { Role, RoleCreate, RoleUpdate } from '@/types'

export const rolesApi = {
  getAll: async (): Promise<Role[]> => {
    const response = await axiosInstance.get('/api/roles/')
    return response.data
  },

  getById: async (id: number): Promise<Role> => {
    const response = await axiosInstance.get(`/api/roles/${id}`)
    return response.data
  },

  create: async (data: RoleCreate): Promise<Role> => {
    const response = await axiosInstance.post('/api/roles/', data)
    return response.data
  },

  update: async (id: number, data: RoleUpdate): Promise<Role> => {
    const response = await axiosInstance.put(`/api/roles/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/roles/${id}`)
  },
}
