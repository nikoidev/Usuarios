# Guía de Instalación Rápida

## Paso 1: Iniciar Base de Datos

```bash
docker-compose up -d
```

Espera unos segundos para que PostgreSQL esté completamente iniciado.

## Paso 2: Configurar Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python init_db.py
uvicorn app.main:app --reload
```

El backend estará en http://localhost:8000

## Paso 3: Configurar Frontend

Abre una nueva terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend estará en http://localhost:3000

## Paso 4: Acceder al Sistema

1. Abre http://localhost:3000
2. Inicia sesión con:
   - Username: `admin`
   - Password: `admin123`

## Verificación

- Backend API: http://localhost:8000/docs
- Frontend: http://localhost:3000
- pgAdmin: http://localhost:5051
- PostgreSQL: localhost:5433

## Problemas Comunes

### Error de conexión a la base de datos
- Verifica que Docker esté corriendo: `docker ps`
- Reinicia los contenedores: `docker-compose restart`

### Puerto ya en uso
- Backend (8000): Cambia el puerto en el comando uvicorn
- Frontend (3000): Next.js te ofrecerá usar otro puerto automáticamente
- PostgreSQL (5433): Cambia el puerto en docker-compose.yml

### Módulos no encontrados
- Backend: Asegúrate de tener el venv activado
- Frontend: Ejecuta `npm install` nuevamente
