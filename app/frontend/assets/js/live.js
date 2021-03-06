import LiveChart_T from './charts/LiveChart_T'
import LiveChart_HI_Light from './charts/LiveChart_HI_Light'
import LiveChart_HI_P from './charts/LiveChart_HI_P'
import LiveChart_HI_Rain from './charts/LiveChart_HI_Rain'
import LiveChart_HI_RH from './charts/LiveChart_HI_RH'
import LiveChart_HI from './charts/LiveChart_HI'
import LiveChart_Light_RH from './charts/LiveChart_Light_RH'
import LiveChart_Light from './charts/LiveChart_Light'
import LiveChart_P_Light from './charts/LiveChart_P_Light'
import LiveChart_P_Rain from './charts/LiveChart_P_Rain'
import LiveChart_P_RH from './charts/LiveChart_P_RH'
import LiveChart_P from './charts/LiveChart_P'
import LiveChart_Rain_Light from './charts/LiveChart_Rain_Light'
import LiveChart_Rain_RH from './charts/LiveChart_Rain_RH'
import LiveChart_Rain from './charts/LiveChart_Rain'
import LiveChart_RH from './charts/LiveChart_RH'
import LiveChart_T_HI from './charts/LiveChart_T_HI'
import LiveChart_T_Light from './charts/LiveChart_T_Light'
import LiveChart_T_P from './charts/LiveChart_T_P'
import LiveChart_T_Rain from './charts/LiveChart_T_Rain'
import LiveChart_T_RH from './charts/LiveChart_T_RH'
import LiveChart_W from './charts/LiveChart_W'
import { PressureUnitsEnum, WindUnitsEnum } from './main'


