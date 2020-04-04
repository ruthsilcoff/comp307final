from rest_framework import routers

from app.views import UserViewSet, SubjectViewSet, NoteSetViewSet, \
	EventViewSet, AvailabilityViewSet, ProfileViewSet, TutoringSessionViewSet, \
	ChatViewSet, DirectMessageViewSet, NoteSetContentViewSet

router = routers.DefaultRouter()
router.register('subject', SubjectViewSet)
router.register('user', UserViewSet)
router.register('noteSet', NoteSetViewSet)
router.register('noteSetContent', NoteSetContentViewSet)
router.register('event', EventViewSet)
router.register('availability', AvailabilityViewSet)
router.register('profile', ProfileViewSet)
router.register('tutoringSession', TutoringSessionViewSet)
router.register('chat', ChatViewSet)
router.register('dm', DirectMessageViewSet)

