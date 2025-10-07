# Backend - Sistema de Gestión de Usuarios

API REST construida con FastAPI para gestión de usuarios, roles y permisos.

## Estructura del Proyecto

```
backend/
├── app/
│   ├── api/              # Endpoints de la API
│   ├── core/             # Configuración y utilidades core
│   ├── models/           # Modelos de SQLAlchemy
│   ├── schemas/          # Esquemas de Pydantic
│   ├── services/         # Lógica de negocio
│   └── main.py          # Punto de entrada de la aplicación
├── requirements.txt      # Dependencias de Python
└── init_db.py           # Script de inicialización de BD
```

## Instalación

```bash
# Instalar pipenv (si no lo tienes)
pip install pipenv

# Instalar dependencias y crear entorno virtual
pipenv install

# Inicializar base de datos
pipenv run python init_db.py

# Iniciar servidor
pipenv run uvicorn app.main:app --reload

# O usar el script run.py
pipenv run python run.py
```

## Configuración

Las variables de entorno se configuran en `app/core/config.py`:

- `DATABASE_URL`: URL de conexión a PostgreSQL
- `SECRET_KEY`: Clave secreta para JWT
- `ALGORITHM`: Algoritmo de encriptación (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Tiempo de expiración del token

## Arquitectura

### Modelos (Models)
Define la estructura de las tablas en la base de datos usando SQLAlchemy.

### Esquemas (Schemas)
Define la validación de datos de entrada/salida usando Pydantic.

### Servicios (Services)
Contiene la lógica de negocio y operaciones de base de datos.

### Rutas (Routes)
Define los endpoints de la API y maneja las peticiones HTTP.

## Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Validación de datos con Pydantic
- Protección de endpoints con dependencias
