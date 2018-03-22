/**
 *
 * ChartsBody
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
// import styled from 'styled-components';

function ChartsBody(props) {
  return (
    <Grid.Row>
      <Grid.Column>
        <div id="stockChart">
          <div className="chartContainer">
            <canvas id="stockChart" ref={props.chart} />
          </div>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
}

ChartsBody.propTypes = {
  chart: PropTypes.func,
};

export default ChartsBody;
