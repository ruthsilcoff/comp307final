# Generated by Django 3.0.3 on 2020-03-06 21:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20200306_2024'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subject',
            name='description',
        ),
    ]