class LiveCharts {
    constructor(data, liveTiles) {
        this.charts = {
            'T': [
                new LiveChart_T('live-chart-temperature', data.dates, data.Averages.T_C),
                new LiveChart_T('live-chart-temperature-mobile', data.dates, data.Averages.T_C)
            ],
            'HI': [
                new LiveChart_HI('live-chart-heat-index', data.dates, data.DHT.HI_C),
                new LiveChart_HI('live-chart-heat-index-mobile', data.dates, data.DHT.HI_C)
            ],
            'RH': [
                new LiveChart_RH('live-chart-humidity', data.dates, data.DHT.RH),
                new LiveChart_RH('live-chart-humidity-mobile', data.dates, data.DHT.RH)
            ],
            'Rain': [
                new LiveChart_Rain('live-chart-rain', data.dates, data.FC37.Rain),
                new LiveChart_Rain('live-chart-rain-mobile', data.dates, data.FC37.Rain)
            ],
            'Light': [
                new LiveChart_Light('live-chart-light', data.dates, data.TEMT6000.Light),
                new LiveChart_Light('live-chart-light-mobile', data.dates, data.TEMT6000.Light)
            ],
            'P': [
                new LiveChart_P('live-chart-pressure', data.dates, data.BME280.P),
                new LiveChart_P('live-chart-pressure-mobile', data.dates, data.BME280.P)
            ],
            'T_HI': [
                new LiveChart_T_HI('live-chart-temperature-heat-index', data.dates, data.Averages.T_C, data.DHT.HI_C),
                new LiveChart_T_HI('live-chart-temperature-heat-index-mobile', data.dates, data.Averages.T_C, data.DHT.HI_C)
            ],
            'T_RH': [
                new LiveChart_T_RH('live-chart-temperature-humidity', data.dates, data.Averages.T_C, data.DHT.RH),
                new LiveChart_T_RH('live-chart-temperature-humidity-mobile', data.dates, data.Averages.T_C, data.DHT.RH)
            ],
            'T_Rain': [
                new LiveChart_T_Rain('live-chart-temperature-rain', data.dates, data.Averages.T_C, data.FC37.Rain),
                new LiveChart_T_Rain('live-chart-temperature-rain-mobile', data.dates, data.Averages.T_C, data.FC37.Rain)
            ],
            'T_Light': [
                new LiveChart_T_Light('live-chart-temperature-light', data.dates, data.Averages.T_C, data.TEMT6000.Light),
                new LiveChart_T_Light('live-chart-temperature-light-mobile', data.dates, data.Averages.T_C, data.TEMT6000.Light)
            ],
            'T_P': [
                new LiveChart_T_P('live-chart-temperature-pressure', data.dates, data.Averages.T_C, data.BME280.P),
                new LiveChart_T_P('live-chart-temperature-pressure-mobile', data.dates, data.Averages.T_C, data.BME280.P)
            ],
            'HI_RH': [
                new LiveChart_HI_RH('live-chart-heat-index-humidity', data.dates, data.DHT.HI_C, data.DHT.RH),
                new LiveChart_HI_RH('live-chart-heat-index-humidity-mobile', data.dates, data.DHT.HI_C, data.DHT.RH)
            ],
            'HI_Rain': [
                new LiveChart_HI_Rain('live-chart-heat-index-rain', data.dates, data.DHT.HI_C, data.FC37.Rain),
                new LiveChart_HI_Rain('live-chart-heat-index-rain-mobile', data.dates, data.DHT.HI_C, data.FC37.Rain)
            ],
            'HI_Light': [
                new LiveChart_HI_Light('live-chart-heat-index-light', data.dates, data.DHT.HI_C, data.TEMT6000.Light),
                new LiveChart_HI_Light('live-chart-heat-index-light-mobile', data.dates, data.DHT.HI_C, data.TEMT6000.Light)
            ],
            'HI_P': [
                new LiveChart_HI_P('live-chart-heat-index-pressure', data.dates, data.DHT.HI_C, data.BME280.P),
                new LiveChart_HI_P('live-chart-heat-index-pressure-mobile', data.dates, data.DHT.HI_C, data.BME280.P)
            ],
            'Rain_RH': [
                new LiveChart_Rain_RH('live-chart-rain-humidity', data.dates, data.FC37.Rain, data.DHT.RH),
                new LiveChart_Rain_RH('live-chart-rain-humidity-mobile', data.dates, data.FC37.Rain, data.DHT.RH)
            ],
            'Rain_Light': [
                new LiveChart_Rain_Light('live-chart-rain-light', data.dates, data.FC37.Rain, data.TEMT6000.Light),
                new LiveChart_Rain_Light('live-chart-rain-light-mobile', data.dates, data.FC37.Rain, data.TEMT6000.Light)
            ],
            'Light_RH': [
                new LiveChart_Light_RH('live-chart-light-humidity', data.dates, data.TEMT6000.Light, data.DHT.RH),
                new LiveChart_Light_RH('live-chart-light-humidity-mobile', data.dates, data.TEMT6000.Light, data.DHT.RH)
            ],
            'P_RH': [
                new LiveChart_P_RH('live-chart-pressure-humidity', data.dates, data.BME280.P, data.DHT.RH),
                new LiveChart_P_RH('live-chart-pressure-humidity-mobile', data.dates, data.BME280.P, data.DHT.RH)
            ],
            'P_Rain': [
                new LiveChart_P_Rain('live-chart-pressure-rain', data.dates, data.BME280.P, data.FC37.Rain),
                new LiveChart_P_Rain('live-chart-pressure-rain-mobile', data.dates, data.BME280.P, data.FC37.Rain)
            ],
            'P_Light': [
                new LiveChart_P_Light('live-chart-pressure-light', data.dates, data.BME280.P, data.TEMT6000.Light),
                new LiveChart_P_Light('live-chart-pressure-light-mobile', data.dates, data.BME280.P, data.TEMT6000.Light)
            ],
            'W': [
                new LiveChart_W('live-chart-wind', data.dates, data.Wind.ms),
                new LiveChart_W('live-chart-wind-mobile', data.dates, data.Wind.ms)
            ],
        };

        this.data = data;
        this.liveTiles = liveTiles;
        this.sample = null;
        this.isCelsius = true;
        this.pressureUnit = PressureUnitsEnum.pascal;
        this.windUnit = WindUnitsEnum.ms;
        this.dates = data['dates'];

        this.temperatureSelectContainer = document.getElementById('live-sensors-temperature');
        this.humiditySelectContainer = document.getElementById('live-sensors-humidity');

        this.currentChart = this.charts['T'];
        this.chartLookupTable = {
            'temperature': this.charts['T'],
            'heat-index': this.charts['HI'],
            'humidity': this.charts['RH'],
            'wind': this.charts['W'],
            'rain': this.charts['Rain'],
            'light': this.charts['Light'],
            'pressure': this.charts['P'],
            'temperature-heat-index': this.charts['T_HI'],
            'temperature-humidity': this.charts['T_RH'],
            'temperature-rain': this.charts['T_Rain'],
            'temperature-light': this.charts['T_Light'],
            'temperature-pressure': this.charts['T_P'],
            'heat-index-humidity': this.charts['HI_RH'],
            'heat-index-rain': this.charts['HI_Rain'],
            'heat-index-light': this.charts['HI_Light'],
            'heat-index-pressure': this.charts['HI_P'],
            'rain-humidity': this.charts['Rain_RH'],
            'rain-light': this.charts['Rain_Light'],
            'light-humidity': this.charts['Light_RH'],
            'pressure-humidity': this.charts['P_RH'],
            'pressure-rain': this.charts['P_Rain'],
            'pressure-light': this.charts['P_Light']
        };
    }

