from django.db import models
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    pic_url =models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_API_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})
