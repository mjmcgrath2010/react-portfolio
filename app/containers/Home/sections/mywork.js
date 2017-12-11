import React from 'react';
import { Wrapper } from '../styles';
import OSHome from '../../../images/projects/oppspace/opportunityspacehome.png';
import Residential from '../../../images/projects/oppspace/residential.png';
import ProjectThumbnail from '../../../components/ProjectThumbnail';
// import PropTypes from 'prop-types';

function MyWork() {
  return (
    <Wrapper>
      <h2>My Work</h2>
      <ProjectThumbnail thumbnail={OSHome} />
      <ProjectThumbnail thumbnail={Residential} />
      <ProjectThumbnail thumbnail={OSHome} />
      <ProjectThumbnail thumbnail={Residential} />
    </Wrapper>
  );
}

export default MyWork;
