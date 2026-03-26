from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from appointments.models.appointment import Appointment
from django.utils import timezone
from datetime import timedelta
import random


class Command(BaseCommand):
    help = "Genera 10 citas de prueba adicionales para el usuario admin"

    def handle(self, *args, **kwargs):
        self.stdout.write("Sumando datos de prueba...")

        user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@admin.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )

        if created:
            user.set_password("admin123")
            user.save()
            self.stdout.write(self.style.SUCCESS("Usuario admin creado (admin123)"))

        suppliers = [c[0] for c in Appointment.SupplierChoices.choices]
        lines = [c[0] for c in Appointment.ProductLineChoices.choices]
        statuses = [c[0] for c in Appointment.StatusChoices.choices]
        now = timezone.now()

        for i in range(10):
            status = random.choice(statuses)
            scheduled_at = now - timedelta(days=random.randint(0, 10))

            delivered_at = None
            if status == "Entregada":
                delivered_at = scheduled_at + timedelta(hours=2)

            Appointment.objects.create(
                created_by=user,
                supplier=random.choice(suppliers),
                product_line=random.choice(lines),
                status=status,
                scheduled_at=scheduled_at,
                delivered_at=delivered_at,
                observations=f"Cita de prueba sumada #{i+1}",
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"¡Éxito! Se sumaron 10 citas para el usuario: {user.username}"
            )
        )
