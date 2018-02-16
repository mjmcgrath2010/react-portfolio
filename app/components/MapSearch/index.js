/**
 *
 * MapSearch
 *
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FormattedMessage } from 'react-intl';

// import styled from 'styled-components';

import PrimaryPin from '../../images/icons/map-localization.png';
import messages from './messages';
import MapSearchBar from '../MapSearchBar/index';
import mapUtils from '../../utils/request';

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

    this.setState({
      submittedAddress: location.formatted_address,
    });

    const that = this;
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();
    const newPin = L.marker([lat, lng], { icon: mikesIcon }).bindPopup(location.formatted_address);
    this.state.pins.push(newPin);
    newPin.addTo(mymap);
    mymap.panTo({ lon: lng, lat }, { animate: true });
    mymap.fitBounds([[lat, lng], [that.state.center]]);
  }

  handleSearchChange = e => {
    mapUtils.geoLocate(e.target.value);
    this.setState({
      isLoading: true,
      submittedAddress: e.target.value,
    });
    if (e.target.value === '') {
      this.setState({ isLoading: false });
    }
  };

  resetMap() {}
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
            <Grid.Column width={6}>
              <MapSearchBar
                onSearchChange={this.handleSearchChange}
                value={this.state.submittedAddress}
                submitLocation={this.mapLocation}
                address={this.state.submittedAddress}
              />
            </Grid.Column>
            <Grid.Column width={10}>
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
