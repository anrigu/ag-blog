from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    # email = models.EmailField('email address', blank=False, unique=True)
    grade = models.IntegerField(
        blank=True,
        null=True,
    )


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    body = models.TextField()
    blurb = models.TextField(blank=True)
    category = models.CharField(
        max_length=128, blank=False, null=False, default="All")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
