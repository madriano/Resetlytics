# Generated by Django 5.0 on 2024-02-06 20:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0014_alter_survey_close_at_alter_survey_open_at"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="allservicequality",
            name="count_surveys",
        ),
        migrations.RemoveField(
            model_name="allservicequality",
            name="organization",
        ),
        migrations.RemoveField(
            model_name="allservicequality",
            name="survey",
        ),
        migrations.RemoveField(
            model_name="allsustainability",
            name="count_surveys",
        ),
        migrations.RemoveField(
            model_name="allsustainability",
            name="organization",
        ),
        migrations.RemoveField(
            model_name="allsustainability",
            name="survey",
        ),
        migrations.RemoveField(
            model_name="sentimentanalysis",
            name="survey",
        ),
        migrations.RemoveField(
            model_name="servicequality",
            name="survey",
        ),
        migrations.RemoveField(
            model_name="sustainability",
            name="survey",
        ),
        migrations.AddField(
            model_name="servicequality",
            name="allservicequality",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="servicequalities",
                to="app.allservicequality",
            ),
        ),
        migrations.AddField(
            model_name="sustainability",
            name="allsustainability",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="sustainabilities",
                to="app.allsustainability",
            ),
        ),
    ]