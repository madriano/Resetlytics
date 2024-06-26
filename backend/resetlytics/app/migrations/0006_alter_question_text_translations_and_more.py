# Generated by Django 5.0 on 2024-01-31 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_rename_question_number_question_number_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="question",
            name="text_translations",
            field=models.JSONField(default=None),
        ),
        migrations.AlterField(
            model_name="questionblock",
            name="criterion",
            field=models.CharField(
                choices=[
                    ("Service", "Service"),
                    ("Environment", "Environment"),
                    ("Reservation", "Reservation"),
                    ("Technology", "Technology"),
                    ("Staff", "Staff"),
                    ("Digital", "Digital"),
                    ("Sustainability", "Sustainability"),
                    ("Satisfaction", "Satisfaction"),
                    ("Demographics", "Demographics"),
                    ("Economic", "Economic"),
                    ("Social", "Social"),
                    ("None", "None"),
                ],
                default="None",
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="questionblock",
            name="number",
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name="questionblock",
            name="title",
            field=models.TextField(default=None),
        ),
        migrations.AlterField(
            model_name="questionblock",
            name="title_translations",
            field=models.JSONField(default=None),
        ),
        migrations.AlterField(
            model_name="questionnaire",
            name="introduction",
            field=models.TextField(default=None),
        ),
        migrations.AlterField(
            model_name="questionnaire",
            name="introduction_translations",
            field=models.JSONField(default=None),
        ),
        migrations.AlterField(
            model_name="questionnaire",
            name="title_translations",
            field=models.JSONField(default=None),
        ),
        migrations.AlterField(
            model_name="survey",
            name="introduction",
            field=models.TextField(default=None),
        ),
        migrations.AlterField(
            model_name="survey",
            name="introduction_translations",
            field=models.JSONField(default=None),
        ),
        migrations.AlterField(
            model_name="survey",
            name="title_translations",
            field=models.JSONField(default=None),
        ),
    ]
