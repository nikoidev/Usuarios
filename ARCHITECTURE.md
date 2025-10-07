# Arquitectura del Sistema

## Visión General

Sistema de gestión de usuarios con arquitectura de tres capas:

1. **Frontend**: Next.js + TypeScript
2. **Backend**: FastAPI + Python
3. **Base de Datos**: PostgreSQL

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Next.js 14 (App Router)                         │  │
│  │  - Pages (Dashboard, Users, Roles, Permissions)  │  │
│  │  - Components (Layout, ThemeToggle)              │  │
│  │  - Contexts (Auth, Theme)                        │  │
│  │  - API Client (Axios)                            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/REST
                          │ JWT Authentication
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  FastAPI                                          │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  API Routes                                 │  │  │
│  │  │  - /api/auth (login, me)                   │  │  │
│  │  │  - /api/users (CRUD)                       │  │  │
│  │  │  - /api/roles (CRUD)                       │  │  │
│  │  │  - /api/permissions (CRUD)                 │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Services (Business Logic)                  │  │  │
│  │  │  - UserService                             │  │  │
│  │  │  - RoleService                             │  │  │
│  │  │  - PermissionService                       │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Models (SQLAlchemy ORM)                   │  │  │
│  │  │  - User                                     │  │  │
│  │  │  - Role                                     │  │  │
│  │  │  - Permission                               │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ SQLAlchemy
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   BASE DE DATOS                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  PostgreSQL                                       │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Tables:                                    │  │  │
│  │  │  - users                                    │  │  │
│  │  │  - roles                                    │  │  │
│  │  │  - permissions                              │  │  │
│  │  │  - user_roles (many-to-many)               │  │  │
│  │  │  - role_permissions (many-to-many)         │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Modelo de Datos

### Relaciones

```
User ←→ user_roles ←→ Role ←→ role_permissions ←→ Permission

User (1) ←→ (N) user_roles (N) ←→ (1) Role
Role (1) ←→ (N) role_permissions (N) ←→ (1) Permission
```

### Tablas

#### users
- id (PK)
- email (unique)
- username (unique)
- hashed_password
- first_name
- last_name
- is_active
- is_superuser
- created_at
- updated_at

#### roles
- id (PK)
- name (unique)
- description
- is_active
- created_at
- updated_at

#### permissions
- id (PK)
- name (unique)
- code (unique)
- description
- resource
- action
- is_active
- created_at
- updated_at

#### user_roles
- user_id (FK, PK)
- role_id (FK, PK)

#### role_permissions
- role_id (FK, PK)
- permission_id (FK, PK)

## Flujo de Autenticación

```
1. Usuario envía credenciales → POST /api/auth/login
2. Backend valida credenciales
3. Backend genera JWT token
4. Frontend guarda token en localStorage
5. Frontend incluye token en cada request (Authorization: Bearer <token>)
6. Backend valida token en cada request protegido
7. Backend retorna datos o error 401
```

## Patrones de Diseño

### Backend

- **Repository Pattern**: Services encapsulan lógica de acceso a datos
- **Dependency Injection**: FastAPI Depends para inyección de dependencias
- **DTO Pattern**: Pydantic schemas para validación y serialización
- **Layered Architecture**: Separación en capas (routes, services, models)

### Frontend

- **Context API**: Para estado global (auth, theme)
- **Custom Hooks**: Para lógica reutilizable
- **Component Composition**: Componentes pequeños y reutilizables
- **Container/Presentational**: Separación de lógica y presentación

## Seguridad

### Backend
- Hash de contraseñas con bcrypt
- JWT para autenticación
- Validación de datos con Pydantic
- CORS configurado
- SQL Injection protegido por ORM

### Frontend
- Tokens en localStorage
- Interceptores de Axios para manejo de tokens
- Validación de formularios
- Redirección automática en 401

## Escalabilidad

### Horizontal
- Backend stateless (JWT)
- Frontend estático (puede servirse desde CDN)
- Base de datos con replicación

### Vertical
- Índices en base de datos
- Caché de queries frecuentes
- Paginación en endpoints

## Extensibilidad

El sistema está diseñado para ser base de otros proyectos:

1. **Agregar nuevas entidades**: Seguir patrón model → schema → service → route
2. **Agregar autenticación OAuth**: Extender auth routes
3. **Agregar websockets**: FastAPI soporta WebSockets nativamente
4. **Agregar notificaciones**: Integrar servicio de email/SMS
5. **Multi-tenancy**: Agregar tenant_id a modelos
