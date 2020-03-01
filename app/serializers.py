from rest_framework import serializers
from .models import Coleus
from .models import Variety
from .models import Picture

class ColeusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coleus
        fields = '__all__'


class VarietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Variety
        fields = '__all__'


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = '__all__'