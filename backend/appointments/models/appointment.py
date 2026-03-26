from django.db import models
from django.contrib.auth.models import User
import uuid

class Appointment(models.Model):
    # Opciones para el campo Supplier
    class SupplierChoices(models.TextChoices):
        A = 'A', 'Proveedor A'
        B = 'B', 'Proveedor B'
        C = 'C', 'Proveedor C'

    # Opciones para el campo Product Line
    class ProductLineChoices(models.TextChoices):
        CAMISETAS = 'Camisetas', 'Camisetas'
        PANTALONES = 'Pantalones', 'Pantalones'
        ZAPATOS = 'Zapatos', 'Zapatos'
        ACCESORIOS = 'Accesorios', 'Accesorios'

    # Opciones para el campo Status
    class StatusChoices(models.TextChoices):
        PROGRAMADA = 'Programada', 'Programada'
        EN_PROCESO = 'En proceso', 'En proceso'
        ENTREGADA = 'Entregada', 'Entregada'
        CANCELADA = 'Cancelada', 'Cancelada'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    scheduled_at = models.DateTimeField()
    supplier = models.CharField(max_length=1, choices=SupplierChoices.choices)
    product_line = models.CharField(max_length=20, choices=ProductLineChoices.choices)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.PROGRAMADA)
    delivered_at = models.DateTimeField(null=True, blank=True) 
    observations = models.TextField(null=True, blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cita {self.id} - {self.supplier}"