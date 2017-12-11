/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
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
          <img alt={this.props.altTag} src={this.props.thumbnail} />
        </div>
      </div>
    );
  }
}

ProjectThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  altTag: PropTypes.string,
};

export default ProjectThumbnail;
