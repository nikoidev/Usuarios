# 🔄 Migración de venv a Pipenv

Este proyecto ahora usa **Pipenv** en lugar de venv para gestión de entornos virtuales.

## ¿Por qué Pipenv?

✅ **Gestión automática** de entornos virtuales  
✅ **Archivo Pipfile** más legible que requirements.txt  
✅ **Lock file** para instalaciones reproducibles  
✅ **Separación** de dependencias dev/prod  
✅ **Verificación** de seguridad integrada  
✅ **Resolución** automática de conflictos  

## Cambios Realizados

### Archivos Agregados
- ✅ `backend/Pipfile` - Reemplaza requirements.txt (aunque se mantiene para compatibilidad)
- ✅ `backend/PIPENV_GUIDE.md` - Guía completa de uso de Pipenv

### Archivos Actualizados
- ✅ `README.md` - Instrucciones con pipenv
- ✅ `QUICKSTART.md` - Inicio rápido con pipenv
- ✅ `SETUP.md` - Setup detallado con pipenv
- ✅ `TROUBLESHOOTING.md` - Solución de problemas con pipenv
- ✅ `backend/README.md` - Documentación de backend con pipenv
- ✅ `start.bat` - Script Windows actualizado
- ✅ `start.sh` - Script Linux/Mac actualizado
- ✅ `CHECKLIST.md` - Tests con pipenv
- ✅ `CONTRIBUTING.md` - Contribución con pipenv

## Comandos Equivalentes

### Antes (venv)
```bash
# Crear entorno
python -m venv venv

# Activar
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar script
python script.py

# Desactivar
deactivate
```

### Ahora (Pipenv)
```bash
# Instalar pipenv (solo una vez)
pip install pipenv

# Instalar dependencias (crea el entorno automáticamente)
pipenv install

# Ejecutar script (sin activar manualmente)
pipenv run python script.py

# O entrar al shell
pipenv shell
python script.py
exit
```

## Instalación Rápida

### 1. Instalar Pipenv
```bash
pip install pipenv
```

### 2. Navegar al Backend
```bash
cd backend
```

### 3. Instalar Dependencias
```bash
pipenv install
```

### 4. Ejecutar Comandos
```bash
# Inicializar BD
pipenv run python init_db.py

# Iniciar servidor
pipenv run python run.py

# O entrar al shell
pipenv shell
python init_db.py
python run.py
```

## Ventajas en Este Proyecto

### 1. Comandos Más Simples
**Antes:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
```

**Ahora:**
```bash
cd backend
pipenv install
pipenv run python init_db.py
```

### 2. Multiplataforma
No necesitas recordar comandos diferentes para Windows/Linux/Mac:
```bash
# Funciona igual en todos los sistemas
pipenv install
pipenv run python script.py
```

### 3. Gestión de Dependencias
```bash
# Agregar nueva dependencia
pipenv install nueva-libreria

# Se actualiza automáticamente el Pipfile
# Commit Pipfile y Pipfile.lock
```

### 4. Seguridad
```bash
# Verificar vulnerabilidades
pipenv check
```

## Preguntas Frecuentes

### ¿Debo eliminar requirements.txt?
No, se mantiene para compatibilidad con Docker y otros sistemas que lo necesiten.

### ¿Dónde se guarda el entorno virtual?
Por defecto en una ubicación global. Para verla:
```bash
pipenv --venv
```

Para crear el entorno en el proyecto:
```bash
export PIPENV_VENV_IN_PROJECT=1  # Linux/Mac
set PIPENV_VENV_IN_PROJECT=1     # Windows
pipenv install
```

### ¿Cómo actualizo las dependencias?
```bash
pipenv update
```

### ¿Cómo elimino el entorno?
```bash
pipenv --rm
```

### ¿Cómo genero requirements.txt desde Pipfile?
```bash
pipenv requirements > requirements.txt
```

## Migración para Desarrolladores Existentes

Si ya tienes el proyecto con venv:

### 1. Eliminar venv antiguo
```bash
cd backend
# Windows
rmdir /s venv
# Linux/Mac
rm -rf venv
```

### 2. Instalar pipenv
```bash
pip install pipenv
```

### 3. Instalar dependencias
```bash
pipenv install
```

### 4. Verificar instalación
```bash
pipenv --venv
pipenv run python --version
```

### 5. Ejecutar proyecto
```bash
pipenv run python init_db.py
pipenv run python run.py
```

## Recursos

- **Guía completa:** Ver `backend/PIPENV_GUIDE.md`
- **Documentación oficial:** https://pipenv.pypa.io/
- **Tutorial:** https://realpython.com/pipenv-guide/

## Soporte

Si tienes problemas con la migración:
1. Lee `backend/PIPENV_GUIDE.md`
2. Consulta `TROUBLESHOOTING.md`
3. Abre un issue en GitHub
