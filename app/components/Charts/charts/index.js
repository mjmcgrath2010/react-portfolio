const Chart = require('chart.js');
const randomColor = require('randomcolor');

const renderLineChart = (data, id, labels, title) => {
  const chartData = [];

  data.forEach(dataSet => {
    chartData.push({
      label: dataSet.label,
      data: dataSet.data,
      backgroundColor: randomColor(),
    });
  });

  return new Chart(id, {
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
};

// new Chart(document.getElementById('chartjs-0'), {
//   type: 'line',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         lineTension: 0.1,
//       },
//     ],
//   },
//   options: {},
// });

const renderBarChart = (data, id, labels, title, dataLabel) =>
  new Chart(id, {
    type: 'bar',
    data: {
      labels: data.labels, // Array of Labels
      datasets: [
        {
          label: dataLabel,
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
        text: title,
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

export { renderLineChart, renderBarChart };
