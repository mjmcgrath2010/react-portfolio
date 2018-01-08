/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid, Statistic } from 'semantic-ui-react';
import Script from 'react-load-script';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

let autoComplete;

// eslint-disable-next-line react/prefer-stateless-function
class MapSearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [],
      isLoading: false,
      selectedLocation: null,
      scriptLoaded: false,
      scriptError: false,
      submittedAddress: '',
      travelTimes: undefined,
    };
    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handleScriptError = this.handleScriptError.bind(this);
    this.displayTravelTimes = this.displayTravelTimes.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  getTimes(destLat, destLong) {
    // eslint-disable-next-line no-undef
    const origin = new google.maps.LatLng(42.342813, -71.097606);
    // eslint-disable-next-line no-undef
    const destination = new google.maps.LatLng(destLat, destLong);
    // eslint-disable-next-line no-undef
    const transit = new google.maps.DistanceMatrixService();
    transit.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'TRANSIT',
        transitOptions: {
          modes: ['BUS', 'RAIL', 'SUBWAY', 'TRAIN'],
        },
        // eslint-disable-next-line no-undef
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      this.displayTravelTimes
    );
  }

  displayTravelTimes(response, status) {
    console.log(response, status);
    this.setState({
      travelTimes: response,
    });
  }

  geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // eslint-disable-next-line no-undef
        const circle = new google.maps.Circle({
          center: geoLocation,
          radius: position.coords.accuracy,
        });
        autoComplete.setBounds(circle.getBounds());
      });
    }
    this.setState({ isLoading: false });
  }
  selectAddress() {
    const place = autoComplete.getPlace();
    this.setState({ isLoading: false, submittedAddress: place.formatted_address });
    this.props.submitLocation(place);
    this.getTimes(place.geometry.location.lat(), place.geometry.location.lng());
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleSearchChange = e => {
    this.setState({ isLoading: true, value: e.target.value });
    if (e.target.value === '') {
      this.setState({ isLoading: false });
    }
  };

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    // eslint-disable-next-line no-undef
    autoComplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), { types: ['geocode'] });
    autoComplete.addListener('place_changed', this.selectAddress.bind(this));
    autoComplete.addListener(this.state.value, this.geoLocate);
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
            showNoResults={false}
            id="autocomplete"
            fluid
          />
        </Grid.Column>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U&libraries=places"
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column>
          <h5>Time to get to: {this.state.submittedAddress}</h5>
          <Statistic>
            <Statistic.Value>
              {this.state.travelTimes ? this.state.travelTimes.rows[0].elements[0].duration.text : ''}
            </Statistic.Value>
            <Statistic.Label>
              {this.state.travelTimes ? this.state.travelTimes.rows[0].elements[0].distance.text : ''}
            </Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {
  submitLocation: PropTypes.any,
};

export default MapSearchBar;
