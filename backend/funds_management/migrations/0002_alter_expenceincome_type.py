# Generated by Django 5.0.3 on 2024-03-31 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('funds_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenceincome',
            name='type',
            field=models.CharField(choices=[('expense', 'expense'), ('income', 'income')], max_length=50),
        ),
    ]
