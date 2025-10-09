export interface User {
  id: number
  email: string
  username: string
  first_name?: string
  last_name?: string
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at?: string
  roles: Role[]
}

export interface Role {
  id: number
  name: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at?: string
  permissions: Permission[]
}

export interface Permission {
  id: number
  name: string
  code: string
  description?: string
  resource?: string
  action?: string
  is_active: boolean
  created_at: string
  updated_at?: string
}

export interface UserCreate {
  email: string
  username: string
  password: string
  first_name?: string
  last_name?: string
  is_active?: boolean
  role_ids?: number[]
}

export interface UserUpdate {
  email?: string
  username?: string
  password?: string
  first_name?: string
  last_name?: string
  is_active?: boolean
  role_ids?: number[]
}

export interface RoleCreate {
  name: string
  description?: string
  is_active?: boolean
  permission_ids?: number[]
}

export interface RoleUpdate {
  name?: string
  description?: string
  is_active?: boolean
  permission_ids?: number[]
}

export interface PermissionCreate {
  name: string
  code: string
  description?: string
  resource?: string
  action?: string
  is_active?: boolean
}

export interface PermissionUpdate {
  name?: string
  code?: string
  description?: string
  resource?: string
  action?: string
  is_active?: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pages: number
  limit: number
}

export interface Token {
  access_token: string
  token_type: string
  refresh_token?: string
}
