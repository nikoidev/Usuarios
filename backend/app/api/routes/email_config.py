from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.email_config import (
    EmailConfigCreate,
    EmailConfigUpdate,
    EmailConfigResponse,
    EmailTestRequest,
    EmailProviderPreset
)
from app.schemas.password_reset import MessageResponse
from app.services.email_config_service import EmailConfigService
from app.services.email_service import email_service


router = APIRouter()


def check_admin(current_user: User = Depends(get_current_active_user)):
    """Verify that the current user is an admin"""
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can access this resource"
        )
    return current_user


@router.get("/presets", response_model=List[EmailProviderPreset])
async def get_email_provider_presets(
    current_user: User = Depends(check_admin)
):
    """Get predefined email provider configurations"""
    return EmailConfigService.get_provider_presets()


@router.get("/", response_model=List[EmailConfigResponse])
async def get_all_configs(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Get all email configurations (admin only)"""
    return EmailConfigService.get_all(db)


@router.get("/active", response_model=EmailConfigResponse)
async def get_active_config(
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Get the active email configuration"""
    config = EmailConfigService.get_active(db)
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active email configuration found"
        )
    return config


@router.get("/{config_id}", response_model=EmailConfigResponse)
async def get_config(
    config_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Get a specific email configuration"""
    config = EmailConfigService.get_by_id(db, config_id)
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email configuration not found"
        )
    return config


@router.post("/", response_model=EmailConfigResponse, status_code=status.HTTP_201_CREATED)
async def create_config(
    config_data: EmailConfigCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Create a new email configuration"""
    return EmailConfigService.create(db, config_data)


@router.put("/{config_id}", response_model=EmailConfigResponse)
async def update_config(
    config_id: int,
    config_data: EmailConfigUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Update an email configuration"""
    config = EmailConfigService.update(db, config_id, config_data)
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email configuration not found"
        )
    return config


@router.delete("/{config_id}", response_model=MessageResponse)
async def delete_config(
    config_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Delete an email configuration"""
    success = EmailConfigService.delete(db, config_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email configuration not found"
        )
    return {"message": "Email configuration deleted successfully"}


@router.post("/{config_id}/activate", response_model=EmailConfigResponse)
async def activate_config(
    config_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Set a configuration as active"""
    config = EmailConfigService.set_active(db, config_id)
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email configuration not found"
        )
    return config


@router.post("/test", response_model=MessageResponse)
async def test_email_config(
    test_request: EmailTestRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin)
):
    """Send a test email using the active configuration"""
    config = EmailConfigService.get_active(db)
    if not config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active email configuration found"
        )
    
    success = await email_service.send_test_email(
        db=db,
        recipient=test_request.recipient_email,
        config=config
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send test email. Please check your configuration."
        )
    
    return {"message": f"Test email sent successfully to {test_request.recipient_email}"}

