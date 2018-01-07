/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid } from 'semantic-ui-react';
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
    };
    this.handleScriptCreate = this.handleScriptCreate.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handleScriptError = this.handleScriptError.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

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

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
  };

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
    this.state.value = place.formatted_address;
    this.setState({ isLoading: false });
    this.props.submitLocation(place);
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
          />
        </Grid.Column>
        <Script
          url="https://maps.googleapis.com/maps/api/js?keyAIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U&libraries=places"
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
