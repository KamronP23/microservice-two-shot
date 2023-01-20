from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import LocationVO, Hats
import json
# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO,
    properties = [
        "closet_name",
        "import_href",
        "section_number",
        "shelf_number",
        ]


# class BinVoDetailEncoder(ModelEncoder):
#     model = "BinVo"
#     properties = ["closet_name", "bin_number", "bin_size"]
class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = ["style_name"]

    def get_extra_data(self, o):
        return {"locations": o.locations.id}


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
        print("HEY OVER HERE", content)
    try:
        #location_href = f"/api/locations/{location_vo_id}/"
        #location_href = content["location"]
        location = LocationVO.objects.get(import_href=content["location"])
        # location = LocationVO.objects.get(id=location_vo_id)
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

@require_http_methods(["DELETE", "GET"])
def api_show_hat(request, pk):

    if request.method == "GET":
        hats = Hats.objects.get(id=pk)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False
        )
    else:
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET"])
def api_list_locationvo(request):
    locations = LocationVO.objects.all()
    return JsonResponse({"locations": locations}, encoder=LocationVODetailEncoder)