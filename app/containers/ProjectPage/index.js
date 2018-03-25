/**
 *
 * ProjectPage
 *
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
