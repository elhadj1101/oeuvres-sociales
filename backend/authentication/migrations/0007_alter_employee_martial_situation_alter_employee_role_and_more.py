# Generated by Django 5.0.3 on 2024-03-14 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_remove_employee_bank_name_alter_employee_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='martial_situation',
            field=models.CharField(choices=[('marie', 'marie'), ('divorce', 'divorce'), ('celibataire', 'celibataire'), ('veuf', 'veuve')], max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='role',
            field=models.CharField(choices=[('president', 'President du Comite'), ('vice_president', 'Vice-President du Comite'), ('tresorier', 'Tresorier du Comite'), ('membre', 'Membre du Comite'), ('employe', 'Employe')], max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='sexe',
            field=models.CharField(choices=[('masculin', 'masculin'), ('feminin', 'feminin')], max_length=100),
        ),
    ]
