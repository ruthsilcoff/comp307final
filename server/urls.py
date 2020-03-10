from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token

from app.routers import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'', TemplateView.as_view(template_name="app.html"), name="app"),
    url(r'api/', include(router.urls)),
    path(r'api-token-auth/', obtain_auth_token, name='api_token_auth'),
]