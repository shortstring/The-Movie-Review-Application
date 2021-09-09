from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Review
from rest_framework import filters
from .serializers import ReviewSerializer, VoteSerializer
# Create your views here.


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewSearch(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=imdbID']


class voteReview(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = VoteSerializer
