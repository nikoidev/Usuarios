from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import secrets
from datetime import datetime, timedelta, timezone


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String(255), unique=True, index=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_revoked = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    user = relationship("User", back_populates="refresh_tokens")

    @staticmethod
    def generate_token():
        """Generate a secure random refresh token"""
        return secrets.token_urlsafe(64)

    @staticmethod
    def get_expiration_time(days=7):
        """Get expiration time (default 7 days)"""
        return datetime.now(timezone.utc) + timedelta(days=days)

    def is_expired(self):
        """Check if token is expired"""
        return datetime.now(timezone.utc) > self.expires_at

    def is_valid(self):
        """Check if token is valid (not expired and not revoked)"""
        return not self.is_expired() and not self.is_revoked

