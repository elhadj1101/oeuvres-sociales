# Generated by Django 5.0.3 on 2024-03-15 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0013_remove_employee_requests_remove_request_created_at_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Request',
        ),
    ]
