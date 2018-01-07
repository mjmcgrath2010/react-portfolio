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
    };
  }
  componentDidMount() {
    this.setUpMap();
  }
  setUpMap() {
    const mapBoxUrl =
      '//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1jZ3JhdGgyMDEwIiwiYSI6ImNqYzE2c2F3czAzZ20zMm85emhpOW15aTkifQ.ieXsZA8iOh4YBSaC0GgW-Q';
    const mbAttr =
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>';
    const satellite = L.tileLayer(mapBoxUrl, {
      id: 'mapbox.satellite',
      attribution: mbAttr,
    });
    const streets = L.tileLayer(mapBoxUrl, { id: 'mapbox.streets', attribution: mbAttr });

    this.state.pins.push(L.marker([42.342813, -71.097606], { icon: mikesIcon }).bindPopup('My Home'));
    const pins = L.layerGroup(this.state.pins);
    mymap = L.map('mapid', {
      center: this.state.center,
      zoom: 15,
      layers: [pins, streets],
    });
    const baseMaps = {
      Streets: streets,
      Satellite: satellite,
    };
    const overlayMaps = {
      Pins: this.state.pins,
    };
    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
  }
  mapLocation(location) {
    const lat = location.geometry.location.lat();
    const lng = location.geometry.location.lng();
    const newPin = L.marker([lat, lng], { icon: mikesIcon }).bindPopup('My Home');
    this.state.pins.push(newPin);
    newPin.addTo(mymap);
  }
  render() {
    return (
      <div>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <FormattedMessage {...messages.header} />
            </Grid.Column>
          </Grid.Row>{' '}
        </Grid>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column width={10}>
              <div id="mapid" />
            </Grid.Column>
            <Grid.Column width={6}>
              <MapSearchBar
                // eslint-disable-next-line react/jsx-no-bind
                submitLocation={this.mapLocation.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

MapSearch.propTypes = {};

export default MapSearch;
