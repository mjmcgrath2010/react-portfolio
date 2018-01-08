import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import HeadShot from '../../../images/headshot.png';
import { Wrapper } from '../styles';

// import PropTypes from 'prop-types';

function About() {
  return (
    <Wrapper>
      <h2>About</h2>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image centered size="medium" verticalAlign="top" circular src={HeadShot} alt="Mike McGrath head shot" />
          </Grid.Column>
          <Grid.Column width={10}>
            <p>
              Primarily Javascript based development, however I tend to wear multiple hats at companies. I often am the
              first one to jump on an undesirable task if it is in the best interest of the company. I enjoy starting
              work at 6am and have trouble putting it down until it is finished.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

// About.propTypes = {};

export default About;
