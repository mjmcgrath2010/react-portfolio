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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProjectPage from './selectors';
import reducer from './reducer';
import saga from './saga';

// Components
import TopNavMenu from '../../components/TopNavMenu/index';

// eslint-disable-next-line react/prefer-stateless-function
export class ProjectPage extends React.PureComponent {
  render() {
    return (
      <div>
        <TopNavMenu />
      </div>
    );
  }
}

ProjectPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectpage: makeSelectProjectPage(),
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
