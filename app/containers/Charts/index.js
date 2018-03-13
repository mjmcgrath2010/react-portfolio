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
import { Search, Grid, Button } from 'semantic-ui-react';
import { mapGainerData } from './charts/index';
import { getTickerSymbols, getMarketData } from '../Home/selectors';

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
    };
  }
  componentDidMount() {
    const ctx = document.getElementById('myChart');
    mapGainerData(this.props.marketData.gainers, ctx);
  }
  componentWillReceiveProps(nextProps) {
    console.log('Next Props: ', nextProps);
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
            <Search
              results={this.props.results}
              loading={this.state.isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              value={this.props.value}
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
  value: PropTypes.string,
  results: PropTypes.array,
  marketData: PropTypes.array,
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
