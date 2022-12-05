from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *


def index(request, **kwargs):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp


class ImagesAPIView(APIView):
    serializer_class = ImagesSerializer

    def get(self, request):
        images = Images.objects.all()
        serializer = ImagesSerializer(images, many=True)

        return Response(serializer.data)
