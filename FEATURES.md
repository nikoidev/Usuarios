# 🎨 Características del Sistema

## 📱 Interfaz de Usuario

### 🔐 Página de Login
**Ubicación:** `/login`

**Características:**
- Diseño centrado y moderno
- Gradiente de fondo
- Toggle de tema en esquina superior derecha
- Formulario con validación
- Campos: Username y Password
- Botón de inicio de sesión
- Credenciales de ejemplo visibles
- Feedback de errores
- Redirección automática al dashboard

**Tema Claro:**
- Fondo con gradiente azul claro
- Card blanco con sombra
- Texto oscuro

**Tema Oscuro:**
- Fondo con gradiente gris oscuro
- Card gris oscuro
- Texto claro

---

### 📊 Dashboard
**Ubicación:** `/dashboard`

**Características:**
- Tarjetas con estadísticas
  - Total de Usuarios (icono azul)
  - Total de Roles (icono verde)
  - Total de Permisos (icono morado)
- Información de bienvenida
- Lista de características del sistema
- Navegación lateral
- Barra superior con toggle de tema

**Estadísticas en tiempo real:**
- Cuenta de usuarios
- Cuenta de roles
- Cuenta de permisos

---

### 👥 Gestión de Usuarios
**Ubicación:** `/users`

**Características:**
- Tabla con columnas:
  - Usuario (username, nombre completo)
  - Email
  - Roles (badges)
  - Estado (activo/inactivo)
  - Acciones (editar, eliminar)
- Botón "Add User"
- Modal de creación/edición con campos:
  - Username *
  - Email *
  - Password * (solo creación)
  - First Name
  - Last Name
  - Roles (checkboxes múltiples)
  - Estado activo (checkbox)
- Confirmación de eliminación
- Notificaciones de éxito/error
- Actualización automática de tabla

**Validaciones:**
- Email único
- Username único
- Campos requeridos marcados con *
- Formato de email válido

---

### 🛡️ Gestión de Roles
**Ubicación:** `/roles`

**Características:**
- Tabla con columnas:
  - Nombre
  - Descripción
  - Cantidad de permisos
  - Estado (activo/inactivo)
  - Acciones (editar, eliminar)
- Botón "Add Role"
- Modal de creación/edición con campos:
  - Name *
  - Description
  - Permissions (checkboxes múltiples con scroll)
  - Estado activo (checkbox)
- Confirmación de eliminación
- Notificaciones de éxito/error
- Actualización automática de tabla

**Validaciones:**
- Nombre único
- Campos requeridos marcados con *

---

### 🔑 Gestión de Permisos
**Ubicación:** `/permissions`

**Características:**
- Tabla con columnas:
  - Nombre
  - Código (formato monospace)
  - Recurso
  - Acción
  - Estado (activo/inactivo)
  - Acciones (editar, eliminar)
- Botón "Add Permission"
- Modal de creación/edición con campos:
  - Name *
  - Code * (ej: user.create)
  - Description
  - Resource (ej: users)
  - Action (ej: create)
  - Estado activo (checkbox)
- Confirmación de eliminación
- Notificaciones de éxito/error
- Actualización automática de tabla

**Validaciones:**
- Código único
- Campos requeridos marcados con *

---

## 🎨 Componentes de UI

### Sidebar (Menú Lateral)
**Características:**
- Logo/título del sistema
- Navegación con iconos:
  - 🏠 Dashboard
  - 👥 Users
  - 🛡️ Roles
  - 🔑 Permissions
- Indicador de página activa
- Información del usuario actual
- Toggle de tema
- Botón de logout
- Ancho fijo: 256px
- Siempre visible

**Estados:**
- Item activo: fondo azul
- Item hover: fondo gris
- Transiciones suaves

### Topbar (Barra Superior)
**Características:**
- Título de página actual
- Toggle de tema
- Altura fija: 64px
- Sticky (se queda arriba al hacer scroll)
- Sombra sutil

### Tablas
**Características:**
- Headers con fondo gris
- Filas alternadas (hover)
- Columnas alineadas
- Acciones a la derecha
- Iconos para acciones
- Responsive (scroll horizontal en móvil)

### Modales
**Características:**
- Overlay oscuro (50% opacidad)
- Centrado en pantalla
- Ancho máximo: 672px
- Altura máxima: 90vh
- Scroll interno si es necesario
- Botón de cerrar (X)
- Botones de acción al final
- Animación de entrada

### Botones
**Tipos:**
- Primario: azul, texto blanco
- Secundario: borde gris, texto gris
- Peligro: rojo (eliminar)
- Icono: solo icono, sin fondo

**Estados:**
- Normal
- Hover (más oscuro)
- Disabled (opacidad 50%)
- Loading (spinner)

### Badges
**Tipos:**
- Estado activo: verde
- Estado inactivo: rojo
- Roles: azul
- Permisos: morado

**Estilo:**
- Redondeados (pill)
- Padding pequeño
- Texto pequeño
- Peso medio

### Notificaciones (Toast)
**Características:**
- Posición: arriba derecha
- Tipos:
  - Success: verde
  - Error: rojo
  - Info: azul
- Duración: 3 segundos
- Animación de entrada/salida
- Apilables

