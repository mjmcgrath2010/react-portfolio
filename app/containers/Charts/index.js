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
import { barChart, reportData, chartStockData } from './utils/index';
import { getTickerSymbols, getMarketData, getTickerSearchResults, getStockData } from '../Home/selectors';
import { filterStockSymbols, fetchStockData } from '../Home/actions';
import StockHeader from '../../components/Charts/StockHeader/index';

// eslint-disable-next-line react/prefer-stateless-function
class Charts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: '',
      results: [],
      description: '',
      stockSearch: false,
      marketReports: [
        { key: '0', value: 'gainers', text: 'Market Gainers' },
        { key: '1', value: 'losers', text: 'Biggest Losers' },
        { key: '2', value: 'mostactive', text: 'Most Active' },
      ],
      chart: null,
      selectedChart: 'gainers',
      interval: 'ytd',
    };
  }
  componentDidMount() {
    this.renderChart('bar');
  }

  componentWillUpdate(nextProps) {
    if (nextProps.searchResults && nextProps.searchResults !== this.props.searchResults) {
      let suggestions = nextProps.searchResults;
      suggestions = suggestions.splice(0, 10);
      this.handleSearchResults(suggestions);
    }

    if (nextProps.stockData !== this.props.stockData) {
      this.renderChart('line', nextProps.stockData);
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, description: result.description });
    this.props.dispatch(fetchStockData(result.title, this.state.interval));
  };

  handleInterval = (e, data) => {
    console.log(data);
    this.setState({
      interval: e.target.name,
    });
    if (this.state.value) {
      this.props.dispatch(fetchStockData(this.state.value, this.state.interval));
    }
  };

  handleSearchChange = (e, { value }) => {
    this.setState({
      loading: true,
      value,
    });
    this.props.dispatch(filterStockSymbols(value));
  };

  handleSearchResults = results => {
    this.setState({ results, loading: false });
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
    this.renderChart('bar', value);
  };

  renderChart = (type, input) => {
    const id = this.chart;
    if (type === 'line') {
      if (this.state.chart) {
        this.state.chart.destroy();
      }
      const data = input.stock_data;
      const stockChart = chartStockData(id, data, 'close', 'label', {});
      this.setState({
        chart: stockChart,
      });
    }
    if (type === 'bar') {
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
          handleInterval={this.handleInterval}
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
  marketData: PropTypes.object,
  dispatch: PropTypes.func,
  stockData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  marketData: getMarketData(),
  tickerSymbols: getTickerSymbols(),
  searchResults: getTickerSearchResults(),
  stockData: getStockData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Charts);
