# Generated by Django 4.1.3 on 2022-12-08 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=200, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(blank=True, default='First Name', max_length=50)),
                ('last_name', models.CharField(blank=True, default='Last Name', max_length=50)),
                ('favorite_planet', models.CharField(blank=True, max_length=100, null=True)),
                ('password', models.CharField(max_length=200)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('date', models.DateField()),
                ('explanation', models.TextField()),
                ('url', models.URLField()),
                ('likes', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Individual_items',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('article', models.TextField()),
                ('three_d_model', models.URLField(default=None, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SubTopics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('article', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('photo', models.URLField()),
                ('article', models.TextField()),
                ('subtopics', models.ManyToManyField(to='website.subtopics')),
            ],
        ),
    ]
