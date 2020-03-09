from rest_framework import routers

from app.views import UserViewSet
from app.views import SubjectViewSet
from app.views import NoteSetViewSet
from app.views import EventViewSet
from app.views import VideoServiceViewSet

router = routers.DefaultRouter()
router.register(r'subject', SubjectViewSet)
router.register(r'user', UserViewSet)
router.register(r'noteSet', NoteSetViewSet)
router.register(r'event', EventViewSet)
router.register(r'videoService', VideoServiceViewSet)

