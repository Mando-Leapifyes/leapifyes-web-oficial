"""
Email Service for Leapifyes — Brevo Integration (PREPARED, NOT ACTIVE)

This module contains stub functions that will be connected to Brevo (ex-Sendinblue)
when the integration is activated. For now, all functions log to the `email_logs`
collection in MongoDB without sending real emails.

Usage:
    from email_service import EmailService
    email_svc = EmailService(db)
    await email_svc.send_welcome_email(user_email, user_name)
"""

from datetime import datetime, timezone
import uuid
import logging

logger = logging.getLogger(__name__)


class EmailService:
    """Stub email service — logs to MongoDB, does NOT send real emails yet."""

    def __init__(self, db):
        self.db = db
        self.enabled = False  # Set to True when Brevo API key is configured

    async def _log_email(self, to: str, template: str, subject: str, metadata: dict = {}):
        """Log email attempt to email_logs collection."""
        doc = {
            "id": str(uuid.uuid4()),
            "to": to,
            "template": template,
            "subject": subject,
            "status": "queued" if self.enabled else "stub_logged",
            "metadata": metadata,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "sent_at": None,
        }
        await self.db.email_logs.insert_one(doc)
        logger.info(f"[EmailService] {'QUEUED' if self.enabled else 'STUB'}: {template} -> {to}")
        return doc["id"]

    # ===========================
    # Client-facing Emails
    # ===========================

    async def send_welcome_email(self, email: str, name: str):
        """Send welcome email after registration."""
        return await self._log_email(
            to=email,
            template="welcome",
            subject=f"Bienvenido a Leapifyes, {name}",
            metadata={"name": name}
        )

    async def send_password_setup_email(self, email: str, name: str, setup_link: str = ""):
        """Send password setup email."""
        return await self._log_email(
            to=email,
            template="password_setup",
            subject="Configura tu contraseña — Leapifyes",
            metadata={"name": name, "setup_link": setup_link}
        )

    async def send_password_reset_email(self, email: str, name: str, reset_link: str = ""):
        """Send password reset email."""
        return await self._log_email(
            to=email,
            template="password_reset",
            subject="Recupera tu contraseña — Leapifyes",
            metadata={"name": name, "reset_link": reset_link}
        )

    async def send_registration_confirmation(self, email: str, name: str):
        """Send registration confirmation email."""
        return await self._log_email(
            to=email,
            template="registration_confirmation",
            subject="Tu cuenta ha sido creada — Leapifyes",
            metadata={"name": name}
        )

    # ===========================
    # Internal Notifications
    # ===========================

    async def notify_new_lead(self, lead_email: str, lead_name: str, company: str):
        """Notify admin about a new lead."""
        return await self._log_email(
            to="ricardoserrano@leapifyes.com",
            template="internal_new_lead",
            subject=f"Nuevo Lead: {lead_name} ({company})",
            metadata={"lead_email": lead_email, "lead_name": lead_name, "company": company}
        )

    async def notify_new_diagnosis(self, email: str, score: int):
        """Notify admin about a completed diagnosis."""
        return await self._log_email(
            to="ricardoserrano@leapifyes.com",
            template="internal_new_diagnosis",
            subject=f"Nuevo Diagnóstico IMD completado (Score: {score})",
            metadata={"client_email": email, "score": score}
        )

    async def notify_new_client(self, client_email: str, client_name: str):
        """Notify admin about a new client registration."""
        return await self._log_email(
            to="ricardoserrano@leapifyes.com",
            template="internal_new_client",
            subject=f"Nuevo Cliente Registrado: {client_name}",
            metadata={"client_email": client_email, "client_name": client_name}
        )

    async def notify_system_alert(self, alert_type: str, message: str, severity: str = "warning"):
        """Notify admin about a system alert."""
        return await self._log_email(
            to="ricardoserrano@leapifyes.com",
            template="internal_system_alert",
            subject=f"[{severity.upper()}] Alerta del Sistema: {alert_type}",
            metadata={"alert_type": alert_type, "message": message, "severity": severity}
        )
