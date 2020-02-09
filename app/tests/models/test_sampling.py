from difflib import SequenceMatcher

from django.test import TestCase
from django.utils import timezone

from app.backend.utils.dto import (DHT_Dto, DS18B20_Dto, FC37_Dto, TEMT6000_Dto, BME280_Dto, Averages_Dto,
                                   Wind_Dto, Sample)
from app.models.sampling import (Station, DHT, get_samples_for_day, Temperature, Pressure, HeatIndex, add_new_sample,
                                 find_temperature, find_pressure, DS18B20, BME280, FC37, TEMT6000, Wind)
from app.tests.conftest import (A_STATION_NAME, create_dht_sample, A_TEMPERATURE_C, A_TEMPERATURE_F, A_HEAT_INDEX_C,
                                A_HEAT_INDEX_F, A_HUMIDITY, create_ds18b20, create_fc37, create_temt6000, create_bme280,
                                A_PRESSURE, A_PRESSURE_KPA, A_PRESSURE_MB, create_wind)


class SamplingModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.a_station = Station(id=1, lat=75.4, lng=46.2, name=A_STATION_NAME)
        cls.a_dht_sample = create_dht_sample()
        cls.a_ds18b20 = create_ds18b20()
        cls.a_fc37 = create_fc37()
        cls.a_wind = create_wind()
        cls.a_temt6000 = create_temt6000()
        cls.a_bme280 = create_bme280()

    """
    FORMAT
    """

    def test_format_station(self):
        """
        GIVEN a station
        WHEN the station is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = f'#1 ({A_STATION_NAME}): [75.4, 46.2]'

        format_actual = str(self.a_station)

        self.assertEqual(format_expected, format_actual)

    def test_format_dht(self):
        """
        WHEN the dht is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = ('#1.1 -\n'
                           f'\tTemperature: #1 - [{A_TEMPERATURE_C},{A_TEMPERATURE_F}]\n'
                           f'\tRH: {A_HUMIDITY}\n'
                           f'\tHI: #1 - [{A_HEAT_INDEX_C},{A_HEAT_INDEX_F}]\n'
                           f'\tDate: {self.a_dht_sample.date}')

        format_actual = str(self.a_dht_sample)

        self.assertEqual(format_expected, format_actual)

    def test_format_ds18b20(self):
        """
        WHEN the DS18B20 is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = (f'DS18B20 #1 -\n'
                           f'\tTemperature: #1 - [{A_TEMPERATURE_C},{A_TEMPERATURE_F}]\n'
                           f'\tDate: {self.a_ds18b20.date}')

        format_actual = str(self.a_ds18b20)

        self.assertEqual(format_expected, format_actual)

    def test_format_fc37(self):
        """
        WHEN the FC37 is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = (f'FC37 #1 -\n'
                           f'\tRain: N\n'
                           f'\tDate: {self.a_fc37.date}')

        format_actual = str(self.a_fc37)

        self.assertEqual(format_expected, format_actual)

    def test_format_temt6000(self):
        """
        WHEN the TEMT6000 is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = (f'TEMT6000 #1 -\n'
                           f'\tLux: {self.a_temt6000.lux}\n'
                           f'\tDate: {self.a_temt6000.date}')

        format_actual = str(self.a_temt6000)

        self.assertEqual(format_expected, format_actual)

    def test_format_bme280(self):
        """
        WHEN the BME280 is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = (f'#1 -\n'
                           f'\tTemperature: #1 - [{A_TEMPERATURE_C},{A_TEMPERATURE_F}]\n'
                           f'\tHumidity: {self.a_bme280.humidity}\n'
                           f'\tPressure: #1 - [{A_PRESSURE},{A_PRESSURE_KPA},{A_PRESSURE_MB}]\n'
                           f'\tDate: {self.a_bme280.date}')

        format_actual = str(self.a_bme280)

        self.assertEqual(format_expected, format_actual)

    def test_format_wind(self):
        """
        WHEN the Wind is converted to a string
        THEN the string is formatted correctly
        """
        format_expected = (f'#1 -\n'
                           f'\tm/s: {self.a_wind.ms}\n'
                           f'\tkm/h: {self.a_wind.kmph}\n'
                           f'\tmph: {self.a_wind.mph}')

        format_actual = str(self.a_wind)

        self.assertEqual(format_expected, format_actual)

    """
    FUNCTIONS
    """

    def test_get_sample_for_day(self):
        """
        GIVEN samples for five different days
        WHEN the sample for a given day are requested
        THEN return the expected sample
        """
        dates = [timezone.now() - timezone.timedelta(days=i) for i in range(5)]
        for date in dates:
            DHT.objects.create(station=self.a_dht_sample.station, humidity=A_HUMIDITY,
                               temperature=self.a_dht_sample.temperature,
                               heat_index=self.a_dht_sample.heat_index, date=date)

        samples_actual = get_samples_for_day(dates[2])

        num_sensors_expected = 8
        num_samples_expected = 1
        self.assertEqual(num_sensors_expected, len(samples_actual))
        for key in samples_actual['DHT']:
            self.assertEqual(num_samples_expected, len(samples_actual['DHT'][key]))

    def test_add_new_sample(self):
        """
        GIVEN a complete sample
        WHEN adding a new sample to the db
        THEN the every sensor has a new entry in the database
        """
        temperature = Temperature.objects.create(celsius=99.53, fahrenheit=99.43)
        pressure = Pressure.objects.create(pascal=100171, kilopascal=100.2, mbar=1002)
        heat_index = HeatIndex.objects.create(celsius=100.3, fahrenheit=110.7)
        dht = DHT_Dto(station_id=self.a_station.pk, humidity=A_HUMIDITY, t_c=temperature.celsius,
                      t_f=temperature.fahrenheit, hi_c=heat_index.celsius, hi_f=heat_index.fahrenheit)
        ds18b20 = DS18B20_Dto(t_c=temperature.celsius, t_f=temperature.fahrenheit)
        fc37 = FC37_Dto(rain='N')
        temt6000 = TEMT6000_Dto(lux=333)
        bme280 = BME280_Dto(t_c=temperature.celsius, t_f=temperature.fahrenheit,
                            humidity=A_HUMIDITY, pa=pressure.pascal,
                            kpa=pressure.kilopascal, mb=pressure.mbar)
        wind = Wind_Dto(ms=20.54, kmph=88.25, mph=66.22)
        averages = Averages_Dto(t_c=44.25, t_f=110.5)
        date = timezone.now()
        a_sample = Sample(dht, ds18b20, fc37, temt6000, bme280, wind, averages, date)

        add_new_sample(a_sample)

        temperature = find_temperature(Temperature, temperature.celsius, temperature.fahrenheit)
        heat_index = find_temperature(HeatIndex, heat_index.celsius, heat_index.fahrenheit)
        pressure = find_pressure(pressure.pascal, pressure.kilopascal, pressure.mbar)

        self.assertEqual(DHT.objects.last(), DHT.objects.create(station=self.a_station, temperature=temperature,
                                                                heat_index=heat_index,
                                                                humidity=a_sample.dht.humidity, date=date))
        self.assertEqual(DS18B20.objects.last(), DS18B20.objects.create(temperature=temperature, date=date))
        object = FC37.objects.create(rain="N", date=date)
        self.assertGreater(SequenceMatcher(None, str(FC37.objects.last()), str(object)).ratio(), 0.90)
        self.assertEqual(TEMT6000.objects.last(), TEMT6000.objects.create(lux=333, date=date))
        object = BME280.objects.create(temperature=temperature, humidity=77.25, pressure=pressure, date=date)
        self.assertGreater(SequenceMatcher(None, str(BME280.objects.last()), str(object)).ratio(), 0.90)
        object = Wind.objects.create(ms=20.54, kmph=88.25, mph=66.22, date=date)
        self.assertGreater(SequenceMatcher(None, str(Wind.objects.last()), str(object)).ratio(), 0.90)
