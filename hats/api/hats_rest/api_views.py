from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import LocationVO, Hats
import json
# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO,
    properties = ["closet_name", "section_number", "shelf_number"]


class BinVoDetailEncoder(ModelEncoder):
    model = "BinVo"
    properties = ["closet_name", "bin_number", "bin_size"]


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = ["style_name"]

    def get_extra_data(self, o):
        return {"locations": o.locations.properties}


class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = {
        "style_name",
        "fabric",
        "color",
        "hat_picture_url",
        "location"
    }
    encoders = {
        "location": LocationVODetailEncoder(),
    }

    def get_extra_data(self, o):
        return {"locations": o.locations.properties}

@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hats.objects.filter(location=location_vo_id)
        else:
            hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)

    try:
        location_href = f"/api/locations/{location_vo_id}"
        location = LocationVO.objects.get(import_href=location_href)
        content["location"] = location
    except LocationVO.DoesNotExist:
        return JsonResponse(
            {"message": "invalid Location ID"},
            status=400,
        )
    hats = Hats.objects.create(**content)
    return JsonResponse(
        hats,
        encoder=HatsDetailEncoder,
        safe=False
    )
