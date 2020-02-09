import LiveChart from './LiveChart'
const merge = require('deepmerge')


class LiveChart_P_Rain extends LiveChart {
  constructor(liveChartID, xvals, yvals1, yvals2) {
    super(liveChartID, yvals1, yvals2);
    this.__config = merge(super.__baseConfig(), this.__init_config(xvals, yvals1, yvals2));
  }

  __init_config(xvals, yvals1, yvals2) {
    return {
      type: 'bar',
      data: {
        labels: xvals,
        datasets: [{
          type: 'line',
          yAxisID: 'Pressure',
          label: 'Pressure',
          data: yvals1,
          backgroundColor: 'rgba(200, 214, 229, 0.1)',
          borderColor: '#c8d6e5',
          pointBackgroundColor: '#d1ccc0',
          order: 1
        },
        {
          yAxisID: 'Rain',
          label: 'Rain',
          data: yvals2,
          backgroundColor: 'rgba(30, 144, 255, 0.3)',
          borderColor: '#1e90ff',
          pointBackgroundColor: '#d1ccc0',
          order: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: 'Pressure',
            scaleLabel: {
              display: true,
              labelString: 'Pressure (Pa)',
              lineHeight: 2,
              fontSize: 17,
              fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.7)',
              suggestedMin: 96000,
              suggestedMax: 106000,
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.25)',
              lineWidth: 0.75
            },
            position: 'left'
          },
          {
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
    super.addDataPoint(time, y1, super.rainToNumber(y2));
  }

  zoom() {
    super.zoom(true);
  }

  unzoom() {
    if (this.__config.options.scales.yAxes[0].scaleLabel.labelString.includes('mbar'))
      super.unzoom(960, 1060, true, 0, 4);
    else if (this.__config.options.scales.yAxes[0].scaleLabel.labelString.includes('kPa'))
      super.unzoom(96, 106, true, 0, 4);
    else
      super.unzoom(96000, 106000, true, 0, 4);
  }
}

export default LiveChart_P_Rain
