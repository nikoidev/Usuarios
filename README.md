# Sistema de Gestión de Usuarios

Sistema completo de gestión de usuarios con CRUD para Usuarios, Roles y Permisos. Construido con FastAPI, Next.js, TypeScript y PostgreSQL.

## 🚀 Características

- ✅ CRUD completo para Usuarios, Roles y Permisos
- 🔐 Autenticación JWT
- 🎨 Tema claro/oscuro
- 📱 Diseño responsive y moderno
- 🐳 Docker para PostgreSQL y pgAdmin
- 🏗️ Arquitectura con mejores prácticas
- 🔄 Relaciones many-to-many entre entidades

## 📋 Requisitos Previos

- Python 3.9+
- Node.js 18+
- Docker y Docker Compose

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd Usuarios
```

### 2. Configurar Base de Datos (Docker)

```bash
# Iniciar PostgreSQL y pgAdmin
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker ps
```

**Acceso a pgAdmin:**
- URL: http://localhost:5051
- Email: admin@admin.com
- Password: admin123

**Configuración de conexión en pgAdmin:**
- Host: usuarios_postgres
- Port: 5432
- Database: usuarios_db
- Username: admin
- Password: admin123

### 3. Configurar Backend (FastAPI)

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Inicializar base de datos con datos de prueba
python init_db.py

# Iniciar servidor
uvicorn app.main:app --reload
```

El backend estará disponible en: http://localhost:8000

**Documentación API:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 4. Configurar Frontend (Next.js)

```bash
# Abrir nueva terminal y navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## 👤 Credenciales por Defecto

**Usuario Administrador:**
- Username: `admin`
- Password: `admin123`

**Usuario Regular:**
- Username: `user`
- Password: `user123`

## 📁 Estructura del Proyecto

```
Usuarios/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── roles.py
│   │   │   │   └── permissions.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   ├── user_role.py
│   │   │   └── role_permission.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   └── token.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   ├── role_service.py
│   │   │   └── permission_service.py
│   │   └── main.py
│   ├── requirements.txt
│   └── init_db.py
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── login/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── roles.ts
│   │   │   └── permissions.ts
│   │   └── axios.ts
│   ├── types/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## 🔧 Tecnologías Utilizadas

### Backend
- **FastAPI**: Framework web moderno y rápido
- **SQLAlchemy**: ORM para Python
- **PostgreSQL**: Base de datos relacional
- **Pydantic**: Validación de datos
- **JWT**: Autenticación con tokens
- **Bcrypt**: Hash de contraseñas

### Frontend
- **Next.js 14**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS
- **Axios**: Cliente HTTP
- **React Hook Form**: Manejo de formularios
- **React Hot Toast**: Notificaciones

### DevOps
- **Docker**: Contenedores
- **Docker Compose**: Orquestación de contenedores

## 🎨 Características del UI

- **Tema Claro/Oscuro**: Toggle disponible en el menú lateral y barra superior
- **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla
- **Tablas Interactivas**: Para visualización de datos
- **Modales**: Para crear y editar entidades
- **Notificaciones**: Feedback visual de operaciones
- **Navegación Intuitiva**: Menú lateral con iconos

## 🔐 Seguridad

- Autenticación basada en JWT
- Contraseñas hasheadas con bcrypt
- Validación de datos en frontend y backend
- Protección de rutas
- CORS configurado

## 📊 Modelo de Datos

### Usuario
- Email (único)
- Username (único)
- Password (hasheado)
- Nombre y Apellido
- Estado activo/inactivo
- Relación many-to-many con Roles

### Rol
- Nombre (único)
- Descripción
- Estado activo/inactivo
- Relación many-to-many con Usuarios y Permisos

### Permiso
- Nombre (único)
- Código (único)
- Descripción
- Recurso (ej: users, roles)
- Acción (ej: create, read, update, delete)
- Estado activo/inactivo
- Relación many-to-many con Roles

## 🚀 Comandos Útiles

### Backend

```bash
# Iniciar servidor
uvicorn app.main:app --reload

# Inicializar base de datos
python init_db.py

# Crear migraciones (si usas Alembic)
alembic revision --autogenerate -m "mensaje"
alembic upgrade head
```

### Frontend

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start

# Linter
npm run lint
```

### Docker

```bash
# Iniciar contenedores
docker-compose up -d

# Detener contenedores
docker-compose down

# Ver logs
docker-compose logs -f

# Reiniciar contenedores
docker-compose restart
```

## 🔄 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Usuarios
- `GET /api/users/` - Listar usuarios
- `GET /api/users/{id}` - Obtener usuario
- `POST /api/users/` - Crear usuario
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

### Roles
- `GET /api/roles/` - Listar roles
- `GET /api/roles/{id}` - Obtener rol
- `POST /api/roles/` - Crear rol
- `PUT /api/roles/{id}` - Actualizar rol
- `DELETE /api/roles/{id}` - Eliminar rol

### Permisos
- `GET /api/permissions/` - Listar permisos
- `GET /api/permissions/{id}` - Obtener permiso
- `POST /api/permissions/` - Crear permiso
- `PUT /api/permissions/{id}` - Actualizar permiso
- `DELETE /api/permissions/{id}` - Eliminar permiso

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado como sistema base para múltiples proyectos.

## 🐛 Reporte de Bugs

Si encuentras algún bug, por favor abre un issue en el repositorio.

## 📧 Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.
