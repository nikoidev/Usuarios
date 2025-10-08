import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from typing import Optional
from sqlalchemy.orm import Session
from app.models.email_config import EmailConfig
from app.core.encryption import encryption_service
from datetime import datetime


class EmailService:
    """Service for sending emails using configured SMTP settings"""

    def __init__(self):
        # Setup Jinja2 for email templates
        template_dir = Path(__file__).parent.parent / "templates"
        self.jinja_env = Environment(loader=FileSystemLoader(str(template_dir)))

    async def get_active_config(self, db: Session) -> Optional[EmailConfig]:
        """Get the active email configuration"""
        return db.query(EmailConfig).filter(EmailConfig.is_active == True).first()

    async def send_email(
        self,
        db: Session,
        recipient: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> bool:
        """Send an email using the active configuration"""
        try:
            config = await self.get_active_config(db)
            if not config:
                raise Exception("No active email configuration found")

            # Decrypt password
            smtp_password = encryption_service.decrypt(config.smtp_password_encrypted)

            # Create message
            message = MIMEMultipart("alternative")
            message["From"] = f"{config.sender_name} <{config.sender_email}>"
            message["To"] = recipient
            message["Subject"] = subject

            # Add text and HTML parts
            if text_content:
                message.attach(MIMEText(text_content, "plain"))
            message.attach(MIMEText(html_content, "html"))

            # Send email
            if config.use_ssl:
                await aiosmtplib.send(
                    message,
                    hostname=config.smtp_host,
                    port=config.smtp_port,
                    username=config.smtp_username,
                    password=smtp_password,
                    use_tls=False,
                    start_tls=False,
                )
            else:
                await aiosmtplib.send(
                    message,
                    hostname=config.smtp_host,
                    port=config.smtp_port,
                    username=config.smtp_username,
                    password=smtp_password,
                    use_tls=config.use_tls,
                    start_tls=config.use_tls,
                )

            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    async def send_password_reset_email(
        self,
        db: Session,
        recipient: str,
        user_name: str,
        reset_token: str,
        frontend_url: str = "http://localhost:3000"
    ) -> bool:
        """Send password reset email"""
        reset_url = f"{frontend_url}/auth/reset-password?token={reset_token}"
        
        template = self.jinja_env.get_template("password_reset.html")
        html_content = template.render(
            user_name=user_name,
            reset_url=reset_url,
            expiration_hours=24,
            year=datetime.now().year
        )

        return await self.send_email(
            db=db,
            recipient=recipient,
            subject="Recuperación de Contraseña - Sistema de Gestión de Usuarios",
            html_content=html_content
        )

    async def send_password_changed_email(
        self,
        db: Session,
        recipient: str,
        user_name: str
    ) -> bool:
        """Send password changed confirmation email"""
        template = self.jinja_env.get_template("password_changed.html")
        html_content = template.render(
            user_name=user_name,
            change_date=datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            year=datetime.now().year
        )

        return await self.send_email(
            db=db,
            recipient=recipient,
            subject="Contraseña Cambiada - Sistema de Gestión de Usuarios",
            html_content=html_content
        )

    async def send_test_email(
        self,
        db: Session,
        recipient: str,
        config: EmailConfig
    ) -> bool:
        """Send a test email to verify configuration"""
        template = self.jinja_env.get_template("test_email.html")
        html_content = template.render(
            provider=config.provider,
            sender_email=config.sender_email,
            sender_name=config.sender_name,
            year=datetime.now().year
        )

        return await self.send_email(
            db=db,
            recipient=recipient,
            subject="✅ Email de Prueba - Sistema de Gestión de Usuarios",
            html_content=html_content
        )


# Singleton instance
email_service = EmailService()

