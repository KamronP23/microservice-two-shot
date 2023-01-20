from django.urls import path
from .api_views import api_list_hats, api_list_locationvo

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("locations/", api_list_locationvo, name="location_list")
]