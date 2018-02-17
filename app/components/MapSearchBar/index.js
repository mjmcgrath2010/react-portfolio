/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TravelTime from './TravelTime';

// eslint-disable-next-line react/prefer-stateless-function
class MapSearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false,
      selectedLocation: null,
      submittedAddress: '',
      travelTransitTimes: undefined,
      travelDrivingTimes: undefined,
    };
    this.displayTravelTimes = this.displayTravelTimes.bind(this);
    this.displayDrivingTimes = this.displayDrivingTimes.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  displayDrivingTimes(response) {
    this.setState({
      travelDrivingTimes: response,
    });
  }

  displayTravelTimes(response) {
    this.setState({
      travelTransitTimes: response,
    });
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleSearchChange = e => {
    this.setState({ isLoading: true, value: e.target.value });
    if (e.target.value === '') {
      this.setState({ isLoading: false });
    }
    this.props.onSearchChange(e);
  };

  showResults() {
    let Result;
    if (this.state.submittedAddress) {
      Result = (
        <TravelTime
          address={this.props.address}
          transitDistance={
            this.state.travelTransitTimes ? this.state.travelTransitTimes.rows[0].elements[0].duration.text : 'N/A'
          }
          transitMiles={
            this.state.travelTransitTimes
              ? `${this.state.travelTransitTimes.rows[0].elements[0].distance.text} -  Public Transit`
              : ''
          }
          travelDrivingMiles={
            this.state.travelDrivingTimes ? this.state.travelDrivingTimes.rows[0].elements[0].duration.text : 'N/A'
          }
          travelDrivingTime={
            this.state.travelDrivingTimes
              ? `${this.state.travelTransitTimes.rows[0].elements[0].distance.text} -  Driving`
              : ''
          }
        />
      );
      return Result;
    }
    Result = '';
    return Result;
  }

  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Search
            loading={this.state.isLoading}
            onSearchChange={this.handleSearchChange}
            value={this.state.value}
            {...this.props}
            results={this.props.results}
            fluid
          />
        </Grid.Column>
        <Grid.Column>{this.showResults()}</Grid.Column>
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {
  onSearchChange: PropTypes.func,
  address: PropTypes.string,
  results: PropTypes.array,
};

export default MapSearchBar;
