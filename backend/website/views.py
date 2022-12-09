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


class IndividualItemAPIView(APIView):
    serializer_class = IndividualItemsSerializer

    def get(self, request):
        print(request.data)
        name = request.query_params["item_name"]
        item = Individual_items.objects.get(name=name)
        serializer = IndividualItemsSerializer(item)
        return Response(serializer.data)


class ImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        images = Images.objects.all().order_by('-id')[:5][::-1]
        serializer = ImagesSerializer(images, many=True)

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
