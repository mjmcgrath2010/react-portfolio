import React from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styled from 'styled-components';
import BackgroundImage from '../../images/background.jpg';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  background: url(${BackgroundImage}) center;
  background-size: cover;
  display: table;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <HeroContainer>
          <div className="hero-text">
            <h1>The Portfolio of Mike McGrath</h1>
            <h3>Software Engineer</h3>
          </div>
        </HeroContainer>
        <section>
          <h2>About Me</h2>
        </section>
      </div>
    );
  }
}
