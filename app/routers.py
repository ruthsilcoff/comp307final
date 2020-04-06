from rest_framework import routers

from .views import UserViewSet, SubjectViewSet, TeachesSubjectsViewSet, NoteSetViewSet, \
	EventViewSet, AvailabilityViewSet, ProfileViewSet, TutoringSessionViewSet, \
	ChatViewSet, DirectMessageViewSet, NoteSetContentViewSet, ReviewsViewSet

router = routers.DefaultRouter()
router.register('subject', SubjectViewSet)
router.register('teachesSubjects', TeachesSubjectsViewSet)
router.register('user', UserViewSet)
router.register('noteSet', NoteSetViewSet)
router.register('noteSetContent', NoteSetContentViewSet)
router.register('event', EventViewSet)
router.register('availability', AvailabilityViewSet)
router.register('profile', ProfileViewSet)
router.register('tutoringSession', TutoringSessionViewSet)
router.register('chat', ChatViewSet)
router.register('dm', DirectMessageViewSet)
router.register('review', ReviewsViewSet)

