# Generated by Django 5.0 on 2024-02-06 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0013_respondent_survey_survey_organizations"),
    ]

    operations = [
        migrations.AlterField(
            model_name="survey",
            name="close_at",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="survey",
            name="open_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
