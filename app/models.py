from django.db import models
from django.contrib.auth.models import User


def get_upload_path(instance, filename):
    return 'user-' + str(instance.coleusID.id) + '/' + filename


# Create your models here.
class Variety(models.Model):
    name = models.CharField(max_length=100, primary_key=True)


class Coleus(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    dateAdded = models.DateTimeField(auto_now_add=True)
    potSize = models.IntegerField()
    lastPotted = models.DateTimeField()
    nextPot = models.DateTimeField()
    lastFert = models.DateTimeField()
    variety = models.ForeignKey(Variety, on_delete=models.CASCADE)
    parentID = models.IntegerField()
    otherParentID = models.IntegerField()


class Picture(models.Model):
    pictureID = models.AutoField(primary_key=True)
    coleusID = models.ForeignKey(Coleus, on_delete=models.CASCADE)
    image = models.FileField(upload_to=get_upload_path)
    dateTaken = models.DateTimeField(auto_now_add=True)
    dateAdded = models.DateTimeField(auto_now_add=True)

