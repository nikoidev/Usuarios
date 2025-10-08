'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { emailConfigApi } from '@/lib/api/email-config'
import { EmailProviderPreset, EmailConfigCreate } from '@/types'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function EmailSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [presets, setPresets] = useState<EmailProviderPreset[]>([])
  const [selectedPreset, setSelectedPreset] = useState<string>('')
  const [testEmail, setTestEmail] = useState('')
  const [showTestModal, setShowTestModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<EmailConfigCreate>({
    provider: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    sender_email: '',
    sender_name: 'Sistema de Gestión de Usuarios',
    use_tls: true,
    use_ssl: false,
    is_active: true
  })

  // Verificar que sea admin
  useEffect(() => {
    if (user && !user.is_superuser) {
      toast.error('Solo los administradores pueden acceder a esta página')
      router.push('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    fetchPresets()
  }, [])

  const fetchPresets = async () => {
    try {
      const data = await emailConfigApi.getPresets()
      setPresets(data)
    } catch (error) {
      toast.error('Error al cargar los presets')
    }
  }

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName)
    const preset = presets.find(p => p.name === presetName)
    if (preset) {
      setFormData({
        ...formData,
        provider: preset.name,
        smtp_host: preset.smtp_host,
        smtp_port: preset.smtp_port,
        use_tls: preset.use_tls,
        use_ssl: preset.use_ssl
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await emailConfigApi.create(formData)
      toast.success('Configuración guardada correctamente')
      setFormData({
        provider: '',
        smtp_host: '',
        smtp_port: 587,
        smtp_username: '',
        smtp_password: '',
        sender_email: '',
        sender_name: 'Sistema de Gestión de Usuarios',
        use_tls: true,
        use_ssl: false,
        is_active: true
      })
      setSelectedPreset('')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al guardar la configuración')
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast.error('Ingresa un correo electrónico')
      return
    }

    setLoading(true)
    try {
      const response = await emailConfigApi.test(testEmail)
      toast.success(response.message)
      setShowTestModal(false)
      setTestEmail('')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al enviar email de prueba')
    } finally {
      setLoading(false)
    }
  }

  if (!user?.is_superuser) {
    return null
  }

  const currentPreset = presets.find(p => p.name === selectedPreset)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Configuración de Correo Electrónico
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            📧 Configurar SMTP
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Configura el servidor SMTP para enviar correos electrónicos (recuperación de contraseña, notificaciones, etc.)
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de Preset */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proveedor de Email
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Selecciona un proveedor</option>
                {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name}
                  </option>
                ))}
              </select>
              {currentPreset && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  💡 {currentPreset.instructions}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Host SMTP *
                </label>
                <input
                  type="text"
                  value={formData.smtp_host}
                  onChange={(e) => setFormData({...formData, smtp_host: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Puerto SMTP *
                </label>
                <input
                  type="number"
                  value={formData.smtp_port}
                  onChange={(e) => setFormData({...formData, smtp_port: parseInt(e.target.value)})}
                  required
                  min={1}
                  max={65535}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usuario SMTP *
                </label>
                <input
                  type="text"
                  value={formData.smtp_username}
                  onChange={(e) => setFormData({...formData, smtp_username: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña SMTP *
                </label>
                <input
                  type="password"
                  value={formData.smtp_password}
                  onChange={(e) => setFormData({...formData, smtp_password: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Remitente *
                </label>
                <input
                  type="email"
                  value={formData.sender_email}
                  onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="noreply@tuapp.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre Remitente *
                </label>
                <input
                  type="text"
                  value={formData.sender_name}
                  onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.use_tls}
                  onChange={(e) => setFormData({...formData, use_tls: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Usar TLS
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.use_ssl}
                  onChange={(e) => setFormData({...formData, use_ssl: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Usar SSL
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Activar Configuración
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setShowTestModal(true)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                🧪 Probar Configuración
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Configuración'}
              </button>
            </div>
          </form>
        </div>

        {/* Modal de Test Email */}
        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enviar Email de Prueba
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ingresa un correo electrónico para verificar que la configuración funciona correctamente.
              </p>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="destinatario@example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTestModal(false)
                    setTestEmail('')
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleTestEmail}
                  disabled={loading || !testEmail}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

