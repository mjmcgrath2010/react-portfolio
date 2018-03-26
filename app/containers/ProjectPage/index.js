/**
 *
 * ProjectPage - I chose to use Redux Saga as I intend to author a backend that will let me add projects to a DB. This container
 * can be used for fetching that data from the API.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Image } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProjectPage from './selectors';
import reducer from './reducer';
import saga from './saga';

// Components

// Assets
import HapYakControlBar from '../../images/projects/hapyak/control_bar/control_bar_after.png';

// eslint-disable-next-line react/prefer-stateless-function
export class ProjectPage extends React.PureComponent {
  render() {
    return (
      <Grid id="projectPageContainer" centered>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={5}>
            <h1>HapYak Editor Control Bar:</h1>
            <Image src={HapYakControlBar} />
          </Grid.Column>
          <Grid.Column width={10}>
            <h2>Project Description:</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Image centered size="medium" src={HapYakControlBar} />
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src={HapYakControlBar} />
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src={HapYakControlBar} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

ProjectPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  image: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  projectPage: makeSelectProjectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'projectPage', reducer });
const withSaga = injectSaga({ key: 'projectPage', saga });

export default compose(withReducer, withSaga, withConnect)(ProjectPage);
