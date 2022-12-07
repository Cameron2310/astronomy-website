from rest_framework import serializers
from .models import *


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'title', 'date', 'explanation', 'url', 'likes']


class SubtopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTopics
        fields = ['id', 'name', 'article']


class CategoriesSerializer(serializers.ModelSerializer):
    subtopics = SubtopicsSerializer(many=True)

    class Meta:
        model = Categories
        fields = ['id', 'name', 'photo', 'article', 'subtopics']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name',
                  'last_name', 'favorite_planet']
