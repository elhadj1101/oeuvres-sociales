# Generated by Django 5.0.3 on 2024-03-17 19:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='financial_aid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='requests.financial_aid'),
        ),
        migrations.AlterField(
            model_name='document',
            name='loan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='requests.loan'),
        ),
    ]
