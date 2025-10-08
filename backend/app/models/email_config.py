from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base


class EmailConfig(Base):
    __tablename__ = "email_configs"

    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String(50), nullable=False)  # gmail, outlook, custom
    smtp_host = Column(String(255), nullable=False)
    smtp_port = Column(Integer, nullable=False)
    smtp_username = Column(String(255), nullable=False)
    smtp_password_encrypted = Column(Text, nullable=False)  # Encrypted
    sender_email = Column(String(255), nullable=False)
    sender_name = Column(String(255), nullable=False)
    use_tls = Column(Boolean, default=True)
    use_ssl = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

