import axiosInstance from '../axios'
import { Permission, PermissionCreate, PermissionUpdate } from '@/types'

export const permissionsApi = {
  getAll: async (): Promise<Permission[]> => {
    const response = await axiosInstance.get('/api/permissions/')
    return response.data
  },

  getById: async (id: number): Promise<Permission> => {
    const response = await axiosInstance.get(`/api/permissions/${id}`)
    return response.data
  },

  create: async (data: PermissionCreate): Promise<Permission> => {
    const response = await axiosInstance.post('/api/permissions/', data)
    return response.data
  },

  update: async (id: number, data: PermissionUpdate): Promise<Permission> => {
    const response = await axiosInstance.put(`/api/permissions/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/permissions/${id}`)
  },
}
