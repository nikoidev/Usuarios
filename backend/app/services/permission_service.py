from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.permission import Permission
from ..schemas.permission import PermissionCreate, PermissionUpdate


class PermissionService:
    @staticmethod
    def get_permission(db: Session, permission_id: int) -> Optional[Permission]:
        return db.query(Permission).filter(Permission.id == permission_id).first()

    @staticmethod
    def get_permission_by_code(db: Session, code: str) -> Optional[Permission]:
        return db.query(Permission).filter(Permission.code == code).first()

    @staticmethod
    def get_permissions(db: Session, skip: int = 0, limit: int = 100) -> List[Permission]:
        return db.query(Permission).offset(skip).limit(limit).all()

    @staticmethod
    def create_permission(db: Session, permission: PermissionCreate) -> Permission:
        db_permission = Permission(
            name=permission.name,
            code=permission.code,
            description=permission.description,
            resource=permission.resource,
            action=permission.action,
            is_active=permission.is_active
        )
        db.add(db_permission)
        db.commit()
        db.refresh(db_permission)
        return db_permission

    @staticmethod
    def update_permission(db: Session, permission_id: int, permission: PermissionUpdate) -> Optional[Permission]:
        db_permission = db.query(Permission).filter(Permission.id == permission_id).first()
        if not db_permission:
            return None
        
        update_data = permission.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_permission, field, value)
        
        db.commit()
        db.refresh(db_permission)
        return db_permission

    @staticmethod
    def delete_permission(db: Session, permission_id: int) -> bool:
        db_permission = db.query(Permission).filter(Permission.id == permission_id).first()
        if not db_permission:
            return False
        db.delete(db_permission)
        db.commit()
        return True
