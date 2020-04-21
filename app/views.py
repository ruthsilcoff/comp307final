from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from asgiref.sync import async_to_sync

from .notifications import notify
from .notifications import update
from .permissions import IsOwner
from .models import User, Subject, Availability, TeachesSubjects, NoteSet, NoteSetSubjects, \
    NoteSetContent, TutoringSession, Event, UserAttendEvent, Profile, Chat, DirectMessage, \
    LessonSubjects
from .serializers import UserSerializer, SubjectSerializer, AvailabilitySerializer, Reviews, \
    TeachesSubjectsSerializer, NoteSetSerializer, NoteSetSubjectsSerializer, \
    NoteSetContentSerializer, TutoringSessionSerializer, EventSerializer, \
    UserAttendEventSerializer, ProfileSerializer, ChatSerializer, DirectMessageSerializer, ReviewsSerializer, \
    LessonSubjectsSerializer


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

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class TeachesSubjectsViewSet(viewsets.ModelViewSet):
    queryset = TeachesSubjects.objects.all()
    serializer_class = TeachesSubjectsSerializer


class LessonSubjectsViewSet(viewsets.ModelViewSet):
    queryset = LessonSubjects.objects.all()
    serializer_class = LessonSubjectsSerializer


class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer

    def create(self, request, *args, **kwargs):
        request.data['userID'] = request.user.id
        return super().create(request, *args, **kwargs)


class NoteSetViewSet(viewsets.ModelViewSet):
    queryset = NoteSet.objects.all()
    serializer_class = NoteSetSerializer

    def create(self, request, *args, **kwargs):
        request.data['userID'] = request.user.id
        return super().create(request, *args, **kwargs)


class NoteSetSubjectsViewSet(viewsets.ModelViewSet):
    queryset = NoteSetSubjects.objects.all()
    serializer_class = NoteSetSubjectsSerializer


class NoteSetContentViewSet(viewsets.ModelViewSet):
    queryset = NoteSetContent.objects.all()
    serializer_class = NoteSetContentSerializer


class TutoringSessionViewSet(viewsets.ModelViewSet):
    queryset = TutoringSession.objects.all()
    serializer_class = TutoringSessionSerializer

    def create(self, request, *args, **kwargs):
        request.data['learnerID'] = request.user.id
        return super().create(request, *args, **kwargs)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class UserAttendEventViewSet(viewsets.ModelViewSet):
    queryset = UserAttendEvent.objects.all()
    serializer_class = UserAttendEventSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        async_to_sync(notify)(self.serializer_class, instance)


class DirectMessageViewSet(viewsets.ModelViewSet):
    queryset = DirectMessage.objects.all()
    serializer_class = DirectMessageSerializer

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        instance = serializer.save()
        async_to_sync(notify)(self.serializer_class, instance)

    def perform_update(self, serializer):
        instance = serializer.save()
        async_to_sync(update)(self.serializer_class, instance)


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

    def create(self, request, *args, **kwargs):
        request.data['reviewerID'] = request.user.id
        return super().create(request, *args, **kwargs)