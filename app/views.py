from rest_framework import viewsets
from .models import User
from .models import Subject
from .models import VideoService
from .models import VideoServiceSubjects
from .models import NoteSet
from .models import NoteSetSubjects
from .models import NoteSetContent
from .serializers import UserSerializer
from .serializers import SubjectSerializer
from .serializers import VideoServiceSerializer
from .serializers import VideoServiceSubjectsSerializer
from .serializers import NoteSetSerializer
from .serializers import NoteSetSubjectsSerializer
from .serializers import NoteSetContentSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class VideoServiceViewSet(viewsets.ModelViewSet):
    queryset = VideoService.objects.all()
    serializer_class = VideoServiceSerializer


class VideoServiceSubjectsViewSet(viewsets.ModelViewSet):
    queryset = VideoServiceSubjects.objects.all()
    serializer_class = VideoServiceSubjectsSerializer


class NoteSetViewSet(viewsets.ModelViewSet):
    queryset = NoteSet.objects.all()
    serializer_class = NoteSetSerializer


class NoteSetSubjectsViewSet(viewsets.ModelViewSet):
    queryset = NoteSetSubjects.objects.all()
    serializer_class = NoteSetSubjectsSerializer


class NoteSetContentViewSet(viewsets.ModelViewSet):
    queryset = NoteSetContent.objects.all()
    serializer_class = NoteSetContentSerializer


