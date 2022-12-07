from django.http import HttpResponse
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
        images = Images.objects.all()
        serializer = ImagesSerializer(images, many=True)

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

        if email != None:
            user = User.objects.get(email=email).__dict__

            if password != user['password']:
                response = 'Wrong Password'

                return Response(response)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        user_email = data['params']['email']
        user_password = data['params']['password']

        new_user = User.objects.create(
            email=user_email, password=user_password)

        new_user.save()
        serializer = UserSerializer(new_user)

        return Response(serializer.data)
