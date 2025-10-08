from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import secrets
from datetime import datetime, timedelta


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String(255), unique=True, index=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_used = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    user = relationship("User", back_populates="password_reset_tokens")

    @staticmethod
    def generate_token():
        """Generate a secure random token"""
        return secrets.token_urlsafe(32)

    @staticmethod
    def get_expiration_time(hours=24):
        """Get expiration time (default 24 hours)"""
        return datetime.utcnow() + timedelta(hours=hours)

    def is_expired(self):
        """Check if token is expired"""
        return datetime.utcnow() > self.expires_at

    def is_valid(self):
        """Check if token is valid (not expired and not used)"""
        return not self.is_expired() and not self.is_used

