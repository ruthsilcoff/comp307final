# Generated by Django 3.0.3 on 2020-03-07 06:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20200307_0654'),
    ]

    operations = [
        migrations.RenameField(
            model_name='noteset',
            old_name='owner',
            new_name='userID',
        ),
        migrations.RenameField(
            model_name='videoservice',
            old_name='owner',
            new_name='userID',
        ),
    ]
