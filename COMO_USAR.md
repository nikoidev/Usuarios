# 🎯 Cómo Usar el Sistema

## 🚀 Iniciar con F5 (Modo Producción)

### Pasos Simples:

1. **Abre el proyecto** en Cursor/VS Code
2. **Presiona F5**
3. **Selecciona**: `Full Stack (Production)`
4. **Espera** a que se abran 2 terminales:
   - Terminal 1: Backend (FastAPI) 
   - Terminal 2: Frontend (Next.js Build)
5. **Accede** a: http://localhost:3000
6. **Inicia sesión** con:
   - Usuario: `admin`
   - Password: `admin123`

### ¿Qué hace F5?

- ✅ Inicia el backend con Pipenv automáticamente
- ✅ Ejecuta el build del frontend (si es necesario)
- ✅ Inicia ambos servicios en terminales separadas
- ✅ Puedes usar breakpoints en el código Python

### Detener:

- **Shift+F5** o click en el botón **STOP** (□)

---

## 🔧 Modo Desarrollo (Hot Reload)

Si estás desarrollando y quieres ver cambios en tiempo real:

### Opción 1: Ambos Servicios

```bash
# Terminal 1 - Backend
cd backend
pipenv run python run.py

# Terminal 2 - Frontend (Dev Mode)
cd frontend
npm run dev
```

### Opción 2: Solo Frontend en Dev

1. Backend con F5 (selecciona "Backend (FastAPI)")
2. Frontend manual:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📚 Funcionalidades del Sistema

### 1. **Dashboard** 📊
- Vista general con estadísticas
- Total de usuarios, roles y permisos
- Información del sistema

### 2. **Gestión de Usuarios** 👥
- **Listar**: Ver todos los usuarios
- **Crear**: Agregar nuevo usuario con email, username, password
- **Editar**: Modificar datos y asignar roles
- **Eliminar**: Borrar usuarios
- **Roles**: Asignar múltiples roles a cada usuario

### 3. **Gestión de Roles** 🛡️
- **Listar**: Ver todos los roles
- **Crear**: Definir nuevos roles
- **Editar**: Modificar roles y sus permisos
- **Eliminar**: Borrar roles
- **Permisos**: Asignar múltiples permisos a cada rol

### 4. **Gestión de Permisos** 🔑
- **Listar**: Ver todos los permisos
- **Crear**: Definir permisos granulares
- **Editar**: Modificar permisos
- **Eliminar**: Borrar permisos
- **Estructura**: resource.action (ej: user.create, role.read)

### 5. **Tema Claro/Oscuro** 🌓
- Toggle en el menú lateral (dentro del sistema)
- Toggle en la barra superior (dentro del sistema)
- Toggle en la página de login (fuera del sistema)
- Se guarda la preferencia automáticamente

---

## 🔐 Usuarios por Defecto

### Administrador
- **Username**: `admin`
- **Password**: `admin123`
- **Roles**: Admin (todos los permisos)

### Usuario Regular
- **Username**: `user`
- **Password**: `user123`
- **Roles**: User (solo lectura)

---

## 📖 Flujo de Trabajo Típico

### 1. Crear un Nuevo Rol

1. Ve a **Roles** en el menú
2. Click en **Add Role**
3. Completa:
   - Name: Ej. "Editor"
   - Description: Ej. "Puede editar contenido"
   - Permissions: Selecciona los permisos necesarios
4. Click en **Create**

### 2. Crear un Usuario con ese Rol

1. Ve a **Users** en el menú
2. Click en **Add User**
3. Completa:
   - Username: Ej. "editor1"
   - Email: Ej. "editor@example.com"
   - Password: Ej. "password123"
   - First Name y Last Name (opcional)
   - Roles: Selecciona "Editor"
4. Click en **Create**

### 3. Modificar Permisos de un Rol

1. Ve a **Roles**
2. Click en el icono de editar (lápiz) del rol
3. Marca/desmarca permisos
4. Click en **Update**
5. Los cambios aplican inmediatamente a todos los usuarios con ese rol

---

## 🎨 Interfaz de Usuario

### Navegación
- **Sidebar izquierdo**: Menú principal siempre visible
- **Topbar**: Título de página + toggle de tema
- **Footer del sidebar**: Info de usuario + logout

### Tablas
- **Ordenamiento**: Click en headers (futuro)
- **Filtros**: Campo de búsqueda (futuro)
- **Acciones**: Botones de editar y eliminar en cada fila

### Modales
- **Formularios**: Para crear y editar
- **Validación**: Campos requeridos marcados con *
- **Feedback**: Notificaciones toast en cada acción

---

## 🔗 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación principal |
| Backend API | http://localhost:8000 | API REST |
| API Docs (Swagger) | http://localhost:8000/docs | Documentación interactiva |
| API Docs (ReDoc) | http://localhost:8000/redoc | Documentación alternativa |
| pgAdmin | http://localhost:5051 | Admin de PostgreSQL |

---

## 💡 Tips y Trucos

### Desarrollo Rápido
```bash
# Backend con auto-reload
cd backend
pipenv run uvicorn app.main:app --reload

# Frontend con auto-reload
cd frontend
npm run dev
```

### Ver Logs Detallados
```bash
# Backend con debug
cd backend
pipenv run uvicorn app.main:app --reload --log-level debug

# Frontend con debug
cd frontend
npm run dev -- --debug
```

### Limpiar Todo
```bash
# Frontend
cd frontend
rm -rf .next node_modules
npm install
npm run build

# Backend
cd backend
pipenv --rm
pipenv install
```

### Reiniciar Base de Datos
```bash
# 1. Detener y limpiar Docker
docker-compose down -v

# 2. Iniciar de nuevo
docker-compose up -d

# 3. Esperar 10 segundos y reinicializar
cd backend
pipenv run python init_db.py
```

---

## 🐛 Problemas Comunes

### 1. "Puerto ocupado"
```bash
# Ver qué usa el puerto
netstat -ano | findstr :8000   # Backend
netstat -ano | findstr :3000   # Frontend
netstat -ano | findstr :5433   # PostgreSQL
```

### 2. "Cannot connect to database"
- Verifica que Docker esté corriendo
- Ejecuta `docker ps` para ver los contenedores
- Reinicia: `docker-compose restart`

### 3. "Module not found"
```bash
# Backend
cd backend
pipenv install

# Frontend
cd frontend
npm install
```

### 4. Error en login
- Verifica que el backend esté corriendo (http://localhost:8000/docs)
- Revisa la consola del navegador (F12)
- Verifica las credenciales: admin/admin123

---

## 📞 Soporte

Para más información consulta:
- [README.md](README.md) - Documentación completa
- [START_PRODUCTION.md](START_PRODUCTION.md) - Inicio en producción
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solución de problemas
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitectura del sistema
