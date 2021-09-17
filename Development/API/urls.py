from .views import ReviewViewSet, ReviewSearch, voteReview, UserInfoSerializer, UserViewSet, ReviewSearchPk
from django.urls import path

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ReviewViewSet, basename='reviews')

router.register('/vote', voteReview, basename='vote')
router.register('/user', UserViewSet, basename='user')
urlpatterns = router.urls

# urlpatterns = [
#     path('', ReviewViewSet, name='home'),

# ]
urlpatterns.append(
    path('/search/custom', ReviewSearch.as_view(), name='reviewSearch'))
urlpatterns.append(
    path('/edit/<int:pk>', ReviewSearchPk.as_view(), name='reviewEdit'))
# urlpatterns.append(
#     path('/vote', voteReview.as_view(), name='vote'))
