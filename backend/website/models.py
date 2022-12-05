from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.


class Images(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    explanation = models.TextField()
    url = models.URLField(max_length=200)
    likes = models.IntegerField(default=0)


class SubTopics(models.Model):
    name = models.CharField(max_length=50)
    article = models.TextField()


class Categories(models.Model):
    name = models.CharField(max_length=50)
    photo = models.URLField(max_length=200)
    opening_article = models.TextField()
    subtopics = models.ForeignKey(SubTopics, on_delete=models.CASCADE)


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=200,
        unique=True
    )
    username = None

    password = models.CharField(max_length=200)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
