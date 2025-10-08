from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.email_config import EmailConfig
from app.schemas.email_config import EmailConfigCreate, EmailConfigUpdate, EmailProviderPreset
from app.core.encryption import encryption_service


class EmailConfigService:
    """Service for managing email configurations"""

    @staticmethod
    def get_provider_presets() -> List[EmailProviderPreset]:
        """Get predefined email provider configurations"""
        return [
            EmailProviderPreset(
                name="Gmail",
                smtp_host="smtp.gmail.com",
                smtp_port=587,
                use_tls=True,
                use_ssl=False,
                instructions="Usa tu email de Gmail y una contraseña de aplicación (App Password). "
                            "Activa la verificación en dos pasos y genera una contraseña específica para aplicaciones."
            ),
            EmailProviderPreset(
                name="Outlook/Hotmail",
                smtp_host="smtp-mail.outlook.com",
                smtp_port=587,
                use_tls=True,
                use_ssl=False,
                instructions="Usa tu email de Outlook/Hotmail y tu contraseña normal."
            ),
            EmailProviderPreset(
                name="Yahoo",
                smtp_host="smtp.mail.yahoo.com",
                smtp_port=587,
                use_tls=True,
                use_ssl=False,
                instructions="Usa tu email de Yahoo y una contraseña de aplicación."
            ),
            EmailProviderPreset(
                name="Office365",
                smtp_host="smtp.office365.com",
                smtp_port=587,
                use_tls=True,
                use_ssl=False,
                instructions="Usa tu email corporativo de Office365 y tu contraseña."
            ),
            EmailProviderPreset(
                name="SMTP Personalizado",
                smtp_host="smtp.tuservidor.com",
                smtp_port=587,
                use_tls=True,
                use_ssl=False,
                instructions="Configura manualmente tu servidor SMTP. Consulta con tu proveedor."
            ),
        ]

    @staticmethod
    def get_all(db: Session) -> List[EmailConfig]:
        """Get all email configurations"""
        return db.query(EmailConfig).all()

    @staticmethod
    def get_active(db: Session) -> Optional[EmailConfig]:
        """Get the active email configuration"""
        return db.query(EmailConfig).filter(EmailConfig.is_active == True).first()

    @staticmethod
    def get_by_id(db: Session, config_id: int) -> Optional[EmailConfig]:
        """Get email configuration by ID"""
        return db.query(EmailConfig).filter(EmailConfig.id == config_id).first()

    @staticmethod
    def create(db: Session, config_data: EmailConfigCreate) -> EmailConfig:
        """Create a new email configuration"""
        # Encrypt password
        encrypted_password = encryption_service.encrypt(config_data.smtp_password)
        
        # If this config is active, deactivate all others
        if config_data.is_active:
            db.query(EmailConfig).update({"is_active": False})
        
        # Create new config
        db_config = EmailConfig(
            provider=config_data.provider,
            smtp_host=config_data.smtp_host,
            smtp_port=config_data.smtp_port,
            smtp_username=config_data.smtp_username,
            smtp_password_encrypted=encrypted_password,
            sender_email=config_data.sender_email,
            sender_name=config_data.sender_name,
            use_tls=config_data.use_tls,
            use_ssl=config_data.use_ssl,
            is_active=config_data.is_active
        )
        
        db.add(db_config)
        db.commit()
        db.refresh(db_config)
        
        return db_config

    @staticmethod
    def update(
        db: Session,
        config_id: int,
        config_data: EmailConfigUpdate
    ) -> Optional[EmailConfig]:
        """Update an email configuration"""
        db_config = EmailConfigService.get_by_id(db, config_id)
        if not db_config:
            return None
        
        # Update fields
        update_data = config_data.model_dump(exclude_unset=True)
        
        # Encrypt password if provided
        if "smtp_password" in update_data:
            update_data["smtp_password_encrypted"] = encryption_service.encrypt(
                update_data.pop("smtp_password")
            )
        
        # If setting as active, deactivate all others
        if update_data.get("is_active"):
            db.query(EmailConfig).filter(EmailConfig.id != config_id).update(
                {"is_active": False}
            )
        
        for key, value in update_data.items():
            setattr(db_config, key, value)
        
        db.commit()
        db.refresh(db_config)
        
        return db_config

    @staticmethod
    def delete(db: Session, config_id: int) -> bool:
        """Delete an email configuration"""
        db_config = EmailConfigService.get_by_id(db, config_id)
        if not db_config:
            return False
        
        db.delete(db_config)
        db.commit()
        
        return True

    @staticmethod
    def set_active(db: Session, config_id: int) -> Optional[EmailConfig]:
        """Set a configuration as active and deactivate all others"""
        # Deactivate all
        db.query(EmailConfig).update({"is_active": False})
        
        # Activate the selected one
        db_config = EmailConfigService.get_by_id(db, config_id)
        if db_config:
            db_config.is_active = True
            db.commit()
            db.refresh(db_config)
        
        return db_config

