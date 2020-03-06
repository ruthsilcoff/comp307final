from django.db import models
from django.contrib.auth.models import User


def get_upload_path(instance, filename):
    return 'user-' + str(instance.userID.id) + '/' + str(instance.id) + '/' + filename


# Create your models here.

# Subjects will be a useful search category for the website
class Subject(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.CharField(max_length=100, null=True)

# many VideoService to one User
class VideoService(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    dateAdded = models.DateTimeField(auto_now_add=True)
    content = models.FileField(upload_to=get_upload_path)


# many VideoService to many Subjects
class VideoServiceSubjects(models.Model):
    videoServiceID = models.ForeignKey(VideoService, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


# many NoteSet to one User
class NoteSet(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    dateAdded = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    videoServiceID = models.ForeignKey(VideoService, on_delete=models.CASCADE)


# many NoteSet to many Subjects
class NoteSetSubjects(models.Model):
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


# many NoteSetContent to one NoteSet (in the form of files)
class NoteSetContent(models.Model):
    id = models.AutoField(primary_key=True)
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    content = models.FileField(upload_to=get_upload_path)




