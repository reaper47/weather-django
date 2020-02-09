from django.db import models
from django.utils import timezone

from app.backend.utils.dto import Sample


class Station(models.Model):
    lat = models.FloatField(null=False)
    lng = models.FloatField(null=False)
    name = models.CharField(max_length=48, null=False)

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        return (self.lat == other.lat and
                self.lng == other.lng and
                self.name == other.name)

    def __str__(self):
        return f'#{self.pk} ({self.name}): [{self.lat}, {self.lng}]'


class Temperature(models.Model):
    celsius = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    fahrenheit = models.DecimalField(max_digits=5, decimal_places=2, null=False)

    class Meta:
        unique_together = ('celsius', 'fahrenheit',)

    def __eq__(self, other):
        return self.celsius == other.celsius and self.fahrenheit == other.fahrenheit

    def __hash__(self):
        return hash(self.celsius)

    def __str__(self):
        return f'#{self.id} - [{self.celsius},{self.fahrenheit}]'


class HeatIndex(models.Model):
    celsius = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    fahrenheit = models.DecimalField(max_digits=5, decimal_places=2, null=False)

    class Meta:
        unique_together = ('celsius', 'fahrenheit',)

    def __eq__(self, other):
        return self.celsius == other.celsius and self.fahrenheit == other.fahrenheit

    def __hash__(self):
        return hash(self.celsius)

    def __str__(self):
        return f'#{self.id} - [{self.celsius},{self.fahrenheit}]'


class Pressure(models.Model):
    pascal = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    kilopascal = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    mbar = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    class Meta:
        unique_together = ('pascal', 'kilopascal', 'mbar',)

    def __eq__(self, other):
        return self.pascal == other.pascal and self.kilopascal == other.kilopascal and self.mbar == other.mbar

    def __hash__(self):
        return hash(self.pascal)

    def __str__(self):
        return f'#{self.id} - [{self.pascal},{self.kilopascal},{self.mbar}]'


class DHT(models.Model):
    station = models.ForeignKey('Station', on_delete=models.DO_NOTHING)
    temperature = models.ForeignKey('Temperature', on_delete=models.DO_NOTHING)
    heat_index = models.ForeignKey('HeatIndex', on_delete=models.DO_NOTHING)
    humidity = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    date = models.DateTimeField(default=timezone.now)

    def __hash__(self):
        return hash(self.date)

    def __eq__(self, other):
        return (self.station == other.station and
                self.temperature == other.temperature and
                self.humidity == other.humidity and
                self.heat_index == other.heat_index and
                self.date.year == other.date.year)

    def __str__(self):
        return (f'#{self.id}.{self.station_id} -\n'
                f'\tTemperature: {self.temperature}\n'
                f'\tRH: {self.humidity}\n'
                f'\tHI: {self.heat_index}\n'
                f'\tDate: {self.date}')


class DS18B20(models.Model):
    temperature = models.ForeignKey('Temperature', on_delete=models.DO_NOTHING)
    date = models.DateTimeField(default=timezone.now)

    def __eq__(self, other):
        return self.temperature == other.temperature and str(self.date) == str(other.date)

    def __hash__(self):
        return hash(self.date)

    def __str__(self):
        return (f'DS18B20 #{self.id} -\n'
                f'\tTemperature: {self.temperature}\n'
                f'\tDate: {self.date}')


class FC37(models.Model):
    rain = models.CharField(max_length=1, null=False)
    date = models.DateTimeField(default=timezone.now)

    def __eq__(self, other):
        return self.rain == other.rain and str(self.date) == str(other.date)

    def __hash__(self):
        return hash(self.date)

    def __str__(self):
        return (f'FC37 #{self.id} -\n'
                f'\tRain: {self.rain}\n'
                f'\tDate: {self.date}')


class TEMT6000(models.Model):
    lux = models.PositiveIntegerField(null=False)
    date = models.DateTimeField(default=timezone.now)

    def __eq__(self, other):
        return self.lux == other.lux and str(self.date) == str(other.date)

    def __hash__(self):
        return hash(self.date)

    def __str__(self):
        return (f'TEMT6000 #{self.id} -\n'
                f'\tLux: {self.lux}\n'
                f'\tDate: {self.date}')


class BME280(models.Model):
    temperature = models.ForeignKey('Temperature', on_delete=models.DO_NOTHING)
    humidity = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    pressure = models.ForeignKey('Pressure', on_delete=models.DO_NOTHING)
    date = models.DateTimeField(default=timezone.now)

    def __eq__(self, other):
        return (self.temperature == other.temperature and
                self.humidity == other.humidity and
                self.pressure == other.pressure and
                str(self.date) == str(other.date))

    def __hash__(self):
        return hash(self.date)

    def __str__(self):
        return (f'#{self.id} -\n'
                f'\tTemperature: {self.temperature}\n'
                f'\tHumidity: {self.humidity}\n'
                f'\tPressure: {self.pressure}\n'
                f'\tDate: {self.date}')


class Wind(models.Model):
    ms = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    kmph = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    mph = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    date = models.DateTimeField(default=timezone.now)

    def __eq__(self, other):
        return (self.ms == other.ms and
                self.kmph == other.kmph and
                self.mph == other.mph and
                str(self.date) == str(other.date))

    def __hash__(self):
        return hash(self.date)

    def __str__(self):
        return (f'#{self.id} -\n'
                f'\tm/s: {self.ms}\n'
                f'\tkm/h: {self.kmph}\n'
                f'\tmph: {self.mph}')


class Averages(models.Model):
    temperature = models.ForeignKey('Temperature', on_delete=models.DO_NOTHING)
    date = models.DateTimeField(default=timezone.now)


def get_samples_for_day(date):
    day_start = f'{date.year}-{date.month}-{date.day} 00:00:00+00:00'
    day_end = f'{date.year}-{date.month}-{date.day} 23:59:59+00:00'

    data = {
        'DHT': {'T_C': [], 'T_F': [], 'HI_C': [], 'HI_F': [], 'RH': []},
        'DS18B20': {'T_C': [], 'T_F': []},
        'FC37': {'Rain': []},
        'TEMT6000': {'Light': []},
        'BME280': {'T_C': [], 'T_F': [], 'RH': [], 'P_Pa': [], 'P_kPa': [], 'P_mb': []},
        'Wind': {'ms': [], 'kmph': [], 'mph': []},
        'Averages': {'T_C': [], 'T_F': []},
        'dates': []
    }

    samples = DHT.objects.filter(date__range=(day_start, day_end)).all()
    data['dates'] = [str(x.date) for x in samples]
    data['DHT']['T_C'] = [x.temperature.celsius for x in samples]
    data['DHT']['T_F'] = [x.temperature.fahrenheit for x in samples]
    data['DHT']['HI_C'] = [x.heat_index.celsius for x in samples]
    data['DHT']['HI_F'] = [x.heat_index.fahrenheit for x in samples]
    data['DHT']['RH'] = [x.humidity for x in samples]

    samples = DS18B20.objects.filter(date__range=(day_start, day_end)).all()
    data['DS18B20']['T_C'] = [x.temperature.celsius for x in samples]
    data['DS18B20']['T_F'] = [x.temperature.fahrenheit for x in samples]

    map_rain = {'N': 0, 'L': 1, 'M': 2, 'H': 3}
    samples = FC37.objects.filter(date__range=(day_start, day_end)).all()
    data['FC37']['Rain'] = [map_rain[x.rain] for x in samples]

    samples = TEMT6000.objects.filter(date__range=(day_start, day_end)).all()
    data['TEMT6000']['Light'] = [x.lux for x in samples]

    samples = BME280.objects.filter(date__range=(day_start, day_end)).all()
    data['BME280']['T_C'] = [x.temperature.celsius for x in samples]
    data['BME280']['T_F'] = [x.temperature.fahrenheit for x in samples]
    data['BME280']['RH'] = [x.humidity for x in samples]
    data['BME280']['P'] = [x.pressure.pascal for x in samples]
    data['BME280']['P_kPa'] = [x.pressure.kilopascal for x in samples]
    data['BME280']['P_mb'] = [x.pressure.mbar for x in samples]

    samples = Wind.objects.filter(date__range=(day_start, day_end)).all()
    data['Wind']['ms'] = [x.ms for x in samples]
    data['Wind']['kmph'] = [x.kmph for x in samples]
    data['Wind']['mph'] = [x.mph for x in samples]

    samples = Averages.objects.filter(date__range=(day_start, day_end)).all()
    data['Averages']['T_C'] = [x.temperature.celsius for x in samples]
    data['Averages']['T_F'] = [x.temperature.fahrenheit for x in samples]

    return data


def add_new_sample(sample: Sample):
    t = find_temperature(Temperature, sample.dht.t_c, sample.dht.t_f)
    hi = find_temperature(HeatIndex, sample.dht.hi_c, sample.dht.hi_f)
    station = Station.objects.get(pk=sample.dht.station_id)
    DHT.objects.create(station=station, temperature=t, heat_index=hi,
                       humidity=sample.dht.humidity, date=sample.date)

    t = find_temperature(Temperature, sample.ds18b20.t_c, sample.ds18b20.t_f)
    DS18B20.objects.create(temperature=t, date=sample.date)

    FC37(rain=sample.fc37.rain, date=sample.date)
    TEMT6000.objects.create(lux=sample.temt6000.lux, date=sample.date)

    t = find_temperature(Temperature, sample.bme280.t_c, sample.bme280.t_f)
    p = find_pressure(sample.bme280.pa, sample.bme280.kpa, sample.bme280.mb)
    BME280.objects.create(temperature=t, humidity=sample.bme280.humidity, pressure=p, date=sample.date)

    Wind.objects.create(ms=sample.wind.ms, kmph=sample.wind.kmph, mph=sample.wind.mph, date=sample.date)

    t = find_temperature(Temperature, sample.averages.t_c, sample.averages.t_f)
    Averages.objects.create(temperature=t, date=sample.date)


def find_temperature(Entity, celsius, fahrenheit):
    try:
        return Entity.objects.get(celsius=celsius, fahrenheit=fahrenheit)
    except Entity.DoesNotExist:
        return Entity.objects.create(celsius=celsius, fahrenheit=fahrenheit)


def find_pressure(pascal, kilopascal, mbar):
    try:
        return Pressure.objects.get(pascal=pascal, kilopascal=kilopascal, mbar=mbar)
    except Pressure.DoesNotExist:
        return Pressure.objects.create(pascal=pascal, kilopascal=kilopascal, mbar=mbar)
