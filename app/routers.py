from rest_framework import routers

from app.views import SubjectViewSet

router = routers.DefaultRouter()
router.register(r'subject', SubjectViewSet)

