# 🚀 Sistema de Gestión de Usuarios

Sistema completo de gestión de usuarios con autenticación JWT, control de roles y permisos. Desarrollado con **FastAPI**, **Next.js 14**, **TypeScript** y **PostgreSQL**.

## ✨ Características

- 🔐 **Autenticación JWT** segura
- 👥 **CRUD completo de Usuarios**
- 🛡️ **Gestión de Roles** con asignación flexible
- 🔑 **Sistema de Permisos** granular
- 🎨 **Tema Claro/Oscuro**
- 📱 **Diseño Responsive** con Tailwind CSS
- 🐳 **Docker** para PostgreSQL y pgAdmin
- 🔥 **Hot Reload** en desarrollo

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** - Framework web moderno de Python
- **SQLAlchemy** - ORM para PostgreSQL
- **Pydantic** - Validación de datos
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Hash seguro de contraseñas
- **Pipenv** - Gestión de dependencias

### Frontend
- **Next.js 14** - Framework de React
- **TypeScript** - JavaScript tipado
- **Tailwind CSS** - Estilos utility-first
- **Axios** - Cliente HTTP
- **React Context** - Gestión de estado
- **Heroicons** - Iconos

### Base de Datos
- **PostgreSQL 15** - Base de datos relacional
- **pgAdmin 4** - Interfaz de administración

## 📋 Requisitos

- Python 3.13+
- Node.js 18+
- Docker y Docker Compose
- Pipenv

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd Usuarios
```

### 2. Configurar variables de entorno
```bash
# Backend - Crear backend/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/users_db
SECRET_KEY=tu-clave-secreta-muy-segura-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Iniciar Docker
```bash
docker-compose up -d
```

### 4. Configurar Backend
```bash
cd backend
pipenv install
pipenv run python init_db.py
```

### 5. Configurar Frontend
```bash
cd frontend
npm install
npm run build
```

### 6. Iniciar el Proyecto

**Opción 1: Con F5 (Recomendado)**
- Presiona `F5` en VS Code/Cursor
- Se iniciarán automáticamente backend y frontend

**Opción 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
pipenv run python run.py

# Terminal 2 - Frontend
cd frontend
npm run start  # Producción
# o
npm run dev    # Desarrollo
```

## 🔑 Credenciales por Defecto

**Administrador:**
- Usuario: `admin`
- Contraseña: `admin123`

**Usuario Regular:**
- Usuario: `user`
- Contraseña: `user123`

## 📂 Estructura del Proyecto

```
Usuarios/
├── backend/
│   ├── app/
│   │   ├── api/          # Endpoints de la API
│   │   ├── core/         # Configuración y seguridad
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── schemas/      # Esquemas Pydantic
│   │   └── services/     # Lógica de negocio
│   ├── init_db.py        # Script de inicialización
│   ├── run.py            # Punto de entrada
│   └── Pipfile           # Dependencias Python
├── frontend/
│   ├── app/              # Páginas Next.js 14
│   ├── components/       # Componentes React
│   ├── contexts/         # Context API
│   ├── lib/              # Utilidades y API
│   └── types/            # Tipos TypeScript
├── docker-compose.yml    # Servicios Docker
└── README.md
```

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Usuarios
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/{id}` - Obtener usuario
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

### Roles
- `GET /api/roles` - Listar roles
- `POST /api/roles` - Crear rol
- `GET /api/roles/{id}` - Obtener rol
- `PUT /api/roles/{id}` - Actualizar rol
- `DELETE /api/roles/{id}` - Eliminar rol

### Permisos
- `GET /api/permissions` - Listar permisos
- `POST /api/permissions` - Crear permiso
- `GET /api/permissions/{id}` - Obtener permiso
- `PUT /api/permissions/{id}` - Actualizar permiso
- `DELETE /api/permissions/{id}` - Eliminar permiso

## 🐳 Servicios Docker

- **PostgreSQL**: `localhost:5433`
- **pgAdmin**: `http://localhost:5051`
  - Email: `admin@admin.com`
  - Contraseña: `admin`

## 🔧 Scripts Disponibles

### Backend
```bash
pipenv run python run.py          # Iniciar servidor
pipenv run python init_db.py      # Inicializar base de datos
pipenv install                    # Instalar dependencias
pipenv shell                      # Activar entorno virtual
```

### Frontend
```bash
npm run dev      # Modo desarrollo
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar linter
```

## 📝 Desarrollo

### Backend
El backend usa FastAPI con estructura modular:
- **Models**: Define las tablas de la base de datos
- **Schemas**: Valida entrada/salida de datos
- **Services**: Contiene la lógica de negocio
- **Routes**: Define los endpoints de la API

### Frontend
El frontend usa Next.js 14 con App Router:
- **Pages**: Rutas de la aplicación
- **Components**: Componentes reutilizables
- **Contexts**: Estado global (Auth, Theme)
- **API Layer**: Integración con el backend

## 🎨 Temas

El sistema incluye soporte para tema claro y oscuro:
- Se guarda la preferencia en localStorage
- Cambio instantáneo sin recargar
- Transiciones suaves

## 🔒 Seguridad

- Contraseñas hasheadas con Bcrypt
- Tokens JWT con expiración
- Validación de datos con Pydantic
- CORS configurado
- Variables de entorno para secretos

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para guías de contribución.

---

Desarrollado con ❤️ usando FastAPI y Next.js
