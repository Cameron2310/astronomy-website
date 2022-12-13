from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *


def index(request, **kwargs):
    file = open('static/index.html').read()
    response = HttpResponse(file)
    return response


class ImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        images = Image.objects.all().order_by('-id')[:5][::-1]
        serializer = ImagesSerializer(images, many=True)

        return Response(serializer.data)


class FilterImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        photo_name = request.query_params["photo_name"]
        image = Image.objects.get(title=photo_name)
        serializer = ImagesSerializer(image)

        return Response(serializer.data)


class SubTopicAPIView(APIView):
    serializer_class = SubtopicsSerializer

    def get(self, request):
        subtopic_name = request.query_params["name"]
        subtopic = SubTopic.objects.get(name=subtopic_name)
        serializer = SubtopicsSerializer(subtopic)

        return Response(serializer.data)


class PostsAPIView(APIView):
    serializer_class = PostSerializer

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)

    def put(self, request):
        data = request.data
        post_id = data["params"]["id"]
        likes = data["params"]["likes"]
        user_id = data["params"]["userId"]
        original_post = Post.objects.get(id=post_id)
        user = original_post.users_who_liked_post.filter(id=user_id)

        if len(user) == 0:
            likes = str(int(likes) + 1)
            original_post.users_who_liked_post.add(user_id)
        else:
            likes = str(int(likes) - 1)
            original_post.users_who_liked_post.remove(user_id)

        Post.objects.filter(id=post_id).update(likes=likes)
        updated_post = Post.objects.get(id=post_id)

        serializer = PostSerializer(updated_post)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        user_id = data['params']['user_id']
        caption = data['params']['caption']

        user = User.objects.get(id=user_id)

        new_post = Post.objects.create(
            author=user, caption=caption)

        new_post.save()
        serializer = PostSerializer(new_post)

        return Response(serializer.data)


class CommentsAPIView(APIView):
    serializer_class = CommentSerializer

    def get(self, request):
        post_id = request.query_params['id']
        comments = Comment.objects.filter(post=post_id)
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)

    def post(self, request):
        data = request.data
        user_id = data['params']['user_id']
        comment_text = data['params']['comment_text']
        post_id = data['params']['post_id']

        user = User.objects.get(id=user_id)
        current_post = Post.objects.get(id=post_id)

        new_comment = Comment.objects.create(
            author=user, text=comment_text, post=current_post)

        new_comment.save()
        serializer = CommentSerializer(new_comment)

        return Response(serializer.data)

    def put(self, request):
        data = request.data
        comment_id = data["params"]["comment_id"]
        comment_likes = data["params"]["comment_likes"]
        user_id = data["params"]["user_id"]
        original_comment = Comment.objects.get(id=comment_id)
        user = original_comment.user_who_liked_comment.filter(id=user_id)

        if len(user) == 0:
            comment_likes = str(int(comment_likes) + 1)
            original_comment.user_who_liked_comment.add(user_id)
        else:
            comment_likes = str(int(comment_likes) - 1)
            original_comment.user_who_liked_comment.remove(user_id)

        Comment.objects.filter(id=comment_id).update(likes=comment_likes)
        updated_comment = Comment.objects.get(id=comment_id)

        serializer = CommentSerializer(updated_comment)
        return Response(serializer.data)

    def delete(self, request):
        comment_id = request.query_params["comment_id"]
        post_id = request.query_params["post_id"]
        print("comment id >>> ", comment_id)

        current_comment = Comment.objects.filter(id=comment_id).delete()
        updated_comments = Comment.objects.filter(post=post_id)
        serializer = CommentSerializer(updated_comments, many=True)

        return Response(serializer.data)


class CategoriesAPIView(APIView):
    serializer_class = CategoriesSerializer

    def get(self, request):
        category_name = request.query_params["categoryName"]

        if category_name != None:
            category = Category.objects.get(name=category_name)
            serializer = CategoriesSerializer(category)
            return Response(serializer.data)

        else:
            categories = Category.objects.all()
            serializer = CategoriesSerializer(categories, many=True)
            return Response(serializer.data)


class UserAPIView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        email = request.query_params["email"]
        password = request.query_params["password"]
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return HttpResponse("Email/password is invalid.")

    def post(self, request):
        data = request.data

        user_email = data['params']['email']
        user_password = data['params']['password']

        try:
            validate_email(user_email)
            validate_password(user_password)
        except ValidationError as e:
            print(e)
            return HttpResponse(e)
        else:
            print("good email")
            try:
                new_user = User.objects.create_user(
                    email=user_email, password=user_password)
            except IntegrityError as e:
                print(e)
                return HttpResponse("Email already exists.")
            else:
                new_user.save()
                serializer = UserSerializer(new_user)

                return Response(serializer.data)


class UserInfoAPIView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        user_id = request.query_params["user_id"]

        if user_id != None:
            user = User.objects.get(id=user_id)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        data = request.data

        user_id = data['params']['user_id']
        email = data['params']['email']
        first_name = data['params']['first_name']
        last_name = data['params']['last_name']
        favorite_planet = data['params']['favorite_planet']

        user = User.objects.filter(id=user_id)
        user.update(email=email, first_name=first_name, last_name=last_name,
                    favorite_planet=favorite_planet)

        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
