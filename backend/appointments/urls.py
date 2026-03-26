from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.appointment_views import AppointmentViewSet
from .views.report_views import ProductReportView

router = DefaultRouter()
router.register(r'', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('report/', ProductReportView.as_view(), name='product-report'),
    path('', include(router.urls)),
]