# Generated by Django 3.0.3 on 2020-03-11 11:52

import app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_auto_20200311_0912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.FileField(blank=True, default='cyan.jpg', null=True, upload_to=app.models.get_avatar_path),
        ),
    ]
