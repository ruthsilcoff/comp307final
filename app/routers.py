from rest_framework import routers

from app.views import UserViewSet, SubjectViewSet, NoteSetViewSet, EventViewSet, AvailabilityViewSet, ProfileViewSet, TutoringSessionViewSet

router = routers.DefaultRouter()
router.register('subject', SubjectViewSet)
router.register('user', UserViewSet)
router.register('noteSet', NoteSetViewSet)
router.register('event', EventViewSet)
router.register('availability', AvailabilityViewSet)
router.register('profile', ProfileViewSet)
router.register('tutoringSession', TutoringSessionViewSet)

