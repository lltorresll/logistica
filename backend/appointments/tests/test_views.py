from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from appointments.models.appointment import Appointment
from django.utils import timezone


class AppointmentSecurityTests(APITestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(username="juan", password="123")
        self.user_b = User.objects.create_user(username="pedro", password="123")

        self.appointment_a = Appointment.objects.create(
            created_by=self.user_a,
            supplier="A",
            product_line="Camisetas",
            scheduled_at=timezone.now(),
            status="Programada",
        )

    def test_user_cannot_see_others_appointments(self):
        self.client.force_authenticate(user=self.user_b)
        url = reverse("appointment-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 0)

    def test_user_can_see_only_own_appointments(self):
        self.client.force_authenticate(user=self.user_a)
        url = reverse("appointment-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        api_id = response.data["results"][0]["id"]
        db_id = str(self.appointment_a.id)
        self.assertEqual(api_id, db_id)
