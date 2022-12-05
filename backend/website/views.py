from django.http import HttpResponse


def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp
