/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid } from 'semantic-ui-react';
import Script from 'react-load-script';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TravelTime from './TravelTime';

const Heading = styled.h5`
  color: #fff;
`;

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
      travelTransitTimes: undefined,
      travelDrivingTimes: undefined,
    };
    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handleScriptError = this.handleScriptError.bind(this);
    this.displayTravelTimes = this.displayTravelTimes.bind(this);
    this.displayDrivingTimes = this.displayDrivingTimes.bind(this);
    this.showResults = this.showResults.bind(this);
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
    // eslint-disable-next-line no-undef
    const driving = new google.maps.DistanceMatrixService();
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
    driving.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        // eslint-disable-next-line no-undef
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      this.displayDrivingTimes
    );
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

  showResults() {
    let Result;
    if (this.state.submittedAddress) {
      return (Result = (
        <TravelTime
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
              ? `${this.state.travelDrivingTimes.rows[0].elements[0].distance.text} -  Driving`
              : ''
          }
        />
      ));
    }
    return (Result = '');
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
        <Grid.Column>{this.showResults()}</Grid.Column>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U&libraries=places"
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {
  submitLocation: PropTypes.any,
};

export default MapSearchBar;
