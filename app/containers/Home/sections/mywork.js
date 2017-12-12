import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Wrapper } from '../styles';
import ProjectThumbnail from '../../../components/ProjectThumbnail';
// import PropTypes from 'prop-types';

// Images
import OSHome from '../../../images/projects/oppspace/opportunityspacehome.png';
import Residential from '../../../images/projects/oppspace/residential.png';
import HapYakAcademy from '../../../images/projects/hapyak/hapyak-academy.png';
import CoreReports from '../../../images/projects/hapyak/core-reports.png';

function MyWork() {
  return (
    <Wrapper>
      <Grid>
        <h2>My Work</h2>
        <Grid.Row columns={3}>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/opportunity-space-home-page"
              altTag="OpportunitySpace Home Page"
              thumbnail={OSHome}
            />
          </Grid.Column>
          <Grid.Column>
            <ProjectThumbnail
              projectPage="/opportunity-space-marketing"
              altTag="OpportunitySpace Marketing Campaigns"
              thumbnail={Residential}
            />
          </Grid.Column>
        </Grid.Row>
        <h3>HapYak</h3>
        <Grid.Row columns={3}>
          <Grid.Column>
            <ProjectThumbnail projectPage="/hapyak-reporting" altTag="HapYak Core Reports" thumbnail={CoreReports} />
          </Grid.Column>
          <Grid.Column>
            <ProjectThumbnail projectPage="/hapyak-academy" altTag="HapYak Academy" thumbnail={HapYakAcademy} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

export default MyWork;
