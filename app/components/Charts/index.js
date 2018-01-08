/**
 *
 * Charts
 *
 */

import React from 'react';
// var AmCharts = require('@amcharts/amcharts3-react');
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class Charts extends React.PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Charts.propTypes = {};

export default Charts;
