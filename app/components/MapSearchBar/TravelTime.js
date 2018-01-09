/**
 *
 * MapSearchBar
 *
 */

import React from 'react';
import { Card } from 'semantic-ui-react';
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
        <Heading>Time to get to: {this.props.submittedAddress}</Heading>
        <Card>
          <Card.Content>
            {/*<Image floated="right" size="mini" src= />*/}
            <Card.Header>{this.props.transitDistance}</Card.Header>
            <Card.Description>{this.props.transitMiles}</Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            {/*<Image floated="right" size="mini" src="/assets/images/avatar/large/steve.jpg" />*/}
            <Card.Header>{this.props.travelDrivingTime}</Card.Header>
            <Card.Description>{this.props.travelDrivingMiles}</Card.Description>
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
};

export default TravelTime;
