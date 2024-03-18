# Generated by Django 5.0.3 on 2024-03-18 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0002_alter_document_financial_aid_alter_document_loan'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='loan',
        ),
        migrations.AddField(
            model_name='financial_aid',
            name='financial_aid_amount',
            field=models.CharField(default=None, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='loan',
            name='loan_period',
            field=models.CharField(max_length=2),
        ),
    ]
