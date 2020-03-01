from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from app.routers import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", TemplateView.as_view(template_name="app.html"), name="app"),
    url(r'api/', include(router.urls)),
]