import LiveChart from './LiveChart'
const merge = require('deepmerge')


class LiveChart_Rain_RH extends LiveChart {
  constructor(liveChartID, xvals, yvals1, yvals2) {
    super(liveChartID, yvals1, yvals2)
    this.__config = merge(super.__baseConfig(), this.__init_config(xvals, yvals1, yvals2));
  }

  __init_config(xvals, yvals1, yvals2) {
    return {
      type: 'bar',
      data: {
        labels: xvals,
        datasets: [{
          yAxisID: 'Rain',
          label: 'Rain',
          data: yvals1,
          backgroundColor: 'rgba(30, 144, 255, 0.3)',
          borderColor: '#1e90ff',
          pointBackgroundColor: '#d1ccc0',
          order: 1
        },
        {
          type: 'line',
          yAxisID: 'Humidity',
          label: 'Humidity',
          data: yvals2,
          backgroundColor: 'rgba(52, 172, 224, 0.1)',
          borderColor: '#34ace0',
          pointBackgroundColor: '#d1ccc0'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: 'Rain',
            scaleLabel: {
              display: true,
              labelString: 'Rain Intensity',
              lineHeight: 2,
              fontSize: 17,
              fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              min: 0,
              max: 10,
              fontColor: 'rgba(255, 255, 255, 0.7)',
              callback: (value) => super.labelRain(value),
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.25)',
              lineWidth: 0.75
            },
            position: 'left'
          },
          {
           id: 'Humidity',
            scaleLabel: {
              display: true,
              labelString: 'Humidity (%)',
              lineHeight: 2,
              fontSize: 18,
              fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.7)',
              suggestedMin: 0,
              suggestedMax: 100
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.25)',
              zeroLineColor: 'rgba(255, 255, 255, 0.25)',
              lineWidth: 0.75
            },
            position: 'right'
          }]
        }
      }
    }
  }

  addDataPoint(time, y1, y2) {
    super.addDataPoint(time, super.rainToNumber(y1), y2);
  }

  zoom() {
    super.zoom(true);
  }

  unzoom() {
    super.unzoom(0, 4, true, 0, 100);
  }
}

export default LiveChart_Rain_RH
