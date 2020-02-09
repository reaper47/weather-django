from django.contrib import admin

from .models.sampling import (Station, Temperature, HeatIndex, Pressure, DHT, DS18B20,
                              FC37, TEMT6000, BME280, Wind, Averages)

models = [
    (Station,),
    (Temperature,),
    (HeatIndex,),
    (Pressure,),
    (DHT,),
    (DS18B20,),
    (FC37,),
    (TEMT6000,),
    (Wind,),
    (BME280,),
    (Averages,),
]

for model in models:
    admin.site.register(*model)
