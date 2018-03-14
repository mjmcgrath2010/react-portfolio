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
import { mapGainerData } from './utils/index';
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
        { key: 'GAIN', value: '0', text: 'Market Gainers' },
        { key: 'LOSS', value: '1', text: 'Market Losers' },
        { key: 'VOL', value: '2', text: 'Market Volume' },
        { key: 'ACT', value: '3', text: 'Most Active' },
      ],
    };
  }
  componentDidMount() {
    const ctx = document.getElementById('myChart');
    mapGainerData(this.props.marketData.gainers, ctx);
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
    this.setState({
      stockSearch: true,
    });
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
        />
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

Charts.propTypes = {
  searchResults: PropTypes.array,
  onTicketSelect: PropTypes.func,
  marketData: PropTypes.object,
  gainers: PropTypes.array,
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
