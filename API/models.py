from django.db import models
from django.db.models.deletion import CASCADE
from datetime import datetime
# Create your models here.


class Review(models.Model):
    movieTitle = models.CharField(max_length=200)
    imdbID = models.CharField(max_length=8)
    textBody = models.CharField(max_length=500)
    numRating = models.IntegerField()
    author = models.ForeignKey(
        'Users.CustomUser', on_delete=CASCADE, related_name='CustomUser')
    upVotes = models.IntegerField()
    downVotes = models.IntegerField()
    myVotedIds = models.TextField(blank=True)
    datePosted = models.DateField(default=datetime.now())
