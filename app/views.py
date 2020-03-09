from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwner
from .models import User
from .models import Subject
from .models import VideoService
from .models import VideoServiceSubjects
from .models import NoteSet
from .models import NoteSetSubjects
from .models import NoteSetContent
from .models import TutoringSession
from .models import Event
from .models import UserAttendEvent
from .serializers import UserSerializer
from .serializers import SubjectSerializer
from .serializers import VideoServiceSerializer
from .serializers import VideoServiceSubjectsSerializer
from .serializers import NoteSetSerializer
from .serializers import NoteSetSubjectsSerializer
from .serializers import NoteSetContentSerializer
from .serializers import TutoringSessionSerializer
from .serializers import EventSerializer
from .serializers import UserAttendEventSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class VideoServiceViewSet(viewsets.ModelViewSet):
    queryset = VideoService.objects.all()
    serializer_class = VideoServiceSerializer
    permission_classes = [IsOwner, IsAuthenticated]


class VideoServiceSubjectsViewSet(viewsets.ModelViewSet):
    queryset = VideoServiceSubjects.objects.all()
    serializer_class = VideoServiceSubjectsSerializer


class NoteSetViewSet(viewsets.ModelViewSet):
    queryset = NoteSet.objects.all()
    serializer_class = NoteSetSerializer
    permission_classes = [IsOwner, IsAuthenticated]


class NoteSetSubjectsViewSet(viewsets.ModelViewSet):
    queryset = NoteSetSubjects.objects.all()
    serializer_class = NoteSetSubjectsSerializer


class NoteSetContentViewSet(viewsets.ModelViewSet):
    queryset = NoteSetContent.objects.all()
    serializer_class = NoteSetContentSerializer


class TutoringSessionViewSet(viewsets.ModelViewSet):
    queryset = TutoringSession.objects.all()
    serializer_class = TutoringSessionSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class UserAttendEventViewSet(viewsets.ModelViewSet):
    queryset = UserAttendEvent.objects.all()
    serializer_class = UserAttendEventSerializer

class MyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissions]
