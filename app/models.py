from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


def get_upload_path(instance, filename):
    return 'user-' + str(instance.userID.id) + '/' + str(instance.id) + '/' + filename


# Create your models here.

class OwnedModel(models.Model):
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        abstract = True


# Subjects will be a useful search category for the website
class Subject(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.CharField(max_length=100, null=True)


# many VideoService to one User
class VideoService(OwnedModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    dateAdded = models.DateTimeField(auto_now_add=True)
    dateScheduled = models.DateTimeField(null="true")
    repeatFrequency = models.CharField(max_length=100, null="true")
    repeatDays = models.CharField(max_length=100, null="true")
    duration = models.DurationField(null="true")


# many VideoService to many Subjects
class VideoServiceSubjects(models.Model):
    videoServiceID = models.ForeignKey(VideoService, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


# many NoteSet to one User
class NoteSet(OwnedModel):
    id = models.AutoField(primary_key=True)
    dateAdded = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    videoServiceID = models.ForeignKey(VideoService, on_delete=models.CASCADE, null=True)


# many NoteSet to many Subjects
class NoteSetSubjects(models.Model):
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


# many NoteSetContent to one NoteSet (in the form of files)
class NoteSetContent(models.Model):
    id = models.AutoField(primary_key=True)
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    content = models.FileField(upload_to=get_upload_path)


class TutoringSession(models.Model):
    id = models.AutoField(primary_key=True)
    tutorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutor_session_set')
    learnerID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='learner_session_set')
    videoServiceID = models.ForeignKey(VideoService, on_delete=models.CASCADE, null=True)
    dateScheduled = models.DateTimeField(null="true")
    duration = models.DurationField(null="true")


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    start = models.DateTimeField(null="true")
    end = models.DateTimeField(null="true")
    content: models.CharField(max_length=1000)

    # many to many
# useful for checking who's attending the event, or for getting all the events a user is attending
class UserAttendEvent(OwnedModel):
    eventID = models.ForeignKey(Event, on_delete=models.CASCADE)




