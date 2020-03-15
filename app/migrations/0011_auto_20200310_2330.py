# Generated by Django 3.0.3 on 2020-03-10 23:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0010_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Availability',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('dateAdded', models.DateTimeField(auto_now_add=True)),
                ('dateScheduled', models.DateTimeField(null='true')),
                ('repeatFrequency', models.CharField(max_length=100, null='true')),
                ('repeatDays', models.CharField(max_length=100, null='true')),
                ('duration', models.DurationField(null='true')),
                ('booked', models.BooleanField(default='false')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TeachesSubjects',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='videoservicesubjects',
            name='subject',
        ),
        migrations.RemoveField(
            model_name='videoservicesubjects',
            name='videoServiceID',
        ),
        migrations.RemoveField(
            model_name='noteset',
            name='videoServiceID',
        ),
        migrations.RemoveField(
            model_name='tutoringsession',
            name='dateScheduled',
        ),
        migrations.RemoveField(
            model_name='tutoringsession',
            name='duration',
        ),
        migrations.RemoveField(
            model_name='tutoringsession',
            name='videoServiceID',
        ),
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.FileField(blank=True, null=True, upload_to='avatars/'),
        ),
        migrations.AddField(
            model_name='profile',
            name='isTeacher',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='country',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='subject',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='tutoringsession',
            name='learnerID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='learnerID', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='tutoringsession',
            name='tutorID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tutorID', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='VideoService',
        ),
        migrations.DeleteModel(
            name='VideoServiceSubjects',
        ),
        migrations.AddField(
            model_name='teachessubjects',
            name='subject',
            field=models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, to='app.Subject'),
        ),
        migrations.AddField(
            model_name='teachessubjects',
            name='teacherID',
            field=models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='noteset',
            name='availabilityID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.Availability'),
        ),
        migrations.AddField(
            model_name='tutoringsession',
            name='availabilityID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.Availability'),
        ),
    ]