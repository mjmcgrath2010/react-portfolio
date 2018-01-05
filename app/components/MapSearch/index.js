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
// eslint-disable-next-line react/prefer-stateless-function
class MapSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
    const mikesIcon = L.icon({
      iconUrl: PrimaryPin,
      iconSize: [40, 40], // size of the icon
      iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    const satellite = L.tileLayer(mapBoxUrl, {
      id: 'mapbox.satellite',
      attribution: mbAttr,
    });
    const streets = L.tileLayer(mapBoxUrl, { id: 'mapbox.streets', attribution: mbAttr });
    const myHome = L.marker([42.342813, -71.097606], { icon: mikesIcon }).bindPopup('My Home');
    const cities = L.layerGroup([myHome]);
    const mymap = L.map('mapid', {
      center: [42.342813, -71.097606],
      zoom: 15,
      layers: [cities, streets],
    });
    const baseMaps = {
      Streets: streets,
      Satellite: satellite,
    };

    const overlayMaps = {
      Cities: cities,
    };

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
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
            <Grid.Column width={6}>Hi</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

MapSearch.propTypes = {};

export default MapSearch;
