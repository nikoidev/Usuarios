from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine, Base
from .api.routes import auth, users, roles, permissions

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Management System API",
    description="Complete CRUD API for Users, Roles, and Permissions",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(roles.router, prefix="/api/roles", tags=["Roles"])
app.include_router(permissions.router, prefix="/api/permissions", tags=["Permissions"])


@app.get("/")
def root():
    return {
        "message": "User Management System API",
        "version": "1.0.0",
        "docs": "/docs"
    }
