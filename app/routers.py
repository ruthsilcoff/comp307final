from rest_framework import routers

from app.views import ColeusViewSet, VarietyViewSet

router = routers.DefaultRouter()
router.register(r'coleus', ColeusViewSet)
router.register(r'variety', VarietyViewSet)

