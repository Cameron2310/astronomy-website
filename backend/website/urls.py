from django.urls import path
from . import views


urlpatterns = [
    path('images/', views.ImagesAPIView.as_view()),
    path('userlogin/', views.UserAPIView.as_view()),
    path('categories/', views.CategoriesAPIView.as_view()),
    path('data/', views.DataAPIView.as_view()),
    path('userdata/', views.UserInfoAPIView.as_view()),
    path('subtopic/', views.SubTopicAPIView.as_view()),
    path('finditem/', views.IndividualItemAPIView.as_view()),
    path('', views.index),
    path('dashboard/<int:user_id>/', views.index),
    path('<str:categoryName>/', views.index),
    path('<str:categoryName>/<str:subCategory>/', views.index),
    path('<str:categoryName>/<str:subCategory>/<str:topicName>/', views.index),

]
