from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from ..models.appointment import Appointment


class ProductReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        date_from = request.query_params.get("date_from", "2026-01-01")
        date_to = request.query_params.get("date_to", "2026-12-31")

        with connection.cursor() as cursor:
            query = """
    SELECT 
        product_line,
        COUNT(*) AS total_deliveries,
        ROUND(AVG(EXTRACT(EPOCH FROM (delivered_at - scheduled_at)) / 3600)::numeric, 2) AS avg_hours,
        ROUND(AVG(EXTRACT(EPOCH FROM (delivered_at - scheduled_at)) / 60)::numeric, 2) AS avg_minutes -- <--- ESTA ES LA QUE FALTA
    FROM appointments_appointment
    WHERE status = 'Entregada'
      AND created_by_id = %s
      AND scheduled_at BETWEEN %s AND %s
    GROUP BY product_line;
"""
            cursor.execute(query, [request.user.id, date_from, date_to])
            columns = [col[0] for col in cursor.description]
            results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return Response(results)


class AppointmentStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total = (
            Appointment.objects.filter(created_by=request.user)
            .exclude(status="Cancelada")
            .count()
        )
        return Response({"total_appointments": total, "avg_delay_hours": 0})
