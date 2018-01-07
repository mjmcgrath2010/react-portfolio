import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Wrapper } from '../styles';
import MapSearch from '../../../components/MapSearch/index';
// import PropTypes from 'prop-types';

const panes = [
  { menuItem: 'Leaflet and Google Maps API', render: () => <MapSearch /> },
  { menuItem: 'AmCharts', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Redux Playground', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
];

function Playground() {
  return (
    <Wrapper>
      <h2>Playground</h2>
      <Tab className="playground" menu={{ secondary: true, pointing: true }} panes={panes} />
    </Wrapper>
  );
}

// About.propTypes = {};

export default Playground;
