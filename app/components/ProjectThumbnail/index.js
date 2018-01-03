/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
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
          <Image
            src={this.props.thumbnail}
            as="a"
            alt={this.props.altTag}
            size="medium"
            href={this.props.projectPage}
          />
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
