import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styled from 'styled-components';
import BackgroundImage from '../../images/background.jpg';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${BackgroundImage}) center;
  background-size: cover;
  position: fixed;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <HeroContainer>
        <div className="hero-text">
          <h1>The Portfolio of Mike McGrath</h1>
        </div>
      </HeroContainer>
    );
  }
}
