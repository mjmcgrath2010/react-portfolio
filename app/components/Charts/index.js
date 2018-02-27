/**
 *
 * Charts
 *
 */

import React from 'react';
import _ from 'lodash';
import { Search, Grid, Button } from 'semantic-ui-react';
import request from '../../utils/request';
const tickerSymbols = require('./data/tickerSymbols.json');

const Chart = require('chart.js');

// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class Charts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openData: null,
      closeData: null,
      highData: null,
      lowData: null,
      title: null,
      times: null,
      isLoading: false,
      results: [],
      value: '',
      tickerSymbols,
    };
  }
  componentDidMount() {
    const ctx = document.getElementById('myChart');
    const that = this;

    request('/stock-data?symbol=AAPL&interval=1')
      .then(response => {
        const title = response['Meta Data']['1. Information'];
        const stockData = response['Time Series (1min)'];
        const openData = [];
        const closeData = [];
        const highData = [];
        const lowData = [];
        const times = [];
        if (stockData) {
          _.each(stockData, (stock, key) => {
            openData.push(stock['1. open']);
            closeData.push(stock['4. close']);
            highData.push(stock['2. high']);
            lowData.push(stock['3. low']);
            times.push(key);
          });
        }
        this.setState({
          openData,
          title,
          closeData,
          highData,
          lowData,
          times,
        });
        renderChart();
      })
      .catch(err => console.log(err));
    const renderChart = () => {
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: that.state.times,
          datasets: [
            {
              label: 'Open',
              data: that.state.openData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Close',
              data: that.state.closeData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'High',
              data: that.state.highData,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
              label: 'Low',
              data: that.state.lowData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      return myChart;
    };
  }
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h3>Real Time Stock Data</h3>
            Search for a ticker symbol, and select an interval:
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <Search results={this.state.tickerSymbols} loading={this.state.loading} value={this.state.value} />
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
        <Grid.Row>
          <Grid.Column>
            <div id="stockChart">
              <div className="chartContainer">
                <canvas id="myChart" />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Charts.propTypes = {};

export default Charts;
