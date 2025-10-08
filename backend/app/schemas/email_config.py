from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class EmailConfigBase(BaseModel):
    provider: str = Field(..., description="Email provider (gmail, outlook, custom)")
    smtp_host: str = Field(..., description="SMTP server host")
    smtp_port: int = Field(..., ge=1, le=65535, description="SMTP server port")
    smtp_username: str = Field(..., description="SMTP username")
    sender_email: EmailStr = Field(..., description="Sender email address")
    sender_name: str = Field(..., description="Sender display name")
    use_tls: bool = Field(default=True, description="Use TLS encryption")
    use_ssl: bool = Field(default=False, description="Use SSL encryption")
    is_active: bool = Field(default=True, description="Configuration is active")


class EmailConfigCreate(EmailConfigBase):
    smtp_password: str = Field(..., description="SMTP password (will be encrypted)")


class EmailConfigUpdate(BaseModel):
    provider: Optional[str] = None
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = Field(None, ge=1, le=65535)
    smtp_username: Optional[str] = None
    smtp_password: Optional[str] = Field(None, description="SMTP password (will be encrypted)")
    sender_email: Optional[EmailStr] = None
    sender_name: Optional[str] = None
    use_tls: Optional[bool] = None
    use_ssl: Optional[bool] = None
    is_active: Optional[bool] = None


class EmailConfig(EmailConfigBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class EmailConfigResponse(BaseModel):
    """Response schema that doesn't include the encrypted password"""
    id: int
    provider: str
    smtp_host: str
    smtp_port: int
    smtp_username: str
    sender_email: str
    sender_name: str
    use_tls: bool
    use_ssl: bool
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class EmailTestRequest(BaseModel):
    recipient_email: EmailStr = Field(..., description="Email address to send test email")


class EmailProviderPreset(BaseModel):
    """Preset configurations for common email providers"""
    name: str
    smtp_host: str
    smtp_port: int
    use_tls: bool
    use_ssl: bool
    instructions: str

