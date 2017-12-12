/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class ProjectThumbnail extends React.Component {
  render() {
    return (
      <div className="project-container">
        <div className="project-thumbnail">
          <Link to={this.props.projectPage}>
            <img alt={this.props.altTag} src={this.props.thumbnail} />
          </Link>
        </div>
      </div>
    );
  }
}

ProjectThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  altTag: PropTypes.string,
  projectPage: PropTypes.any,
};

export default ProjectThumbnail;
