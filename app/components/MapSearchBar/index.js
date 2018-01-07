/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Search, Grid } from 'semantic-ui-react';
import Script from 'react-load-script';
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
      scriptLoaded: false,
      scriptError: false,
    };
  }
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    if (this.state.scriptLoaded) {
      // eslint-disable-next-line no-undef
      autoComplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (document.getElementById('autocomplete')),
        { types: ['geocode'] }
      );
      autoComplete.addListener(this.state.value, this.geoLocate());
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
      this.setState({ isLoading: false });
    }
  }

  selectAddress() {}
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

MapSearchBar.propTypes = {};

export default MapSearchBar;
