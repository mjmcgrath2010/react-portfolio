/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import { defaultAction } from './actions';
import BackgroundImage from '../../images/background.jpg';
// import messages from './messages';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  background: url(${BackgroundImage}) center;
  background-size: cover;
  display: table;
`;

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends React.Component {
  render() {
    return (
      <div>
        <HeroContainer>
          <div className="hero-text">
            <h1>The Portfolio of Mike McGrath</h1>
            <h3>Software Engineer</h3>
          </div>
        </HeroContainer>
        <section>
          <button onClick={this.props.test}>Test Redux</button>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  test: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    test: e => {
      e.preventDefault();
      dispatch(defaultAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(Home);
