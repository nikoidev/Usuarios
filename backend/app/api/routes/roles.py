from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...schemas.role import RoleCreate, RoleUpdate, RoleResponse
from ...services.role_service import RoleService
from ..deps import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[RoleResponse])
def read_roles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    roles = RoleService.get_roles(db, skip=skip, limit=limit)
    return roles


@router.get("/{role_id}", response_model=RoleResponse)
def read_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    role = RoleService.get_role(db, role_id=role_id)
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return role


@router.post("/", response_model=RoleResponse, status_code=status.HTTP_201_CREATED)
def create_role(
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    # Check if role already exists
    db_role = RoleService.get_role_by_name(db, name=role.name)
    if db_role:
        raise HTTPException(status_code=400, detail="Role name already exists")
    
    return RoleService.create_role(db=db, role=role)


@router.put("/{role_id}", response_model=RoleResponse)
def update_role(
    role_id: int,
    role: RoleUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    db_role = RoleService.update_role(db, role_id=role_id, role=role)
    if db_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role


@router.delete("/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    success = RoleService.delete_role(db, role_id=role_id)
    if not success:
        raise HTTPException(status_code=404, detail="Role not found")
    return None
