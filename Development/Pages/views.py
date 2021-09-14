from django.shortcuts import render
from django.views.generic.list import ListView
from API.models import Review
from Users.models import CustomUser

# Create your views here.


def home(request):
    print("..............")
    return render(request, 'home.html')


class ProfileView(ListView):
    template_name = "profile.html"

    def get_queryset(self, *args, **kwargs):
        return Review.objects.filter(author_id=self.kwargs['slug'])

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        context['data'] = CustomUser.objects.get(id=self.kwargs['slug'])
        return context
