from django.contrib import admin
from .models import CustomUser, UserFollowing, Photo
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(UserFollowing)
admin.site.register(Photo)