---

## 🌓 Sistema de Temas

### Tema Claro
**Colores:**
- Fondo: blanco (#FFFFFF)
- Fondo secundario: gris claro (#F9FAFB)
- Texto: gris oscuro (#111827)
- Texto secundario: gris medio (#6B7280)
- Primario: azul (#0EA5E9)
- Bordes: gris claro (#E5E7EB)

### Tema Oscuro
**Colores:**
- Fondo: gris muy oscuro (#111827)
- Fondo secundario: gris oscuro (#1F2937)
- Texto: blanco (#FFFFFF)
- Texto secundario: gris claro (#9CA3AF)
- Primario: azul brillante (#38BDF8)
- Bordes: gris oscuro (#374151)

### Toggle de Tema
**Ubicaciones:**
1. Página de login (esquina superior derecha)
2. Sidebar (junto a info de usuario)
3. Topbar (esquina superior derecha)

**Funcionamiento:**
- Click para cambiar
- Guarda en localStorage
- Aplica clase 'dark' al HTML
- Transición suave (0.3s)
- Icono cambia (sol/luna)

---

## 🔐 Seguridad

### Autenticación
- JWT tokens
- Expiración: 30 minutos (configurable)
- Almacenado en localStorage
- Incluido en headers (Authorization: Bearer)
- Refresh automático en cada request

### Autorización
- Rutas protegidas
- Redirección a login si no autenticado
- Redirección a dashboard si ya autenticado
- Logout limpia token

### Validación
- Frontend: validación de formularios
- Backend: validación con Pydantic
- Mensajes de error descriptivos
- Prevención de duplicados

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Sidebar visible
- Tablas completas
- Modales centrados
- 3 columnas en dashboard

### Tablet (768px - 1024px)
- Sidebar visible
- Tablas con scroll horizontal
- Modales ajustados
- 2 columnas en dashboard

### Mobile (< 768px)
- Sidebar colapsable (futuro)
- Tablas con scroll
- Modales full-width
- 1 columna en dashboard

---

## ⚡ Performance

### Optimizaciones
- Lazy loading de componentes
- Memoización de contextos
- Debounce en búsquedas (futuro)
- Paginación (futuro)
- Caché de queries (futuro)

### Loading States
- Spinner en tablas
- Botones disabled durante requests
- Skeleton screens (futuro)

---

## 🎯 UX Features

### Feedback Visual
- Notificaciones toast
- Estados hover
- Estados activos
- Loading spinners
- Confirmaciones de eliminación

### Navegación
- Breadcrumbs (futuro)
- Indicador de página activa
- Redirecciones automáticas
- Back button respetado

### Accesibilidad
- Labels en formularios
- Placeholders descriptivos
- Contraste adecuado
- Keyboard navigation (mejorable)
- ARIA labels (futuro)

---

## 🔄 Flujos de Usuario

### Flujo de Login
1. Usuario accede a `/`
2. Redirigido a `/login`
3. Ingresa credenciales
4. Click en "Sign In"
5. Request a API
6. Token guardado
7. Redirigido a `/dashboard`

### Flujo de Creación
1. Usuario navega a página (users/roles/permissions)
2. Click en "Add [Entity]"
3. Modal se abre
4. Llena formulario
5. Click en "Create"
6. Request a API
7. Modal se cierra
8. Tabla se actualiza
9. Notificación de éxito

### Flujo de Edición
1. Usuario click en icono de editar
2. Modal se abre con datos
3. Modifica campos
4. Click en "Update"
5. Request a API
6. Modal se cierra
7. Tabla se actualiza
8. Notificación de éxito

### Flujo de Eliminación
1. Usuario click en icono de eliminar
2. Confirmación aparece
3. Usuario confirma
4. Request a API
5. Tabla se actualiza
6. Notificación de éxito

### Flujo de Cambio de Tema
1. Usuario click en toggle
2. Tema cambia instantáneamente
3. Preferencia guardada en localStorage
4. Persiste en próxima visita

---

## 🎨 Iconografía

**Biblioteca:** Heroicons v2

**Iconos Usados:**
- 🏠 HomeIcon - Dashboard
- 👥 UsersIcon - Usuarios
- 🛡️ ShieldCheckIcon - Roles
- 🔑 KeyIcon - Permisos
- ➕ PlusIcon - Agregar
- ✏️ PencilIcon - Editar
- 🗑️ TrashIcon - Eliminar
- ❌ XMarkIcon - Cerrar
- 🚪 ArrowRightOnRectangleIcon - Logout
- ☀️ SunIcon - Tema claro
- 🌙 MoonIcon - Tema oscuro

---

## 🎉 Características Destacadas

1. **Tema Completo**: Claro/Oscuro con persistencia
2. **CRUD Completo**: Para 3 entidades
3. **Diseño Moderno**: UI limpia y profesional
4. **Responsive**: Funciona en todos los dispositivos
5. **Feedback Visual**: Notificaciones y estados
6. **Seguridad**: JWT y validaciones
7. **Documentación**: Completa y detallada
8. **Fácil Setup**: Docker y scripts
9. **Escalable**: Arquitectura modular
10. **Base Sólida**: Para múltiples proyectos
