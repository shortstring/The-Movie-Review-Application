from .views import ReviewViewSet, ReviewSearch
from django.urls import path

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ReviewViewSet, basename='reviews')
urlpatterns = router.urls
# urlpatterns = [
#     path('', ReviewViewSet, name='home'),

# ]
urlpatterns.append(
    path('search/custom/', ReviewSearch.as_view(), name='studentsearch'))
