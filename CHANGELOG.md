# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-10-07

### Agregado
- Sistema completo de gestión de usuarios con CRUD
- CRUD completo para Roles
- CRUD completo para Permisos
- Autenticación JWT
- Tema claro/oscuro con persistencia
- Dashboard con estadísticas
- Diseño responsive
- Docker Compose para PostgreSQL y pgAdmin
- Documentación completa
- Scripts de inicio para Windows y Linux/Mac
- Inicialización de base de datos con datos de prueba
- Relaciones many-to-many entre entidades
- Validación de datos en frontend y backend
- Notificaciones toast
- Modales para CRUD
- Protección de rutas
- Interceptores de Axios para manejo de tokens

### Backend
- FastAPI con estructura modular
- SQLAlchemy ORM
- Pydantic para validación
- Bcrypt para hash de contraseñas
- JWT para autenticación
- CORS configurado
- Documentación automática con Swagger

### Frontend
- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- Context API para estado global
- Axios para peticiones HTTP
- React Hook Form
- React Hot Toast
- Heroicons

### Infraestructura
- Docker Compose
- PostgreSQL 15
- pgAdmin 4
- Puertos únicos (5433, 5051) para evitar conflictos

### Documentación
- README principal
- README de backend
- README de frontend
- Guía de instalación rápida (SETUP.md)
- Documentación de arquitectura (ARCHITECTURE.md)
- Guía de contribución (CONTRIBUTING.md)
- Changelog

## [Unreleased]

### Por Agregar
- Tests unitarios
- Tests de integración
- CI/CD pipeline
- Paginación en listados
- Búsqueda y filtros
- Exportación a CSV/Excel
- Logs de auditoría
- Recuperación de contraseña
- Verificación de email
- OAuth2 (Google, GitHub)
- Multi-idioma (i18n)
- Notificaciones en tiempo real
- API rate limiting
- Documentación de API con ejemplos
