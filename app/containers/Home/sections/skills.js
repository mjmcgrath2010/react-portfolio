import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Wrapper } from '../styles';
// import PropTypes from 'prop-types';
import Ember from '../../../images/logos/tech-logos/ember-logo.png';
import ES6Logo from '../../../images/logos/tech-logos/es6-logo.png';
import HTMLLogo from '../../../images/logos/tech-logos/html-logo.png';
import JSLogo from '../../../images/logos/tech-logos/js-logo.png';
import MongoDBLogo from '../../../images/logos/tech-logos/mongo-logo.png';
import NodeLogo from '../../../images/logos/tech-logos/node-logo.png';
import ReactLogo from '../../../images/logos/tech-logos/react-logo.png';
import ReduxLogo from '../../../images/logos/tech-logos/redux-logo.png';
import SCSSLogo from '../../../images/logos/tech-logos/scss-logo.png';
import StyledComponentsLogo from '../../../images/logos/tech-logos/styled-components-logo.png';
import VueLogo from '../../../images/logos/tech-logos/vue-logo.png';
import WebPackLogo from '../../../images/logos/tech-logos/webpack-logo.png';

function MySkills() {
  return (
    <Wrapper>
      <Image />
      <h2>Skills</h2>
      <Grid centered columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Image src={JSLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={ES6Logo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={ReactLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={ReduxLogo} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Image src={VueLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={Ember} />
          </Grid.Column>
          <Grid.Column>
            <Image src={MongoDBLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={NodeLogo} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Image src={StyledComponentsLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={SCSSLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={HTMLLogo} />
          </Grid.Column>
          <Grid.Column>
            <Image src={WebPackLogo} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

// About.propTypes = {};

export default MySkills;
