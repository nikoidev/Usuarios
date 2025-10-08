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

// Email Configuration
export interface EmailConfig {
  id: number
  provider: string
  smtp_host: string
  smtp_port: number
  smtp_username: string
  sender_email: string
  sender_name: string
  use_tls: boolean
  use_ssl: boolean
  is_active: boolean
  created_at: string
  updated_at?: string
}

export interface EmailConfigCreate {
  provider: string
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  sender_email: string
  sender_name: string
  use_tls: boolean
  use_ssl: boolean
  is_active: boolean
}

export interface EmailConfigUpdate {
  provider?: string
  smtp_host?: string
  smtp_port?: number
  smtp_username?: string
  smtp_password?: string
  sender_email?: string
  sender_name?: string
  use_tls?: boolean
  use_ssl?: boolean
  is_active?: boolean
}

export interface EmailProviderPreset {
  name: string
  smtp_host: string
  smtp_port: number
  use_tls: boolean
  use_ssl: boolean
  instructions: string
}

// Password Management
export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  new_password: string
}

export interface PasswordChangeRequest {
  current_password: string
  new_password: string
}

export interface MessageResponse {
  message: string
}
