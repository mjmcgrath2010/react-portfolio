import _ from 'lodash';
const Chart = require('chart.js');
const randomColor = require('randomcolor');

// Line Chart Data

const renderLineChart = (data, id) => {
  const chart = new Chart(id, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: data.data,
    },
    options: {
      responsive: true,
    },
  });
  return chart;
};

const chartStockData = (id, data, point, label) => {
  const color = randomColor();
  const processedData = [];
  const labelArray = [];
  const chartData = {};

  chartData.data = [];

  data.forEach(item => {
    if (item[point]) {
      processedData.push(item[point]);
      labelArray.push(item[label]);
    }
  });

  const dataSet = {
    label: point.toUpperCase(),
    backgroundColor: color,
    borderColor: color,
    data: processedData,
    fill: false,
  };

  chartData.data.push(dataSet);
  chartData.labels = labelArray;

  return renderLineChart(chartData, id);
};

const renderBarChart = (data, id) => {
  Chart.defaults.global.defaultFontFamily = "'Quicksand', sans-serif";
  Chart.defaults.global.defaultFontSize = 12;
  const chart = new Chart(id, {
    type: 'bar',
    data: {
      labels: data.labels, // Array of Labels
      datasets: [
        {
          label: data.dataLabel,
          data: data.data, // Array of values
          backgroundColor: randomColor({
            // Random Colors
            count: data.data.length,
          }),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: data.title,
      },
      legend: {
        display: false,
      },
    },
  });
  return chart;
};

const barChart = (data, id, dataLabel, dataProperty, dataPointDes, title) => {
  const stockData = {
    labels: [],
    data: [],
    dataLabel: dataPointDes,
    title,
  };

  _.forEach(data, stock => {
    stockData.labels.push(stock[dataLabel]);
    stockData.data.push(stock[dataProperty]);
  });
  return renderBarChart(stockData, id);
};

const reportData = {
  gainers: {
    dataLabel: 'symbol',
    dataProperty: 'changePercent',
    dataPointDes: 'Percentage',
    chartTitle: "Today's Gainers",
  },
  losers: {
    dataLabel: 'symbol',
    dataProperty: 'changePercent',
    dataPointDes: 'Percentage',
    chartTitle: "Today's Losers",
  },
  mostactive: {
    dataLabel: 'symbol',
    dataProperty: 'latestVolume',
    dataPointDes: 'Volume',
    chartTitle: 'Most Active',
  },
};

export { renderLineChart, renderBarChart, barChart, reportData, chartStockData };
