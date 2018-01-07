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
    autoComplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (document.getElementById('autocomplete')),
      { types: ['geocode'] }
    );
    autoComplete.addListener('place_changed', this.selectAddress.bind(this));
    autoComplete.addListener(this.state.value, this.geoLocate);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

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
  }
  selectAddress() {
    const place = autoComplete.getPlace();
    this.props.submitLocation(place);
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={this.state.results}
            value={this.state.value}
            {...this.props}
            id="autocomplete"
          />
        </Grid.Column>
        <Script
          url="https://maps.googleapis.com/maps/api/js?keyAIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U&libraries=places"
          // eslint-disable-next-line react/jsx-no-bind
          onCreate={this.handleScriptCreate.bind(this)}
          // eslint-disable-next-line react/jsx-no-bind
          onError={this.handleScriptError.bind(this)}
          // eslint-disable-next-line react/jsx-no-bind
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </Grid>
    );
  }
}

MapSearchBar.propTypes = {
  submitLocation: PropTypes.func,
};

export default MapSearchBar;
