from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('images/', views.ImagesAPIView.as_view()),
    path('userlogin/', views.UserAPIView.as_view()),
    path('categories/', views.CategoriesAPIView.as_view()),
    path('data/', views.DataAPIView.as_view()),
    path('Sun/', views.index),
    path('Planets/', views.index),
    path('Black Holes/', views.index),
    path('Supernovas/', views.index),
    path('Nebulas/', views.index),
    path('<str:categoryName>/', views.index),
]
