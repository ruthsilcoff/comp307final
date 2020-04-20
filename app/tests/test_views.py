from django.test import TestCase, Client
from django.urls import reverse
import json

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.app_url = reverse('app')

    def test_user_view_set_GET(self):
        response = self.client.get(self.app_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'app.html')
