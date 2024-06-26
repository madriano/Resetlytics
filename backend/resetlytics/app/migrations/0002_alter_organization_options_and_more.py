# Generated by Django 5.0 on 2024-01-31 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="organization",
            options={"ordering": ["-country", "-location"]},
        ),
        migrations.RemoveField(
            model_name="questionblock",
            name="scale_max",
        ),
        migrations.RemoveField(
            model_name="questionblock",
            name="scale_min",
        ),
        migrations.AddField(
            model_name="answer",
            name="option_order",
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name="questionblock",
            name="scale",
            field=models.CharField(default=None, max_length=20),
        ),
        migrations.AlterField(
            model_name="questionblock",
            name="category",
            field=models.CharField(
                choices=[
                    ("Categorical-one", "Categorical One"),
                    ("Categorical-many", "Categorical Many"),
                    ("Ordinal", "Ordinal"),
                    ("Commentary", "Commentary"),
                ],
                default="Ordinal",
                max_length=50,
            ),
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
                default="Service",
                max_length=50,
            ),
        ),
    ]