    create() {
        Object.keys(this.charts).forEach(k => this.charts[k].forEach(x => x.create()));
    }

    changeChart(chart, zoomButtons) {
        this.currentChart = this.chartLookupTable[chart];

        Object.keys(this.charts).forEach(k => {
            zoomButtons.forEach(x => x.textContent = 'Zoom');
            this.charts[k].forEach(x => x.unzoom());
            this.charts[k].forEach(x => x.hide());
        });

        this.currentChart.forEach(x => x.show());
        this.toggleSensorSelect(chart);
    }

    toggleSensorSelect(chart) {
        const isTemperature = chart.includes('temperature');
        const isHumidity = chart.includes('humidity');

        if (isTemperature && isHumidity) {
            this.temperatureSelectContainer.classList.remove('hide');
            this.humiditySelectContainer.classList.remove('hide');
        } else if (isTemperature) {
            this.temperatureSelectContainer.classList.remove('hide');
            this.humiditySelectContainer.classList.add('hide');
        } else if (isHumidity) {
            this.temperatureSelectContainer.classList.add('hide');
            this.humiditySelectContainer.classList.remove('hide');
        } else {
            this.temperatureSelectContainer.classList.add('hide');
            this.humiditySelectContainer.classList.add('hide');
        }
    }

    changeSensorT(sensor) {
        const charts = ['T', 'HI', 'T_RH', 'T_Rain', 'T_Light', 'T_P', 'T_HI'];

        if (sensor.includes('dht22')) {
            const temperatures = this.isCelsius ? this.data.DHT.T_C : this.data.DHT.T_F;
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(temperatures)));
        } else if (sensor.includes('ds18b20')) {
            const temperatures = this.isCelsius ? this.data.DS18B20.T_C : this.data.DS18B20.T_F;
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(temperatures)));
        } else if (sensor.includes('bme280')) {
            const temperatures = this.isCelsius ? this.data.BME280.T_C : this.data.BME280.T_F;
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(temperatures)));
            this.charts['T_HI'].forEach(x => x.changeDataset(temperatures));
        } else {
            const temperatures = this.isCelsius ? this.data.Averages.T_C : this.data.Averages.T_F;
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(temperatures)));
        }
    }

    changeSensorRH(sensor) {
        const charts = ['Rain_RH', 'Light_RH', 'P_RH', 'T_HI', 'T_RH', 'HI_RH'];

        if (sensor.includes('dht')) {
            this.charts['RH'].forEach(x => x.changeDataset(this.data.DHT.RH));
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(null, this.data.DHT.RH)));
        } else if (sensor.includes('bme')) {
            this.charts['RH'].forEach(x => x.changeDataset(this.data.BME280.RH));
            charts.forEach(chart => this.charts[chart].forEach(x => x.changeDataset(null, this.data.BME280.RH)));
        }
    }

    updateGraph(sample) {
        this.sample = sample;
        const date_ = new Date(sample['date']);

        const vals = {
            'T': this.__getTemperatureSensorSample(sample),
            'HI': sample.DHT[this.isCelsius ? 'HI_C' : 'HI_F'],
            'RH': this.__getHumiditySensorSample(sample),
            'rain': sample.FC37.rain,
            'light': sample.TEMT6000.lux,
            'P': this.__getPressureSensorSample(sample),
            'wind': this.__getWindSample(sample)
        };

        this.charts['T'].forEach(x => x.addDataPoint(date_, vals.T));
        this.charts['HI'].forEach(x => x.addDataPoint(date_, vals.HI));
        this.charts['RH'].forEach(x => x.addDataPoint(date_, vals.RH));
        this.charts['W'].forEach(x => x.addDataPoint(date_, vals.wind));
        this.charts['Rain'].forEach(x => x.addDataPoint(date_, vals.rain));
        this.charts['Light'].forEach(x => x.addDataPoint(date_, vals.light));
        this.charts['P'].forEach(x => x.addDataPoint(date_, vals.P));
        this.charts['T_HI'].forEach(x => x.addDataPoint(date_, vals.T, vals.HI));
        this.charts['T_RH'].forEach(x => x.addDataPoint(date_, vals.T, vals.RH));
        this.charts['T_Rain'].forEach(x => x.addDataPoint(date_, vals.T, vals.rain));
        this.charts['T_Light'].forEach(x => x.addDataPoint(date_, vals.T, vals.light));
        this.charts['T_P'].forEach(x => x.addDataPoint(date_, vals.T, vals.P));
        this.charts['HI_RH'].forEach(x => x.addDataPoint(date_, vals.HI, vals.RH));
        this.charts['HI_Rain'].forEach(x => x.addDataPoint(date_, vals.heat, vals.rain));
        this.charts['HI_Light'].forEach(x => x.addDataPoint(date_, vals.heat, vals.light));
        this.charts['HI_P'].forEach(x => x.addDataPoint(date_, vals.heat, vals.P));
        this.charts['Rain_RH'].forEach(x => x.addDataPoint(date_, vals.rain, vals.RH));
        this.charts['Rain_Light'].forEach(x => x.addDataPoint(date_, vals.rain, vals.light));
        this.charts['Light_RH'].forEach(x => x.addDataPoint(date_, vals.light, vals.RH));
        this.charts['P_RH'].forEach(x => x.addDataPoint(date_, vals.P, vals.RH));
        this.charts['P_Rain'].forEach(x => x.addDataPoint(date_, vals.P, vals.rain));
        this.charts['P_Light'].forEach(x => x.addDataPoint(date_, vals.P, vals.light));

        this.dates.push(date_);
        this.data.DHT.T_C.push(sample.DHT.T_C);
        this.data.DHT.T_F.push(sample.DHT.T_F);
        this.data.DHT.RH.push(sample.DHT.RH);
        this.data.DHT.HI_C.push(sample.DHT.HI_C);
        this.data.DHT.HI_F.push(sample.DHT.HI_F);
        this.data.FC37.Rain.push(sample.FC37.rain);
        this.data.TEMT6000.Light.push(sample.TEMT6000.lux);
        this.data.DS18B20.T_C.push(sample.DS18B20[0].T_C);
        this.data.DS18B20.T_F.push(sample.DS18B20[0].T_F);
        this.data.BME280.T_C.push(sample.BME280.T_C);
        this.data.BME280.T_F.push(sample.BME280.T_F);
        this.data.BME280.RH.push(sample.BME280.RH);
        this.data.BME280.P.push(sample.BME280.P);
        this.data.BME280.P_kPa.push(sample.BME280.P_kPa);
        this.data.BME280.P_mb.push(sample.BME280.P_mb);
        this.data.Averages.T_C.push(sample.T.C);
        this.data.Averages.T_F.push(sample.T.F);
    }

    __getTemperatureSensorSample(sample) {
        const key_T = this.isCelsius ? 'T_C' : 'T_F';
        const sensor = document.getElementById('live-sensors-temperature').firstElementChild.value;

        if (sensor.includes('average'))
            return sample.T[this.isCelsius ? 'C' : 'F'];
        else if (sensor.includes('dht22'))
            return sample.DHT[key_T];
        else if (sensor.includes('ds18b20'))
            return sample.DS18B20[0][key_T]
        return sample.BME280[key_T];
    }

    __getHumiditySensorSample(sample) {
        const sensor = document.getElementById('live-sensors-humidity').firstElementChild.value;
        if (sensor.includes('dht22'))
            return sample.DHT.RH;
        return sample.BME280.RH;
    }

    __getPressureSensorSample(sample) {
        if (this.pressureUnit === PressureUnitsEnum.pascal)
            return sample.BME280.P;
        else if (this.pressureUnit === PressureUnitsEnum.kilopascal)
            return sample.BME280.P_kPa;
        return sample.BME280.P_mb;
    }

    __getWindSample(sample) {
        if (this.windUnit === WindUnitsEnum.ms)
            return sample.Wind.ms;
        else if (this.windUnit === WindUnitsEnum.kmph)
            return sample.Wind.kmph;
        return sample.Wind.mph;
    }

    updateLive(new_sample) {
        this.sample = new_sample;
        this.updateLiveTemperature();
        this.liveTiles['RH'].forEach(x => x.textContent = `${this.sample.DHT.RH}%`);
        this.liveTiles['Light'].forEach(x => x.textContent = `${this.sample.TEMT6000.lux}`);
        this.liveTiles['Rain'].forEach(x => x.textContent = `${this.labelRain(this.sample.FC37.rain)}`);
        this.updateLiveWind();
        this.updateLivePressure();

    }

    labelRain(char) {
        if (char.localeCompare('N') === 0)
            return 'None';
        else if (char.localeCompare('L') === 0)
            return 'Light';
        else if (char.localeCompare('M') === 0)
            return 'Moderate';
        else if (char.localeCompare('H') === 0)
            return 'Heavy';
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    updateLiveTemperature() {
        if (this.isCelsius) {
            this.liveTiles['T'].forEach(x => x.textContent = `${this.sample.T.C}°C`);
            this.liveTiles['HI'].forEach(x => x.textContent = `${this.sample.DHT.HI_C}°C`);
        } else {
            this.liveTiles['T'].forEach(x => x.textContent = `${this.sample.T.F}°F`);
            this.liveTiles['HI'].forEach(x => x.textContent = `${this.sample.DHT.HI_F}°F`);
        }
    }

    updateLivePressure() {
        if (this.pressureUnit === PressureUnitsEnum.pascal)
            this.liveTiles['P'].forEach(x => x.textContent = `${this.numberWithCommas(this.sample.BME280.P.toFixed(0))}` + ' Pa');
        else if (this.pressureUnit === PressureUnitsEnum.kilopascal)
            this.liveTiles['P'].forEach(x => x.textContent = `${this.sample.BME280.P_kPa}` + ' kPa');
        else
            this.liveTiles['P'].forEach(x => x.textContent = `${this.sample.BME280.P_mb}` + ' mbar');
    }

    updateLiveWind() {
        if (this.windUnit === WindUnitsEnum.ms)
            this.liveTiles['Wind'].forEach(x => x.textContent = `${this.numberWithCommas(this.sample.Wind.ms)}` + ' m/s');
        else if (this.windUnit === WindUnitsEnum.kmph)
            this.liveTiles['Wind'].forEach(x => x.textContent = `${this.sample.Wind.kmph}` + ' km/h');
        else
            this.liveTiles['Wind'].forEach(x => x.textContent = `${this.sample.Wind.mph}` + ' mph');
    }

    updateTemperatureUnit(isCelsius) {
        this.isCelsius = isCelsius;

        if (this.sample)
            this.updateLiveTemperature();

        const chartsT = ['T', 'T_RH', 'T_Rain', 'T_Light', 'T_P'];
        const samples = isCelsius ? this.data.Averages.T_C : this.data.Averages.T_F;
        chartsT.forEach(chart => this.charts[chart].forEach(x => x.changeTemperatureUnit(samples, 'Temperature ', isCelsius)));

        const chartsHI = ['HI', 'HI_RH', 'HI_Rain', 'HI_Light', 'HI_P']
        const heatIndexSamples = isCelsius ? this.data.DHT.HI_C : this.data.DHT.HI_F;
        chartsHI.forEach(chart => this.charts[chart].forEach(x => x.changeTemperatureUnit(heatIndexSamples, 'Heat Index ', isCelsius)));
        this.charts['T_HI'].forEach(x => x.changeTemperatureUnit(samples, heatIndexSamples, isCelsius));
    }

    updatePressureUnit(unit) {
        this.pressureUnit = PressureUnitsEnum[unit];

        if (this.sample)
            this.updateLivePressure();

        let samples;
        let newlabel = 'Pressure ';
        if (this.pressureUnit === PressureUnitsEnum.pascal) {
            samples = this.data.BME280.P;
            newlabel += '(Pa)';
        } else if (this.pressureUnit === PressureUnitsEnum.kilopascal) {
            samples = this.data.BME280.P_kPa;
            newlabel += '(kPa)';
        } else {
            samples = this.data.BME280.P_mb;
            newlabel += '(mbar)';
        }

        const charts1 = ['P', 'P_RH', 'P_Light', 'P_Rain'];
        charts1.forEach(chart => this.charts[chart].forEach(x => x.changePressureUnit(samples, true, newlabel)));

        const charts2 = ['T_P', 'HI_P'];
        charts2.forEach(chart => this.charts[chart].forEach(x => x.changePressureUnit(samples, false, newlabel)));
    }

    updateWindUnit(unit) {
        this.windUnit = WindUnitsEnum[unit];

        if (this.sample)
            this.updateLiveWind();

        let samples;
        let newlabel = 'Wind Speed ';

        if (this.windUnit === WindUnitsEnum.ms) {
            samples = this.data.Wind.ms;
            newlabel += '(m/s)';
        } else if (this.windUnit === WindUnitsEnum.kmph) {
            samples = this.data.Wind.kmph;
            newlabel += '(km/h)';
        } else {
            samples = this.data.Wind.mph;
            newlabel += '(mph)';
        }

        const charts1 = ['W'];
        charts1.forEach(chart => this.charts[chart].forEach(x => x.changeWindUnit(samples, true, newlabel)));
    }

    zoomChart(zoomButton) {
        if (zoomButton.textContent.localeCompare('Zoom') == 0) {
            zoomButton.textContent = 'Unzoom';
            this.currentChart.forEach(x => x.zoom());
        } else {
            zoomButton.textContent = 'Zoom';
            this.currentChart.forEach(x => x.unzoom());
        }
    }
}

export default LiveCharts;
