from django.utils import timezone
from rest_framework import viewsets, permissions, pagination, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters import rest_framework as django_filters
from drf_spectacular.utils import extend_schema
from ..models.appointment import Appointment
from ..serializers.appointment_serializers import AppointmentSerializer


class AppointmentFilter(django_filters.FilterSet):
    scheduled_at = django_filters.DateFilter(
        field_name="scheduled_at", lookup_expr="date"
    )
    delivered_at = django_filters.DateFilter(
        field_name="delivered_at", lookup_expr="date"
    )

    class Meta:
        model = Appointment
        fields = ["supplier", "product_line", "status", "scheduled_at", "delivered_at"]


class AppointmentPagination(pagination.PageNumberPagination):
    page_size = 10


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = AppointmentPagination
    filter_backends = [django_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = AppointmentFilter

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Appointment.objects.none()
        return Appointment.objects.filter(created_by=self.request.user).order_by(
            "-scheduled_at"
        )

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.status == "Entregada" and not instance.delivered_at:
            instance.delivered_at = timezone.now()
            instance.save()


class AppointmentLookupsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(responses={200: dict})
    def get(self, request):
        data = {
            "suppliers": [
                {"value": c[0], "label": c[1]}
                for c in Appointment.SupplierChoices.choices
            ],
            "product_lines": [
                {"value": c[0], "label": c[1]}
                for c in Appointment.ProductLineChoices.choices
            ],
            "statuses": [
                {"value": c[0], "label": c[1]}
                for c in Appointment.StatusChoices.choices
            ],
        }
        return Response(data)
