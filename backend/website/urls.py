from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('images/', views.ImagesAPIView.as_view()),
    path('userlogin/', views.UserAPIView.as_view()),
    path('<str:categoryName>/', views.index),
]
