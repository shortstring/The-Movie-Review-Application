from django.db import models
from django.db.models.deletion import CASCADE
# Create your models here.


class Review(models.Model):
    movieTitle = models.CharField(max_length=200)
    imdbID = models.CharField(max_length=8)
    textBody = models.CharField(max_length=500)
    numRating = models.IntegerField()
    author = models.ForeignKey(
        'Users.CustomUser', on_delete=CASCADE, related_name='CustomUser', null=True)
    upVotes = models.IntegerField()
    downVotes = models.IntegerField()