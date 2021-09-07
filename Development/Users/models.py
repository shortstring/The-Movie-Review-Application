# Create your models here.


from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    avatar = models.ImageField(blank=True, default=None)

    # add additional fields in here

    def __str__(self):
        return self.username


class UserFollowing(models.Model):
    user_id = models.ForeignKey(
        "CustomUser", related_name="following", on_delete=models.CASCADE)

    following_user_id = models.ForeignKey(
        "CustomUser", related_name="followers", on_delete=models.CASCADE)

    # You can even add info about when user started following
    created = models.DateTimeField(auto_now_add=True)

# SO for user follower system https://stackoverflow.com/questions/58794639/how-to-make-follower-following-system-with-django-model
