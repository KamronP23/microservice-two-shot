from django.urls import path
from .api_views import api_list_hats, api_list_locationvo, api_show_hat

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("locations/", api_list_locationvo, name="location_list"),
    path("hats/<int:pk>/", api_show_hat, name="api_show_hat"),

]