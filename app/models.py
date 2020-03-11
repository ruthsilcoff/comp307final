from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

# from .managers import UserManager


def get_upload_path(instance, filename):
    return 'user-' + str(instance.userID.id) + '/' + str(instance.id) + '/' + filename


def get_avatar_path(instance, filename):
    return '/Avatars/user-' + str(instance.userID.id) + '/' + filename


# one to one relationship with user
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField(max_length=500, null=True, blank=True)
    country = models.CharField(max_length=30, null=True, blank=True)
    birthDate = models.DateField(null=True, blank=True)
    avatar = models.FileField(upload_to=get_avatar_path, default='cyan.jpg', null=True, blank=True)
    isTeacher = models.BooleanField(default=False)


# Subjects will be a useful search category for the website
class Subject(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.CharField(max_length=100, null=True, blank=True)


# many to 1
# Availability to User
class Availability(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    dateAdded = models.DateTimeField(auto_now_add=True)
    start = models.DateTimeField(null=True)
    end = models.DateTimeField(null=True)
    repeatFrequency = models.CharField(max_length=100, null=True)
    repeatDays = models.CharField(max_length=100, null=True)
    duration = models.DurationField(null=True)
    booked = models.BooleanField(default=False)
    background = models.BooleanField(default=False)
    allDay = models.BooleanField(default=False)


# many Teacher to many Subjects
class TeachesSubjects(models.Model):
    teacherID = models.ForeignKey(User, on_delete=models.CASCADE, null="true")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null="true")


# many NoteSet to one User
class NoteSet(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    dateAdded = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    availabilityID = models.ForeignKey(Availability, on_delete=models.CASCADE, null=True)


# many NoteSet to many Subjects
class NoteSetSubjects(models.Model):
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)


# many NoteSetContent to one NoteSet (in the form of files)
class NoteSetContent(models.Model):
    id = models.AutoField(primary_key=True)
    noteSetID = models.ForeignKey(NoteSet, on_delete=models.CASCADE)
    content = models.FileField(upload_to=get_upload_path)


# a user books a tutoring session with a teacher
class TutoringSession(models.Model):
    id = models.AutoField(primary_key=True)
    tutorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutorID')
    learnerID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='learnerID')
    availabilityID = models.ForeignKey(Availability, on_delete=models.CASCADE, null=True)


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    start = models.DateTimeField(null="true")
    end = models.DateTimeField(null="true")
    content: models.CharField(max_length=1000)


# many to many
# useful for checking who's attending the event, or for getting all the events a user is attending
class UserAttendEvent(models.Model):
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    eventID = models.ForeignKey(Event, on_delete=models.CASCADE)




