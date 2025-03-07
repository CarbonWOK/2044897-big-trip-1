import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SmartComponent } from './smart-view.js';
import {
  countPricesByType,
  countTypes,
  countTimeSpend,
  countTimeSpendInMs,
  TYPES,
} from '../utils';

const renderMoneyChart = (moneyCtx, points) => {
  const tripsPrices = Object.values(countPricesByType(points, TYPES));
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: TYPES,
      datasets: [
        {
          data: tripsPrices,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (tripPrice) => `€ ${tripPrice}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 80,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const types = Object.values(countTypes(points, TYPES));
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: TYPES,
      datasets: [
        {
          data: types,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (type) => `${type}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 80,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const timeSpendInMs = countTimeSpendInMs(points, TYPES);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: TYPES,
      datasets: [
        {
          data: Object.values(timeSpendInMs),
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (timeSpendInMsEach) => countTimeSpend(timeSpendInMsEach),
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 90,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export class StatsView extends SmartComponent {
  moneyChart = null;
  typeChart = null;
  timeChart = null;

  get getTemplate() {
    return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>
          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>
          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>`;
  }

  removeElement = () => {
    if (this.moneyChart) {
      this.moneyChart.deleteElement();
      this.moneyChart = null;
    }

    if (this.typeChart) {
      this.typeChart.deleteElement();
      this.typeChart = null;
    }
    if (this.timeChart) {
      this.timeChart.deleteElement();
      this.timeChart = null;
    }
  };

  restoreHandlers = () => {
    this.setCharts();
  };

  setCharts = () => {
    const points = this.state;

    const moneyCtx = this.getElement.querySelector('#money');
    const typeCtx = this.getElement.querySelector('#type');
    const timeCtx = this.getElement.querySelector('#time');

    const BAR_WIDTH = points.length;
    moneyCtx.width = BAR_WIDTH * 5;
    typeCtx.width = BAR_WIDTH * 5;
    timeCtx.width = BAR_WIDTH * 5;

    this.moneyChart = renderMoneyChart(moneyCtx, points);
    this.typeChart = renderTypeChart(typeCtx, points);
    this.timeChart = renderTimeChart(timeCtx, points);
  };
} 
