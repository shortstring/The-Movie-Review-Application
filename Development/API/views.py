from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Review
from Users.models import CustomUser
from rest_framework import filters
from .serializers import ReviewSerializer, VoteSerializer, UserInfoSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# Create your views here.


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    # queryset += CustomUser.objects.all()
    serializer_class = ReviewSerializer


class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = CustomUser.objects.all()
        serializer = UserInfoSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserInfoSerializer(user)
        return Response(serializer.data)


class ReviewSearch(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=imdbID']


class voteReview(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = VoteSerializer
