# Generated by Django 3.1 on 2020-09-08 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_post_blurb'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='audience_grade',
        ),
        migrations.AddField(
            model_name='post',
            name='category',
            field=models.CharField(default='All', max_length=128),
        ),
    ]
