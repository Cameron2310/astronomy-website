from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.

class Image(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    explanation = models.TextField()
    url = models.URLField(max_length=200)


class SubTopic(models.Model):
    name = models.CharField(max_length=50)
    article = models.TextField()
    three_d_model = models.URLField(max_length=100, default=None)


class Category(models.Model):
    name = models.CharField(max_length=50)
    three_d_model = models.URLField(max_length=200)
    article = models.TextField()
    subtopics = models.ManyToManyField(SubTopic)


class UserManager(BaseUserManager):

    def create_user(self, email, password, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if email is None:
            raise TypeError('Users must have a email.')
        if password is None:
            raise TypeError('Users must have an password.')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=200,
        unique=True,
    )
    first_name = models.CharField(
        default='First Name', blank=True, max_length=50)
    last_name = models.CharField(
        default='Last Name', blank=True, max_length=50)
    favorite_planet = models.CharField(null=True, blank=True, max_length=100)

    username = None
    password = models.CharField(max_length=150)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.id}"


class Post(models.Model):
    image = models.URLField(blank=True, max_length=300)
    date = models.DateField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    caption = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts")
    users_who_liked_post = models.ManyToManyField(User)


class Comment(models.Model):
    text = models.TextField()
    likes = models.IntegerField(default=0)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    user_who_liked_comment = models.ManyToManyField(User)
