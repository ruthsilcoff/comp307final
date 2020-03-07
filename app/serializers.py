from rest_framework import serializers
from .models import User
from .models import Subject
from .models import VideoService
from .models import VideoServiceSubjects
from .models import NoteSet
from .models import NoteSetSubjects
from .models import NoteSetContent


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class VideoServiceSerializer(serializers.ModelSerializer):
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
    class Meta:
        model = NoteSetSubjects
        fields = '__all__'


class NoteSetContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteSetContent
        fields = '__all__'