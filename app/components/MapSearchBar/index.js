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

  showResults(props) {
    let Result;
    if (props.transitTimes) {
      Result = (
        <TravelTime
          address={props.address}
          transitDistance={props.transitTime ? props.transitTime : 'N/A'}
          transitMiles={props.transitMiles ? `${props.transitMiles} -  Public Transit` : ''}
          travelDrivingTime={props.drivingTime ? `${props.drivingTime} -  Driving` : ''}
          travelDrivingMiles={props.drivingMiles ? props.drivingMiles : 'N/A'}
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
        <Grid.Column>{this.showResults(this.props)}</Grid.Column>
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {
  onSearchChange: PropTypes.func,
  address: PropTypes.string,
  transitTime: PropTypes.string,
  transitMiles: PropTypes.string,
  drivingTime: PropTypes.string,
  drivingMiles: PropTypes.string,
  results: PropTypes.array,
  transitTimes: PropTypes.string,
};

export default MapSearchBar;
