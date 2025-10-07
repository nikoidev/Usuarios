# 🚀 Iniciar Sistema en Modo Producción

## Opción 1: Con F5 (Debug) ⌨️

### Pasos:

1. **Primero, asegúrate de tener el build del frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Presiona F5** en Cursor/VS Code

3. **Selecciona**: "Full Stack (Production)"

4. Se abrirán **dos terminales separadas**:
   - Terminal 1: Backend (FastAPI) en puerto 8000
   - Terminal 2: Frontend (Next.js) en puerto 3000

5. **Accede a**: http://localhost:3000

### ¿Cómo funciona?

- El **Backend** se ejecuta con `pipenv run python run.py`
- El **Frontend** primero hace `npm run build` y luego `npm run start`
- Ambos se ejecutan en terminales separadas
- Al presionar STOP (Shift+F5) se detienen ambos servicios

---

## Opción 2: Manual en Terminales Separadas 📟

### Terminal 1 - Backend:
```bash
cd backend
pipenv shell
python run.py
```

### Terminal 2 - Frontend (Build + Start):
```bash
cd frontend
npm run build
npm run start
```

---

## Opción 3: Modo Desarrollo (Más Rápido) 🔥

Si prefieres modo desarrollo con hot-reload:

### Terminal 1 - Backend:
```bash
cd backend
pipenv run python run.py
```

### Terminal 2 - Frontend (Dev):
```bash
cd frontend
npm run dev
```

---

## 📝 Notas Importantes:

### Primera Vez:
1. ✅ Asegúrate de que Docker esté corriendo (PostgreSQL)
2. ✅ Ejecuta `npm run build` en frontend la primera vez
3. ✅ Verifica que las dependencias estén instaladas

### Verificación:
- **Backend API**: http://localhost:8000/docs
- **Frontend**: http://localhost:3000
- **pgAdmin**: http://localhost:5051

### Credenciales:
- **Usuario**: `admin`
- **Password**: `admin123`

---

## 🛑 Detener Servicios:

### Con F5:
- Presiona **Shift+F5** o click en el botón STOP

### Manual:
- **Ctrl+C** en cada terminal

---

## 🐛 Troubleshooting:

### Error "Puerto ocupado":
```bash
# Ver qué usa el puerto 8000
netstat -ano | findstr :8000

# Ver qué usa el puerto 3000
netstat -ano | findstr :3000
```

### Build del frontend falla:
```bash
cd frontend
rm -rf .next
npm run build
```

### Backend no inicia:
```bash
cd backend
pipenv install
pipenv run python run.py
```

---

## 🎯 Comandos Útiles:

### Ver logs detallados:
```bash
# Backend
cd backend
pipenv run uvicorn app.main:app --reload --log-level debug

# Frontend
cd frontend
npm run build -- --debug
npm run start
```

### Reconstruir todo:
```bash
# Frontend
cd frontend
rm -rf .next node_modules
npm install
npm run build

# Backend
cd backend
pipenv install
```
