# Generated by Django 3.0.3 on 2020-02-08 19:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_fc37'),
    ]

    operations = [
        migrations.CreateModel(
            name='TEMT6000',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lux', models.PositiveIntegerField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
