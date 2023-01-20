from django.urls import path

from .api_views import api_list_shoes, api_list_binVOs

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_create_shoes"),
    path("binVOs/", api_list_binVOs, name="api_list_binVOs"),

]