import initModals from './modals'

const PressureUnitsEnum = Object.freeze({ 'pascal': 0, 'kilopascal': 1, 'mbar': 2 });
const WindUnitsEnum = Object.freeze({ 'ms': 0, 'kmph': 1, 'mph': 2 });


class Main {
    constructor() {
        this.__activateBurgers();

        this.liveJson = 'liveTiles';
        this.unitsJson = 'units';
        this.liveCharts = null;

        initModals();
    }

    __activateBurgers() {
        const burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        burgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = document.getElementById(el.dataset.target);
                el.classList.toggle('is-active');
                target.classList.toggle('is-active');
            });
        });
    }

    initLive(samples) {
        samples['dates'] = samples['dates'].map(x => new Date(x));

        const liveTiles = {
            'T': document.getElementById('live-temperature'),
            'HI': document.getElementById('live-heat-index'),
            'RH': document.getElementById('live-humidity'),
            'Light': document.getElementById('live-lux'),
            'Rain': document.getElementById('live-rain'),
            'P': document.getElementById('live-pressure'),
            'Wind': document.getElementById('live-wind')
        }

        this.liveCharts = new LiveCharts(samples, liveTiles);
        this.liveCharts.create();

        // Event listeners
        this.liveContainer = document.getElementById('live-container');
        this.liveFullScreenInput = document.getElementById('live-fullscreen');

        const liveSensorsTemperatureSelect = document.getElementById('live-sensors-temperature').firstElementChild;
        liveSensorsTemperatureSelect.addEventListener('change', opt => this.liveCharts.changeSensorT(opt.target.value));

        const liveSensorsHumiditySelect = document.getElementById('live-sensors-humidity').firstElementChild;
        liveSensorsTemperatureSelect.selectedIndex = 0;
        liveSensorsHumiditySelect.addEventListener('change', opt => this.liveCharts.changeSensorRH(opt.target.value));

        const liveZoomButton = document.getElementById('live-zoom-button');
        liveSensorsHumiditySelect.selectedIndex = 0;
        liveZoomButton.addEventListener('mousedown', click => this.liveCharts.zoomChart(click.target));

        this.liveChartSelect = document.getElementById('live-chart-select');
        this.liveChartSelect.addEventListener('change', opt => {
            this.liveCharts.changeChart(opt.target.value, liveZoomButton);
            this.saveSelectedLiveGraph();
        });
        this.liveFullScreenInput.addEventListener('change', () => this.liveFullScreen());

        this.liveGraphKeysListener();
        () => this.refreshAtMidnightTimer();

        // Select last live graph
        let index = this.getCookie('liveGraphSelected').split('=')[1];
        this.liveChartSelect.selectedIndex = index === Number.MIN_VALUE ? 0 : index;
        this.liveCharts.changeChart(this.liveChartSelect.value, liveZoomButton)

        // Load Settings
        this.loadLiveSettings();
    }

    liveGraphKeysListener() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyF') {
                this.liveFullScreen();
                this.liveFullScreenInput.checked = 1 - this.liveFullScreenInput.checked;
            }
        });
    }

    liveFullScreen() {
        document.getElementsByTagName('nav')[0].classList.toggle('hide');
        document.getElementById('live-tile').classList.toggle('height102');
        document.getElementsByTagName('canvas')[0].classList.toggle('height100');
        this.liveContainer.classList.toggle('fullscreen');
    }

    loadLiveSettings() {
        const liveTiles = ['temperature', 'heat-index', 'humidity', 'lux', 'rain', 'pressure', 'wind'];

        if (window.localStorage.getItem(this.liveJson)) {
            this.updateLiveSettings(liveTiles);
            this.updateLiveTiles(liveTiles);
        }

        this.updateUnits();
        document.getElementById('save-live-settings').addEventListener('mousedown', () => this.saveLiveSettings(liveTiles));
        document.getElementById('cancel-live-settings').addEventListener('click', () => this.updateLiveSettings(liveTiles));
    }

    saveLiveSettings(tiles) {
        const radios = tiles.map(el => document.getElementById(`display-${el}`));
        let json = {};
        tiles.forEach((el, i) => json[el] = radios[i].checked);
        window.localStorage.setItem(this.liveJson, JSON.stringify(json));
        this.updateLiveTiles(tiles);

        json = {};
        json['P'] = document.getElementById('pressure-unit').value;
        json['isCelsius'] = document.getElementById('temperature-unit').value.includes('celsius');
        json['wind'] = document.getElementById('wind-unit').value;
        window.localStorage.setItem(this.unitsJson, JSON.stringify(json));
        this.updateUnits();
    }

    updateUnits() {
        const json = JSON.parse(window.localStorage.getItem(this.unitsJson));
        const temperatureUnit = document.getElementById('temperature-unit');
        const pressureUnit = document.getElementById('pressure-unit');
        const windUnit = document.getElementById('wind-unit');

        if (json) {
            temperatureUnit.selectedIndex = json['isCelsius'] ? 0 : 1;
            pressureUnit.selectedIndex = PressureUnitsEnum[json['P']];
            windUnit.selectedIndex = WindUnitsEnum[json['wind']];
            this.liveCharts.updateTemperatureUnit(json['isCelsius']);
            this.liveCharts.updatePressureUnit(pressureUnit.value);
            this.liveCharts.updateWindUnit(windUnit.value);
        } else {
            temperatureUnit.selectedIndex = 0;
            pressureUnit.selectedIndex = 0;
            windUnit.selectedIndex = 0;
        }
    }

    updateLiveTiles(tiles) {
        const json = JSON.parse(window.localStorage.getItem(this.liveJson));
        const containers = tiles.map(el => document.getElementById(`live-container-${el}`));

        for (let key in json) {
            const i = tiles.indexOf(key);
            if (json[key])
                containers[i].classList.remove('hide');
            else
                containers[i].classList.add('hide');
        }

        // Adjust Graph
        const liveTile = document.getElementById('live-tile')
        const liveGraph = document.getElementById('live-graph');
        const charts = Array.from(liveGraph.children[0].children);

        let areTilesPresent = false;
        for (let key in json) {
            if (json[key]) {
                areTilesPresent = true;
                break;
            }
        }

        if (!areTilesPresent) {
            liveTile.classList.add('hide');
            liveGraph.classList.remove('is-10');
            liveGraph.classList.add('is-full');
            charts.forEach(el => el.style.width = '100%');
        } else {
            liveTile.classList.remove('hide');
            liveGraph.classList.add('is-10');
            liveGraph.classList.remove('is-full');
            charts.forEach(el => el.style.width = null);
        }
    }

    updateLiveSettings(tiles) {
        const json = JSON.parse(window.localStorage.getItem(this.liveJson));
        const radios = tiles.map(el => document.getElementById(`display-${el}`));

        for (let key in json) {
            const i = tiles.indexOf(key);
            radios[i].checked = json[key];
        }
    }

    saveSelectedLiveGraph() {
        this.createCookie('liveGraphSelected', this.liveChartSelect.selectedIndex, 0);
    }

    refreshAtMidnightTimer() {
        (function loop() {
            const now = new Date();
            const date = now.getDate();

            const refreshDay = this.getCookie('liveRefresh');
            if (refreshDay !== Number.MIN_VALUE) {
                if (Number(refreshDay) === date - 1) {
                    this.createCookie('liveRefresh', date, 1);
                    location.reload();
                }
            } else {
                this.createCookie('liveRefresh', date, 1);
            }

            const delay = 450000 - (now % 450000);
            setTimeout(loop, delay);
        })();
    }

    createCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*3600*1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    getCookie(name) {
        if (document.cookie.length > 0) {
            const cookies = document.cookie.split(';').map(x => x.trim())
            return cookies.find(x => x.split('=')[0] === name);
        }
        return Number.MIN_VALUE;
    }
}

export { PressureUnitsEnum, WindUnitsEnum, Main };
