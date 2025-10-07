# 🔧 Guía de Solución de Problemas

## Problemas Comunes y Soluciones

### 1. Docker

#### Error: "Cannot connect to the Docker daemon"
**Causa:** Docker Desktop no está corriendo.

**Solución:**
1. Abre Docker Desktop
2. Espera a que inicie completamente
3. Ejecuta `docker ps` para verificar
4. Vuelve a ejecutar `docker-compose up -d`

#### Error: "port is already allocated"
**Causa:** El puerto está siendo usado por otro servicio.

**Solución:**
```bash
# Ver qué está usando el puerto
# Windows:
netstat -ano | findstr :5433

# Linux/Mac:
lsof -i :5433

# Cambiar puerto en docker-compose.yml
ports:
  - "5434:5432"  # Cambia 5433 por 5434
```

#### Contenedores no inician
**Solución:**
```bash
# Ver logs de errores
docker-compose logs

# Reiniciar contenedores
docker-compose down
docker-compose up -d

# Limpiar y reiniciar
docker-compose down -v
docker-compose up -d
```

### 2. Backend (FastAPI)

#### Error: "No module named 'app'"
**Causa:** No estás en el directorio correcto o pipenv no está instalado.

**Solución:**
```bash
cd backend

# Instalar pipenv si no lo tienes
pip install pipenv

# Instalar dependencias
pipenv install

# Verificar el entorno
pipenv --venv  # Muestra la ruta del entorno virtual
```

#### Error: "could not connect to server"
**Causa:** PostgreSQL no está corriendo o la URL de conexión es incorrecta.

**Solución:**
```bash
# Verificar que PostgreSQL está corriendo
docker ps | grep postgres

# Verificar la URL en backend/app/core/config.py
DATABASE_URL=postgresql://admin:admin123@localhost:5433/usuarios_db
```

#### Error: "ModuleNotFoundError"
**Causa:** Dependencias no instaladas.

**Solución:**
```bash
cd backend
pipenv install
```

#### Error al ejecutar init_db.py
**Causa:** Base de datos no está lista o ya tiene datos.

**Solución:**
```bash
# Espera 10 segundos después de iniciar Docker
# O reinicia la base de datos:
docker-compose down -v
docker-compose up -d
# Espera 10 segundos
pipenv run python init_db.py
```

#### Puerto 8000 ocupado
**Solución:**
```bash
# Cambiar puerto en backend/run.py
uvicorn.run(
    "app.main:app",
    host="0.0.0.0",
    port=8001,  # Cambia a 8001
    reload=True
)

# Ejecutar con pipenv
pipenv run python run.py

# Y actualizar en frontend/lib/axios.ts
baseURL: 'http://localhost:8001',
```

### 3. Frontend (Next.js)

#### Error: "npm command not found"
**Causa:** Node.js no está instalado.

**Solución:**
1. Descarga Node.js desde https://nodejs.org/
2. Instala la versión LTS
3. Verifica: `node --version`

#### Error: "Module not found"
**Causa:** Dependencias no instaladas.

**Solución:**
```bash
cd frontend
rm -rf node_modules package-lock.json  # Limpiar
npm install
```

#### Error: "Network Error" en el navegador
**Causa:** Backend no está corriendo o CORS mal configurado.

**Solución:**
1. Verifica que el backend esté corriendo: http://localhost:8000/docs
2. Verifica la URL en `frontend/lib/axios.ts`
3. Verifica CORS en `backend/app/main.py`

#### Página en blanco
**Causa:** Error de JavaScript no manejado.

**Solución:**
1. Abre la consola del navegador (F12)
2. Lee el error
3. Verifica que el backend esté corriendo
4. Limpia caché del navegador (Ctrl+Shift+Delete)

#### Error: "localStorage is not defined"
**Causa:** Código de cliente ejecutándose en el servidor.

**Solución:**
Ya está manejado en el código con verificaciones de `typeof window !== 'undefined'`.

