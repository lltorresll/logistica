from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from appointments.views.appointment_views import (
    AppointmentViewSet,
    AppointmentLookupsView,
)
from appointments.views.report_views import AppointmentStatsView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "api/appointments/stats/",
        AppointmentStatsView.as_view(),
        name="appointment-stats",
    ),
    path(
        "api/appointments/lookups/",
        AppointmentLookupsView.as_view(),
        name="appointment-lookups",
    ),
    path("api/appointments/", include("appointments.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
