from rest_framework import serializers
from .models import *


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'title', 'date', 'explanation', 'url', 'likes']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password']