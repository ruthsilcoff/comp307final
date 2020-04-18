from rest_framework import serializers

from . import models
from .models import User, Subject, Availability, TeachesSubjects, NoteSet, \
    NoteSetSubjects, NoteSetContent, TutoringSession, Event, UserAttendEvent, Profile, \
    Chat, DirectMessage, NoteSetContent, Reviews, LessonSubjects


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class TeachesSubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeachesSubjects
        fields = '__all__'


class LessonSubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonSubjects
        fields = '__all__'


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'


class NoteSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSet
        fields = '__all__'


class NoteSetSubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSetSubjects
        fields = '__all__'


class TutoringSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutoringSession
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class UserAttendEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAttendEvent
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'


class DirectMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectMessage
        fields = '__all__'

    def group_name(self):
        return str(self.data['sentTo'])


class NoteSetContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSetContent
        fields = '__all__'


class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'
