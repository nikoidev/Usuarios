'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { usersApi } from '@/lib/api/users'
import { rolesApi } from '@/lib/api/roles'
import { permissionsApi } from '@/lib/api/permissions'
import { UsersIcon, ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    roles: 0,
    permissions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, roles, permissions] = await Promise.all([
          usersApi.getAll(),
          rolesApi.getAll(),
          permissionsApi.getAll(),
        ])
        setStats({
          users: users.length,
          roles: roles.length,
          permissions: permissions.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: UsersIcon,
      color: 'bg-blue-500',
      href: '/users',
    },
    {
      title: 'Total Roles',
      value: stats.roles,
      icon: ShieldCheckIcon,
      color: 'bg-green-500',
      href: '/roles',
    },
    {
      title: 'Total Permissions',
      value: stats.permissions,
      icon: KeyIcon,
      color: 'bg-purple-500',
      href: '/permissions',
    },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {loading ? '...' : card.value}
                    </p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Welcome to User Management System
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This system provides complete CRUD operations for managing users, roles, and permissions.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Create, read, update, and delete users</li>
            <li>Manage roles and assign them to users</li>
            <li>Define permissions and associate them with roles</li>
            <li>Dark/Light theme support</li>
            <li>Secure authentication with JWT tokens</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
