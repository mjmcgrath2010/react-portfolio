import React from 'react';
import { Row, Col } from 'react-materialize';
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
      <h2>My Work</h2>
      <Row>
        <Col s={1} m={4} className="grid-example">
          <ProjectThumbnail altTag="OpportunitySpace Home Page" thumbnail={OSHome} />
        </Col>
        <Col s={1} m={4} className="grid-example">
          <ProjectThumbnail altTag="OpportunitySpace Marketing Campaigns" thumbnail={Residential} />
        </Col>
        <Col s={12}>
          <h3>HapYak</h3>
        </Col>
        <Col s={1} m={4} className="grid-example">
          <ProjectThumbnail altTag="HapYak Core Reports" thumbnail={CoreReports} />
        </Col>
        <Col s={1} m={4} className="grid-example">
          <ProjectThumbnail altTag="HapYak Academy" thumbnail={HapYakAcademy} />
        </Col>
      </Row>
    </Wrapper>
  );
}

export default MyWork;
