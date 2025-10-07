# Frontend - Sistema de Gestión de Usuarios

Aplicación web construida con Next.js 14, TypeScript y Tailwind CSS.

## Estructura del Proyecto

```
frontend/
├── app/                  # App Router de Next.js
│   ├── dashboard/       # Página de dashboard
│   ├── users/          # Gestión de usuarios
│   ├── roles/          # Gestión de roles
│   ├── permissions/    # Gestión de permisos
│   └── login/          # Página de login
├── components/          # Componentes reutilizables
├── contexts/           # Context API de React
├── lib/                # Utilidades y configuración
│   └── api/           # Clientes de API
├── types/              # Definiciones de TypeScript
└── public/             # Archivos estáticos
```

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

## Características

### Tema Claro/Oscuro
- Toggle en menú lateral y barra superior
- Persistencia en localStorage
- Transiciones suaves

### Autenticación
- Login con JWT
- Protección de rutas
- Refresh automático de token

### Gestión de Estado
- Context API para autenticación
- Context API para tema
- Estado local para formularios

### UI/UX
- Diseño responsive
- Notificaciones toast
- Modales para CRUD
- Tablas interactivas
- Iconos de Heroicons

## Tecnologías

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **Axios**: Cliente HTTP
- **React Hook Form**: Manejo de formularios
- **React Hot Toast**: Notificaciones
