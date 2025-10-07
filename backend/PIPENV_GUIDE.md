# Guía de Pipenv

## ¿Qué es Pipenv?

Pipenv es una herramienta que combina `pip` y `virtualenv` en un solo comando. Gestiona automáticamente los entornos virtuales y las dependencias.

## Instalación

```bash
pip install pipenv
```

## Comandos Básicos

### Instalar dependencias
```bash
# Instala todas las dependencias del Pipfile
pipenv install

# Instala dependencias de desarrollo
pipenv install --dev

# Instala un paquete específico
pipenv install nombre-paquete

# Instala un paquete de desarrollo
pipenv install nombre-paquete --dev
```

### Ejecutar comandos
```bash
# Ejecutar un comando en el entorno virtual
pipenv run python script.py
pipenv run uvicorn app.main:app --reload

# Entrar al shell del entorno virtual
pipenv shell

# Salir del shell
exit
```

### Gestión del entorno
```bash
# Ver la ubicación del entorno virtual
pipenv --venv

# Ver la ubicación del proyecto
pipenv --where

# Eliminar el entorno virtual
pipenv --rm

# Verificar vulnerabilidades de seguridad
pipenv check
```

### Actualizar dependencias
```bash
# Actualizar todas las dependencias
pipenv update

# Actualizar un paquete específico
pipenv update nombre-paquete
```

### Generar requirements.txt
```bash
# Si necesitas un requirements.txt para Docker u otros usos
pipenv requirements > requirements.txt

# Con dependencias de desarrollo
pipenv requirements --dev > requirements-dev.txt
```

## Archivos

### Pipfile
Contiene las dependencias del proyecto (similar a package.json en Node.js).

### Pipfile.lock
Contiene las versiones exactas de todas las dependencias (similar a package-lock.json).
**No editar manualmente**, se genera automáticamente.

## Ventajas de Pipenv

1. **Gestión automática de entornos virtuales**: No necesitas crear/activar venv manualmente
2. **Archivo Pipfile legible**: Más claro que requirements.txt
3. **Lock file**: Garantiza instalaciones reproducibles
4. **Separación dev/prod**: Dependencias de desarrollo separadas
5. **Verificación de seguridad**: `pipenv check` detecta vulnerabilidades
6. **Resolución de dependencias**: Detecta conflictos automáticamente

## Comparación con venv

### Con venv (antes):
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python script.py
deactivate
```

### Con pipenv (ahora):
```bash
pipenv install
pipenv run python script.py
```

## Flujo de Trabajo

### Desarrollo diario
```bash
# 1. Instalar dependencias (primera vez)
pipenv install

# 2. Ejecutar scripts
pipenv run python init_db.py
pipenv run python run.py

# O entrar al shell y trabajar normalmente
pipenv shell
python init_db.py
python run.py
exit
```

### Agregar nueva dependencia
```bash
# 1. Instalar el paquete
pipenv install nuevo-paquete

# 2. El Pipfile se actualiza automáticamente
# 3. Commit Pipfile y Pipfile.lock
```

### Compartir proyecto
```bash
# Otros desarrolladores solo necesitan:
git clone <repo>
cd backend
pipenv install

# ¡Listo! Mismo entorno que tú
```

## Problemas Comunes

### "pipenv: command not found"
```bash
pip install pipenv
# O con pip3
pip3 install pipenv
```

### Entorno en ubicación incorrecta
```bash
# Pipenv crea el entorno en una ubicación global por defecto
# Para crearlo en el proyecto:
export PIPENV_VENV_IN_PROJECT=1  # Linux/Mac
set PIPENV_VENV_IN_PROJECT=1     # Windows

# Luego
pipenv install
```

### Limpiar y reinstalar
```bash
pipenv --rm
pipenv install
```

### Conflictos de dependencias
```bash
# Ver el árbol de dependencias
pipenv graph

# Resolver conflictos
pipenv lock --clear
pipenv install
```

## Tips

1. **Siempre usa `pipenv run`** para ejecutar comandos si no estás en el shell
2. **Commitea Pipfile y Pipfile.lock** al repositorio
3. **No commitees el entorno virtual** (.venv/)
4. **Usa `pipenv shell`** si vas a ejecutar muchos comandos
5. **Ejecuta `pipenv check`** regularmente para seguridad

## Recursos

- Documentación oficial: https://pipenv.pypa.io/
- Guía de Python: https://packaging.python.org/tutorials/managing-dependencies/
