from rest_framework import serializers
from django.utils import timezone
from ..models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ["created_by", "delivered_at", "created_at", "updated_at"]

    def validate(self, data):
        if self.instance:
            old_status = self.instance.status
            new_status = data.get("status", old_status)

            if old_status == "Entregada" and new_status != "Entregada":
                raise serializers.ValidationError(
                    {
                        "status": "Una cita 'Entregada' es final y no puede cambiar de estado."
                    }
                )

            if old_status == "En proceso" and new_status == "Programada":
                raise serializers.ValidationError(
                    {
                        "status": "No se puede revertir a 'Programada' si ya está 'En proceso'."
                    }
                )

            if new_status == "Entregada" and old_status != "Entregada":
                data["delivered_at"] = timezone.now()

        return data
