require('./all_css')
import { Main } from './main'
import LiveCharts from './live.js'
var Chart = require('chart.js');
require('./charts/chart_globals')

var main = new Main();

export { LiveCharts, main, Chart }
