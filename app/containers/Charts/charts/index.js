import React from 'react';
import _ from 'lodash';
const Chart = require('chart.js');
const randomColor = require('randomcolor');
import { Grid, Search, Button, Dropdown } from 'semantic-ui-react';

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

const renderBarChart = (data, id, title, dataLabel) => {
  const chart = new Chart(id, {
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
  return chart;
};

const mapGainerData = (data, id) => {
  const stockData = {
    labels: [],
    data: [],
  };

  _.forEach(data, stock => {
    stockData.labels.push(stock.symbol);
    stockData.data.push(stock.changePercent);
  });
  return renderBarChart(stockData, id, "Today's Gainers", 'Percentage Change', 'Percentage Change');
};

const Header = props => {
  if (props.stockSearch) {
    return (
      <Grid.Row>
        <Grid.Column width={5}>
          <Search
            results={props.results}
            loading={props.loading}
            onResultSelect={props.onTickerSelect}
            onSearchChange={props.onTickerSearch}
            value={props.value}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Button.Group>
            <Button>1 min</Button>
            <Button>5 min</Button>
            <Button>30 min</Button>
            <Button>1 hr</Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }
  return (
    <Grid.Row>
      <Grid.Column width={5}>
        <Dropdown />
      </Grid.Column>
      <Grid.Column width={10}>
        <Button.Group>
          <Button onClick={props.searchSelected}>Search for stocks</Button>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export { renderLineChart, renderBarChart, mapGainerData, Header };
