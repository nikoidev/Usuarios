"""
Script to reset the database - drops all tables and recreates them
"""
from app.core.database import engine, Base
from app.models import User, Role, Permission, AuditLog

def reset_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database reset successfully!")

if __name__ == "__main__":
    reset_db()
