from django.test import SimpleTestCase
from django.urls import reverse, resolve
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token

# check that views are available at the correct URL
# do so by reversing the url and checking that it resolves

class TestUrls(SimpleTestCase):

    def test_app_url_resolve(self):
        url = reverse('app')
        self.assertEquals(resolve(url).func.view_class, TemplateView)

    def test_api_auth_token_resolves(self):
        url = reverse('api_token_auth')
        self.assertEquals(resolve(url).func, obtain_auth_token)
