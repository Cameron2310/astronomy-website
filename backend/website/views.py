from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework.views import APIView
from website.apis.daily_photo_API import *
from .serializers import *


def index(request, **kwargs):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp


class DataAPIView(APIView):
    serializer_class = CategoriesSerializer

    def get(self, request):
        categories = Categories.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data)


class ImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        images = Images.objects.all().order_by('-id')[:5][::-1]
        serializer = ImagesSerializer(images, many=True)

        return Response(serializer.data)


class FilterImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        name = request.query_params["photo_name"]
        image = Images.objects.get(title=name)
        serializer = ImagesSerializer(image)

        return Response(serializer.data)


class SubTopicAPIView(APIView):
    serializer_class = SubtopicsSerializer

    def get(self, request):
        name = request.query_params["name"]
        subtopic = SubTopics.objects.get(name=name)
        serializer = SubtopicsSerializer(subtopic)

        return Response(serializer.data)


class CategoriesAPIView(APIView):
    serializer_class = CategoriesSerializer

    def get(self, request):
        category_name = request.query_params["categoryName"]

        if category_name != None:
            category = Categories.objects.get(name=category_name)
            serializer = CategoriesSerializer(category)
            return Response(serializer.data)

        else:
            categories = Categories.objects.all()
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
