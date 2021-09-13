from django.shortcuts import render
from django.views.generic.list import ListView
from API.models import Review

# Create your views here.


def home(request):
    print("..............")
    return render(request, 'home.html')


class ProfileView(ListView):
    template_name = "home.html"

    def get_queryset(self, *args, **kwargs):
        return Review.objects.filter(author_id=self.kwargs['slug'])
