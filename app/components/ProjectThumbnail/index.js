/**
 *
 * ProjectThunmbail
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import PropTypes from 'prop-types';

const StyledImage = styled(Image)`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.35);
`;

// eslint-disable-next-line react/prefer-stateless-function
class ProjectThumbnail extends React.Component {
  render() {
    return (
      <Link to={this.props.projectPage}>
        <StyledImage src={this.props.thumbnail} alt={this.props.altTag} />
      </Link>
    );
  }
}

ProjectThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  altTag: PropTypes.string,
  projectPage: PropTypes.any,
};

export default ProjectThumbnail;
