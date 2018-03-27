import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Wrapper } from '../styles';
import ProjectThumbnail from '../../../components/ProjectThumbnail';
// import PropTypes from 'prop-types';

// Images
import OSHome from '../../../images/projects/oppspace/opportunityspacehome.png';
import Residential from '../../../images/projects/oppspace/residential.png';
import HapYakControlBar from '../../../images/projects/hapyak/control_bar/control_bar_after.png';
import CoreReports from '../../../images/projects/hapyak/core-reports.png';
import HapYakLogo from '../../../images/logos/hapyak_logo_color.png';
import TolemiLogo from '../../../images/logos/tolemi-logo.png';

function MyWork() {
  return (
    <Wrapper>
      <Grid stackable>
        <Grid.Row columns={1}>
          <Grid.Column>
            <h2>My Work</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <img className="logo" alt="hapyak-logo" src={HapYakLogo} />
        </Grid.Row>
        <Grid.Row className="projects-row" columns={3} centered>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/projects/hapyak-reporting"
              altTag="HapYak Core Reports"
              thumbnail={CoreReports}
            />
          </Grid.Column>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/projects/hapyak-editor"
              altTag="HapYak Editor"
              thumbnail={HapYakControlBar}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <img className="logo" alt="Tolemi-Logo" src={TolemiLogo} />
        </Grid.Row>
        <Grid.Row className="projects-row" columns={3} centered>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/projects/opportunity-space-home-page"
              altTag="OpportunitySpace Home Page"
              thumbnail={OSHome}
            />
          </Grid.Column>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/projects/opportunity-space-marketing"
              altTag="OpportunitySpace Marketing Campaigns"
              thumbnail={Residential}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

export default MyWork;
