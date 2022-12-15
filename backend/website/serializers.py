from rest_framework import serializers
from .models import *


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePageImage
        fields = ['id', 'title', 'date', 'explanation', 'url']


class ArticlesImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleImage
        fields = ['category_name', 'source', 'url']


class SubtopicsSerializer(serializers.ModelSerializer):
    article_images = ArticlesImagesSerializer(many=True)

    class Meta:
        model = SubTopic
        fields = ['id', 'name', 'article', 'article_images', 'three_d_model']


class CategoriesSerializer(serializers.ModelSerializer):
    subtopics = SubtopicsSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'article',
                  'subtopics', 'three_d_model']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'favorite_planet']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'image', 'date', 'likes',
                  'caption', 'author', 'users_who_liked_post']


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'text', 'likes', 'author',
                  'post', 'user_who_liked_comment']
