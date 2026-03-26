import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Appointment(models.Model):
    class Supplier(models.TextChoices):
        A = "A", _("Proveedor A")
        B = "B", _("Proveedor B")
        C = "C", _("Proveedor C")

    class ProductLine(models.TextChoices):
        T_SHIRTS = "T_SHIRTS", _("Camisetas")
        PANTS = "PANTS", _("Pantalones")
        SHOES = "SHOES", _("Zapatos")
        ACCESSORIES = "ACCESSORIES", _("Accesorios")

    class Status(models.TextChoices):
        SCHEDULED = "SCHEDULED", _("Programada")
        IN_PROGRESS = "IN_PROGRESS", _("En proceso")
        DELIVERED = "DELIVERED", _("Entregada")
        CANCELLED = "CANCELLED", _("Cancelada")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    scheduled_at = models.DateTimeField()
    supplier = models.CharField(max_length=1, choices=Supplier.choices)
    product_line = models.CharField(max_length=20, choices=ProductLine.choices)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.SCHEDULED
    )
    delivered_at = models.DateTimeField(null=True, blank=True)
    observations = models.TextField(blank=True)

    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "appointments"
        ordering = ["-scheduled_at"]

    def __str__(self) -> str:
        return f"Appointment {self.id} - {self.supplier} ({self.status})"
