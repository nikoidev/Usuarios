from cryptography.fernet import Fernet
from app.core.config import settings
import base64
import hashlib


class EncryptionService:
    """Service for encrypting/decrypting sensitive data like SMTP passwords"""

    def __init__(self):
        # Generate a key from the SECRET_KEY
        # This ensures the key is consistent and derived from existing config
        key = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
        self.fernet = Fernet(base64.urlsafe_b64encode(key))

    def encrypt(self, data: str) -> str:
        """Encrypt a string"""
        if not data:
            return ""
        encrypted = self.fernet.encrypt(data.encode())
        return encrypted.decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt a string"""
        if not encrypted_data:
            return ""
        decrypted = self.fernet.decrypt(encrypted_data.encode())
        return decrypted.decode()


# Singleton instance
encryption_service = EncryptionService()

