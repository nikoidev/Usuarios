from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.role import Role
from ..models.permission import Permission
from ..schemas.role import RoleCreate, RoleUpdate


class RoleService:
    @staticmethod
    def get_role(db: Session, role_id: int) -> Optional[Role]:
        return db.query(Role).filter(Role.id == role_id).first()

    @staticmethod
    def get_role_by_name(db: Session, name: str) -> Optional[Role]:
        return db.query(Role).filter(Role.name == name).first()

    @staticmethod
    def get_roles(db: Session, skip: int = 0, limit: int = 100) -> List[Role]:
        return db.query(Role).offset(skip).limit(limit).all()

    @staticmethod
    def create_role(db: Session, role: RoleCreate) -> Role:
        db_role = Role(
            name=role.name,
            description=role.description,
            is_active=role.is_active
        )
        
        # Add permissions if provided
        if role.permission_ids:
            permissions = db.query(Permission).filter(Permission.id.in_(role.permission_ids)).all()
            db_role.permissions = permissions
        
        db.add(db_role)
        db.commit()
        db.refresh(db_role)
        return db_role

    @staticmethod
    def update_role(db: Session, role_id: int, role: RoleUpdate) -> Optional[Role]:
        db_role = db.query(Role).filter(Role.id == role_id).first()
        if not db_role:
            return None
        
        update_data = role.model_dump(exclude_unset=True)
        
        # Handle permissions separately
        if "permission_ids" in update_data:
            permission_ids = update_data.pop("permission_ids")
            if permission_ids is not None:
                permissions = db.query(Permission).filter(Permission.id.in_(permission_ids)).all()
                db_role.permissions = permissions
        
        for field, value in update_data.items():
            setattr(db_role, field, value)
        
        db.commit()
        db.refresh(db_role)
        return db_role

    @staticmethod
    def delete_role(db: Session, role_id: int) -> bool:
        db_role = db.query(Role).filter(Role.id == role_id).first()
        if not db_role:
            return False
        db.delete(db_role)
        db.commit()
        return True
