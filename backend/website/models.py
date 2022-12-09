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
    three_d_model = models.URLField(max_length=100, default=None)


class Categories(models.Model):
    name = models.CharField(max_length=50)
    three_d_model = models.URLField(max_length=200)
    article = models.TextField()
    subtopics = models.ManyToManyField(SubTopics)


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=200,
        unique=True
    )
    first_name = models.CharField(
        default='First Name', blank=True, max_length=50)
    last_name = models.CharField(
        default='Last Name', blank=True, max_length=50)
    favorite_planet = models.CharField(null=True, blank=True, max_length=100)

    username = None
    password = models.CharField(max_length=200)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
