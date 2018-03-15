/**
 *
 * Charts
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { barChart, reportData } from './utils/index';
import { getTickerSymbols, getMarketData } from '../Home/selectors';
import StockHeader from '../../components/Charts/StockHeader/index';

// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class Charts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      description: '',
      stockSearch: false,
      marketReports: [
        { key: '0', value: 'gainers', text: 'Market Gainers' },
        { key: '1', value: 'losers', text: 'Biggest Losers' },
        { key: '2', value: 'mostactive', text: 'Most Active' },
      ],
      chart: null,
      selectedChart: 'gainers',
    };
  }
  componentDidMount() {
    this.renderChart();
  }
  handleResultSelect = (e, { result }) => {
    this.props.onTicketSelect(e, { result });
    this.setState({ value: result.title, description: result.description });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    this.props.onTicketSelect();
    if (this.props.searchResults) {
      this.setState({
        isLoading: false,
      });
    }
  };

  stockSearch = () => {
    if (this.state.stockSearch) {
      this.renderChart();
    } else {
      this.state.chart.destroy();
    }
    this.setState({
      stockSearch: !this.state.stockSearch,
    });
  };

  handleChartSelection = (e, { value }) => {
    if (value && this.state.chart) {
      this.setState({
        selectedChart: value,
      });
    }
    this.renderChart(value);
  };

  renderChart = input => {
    const id = this.chart;
    const source = input || this.state.selectedChart;
    const chartData = reportData[source];

    id.height = 120;

    if (this.state.chart) {
      this.state.chart.destroy();
    }

    if (chartData && chartData.chartTitle) {
      const chart = barChart(
        this.props.marketData[source],
        id,
        chartData.dataLabel,
        chartData.dataProperty,
        chartData.dataPointDes,
        chartData.chartTitle
      );
      this.setState({ chart });
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h3>Real Time Stock Data</h3>
            Search for a ticker symbol, and select an interval:
          </Grid.Column>
        </Grid.Row>
        <StockHeader
          value={this.state.value}
          results={this.state.results}
          loading={this.state.loading}
          stockSearch={this.state.stockSearch}
          onTickerSelect={this.handleResultSelect}
          onTickerSearch={this.handleSearchChange}
          searchSelected={this.stockSearch}
          marketReports={this.state.marketReports}
          onChartSelected={this.handleChartSelection}
          selectedChart={this.state.selectedChart}
        />
        <Grid.Row>
          <Grid.Column>
            <div id="stockChart">
              <div className="chartContainer">
                <canvas
                  id="stockChart"
                  ref={chart => {
                    this.chart = chart;
                  }}
                />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Charts.propTypes = {
  searchResults: PropTypes.array,
  onTicketSelect: PropTypes.func,
  marketData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  marketData: getMarketData(),
  tickerSymbols: getTickerSymbols(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Charts);
