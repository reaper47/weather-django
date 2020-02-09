import LiveChart from './LiveChart'
const merge = require('deepmerge')


class LiveChart_T extends LiveChart {
  constructor(liveChartID, xvals, yvals) {
    super(liveChartID)
    this.__config = merge(super.__baseConfig(), this.__init_config(xvals, yvals));
  }

  __init_config(xvals, yvals) {
    return {
      type: 'line',
      data: {
        labels: xvals,
        datasets: [{
          yAxisID: 'Temperature',
          label: 'Temperature',
          data: yvals,
          fill: true,
          backgroundColor: 'rgba(51, 217, 178,0.1)',
          borderColor: '#218c74',
          pointBackgroundColor: '#d1ccc0'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: 'Temperature',
            scaleLabel: {
              display: true,
              labelString: 'Temperature (°C)',
              lineHeight: 2,
              fontSize: 17,
              fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.7)',
              suggestedMin: 0,
              suggestedMax: this.suggestedMaxT
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.25)',
              lineWidth: 0.75
            },
            position: 'left'
          }]
        }
      }
    }
  }

  unzoom() {
    super.unzoom(0, this.suggestedMaxT);
  }
}

export default LiveChart_T;
