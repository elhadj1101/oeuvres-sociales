# Generated by Django 5.0.3 on 2024-03-14 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='employee',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]