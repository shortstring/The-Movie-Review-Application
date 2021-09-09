from .views import ReviewViewSet, ReviewSearch, voteReview
from django.urls import path

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ReviewViewSet, basename='reviews')
router.register('/vote', voteReview, basename='vote')
urlpatterns = router.urls
# urlpatterns = [
#     path('', ReviewViewSet, name='home'),

# ]
urlpatterns.append(
    path('/search/custom', ReviewSearch.as_view(), name='studentsearch'))

# urlpatterns.append(
#     path('/vote', voteReview.as_view(), name='vote'))
