import React from 'react';
import { Image, Grid, Button } from 'semantic-ui-react';
import { Wrapper } from '../styles';

// Images
import HeadShot from '../../../images/headshot.png';
import GitHubIcon from '../../../images/icons/github-logo.svg';
import CodePenIcon from '../../../images/icons/3d-outlined-shape.svg';
import EmailIcon from '../../../images/icons/at.svg';

// import PropTypes from 'prop-types';

function About() {
  return (
    <Wrapper>
      <h2>About</h2>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image
              id="headShot"
              centered
              size="medium"
              verticalAlign="top"
              circular
              src={HeadShot}
              alt="Mike McGrath head shot"
            />
            <div id="aboutIconContainer">
              <span className="github">
                <Image size="mini" src={GitHubIcon} />
              </span>
              <span className="codepen">
                <Image size="mini" src={CodePenIcon} />
              </span>
              <span className="email">
                <Image size="mini" src={EmailIcon} />
              </span>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>
              Primarily Javascript based development, however I tend to wear multiple hats at companies. I often am the
              first one to jump on an undesirable task if it is in the best interest of the company. I enjoy starting
              work at 6am and have trouble putting it down until it is finished.
            </p>
            <Button floated="right" primary content="View Resume" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

// About.propTypes = {};

export default About;
