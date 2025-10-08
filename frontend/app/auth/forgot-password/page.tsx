'use client'

import { useState } from 'react'
import { authApi } from '@/lib/api/auth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import SafeThemeToggle from '@/components/SafeThemeToggle'

export const dynamic = 'force-dynamic'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authApi.forgotPassword(email)
      toast.success(response.message)
      setSubmitted(true)
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al enviar el correo')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="absolute top-4 right-4">
          <SafeThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Correo Enviado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Si el correo electrónico existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Por favor, revisa tu bandeja de entrada y la carpeta de spam.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Volver al Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="absolute top-4 right-4">
        <SafeThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="tu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              ← Volver al Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

