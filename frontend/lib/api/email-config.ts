import axiosInstance from '../axios'
import {
  EmailConfig,
  EmailConfigCreate,
  EmailConfigUpdate,
  EmailProviderPreset,
  MessageResponse
} from '@/types'

export const emailConfigApi = {
  getPresets: async (): Promise<EmailProviderPreset[]> => {
    const response = await axiosInstance.get('/api/email-config/presets')
    return response.data
  },

  getAll: async (): Promise<EmailConfig[]> => {
    const response = await axiosInstance.get('/api/email-config/')
    return response.data
  },

  getActive: async (): Promise<EmailConfig> => {
    const response = await axiosInstance.get('/api/email-config/active')
    return response.data
  },

  getById: async (id: number): Promise<EmailConfig> => {
    const response = await axiosInstance.get(`/api/email-config/${id}`)
    return response.data
  },

  create: async (data: EmailConfigCreate): Promise<EmailConfig> => {
    const response = await axiosInstance.post('/api/email-config/', data)
    return response.data
  },

  update: async (id: number, data: EmailConfigUpdate): Promise<EmailConfig> => {
    const response = await axiosInstance.put(`/api/email-config/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<MessageResponse> => {
    const response = await axiosInstance.delete(`/api/email-config/${id}`)
    return response.data
  },

  activate: async (id: number): Promise<EmailConfig> => {
    const response = await axiosInstance.post(`/api/email-config/${id}/activate`)
    return response.data
  },

  test: async (recipientEmail: string): Promise<MessageResponse> => {
    const response = await axiosInstance.post('/api/email-config/test', {
      recipient_email: recipientEmail
    })
    return response.data
  },
}

