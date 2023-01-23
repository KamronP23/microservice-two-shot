from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoe, LocationVO, BinVO

# Create your views here.
class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number"]

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "id",
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "pic_url", "id"]

    def get_extra_data(self, o):
        return {"bin": o.bin.id}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "pic_url",
        "id",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
  
        try:

            #bin_href = content["bin_id"]
            bin = BinVO.objects.get(id=content["bin"])
            content["bin"] = bin
            print(content)
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        #print(shoe)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})



#
@require_http_methods(["GET"])
def api_list_binVOs(request):
    #if request.method == "GET":
    bins = BinVO.objects.all()
    return JsonResponse({"bins": bins}, encoder=BinVOEncoder)    


