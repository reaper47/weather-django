import json

from django.shortcuts import render
from django.utils import timezone
from django.http import HttpResponse
import requests
import channels.layers
from asgiref.sync import async_to_sync

from app.models.sampling import get_samples_for_day, add_new_sample
from app.backend.utils.dto import (Sample, DHT_Dto, DS18B20_Dto, FC37_Dto, Wind_Dto,
                                   TEMT6000_Dto, BME280_Dto, Averages_Dto)


ARDUINO_SERVER_ADDRESS = 'http://192.168.4.1'

graphs = [
    'temperature', 'heat-index', 'humidity', 'wind', 'rain', 'light', 'pressure', '', 'temperature-heat-index',
    'temperature-humidity', 'temperature-rain', 'temperature-light', 'temperature-pressure', '',
    'heat-index-humidity', 'heat-index-rain', 'heat-index-light',  'heat-index-pressure', '',
    'rain-humidity', 'rain-light', '', 'light-humidity', '', 'pressure-humidity', 'pressure-rain', 'pressure-light'
]


live_tiles = [
    ('is-primary', 'Temperature'), ('is-danger', 'Heat Index'), ('is-link', 'Humidity'), ('is-black', 'Wind'),
    ('is-warning', 'Lux'), ('is-info', 'Rain'), ('is-light', 'Pressure')
]

graph_ids = ('temperature', 'temperature-humidity', 'humidity', 'wind', 'heat-index', 'temperature-heat-index',
             'heat-index-humidity', 'rain', 'light', 'temperature-rain', 'temperature-light', 'heat-index-rain',
             'heat-index-light', 'rain-humidity', 'rain-light', 'light-humidity', 'pressure', 'temperature-pressure',
             'heat-index-pressure', 'pressure-humidity', 'pressure-rain', 'pressure-light')


live_settings_components = ['temperature', 'heat-index', 'humidity', 'wind', 'lux', 'rain', 'pressure']
pressure_units = [('pascal', 'Pascal (Pa)'), ('kilopascal', 'Kilopascal (kPa)'), ('mbar', 'Millibar (mbar)')]
wind_units = [('ms', 'Meters/Second (m/s)'), ('kmph', 'Kilometers/Hour (kmph)'), ('mph', 'Miles/Hour (mph)')]


def index_view(request):
    samples = get_samples_for_day(timezone.now())
    args = dict(title='Live', samples=samples, graphs=graphs,
                temperature_sensors=['Average', 'DHT22', 'DS18B20', 'BME280'],
                live_tiles=live_tiles, graph_ids=graph_ids, live_settings_components=live_settings_components,
                pressure_units=pressure_units, wind_units=wind_units)
    return render(request, 'index.html', args)


def newsample_view(request):
    json_ = json.loads(request.body.decode('utf-8'), object_hook=sample_hook)
    add_wind_to_json(json_)

    dht = DHT_Dto(station_id=json_['DHT']['station_id'],
                  humidity=json_['DHT']['RH'], t_c=json_['DHT']['T_C'],
                  t_f=json_['DHT']['T_F'], hi_c=json_['DHT']['HI_C'],
                  hi_f=json_['DHT']['HI_F'])
    ds18b20 = DS18B20_Dto(t_c=json_['DS18B20']['0']['T_C'],
                          t_f=json_['DS18B20']['0']['T_F'])
    fc37 = FC37_Dto(rain=json_['FC37']['rain'])
    temt6000 = TEMT6000_Dto(lux=json_['TEMT6000']['lux'])
    bme280 = BME280_Dto(t_c=json_['BME280']['T_C'], t_f=json_['BME280']['T_F'],
                        humidity=json_['BME280']['RH'],
                        pa=json_['BME280']['P'], kpa=json_['BME280']['P_kPa'],
                        mb=json_['BME280']['P_mb'])
    wind = Wind_Dto(ms=json_['Wind']['ms'], kmph=json_['Wind']['kmph'],
                    mph=json_['Wind']['mph'])
    averages = Averages_Dto(t_c=json_['T']['C'], t_f=json_['T']['F'])
    date = str(timezone.now())
    json_['date'] = date

    sample = Sample(dht, ds18b20, fc37, temt6000, bme280, wind, averages, date)
    add_new_sample(sample)
    async_to_sync(channels.layers.get_channel_layer().group_send)(
        'live', {
            'type': 'update_graph_event',
            'data': json_,
        }
    )
    return HttpResponse('')


def livesample_view(request):
    json_ = json.loads(request.body.decode('utf-8'), object_hook=sample_hook)
    add_wind_to_json(json_)
    async_to_sync(channels.layers.get_channel_layer().group_send)(
        'live', {
            'type': 'update_live_event',
            'data': json_,
        }
    )
    return HttpResponse('')


def add_wind_to_json(json_):
    try:
        text = requests.get(ARDUINO_SERVER_ADDRESS, timeout=3).text
        wind_json = json.loads(text)
    except requests.exceptions.ConnectionError:
        wind_json = {'wind': {'ms': 0, 'kmph': 0, 'mph': 0}}
    json_['Wind'] = wind_json['wind']


def sample_hook(obj):
    value = obj.get('sample')
    if value and isinstance(value, str):
        obj['sample'] = json.loads(value, object_hook=sample_hook)
    return obj['sample'] if 'sample' in obj else obj
