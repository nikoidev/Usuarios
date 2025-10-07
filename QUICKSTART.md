# 🚀 Inicio Rápido - 5 Minutos

## Requisitos
- Docker Desktop instalado y corriendo
- Python 3.9+ instalado
- Node.js 18+ instalado

## Paso 1: Base de Datos (30 segundos)

```bash
docker-compose up -d
```

Espera 5 segundos para que PostgreSQL inicie completamente.

## Paso 2: Backend (2 minutos)

### Windows
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
python run.py
```

### Linux/Mac
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python init_db.py
python run.py
```

✅ Backend corriendo en http://localhost:8000

## Paso 3: Frontend (2 minutos)

**Abre una NUEVA terminal:**

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend corriendo en http://localhost:3000

## Paso 4: ¡Listo! (30 segundos)

1. Abre tu navegador en http://localhost:3000
2. Inicia sesión con:
   - **Username:** `admin`
   - **Password:** `admin123`
3. ¡Explora el sistema!

## 🎯 ¿Qué puedes hacer?

- ✅ Gestionar usuarios (crear, editar, eliminar)
- ✅ Gestionar roles y asignarlos a usuarios
- ✅ Gestionar permisos y asignarlos a roles
- ✅ Cambiar entre tema claro y oscuro
- ✅ Ver estadísticas en el dashboard

## 🔗 Enlaces Útiles

- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs
- **pgAdmin:** http://localhost:5051
  - Email: admin@admin.com
  - Password: admin123

## 🐛 ¿Problemas?

### Docker no inicia
```bash
# Verifica que Docker Desktop esté corriendo
docker ps

# Si no funciona, reinicia Docker Desktop
```

### Puerto ocupado
- Backend (8000): Cambia el puerto en `backend/run.py`
- Frontend (3000): Next.js te ofrecerá usar 3001 automáticamente
- PostgreSQL (5433): Cambia el puerto en `docker-compose.yml`

### Error de módulos
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

## 📚 Siguiente Paso

Lee el [README.md](README.md) completo para entender la arquitectura y características avanzadas.
