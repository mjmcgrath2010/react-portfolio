/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid } from 'semantic-ui-react';

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U',
});
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class MapSearchBar extends React.PureComponent {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    this.selectAddress();
  };

  selectAddress() {
    googleMapsClient.geocode(
      {
        address: '1600 Amphitheatre Parkway, Mountain View, CA',
      },
      (err, response) => {
        if (err) {
          return console.log(err);
        }
        return console.log(response.json.results);
      }
    );
  }
  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {};

export default MapSearchBar;
