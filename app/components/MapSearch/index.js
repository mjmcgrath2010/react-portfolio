/**
 *
 * MapSearch
 *
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

// import styled from 'styled-components';

import PrimaryPin from '../../images/icons/map-localization.png';
import messages from './messages';
import MapSearchBar from '../MapSearchBar/index';
import request from '../../utils/request';

const mikesIcon = L.icon({
  iconUrl: PrimaryPin,
  iconSize: [40, 40], // size of the icon
  iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

let mymap;

// eslint-disable-next-line react/prefer-stateless-function
class MapSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      center: [42.342813, -71.097606],
      submittedAddress: undefined,
      results: [],
      transitTime: '',
      transitMiles: '',
      drivingMiles: '',
      drivingTime: '',
    };
    this.mapLocation = this.mapLocation.bind(this);
    this.resetMap = this.resetMap.bind(this);
  }
  componentDidMount() {
    this.state.pins.push(L.marker([42.342813, -71.097606], { icon: mikesIcon }).bindPopup('My Home'));
    this.setUpMap();
  }
  setUpMap() {
    const mapBoxUrl =
      '//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1jZ3JhdGgyMDEwIiwiYSI6ImNqYzE2c2F3czAzZ20zMm85emhpOW15aTkifQ.ieXsZA8iOh4YBSaC0GgW-Q';
    const mbAttr = 'Made by Mike McGrath';
    const satellite = L.tileLayer(mapBoxUrl, {
      id: 'mapbox.satellite',
      attribution: mbAttr,
    });
    const streets = L.tileLayer(mapBoxUrl, {
      id: 'mapbox.streets',
      attribution: mbAttr,
    });
    const pins = L.layerGroup(this.state.pins);
    const baseMaps = {
      Streets: streets,
      Satellite: satellite,
    };
    const overlayMaps = {
      Home: pins,
    };
    mymap = L.map('mapid', {
      center: this.state.center,
      zoom: 15,
      layers: [pins, streets],
    });

    mymap.scrollWheelZoom.disable();
    mymap.on('click', () => {
      if (mymap.scrollWheelZoom.enabled()) {
        mymap.scrollWheelZoom.disable();
      } else {
        mymap.scrollWheelZoom.enable();
      }
    });

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
  }
  mapLocation(location) {
    if (this.state.pins.length > 1) {
      this.resetMap();
    }

    const that = this;
    const lat = location.lat;
    const lng = location.lng;
    const newPin = L.marker([lat, lng], { icon: mikesIcon }).bindPopup(that.state.submittedAddress);
    this.state.pins.push(newPin);
    newPin.addTo(mymap);
    mymap.panTo({ lon: lng, lat }, { animate: true });
    mymap.fitBounds([[lat, lng], [that.state.center]]);
  }

  handleSearchChange = e => {
    const that = this;
    request(`/autocomplete?keyword=${e.target.value}`)
      .then(response => {
        const predictions = [];
        _.each(response.predictions, item => {
          predictions.push({ title: item.description });
        });
        return predictions;
      })
      .then(predictions => that.setState({ results: predictions }))
      .catch(err => console.log(err));

    this.setState({
      isLoading: true,
      submittedAddress: e.target.value,
    });

    if (e.target.value === '') {
      this.setState({ isLoading: false });
    }
  };

  handleResultSelect = (e, { result }) => {
    const that = this;
    request(`/geocode?address=${result.title}`)
      .then(response => response.json.results[0].geometry.location)
      .then(response => {
        const location = { lat: response.lat, lng: response.lng };
        that.mapLocation(location);
        const transit = request(`/directions?lat=${response.lat}&lng=${response.lng}&mode=transit`);
        const driving = request(`/directions?lat=${response.lat}&lng=${response.lng}&mode=driving`);
        return { transit, driving };
      })
      .then(directions => {
        directions.transit.then(data => {
          const transitMiles = data.json.routes[0].legs[0].distance.text;
          const transitTime = data.json.routes[0].legs[0].duration.text;

          that.setState({
            transitMiles,
            transitTime,
          });
        });
        directions.driving.then(data => {
          const drivingMiles = data.json.routes[0].legs[0].distance.text;
          const drivingTime = data.json.routes[0].legs[0].duration.text;

          that.setState({
            drivingMiles,
            drivingTime,
          });
        });
      })
      .catch(err => console.log(err));
    this.setState({ submittedAddress: result.title });
  };

  resetMap() {
    this.setState({ pins: [] });
  }

  render() {
    return (
      <div>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <h4>
                <FormattedMessage {...messages.headline} />
              </h4>
              <FormattedMessage {...messages.header} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid centered stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <MapSearchBar
                onSearchChange={this.handleSearchChange}
                value={this.state.submittedAddress}
                handleSelect={this.handleResultSelect}
                results={this.state.results}
                address={this.state.submittedAddress}
                drivingTime={this.state.drivingTime}
                drivingMiles={this.state.drivingMiles}
                transitTime={this.state.transitTime}
                transitMiles={this.state.transitMiles}
                transitTimes={this.state.drivingTime}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <div id="mapid" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

MapSearch.propTypes = {};

export default MapSearch;
