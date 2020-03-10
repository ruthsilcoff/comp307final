from rest_framework import routers

from app.views import UserViewSet, SubjectViewSet, NoteSetViewSet, EventViewSet, VideoServiceViewSet

router = routers.DefaultRouter()
router.register(r'subject', SubjectViewSet)
router.register(r'user', UserViewSet)
router.register(r'noteSet', NoteSetViewSet)
router.register(r'event', EventViewSet)
router.register(r'videoService', VideoServiceViewSet)

