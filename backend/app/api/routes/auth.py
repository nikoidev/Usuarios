from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from ...core.database import get_db
from ...core.config import settings
from ...core.security import create_access_token, verify_password, get_password_hash
from ...schemas.token import Token, RefreshTokenRequest
from ...schemas.user import UserResponse
from ...schemas.password_reset import (
    PasswordResetRequest,
    PasswordResetConfirm,
    PasswordChangeRequest,
    MessageResponse
)
from ...services.user_service import UserService
from ...services.email_service import email_service
from ...models.password_reset_token import PasswordResetToken
from ...models.refresh_token import RefreshToken
from ...models.user import User
from ..deps import get_current_active_user

router = APIRouter()


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """Login and get access token + refresh token"""
    user = UserService.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token_obj = RefreshToken(
        user_id=user.id,
        token=RefreshToken.generate_token(),
        expires_at=RefreshToken.get_expiration_time(days=7)
    )
    db.add(refresh_token_obj)
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token_obj.token,
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=Token)
def refresh_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    # Find refresh token
    db_token = db.query(RefreshToken).filter(
        RefreshToken.token == request.refresh_token
    ).first()
    
    if not db_token or not db_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Get user
    user = db.query(User).filter(User.id == db_token.user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # Create new refresh token (rotate)
    db_token.is_revoked = True
    new_refresh_token = RefreshToken(
        user_id=user.id,
        token=RefreshToken.generate_token(),
        expires_at=RefreshToken.get_expiration_time(days=7)
    )
    db.add(new_refresh_token)
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token.token,
        "token_type": "bearer"
    }


@router.post("/logout", response_model=MessageResponse)
def logout(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Logout and revoke refresh token"""
    db_token = db.query(RefreshToken).filter(
        RefreshToken.token == request.refresh_token,
        RefreshToken.user_id == current_user.id
    ).first()
    
    if db_token:
        db_token.is_revoked = True
        db.commit()
    
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(
    request: PasswordResetRequest,
    db: Session = Depends(get_db)
):
    """Request password reset email"""
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    
    # Always return success message (security: don't reveal if email exists)
    if not user:
        return {"message": "If the email exists, a password reset link has been sent"}
    
    # Invalidate old tokens for this user
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user.id,
        PasswordResetToken.is_used == False
    ).update({"is_used": True})
    
    # Create new reset token
    reset_token = PasswordResetToken(
        user_id=user.id,
        token=PasswordResetToken.generate_token(),
        expires_at=PasswordResetToken.get_expiration_time(hours=24)
    )
    db.add(reset_token)
    db.commit()
    
    # Send email
    user_name = user.first_name or user.username
    await email_service.send_password_reset_email(
        db=db,
        recipient=user.email,
        user_name=user_name,
        reset_token=reset_token.token
    )
    
    return {"message": "If the email exists, a password reset link has been sent"}


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(
    request: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """Reset password using token"""
    # Find token
    db_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == request.token
    ).first()
    
    if not db_token or not db_token.is_valid():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Get user
    user = db.query(User).filter(User.id == db_token.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(request.new_password)
    db_token.is_used = True
    db.commit()
    
    # Send confirmation email
    user_name = user.first_name or user.username
    await email_service.send_password_changed_email(
        db=db,
        recipient=user.email,
        user_name=user_name
    )
    
    return {"message": "Password reset successfully"}


@router.post("/change-password", response_model=MessageResponse)
async def change_password(
    request: PasswordChangeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Change password (requires current password)"""
    # Verify current password
    if not verify_password(request.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    current_user.hashed_password = get_password_hash(request.new_password)
    db.commit()
    
    # Send confirmation email
    user_name = current_user.first_name or current_user.username
    await email_service.send_password_changed_email(
        db=db,
        recipient=current_user.email,
        user_name=user_name
    )
    
    return {"message": "Password changed successfully"}
