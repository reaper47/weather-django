import json
from decimal import Decimal

from app.models.sampling import (DHT, Temperature, HeatIndex, Station, DS18B20,
                                 FC37, TEMT6000, Pressure, BME280, Wind)

A_STATION_NAME = 'Home - Backyard'
A_TEMPERATURE_C = Decimal('23.60')
A_TEMPERATURE_F = Decimal('74.48')
A_HEAT_INDEX_C = Decimal('23.60')
A_HEAT_INDEX_F = Decimal('74.48')
A_HUMIDITY = Decimal('56.00')
A_LUX = 333
A_PRESSURE = Decimal('100170.00')
A_PRESSURE_KPA = Decimal('100.20')
A_PRESSURE_MB = Decimal('1002')
A_SPEED_MS = Decimal('24.50')
A_SPEED_KMPH = Decimal('88.20')
A_SPEED_MPH = Decimal('54.80')

A_JSON_SAMPLE = json.dumps({
    'DHT': {'station_id': 1, 'RH': 51.3, 'T_C': 21.9, 'T_F': 71.4,
            'HI_C': 21.5, 'HI_F': 70.7},
    'DS18B20': {0: {'T_C': 21.81, 'T_F': 71.26}}, 'FC37': {'rain': 'N'},
    'TEMT6000': {'lux': 7},
    'BME280': {'H_C': 21.67, 'H_F': 71.01, 'RH': 41.05, 'P': 100297.2,
               'P_kPa': 100.3, 'P_mb': 1003, 'T_C': 21.81, 'T_F': 71.26},
    'T': {'C': 21.8, 'F': 71.23},
    'Wind': {'ms': '0.50', 'kmph': '1.79', 'mph': '1.12'}
})


def create_dht_sample():
    return DHT.objects.create(station=create_station(A_STATION_NAME, 75.4, 46.2),
                              temperature=create_temperature(),
                              humidity=A_HUMIDITY,
                              heat_index=create_heat_index())


def create_station(name, lat, lng):
    return Station.objects.create(lat=lat, lng=lng, name=name)


def create_ds18b20():
    return DS18B20.objects.create(temperature=create_temperature())


def create_bme280():
    return BME280.objects.create(temperature=create_temperature(),
                                 humidity=A_HUMIDITY,
                                 pressure=create_pressure())


def create_temperature():
    try:
        return Temperature.objects.get(celsius=A_TEMPERATURE_C)
    except Temperature.DoesNotExist:
        return Temperature.objects.create(celsius=A_TEMPERATURE_C, fahrenheit=A_TEMPERATURE_F)


def create_heat_index():
    try:
        return HeatIndex.objects.get(celsius=A_TEMPERATURE_C)
    except HeatIndex.DoesNotExist:
        return HeatIndex.objects.create(celsius=A_TEMPERATURE_C, fahrenheit=A_TEMPERATURE_F)


def create_pressure():
    return Pressure.objects.create(pascal=A_PRESSURE, kilopascal=A_PRESSURE_KPA, mbar=A_PRESSURE_MB)


def create_fc37():
    return FC37.objects.create(rain="N")


def create_temt6000():
    return TEMT6000.objects.create(lux=A_LUX)


def create_wind():
    return Wind.objects.create(ms=A_SPEED_MS, kmph=A_SPEED_MPH, mph=A_SPEED_MPH)
