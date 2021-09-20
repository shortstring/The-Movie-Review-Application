from rest_framework import serializers
from .models import Review
from collections import OrderedDict
from Users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "avatar",
            "pk",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    # author is slug related field that goes and gets the whole object and filters it by the id
    author = serializers.SlugRelatedField(
        queryset=CustomUser.objects.all(), slug_field='id')

    class Meta:
        model = Review
        fields = [
            'movieTitle',
            'imdbID',
            'textBody',
            'numRating',
            'author',  # forms relationship using line 15

            'upVotes',
            'downVotes',
            'pk',
            'myVotedIds',
            'datePosted',
        ]
        depth = 1


class ReviewEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'textBody',
            'numRating',
        ]
        depth = 1


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'upVotes',
            'downVotes',
            'myVotedIds',
            "pk",
        ]

# class AuthorField(serializers.PrimaryKeyRelatedField):
#     def to_representation(self, value):
#         pk = super(AuthorField, self).to_representation(value)
#         try:
#             item = CustomUser.objects.get(pk=pk)
#             serializer = ReviewSerializer(item)
#             return serializer.data
#         except CustomUser.DoesNotExist:
#             return None

#     def get_choices(self, cutoff=None):
#         queryset = self.get_queryset()
#         if queryset is None:
#             return {}
#         # for each item id will create keys/pairs for ordered dict
#         # called list comprehension
#         return OrderedDict([(item.id, str(item)) for item in queryset])
#         # return None

    # def to_representation(self, instance):
    #     # self.fields['author'] = UserSerializer(read_only=True)
    #     # return super(ReviewSerializer, self).to_representation(instance)
    #     response = super().to_representation(instance)
    #     response['author'] = UserSerializer(instance.author).data
    #     print("------------------------------------------")
    #     print(response)
    #     print(response['author'])

    #     print("------------------------------------------")
    #     return response
