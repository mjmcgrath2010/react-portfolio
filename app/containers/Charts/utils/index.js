import _ from 'lodash';
const Chart = require('chart.js');
const randomColor = require('randomcolor');

// Line Chart Data
// const data = [
//   {
//     data: [
//       {
//         x: 10,
//         y: 20,
//       },
//       {
//         x: 15,
//         y: 100,
//       },
//     ],
//     label: 'Mike',
//   },
// ];

const renderLineChart = (data, id, labels, title) => {
  const chartData = [];

  data.forEach(dataSet => {
    chartData.push({
      label: dataSet.label,
      data: dataSet.data,
      fill: false,
      borderColor: randomColor({
        format: 'rgba',
        alpha: 0.35,
        luminosity: 'bright',
      }),
    });
  });

  const chart = new Chart(id, {
    type: 'line',
    data: {
      labels,
      datasets: chartData,
    },
    options: {
      title: {
        display: true,
        text: title,
      },
      responsive: true,
    },
  });
  return chart;
};

const renderBarChart = (data, id) => {
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
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  return chart;
};

const barChart = (data, id, dataLabel, value, dataPoint, title) => {
  const stockData = {
    labels: [],
    data: [],
    dataLabel: dataPoint,
    title,
  };

  _.forEach(data, stock => {
    stockData.labels.push(stock[dataLabel]);
    stockData.data.push(stock[value]);
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

export { renderLineChart, renderBarChart, barChart, reportData };
