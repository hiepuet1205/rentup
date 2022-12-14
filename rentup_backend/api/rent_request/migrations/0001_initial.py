# Generated by Django 4.1.3 on 2022-11-18 08:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('room', '0003_alter_room_house_alter_room_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='RentRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('expires_at', models.DateTimeField()),
                ('landlord', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rent_request_landlord', to=settings.AUTH_USER_MODEL)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='room.room')),
                ('tenant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rent_request_tenant', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
