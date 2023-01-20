from django.contrib import admin
from .models import LocationVO, Hats

@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Hats)
class HatsAdmin(admin.ModelAdmin):
    pass
# Register your models here.
