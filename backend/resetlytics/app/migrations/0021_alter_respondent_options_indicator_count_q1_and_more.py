# Generated by Django 5.0 on 2024-02-10 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0020_rename_updated_at_indicator_q1_updated_at_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="respondent",
            options={"ordering": ["-answered_at"]},
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_Q1",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_Q2",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_Q3",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_Q4",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_previous_year",
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="indicator",
            name="count_year_to_date",
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
