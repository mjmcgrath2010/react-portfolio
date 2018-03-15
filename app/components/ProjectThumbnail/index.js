/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
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
        <Image src={this.props.thumbnail} as="a" size="medium" href={this.props.projectPage} alt={this.props.altTag} />
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
