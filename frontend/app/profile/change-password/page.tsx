'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { authApi } from '@/lib/api/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.new_password !== formData.confirm_password) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (formData.new_password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setLoading(true)

    try {
      const response = await authApi.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password
      })
      toast.success(response.message)
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al cambiar la contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Cambiar Contraseña
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Actualiza tu Contraseña
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Por seguridad, asegúrate de usar una contraseña fuerte y única.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña Actual *
              </label>
              <input
                type="password"
                value={formData.current_password}
                onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nueva Contraseña *
              </label>
              <input
                type="password"
                value={formData.new_password}
                onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Mínimo 8 caracteres"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Usa al menos 8 caracteres con una combinación de letras, números y símbolos.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Nueva Contraseña *
              </label>
              <input
                type="password"
                value={formData.confirm_password}
                onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Confirma tu nueva contraseña"
              />
            </div>

            {formData.new_password && formData.confirm_password && 
             formData.new_password !== formData.confirm_password && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  ⚠️ Las contraseñas no coinciden
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
            💡 Consejos de Seguridad
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
            <li>No compartas tu contraseña con nadie</li>
            <li>Usa una contraseña diferente para cada servicio</li>
            <li>Cambia tu contraseña regularmente</li>
            <li>No uses información personal fácil de adivinar</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

