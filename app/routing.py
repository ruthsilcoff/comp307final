from django.urls import path

from .consumers import GenericConsumer

websocket_urlpatterns = [
    path('', GenericConsumer)
]
