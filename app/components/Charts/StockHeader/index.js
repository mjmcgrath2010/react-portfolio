/**
 *
 * StockHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Search, Button, Dropdown } from 'semantic-ui-react';
// import styled from 'styled-componenprops.handleInterval
function StockHeader(props) {
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
            <Button active={props.interval === 'ytd'} name="ytd" primary onClick={props.handleInterval}>
              YTD
            </Button>
            <Button active={props.interval === '1d'} name="1d" primary onClick={props.handleInterval}>
              1 Day
            </Button>
            <Button active={props.interval === '6m'} name="6m" primary onClick={props.handleInterval}>
              6 Month
            </Button>
            <Button active={props.interval === '5y'} name="5y" primary onClick={props.handleInterval}>
              5 Year
            </Button>
          </Button.Group>
          <Button floated="right" primary onClick={props.searchSelected} content="See Daily Stock Reports" />
        </Grid.Column>
      </Grid.Row>
    );
  }
  return (
    <Grid.Row>
      <Grid.Column width={5}>
        <Dropdown
          onChange={props.onChartSelected}
          placeholder="Select a Stock Report"
          selection
          options={props.marketReports}
          defaultValue={props.selectedChart}
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Button
          floated="right"
          primary
          labelPosition="right"
          icon="search"
          onClick={props.searchSelected}
          content="Search For a Stock Report"
        />
      </Grid.Column>
    </Grid.Row>
  );
}

StockHeader.propTypes = {
  results: PropTypes.array,
  loading: PropTypes.bool,
  onTickerSelect: PropTypes.func,
  onTickerSearch: PropTypes.func,
  value: PropTypes.string,
  searchSelected: PropTypes.func,
  stockSearch: PropTypes.bool,
  marketReports: PropTypes.array,
  onChartSelected: PropTypes.func,
  selectedChart: PropTypes.string,
  handleInterval: PropTypes.func,
  interval: PropTypes.string,
};

export default StockHeader;