### 4. Base de Datos

#### No puedo conectarme a pgAdmin
**Solución:**
1. Verifica que el contenedor esté corriendo: `docker ps`
2. Accede a http://localhost:5051
3. Credenciales:
   - Email: admin@admin.com
   - Password: admin123

#### Error al conectar pgAdmin a PostgreSQL
**Solución:**
En pgAdmin, al crear la conexión usa:
- Host: `usuarios_postgres` (nombre del contenedor, NO localhost)
- Port: `5432` (puerto interno, NO 5433)
- Database: `usuarios_db`
- Username: `admin`
- Password: `admin123`

#### Perdí los datos
**Solución:**
```bash
# Reinicializar base de datos
cd backend
python init_db.py
```

### 5. Autenticación

#### No puedo iniciar sesión
**Solución:**
1. Verifica credenciales:
   - Username: `admin`
   - Password: `admin123`
2. Verifica que init_db.py se haya ejecutado
3. Revisa la consola del navegador para errores
4. Verifica que el backend esté respondiendo

#### Token expirado constantemente
**Solución:**
Cambia el tiempo de expiración en `backend/app/core/config.py`:
```python
ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 horas
```

#### Sesión no persiste al recargar
**Causa:** localStorage no está guardando el token.

**Solución:**
1. Verifica que las cookies estén habilitadas
2. Limpia localStorage: `localStorage.clear()` en consola
3. Vuelve a iniciar sesión

### 6. Tema Claro/Oscuro

#### Tema no cambia
**Solución:**
1. Limpia localStorage: `localStorage.clear()`
2. Recarga la página
3. Verifica la consola del navegador

#### Tema no persiste
**Solución:**
Ya está implementado con localStorage. Si no funciona:
1. Verifica que las cookies estén habilitadas
2. Prueba en modo incógnito

### 7. Rendimiento

#### Backend lento
**Solución:**
1. Verifica recursos de Docker
2. Agrega índices en la base de datos
3. Implementa caché

#### Frontend lento
**Solución:**
1. Ejecuta build de producción: `npm run build && npm start`
2. Optimiza imágenes
3. Implementa lazy loading

### 8. Desarrollo

#### Hot reload no funciona
**Backend:**
```bash
# Asegúrate de usar --reload
pipenv run uvicorn app.main:app --reload

# O usar el script run.py que ya incluye --reload
pipenv run python run.py
```

**Frontend:**
```bash
# Reinicia el servidor
npm run dev
```

#### Cambios no se reflejan
**Solución:**
1. Guarda el archivo (Ctrl+S)
2. Espera a que compile
3. Recarga el navegador (Ctrl+R)
4. Limpia caché (Ctrl+Shift+R)

## 🆘 Obtener Ayuda

Si ninguna solución funciona:

1. **Revisa los logs:**
   ```bash
   # Docker
   docker-compose logs
   
   # Backend
   # Los logs aparecen en la terminal donde ejecutaste uvicorn
   
   # Frontend
   # Los logs aparecen en la terminal donde ejecutaste npm run dev
   ```

2. **Reinicia todo:**
   ```bash
   # Detener todo
   docker-compose down
   # Ctrl+C en las terminales de backend y frontend
   
   # Iniciar de nuevo
   docker-compose up -d
   cd backend && python run.py
   cd frontend && npm run dev
   ```

3. **Limpieza completa:**
   ```bash
   # Docker
   docker-compose down -v
   docker system prune -a
   
   # Backend
   cd backend
   pipenv --rm  # Eliminar entorno virtual
   rm -rf __pycache__
   pipenv install  # Reinstalar
   
   # Frontend
   cd frontend
   rm -rf node_modules .next
   npm install  # Reinstalar
   ```

4. **Abre un issue en GitHub** con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs de error
   - Sistema operativo y versiones

## 📞 Contacto

Para soporte adicional, contacta al equipo de desarrollo.
