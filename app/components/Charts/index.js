/**
 *
 * Charts
 *
 */

import React from 'react';
import _ from 'lodash';
import request from '../../utils/request';

const Chart = require('chart.js');

// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class Charts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: null,
    };
  }
  componentDidMount() {
    const ctx = document.getElementById('myChart');
    const that = this;

    request('/stock-data?symbol=AAPL&interval=1')
      .then(response => {
        const title = response['Meta Data']['1. Information'];
        const stockData = response['Time Series (1min)'];
        const processedData = [];
        if (stockData) {
          _.each(stockData, stock => {
            processedData.push(stock);
          });
        }
        this.setState({
          data: processedData,
          title,
        });
        console.log(processedData);
        renderChart();
      })
      .catch(err => console.log(err));
    const renderChart = () => {
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: that.state.title,
              data: that.state.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          responsive: true,
        },
      });
      return myChart;
    };
  }
  render() {
    return (
      <div className="chartContainer">
        <canvas id="myChart" />
      </div>
    );
  }
}

Charts.propTypes = {};

export default Charts;
