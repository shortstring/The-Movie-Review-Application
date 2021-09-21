from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .models import Review
from Users.models import CustomUser, Photo
from rest_framework import filters
from .serializers import ReviewSerializer, VoteSerializer, UserInfoSerializer, ReviewEditSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework import status
# Create your views here.


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    # queryset += CustomUser.objects.all()
    serializer_class = ReviewSerializer

    def get_context_data(self, **kwargs):
        context = super(ReviewViewSet, self).get_context_data(**kwargs)
        context['data'] = Photo.objects.get(id=1)
        return context


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


class ReviewSearchPk(APIView):
    queryset = Review.objects.all()
    serializer_class = ReviewEditSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=id']

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewEditSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewEditSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def get(self, request):
    #     id = request.query_params.get('id')
    #     print(id)
    #     # review = Review.objects.filter(id=args['id'])
    #     return Response()

    def delete(self, request, pk, format=None):
        review = self.get_object(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # def put(self, request, id):
    #     print(id)
    #     print(request)
    #     return Response()
    """
        class BoleteDetail(APIView):
    Retrieve, update or delete a bolete instance.

    4

 



    

"""


class voteReview(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = VoteSerializer
