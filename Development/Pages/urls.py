from . import views
from django.urls import path
from .views import ProfileView
urlpatterns = [
    path('', views.home, name='home'),
    path('profile/<slug:slug>', ProfileView.as_view(), name="profile")

]
