/**
 *
 * StockHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Search, Button, Dropdown } from 'semantic-ui-react';
// import styled from 'styled-components';

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
            <Button>1 min</Button>
            <Button>5 min</Button>
            <Button>30 min</Button>
            <Button>1 hr</Button>
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
};

export default StockHeader;
