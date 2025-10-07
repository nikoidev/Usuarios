# 🚀 EMPIEZA AQUÍ - Sistema de Gestión de Usuarios

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Docker Desktop** (corriendo)
- ✅ **Python 3.9+** (`python --version`)
- ✅ **Node.js 18+** (`node --version`)
- ✅ **pip** (`pip --version`)

## 🎯 Instalación en 3 Pasos

### Paso 1️⃣: Base de Datos (30 segundos)

```bash
docker-compose up -d
```

Espera 5-10 segundos para que PostgreSQL inicie.

### Paso 2️⃣: Backend (2 minutos)

```bash
cd backend

# Instalar pipenv (solo primera vez)
pip install pipenv

# Instalar dependencias
pipenv install

# Inicializar base de datos con datos de prueba
pipenv run python init_db.py

# Iniciar servidor
pipenv run python run.py
```

✅ **Backend listo en:** http://localhost:8000  
📚 **API Docs:** http://localhost:8000/docs

### Paso 3️⃣: Frontend (2 minutos)

**Abre una NUEVA terminal:**

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

✅ **Frontend listo en:** http://localhost:3000

## 🎉 ¡Listo para Usar!

1. Abre tu navegador en: **http://localhost:3000**
2. Inicia sesión con:
   - **Usuario:** `admin`
   - **Contraseña:** `admin123`
3. ¡Explora el sistema!

## 🎨 ¿Qué Puedes Hacer?

- ✅ **Gestionar Usuarios** - Crear, editar, eliminar usuarios
- ✅ **Gestionar Roles** - Asignar roles a usuarios
- ✅ **Gestionar Permisos** - Definir permisos granulares
- ✅ **Cambiar Tema** - Alternar entre claro/oscuro
- ✅ **Ver Estadísticas** - Dashboard con métricas

## 🔗 Enlaces Útiles

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Frontend** | http://localhost:3000 | admin / admin123 |
| **Backend API** | http://localhost:8000/docs | - |
| **pgAdmin** | http://localhost:5051 | admin@admin.com / admin123 |
| **PostgreSQL** | localhost:5433 | admin / admin123 |

## 📚 Documentación

- 📖 **README.md** - Documentación completa
- ⚡ **QUICKSTART.md** - Inicio rápido (5 minutos)
- 🔧 **TROUBLESHOOTING.md** - Solución de problemas
- 🏗️ **ARCHITECTURE.md** - Arquitectura del sistema
- 🔄 **PIPENV_MIGRATION.md** - Guía de Pipenv

## 🐛 ¿Problemas?

### Docker no inicia
```bash
# Verifica que Docker Desktop esté corriendo
docker ps
```

### Error de módulos en Backend
```bash
cd backend
pipenv install
```

### Error de módulos en Frontend
```bash
cd frontend
npm install
```

### Puerto ocupado
- Backend (8000): Cambia puerto en `backend/run.py`
- Frontend (3000): Next.js ofrecerá usar 3001
- PostgreSQL (5433): Cambia en `docker-compose.yml`

## 💡 Comandos Útiles

### Backend
```bash
cd backend

# Ver entorno virtual
pipenv --venv

# Entrar al shell de pipenv
pipenv shell

# Salir del shell
exit

# Reiniciar BD
pipenv run python init_db.py

# Verificar seguridad
pipenv check
```

### Frontend
```bash
cd frontend

# Build de producción
npm run build

# Iniciar producción
npm start

# Linter
npm run lint
```

### Docker
```bash
# Ver logs
docker-compose logs -f

# Reiniciar
docker-compose restart

# Detener
docker-compose down

# Limpiar todo
docker-compose down -v
```

## 🎓 Siguiente Paso

Una vez que el sistema esté corriendo:

1. **Explora el Dashboard** - Ve las estadísticas
2. **Crea un Usuario** - Prueba el CRUD
3. **Asigna Roles** - Experimenta con permisos
4. **Cambia el Tema** - Prueba claro/oscuro
5. **Lee la Documentación** - Entiende la arquitectura

## 📞 ¿Necesitas Ayuda?

1. 📖 Lee **TROUBLESHOOTING.md**
2. 🔍 Busca en la documentación
3. 💬 Abre un issue en GitHub

---

## 🌟 Características Destacadas

- 🔐 **Autenticación JWT** segura
- 🎨 **Tema Claro/Oscuro** con persistencia
- 📱 **Diseño Responsive** moderno
- 🚀 **API REST** completa
- 🐳 **Docker** para fácil setup
- 📚 **Documentación** completa
- ✨ **Código Limpio** con buenas prácticas

---

**¡Disfruta construyendo con este sistema!** 🚀
