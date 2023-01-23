from django.urls import path

from .api_views import api_list_shoes, api_list_binVOs, api_show_shoe

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_create_shoes"),
    path("binVOs/", api_list_binVOs, name="api_list_binVOs"),
    path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
]