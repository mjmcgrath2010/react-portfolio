/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Card, Step, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Heading = styled.h5`
  color: #fff;
`;

// eslint-disable-next-line react/prefer-stateless-function
class TravelTime extends React.PureComponent {
  render() {
    return (
      <div>
        <Heading>Time to get to: {this.props.address}</Heading>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.transitDistance}</Card.Header>
            <Card.Description>{this.props.transitMiles}</Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.travelDrivingMiles}</Card.Header>
            <Card.Description>{this.props.travelDrivingTime}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

TravelTime.propTypes = {
  travelDrivingTime: PropTypes.string,
  travelDrivingMiles: PropTypes.string,
  transitMiles: PropTypes.string,
  transitDistance: PropTypes.string,
  address: PropTypes.string,
};

export default TravelTime;
