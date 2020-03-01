from rest_framework import viewsets
from .models import Coleus
from .models import Variety
from .models import Picture
from .serializers import ColeusSerializer
from .serializers import VarietySerializer
from .serializers import PictureSerializer


class ColeusViewSet(viewsets.ModelViewSet):
    queryset = Coleus.objects.all()
    serializer_class = ColeusSerializer


class VarietyViewSet(viewsets.ModelViewSet):
    queryset = Variety.objects.all()
    serializer_class = VarietySerializer


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
