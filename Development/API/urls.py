from .views import ReviewView
from django.urls import path
urlpatterns = [
    path('', ReviewView, name='home'),

]
