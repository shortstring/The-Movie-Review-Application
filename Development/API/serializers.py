from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'movieTitle',
            'imdbID',
            'textBody',
            'numRating',
            'author',
            'upVotes',
            'downVotes',
        ]
        depth = 1
