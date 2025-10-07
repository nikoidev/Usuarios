from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...schemas.permission import PermissionCreate, PermissionUpdate, PermissionResponse
from ...services.permission_service import PermissionService
from ..deps import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[PermissionResponse])
def read_permissions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    permissions = PermissionService.get_permissions(db, skip=skip, limit=limit)
    return permissions


@router.get("/{permission_id}", response_model=PermissionResponse)
def read_permission(
    permission_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    permission = PermissionService.get_permission(db, permission_id=permission_id)
    if permission is None:
        raise HTTPException(status_code=404, detail="Permission not found")
    return permission


@router.post("/", response_model=PermissionResponse, status_code=status.HTTP_201_CREATED)
def create_permission(
    permission: PermissionCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    # Check if permission already exists
    db_permission = PermissionService.get_permission_by_code(db, code=permission.code)
    if db_permission:
        raise HTTPException(status_code=400, detail="Permission code already exists")
    
    return PermissionService.create_permission(db=db, permission=permission)


@router.put("/{permission_id}", response_model=PermissionResponse)
def update_permission(
    permission_id: int,
    permission: PermissionUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    db_permission = PermissionService.update_permission(db, permission_id=permission_id, permission=permission)
    if db_permission is None:
        raise HTTPException(status_code=404, detail="Permission not found")
    return db_permission


@router.delete("/{permission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_permission(
    permission_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    success = PermissionService.delete_permission(db, permission_id=permission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Permission not found")
    return None
