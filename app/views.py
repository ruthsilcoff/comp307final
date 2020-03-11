from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from .permissions import IsOwner
from .models import User, Subject, Availability, TeachesSubjects, NoteSet, NoteSetSubjects, \
    NoteSetContent, TutoringSession, Event, UserAttendEvent, Profile
from .serializers import UserSerializer, SubjectSerializer, AvailabilitySerializer, \
    TeachesSubjectsSerializer, NoteSetSerializer, NoteSetSubjectsSerializer, \
    NoteSetContentSerializer, TutoringSessionSerializer, EventSerializer, \
    UserAttendEventSerializer, ProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False)
    def current(self, request):
        return Response(UserSerializer(request.user).data)

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer

    def create(self, request, *args, **kwargs):
        request.data['userID'] = request.user.id
        return super().create(request, *args, **kwargs)


class TeachesSubjectsViewSet(viewsets.ModelViewSet):
    queryset = TeachesSubjects.objects.all()
    serializer_class = TeachesSubjectsSerializer


class NoteSetViewSet(viewsets.ModelViewSet):
    queryset = NoteSet.objects.all()
    serializer_class = NoteSetSerializer


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
