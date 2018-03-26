/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';
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
        <Link to={this.props.projectPage}>
          <Image src={this.props.thumbnail} size="medium" alt={this.props.altTag} />
        </Link>
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
