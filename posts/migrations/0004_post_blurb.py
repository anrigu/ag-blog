# Generated by Django 3.1 on 2020-09-01 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_post_audience_grade'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='blurb',
            field=models.TextField(blank=True),
        ),
    ]
