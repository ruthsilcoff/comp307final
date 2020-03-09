from rest_framework import serializers

from . import models
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class VideoServiceSerializer(serializers.ModelSerializer):
    userID = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = VideoService
        fields = '__all__'


class VideoServiceSubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoServiceSubjects
        fields = '__all__'


class NoteSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSet
        fields = '__all__'


class NoteSetSubjectsSerializer(serializers.ModelSerializer):
    userID = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = NoteSetSubjects
        fields = '__all__'


class NoteSetContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSetContent
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