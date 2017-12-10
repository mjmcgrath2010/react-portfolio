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
// import { defaultAction } from './actions';
import BackgroundImage from '../../images/background.jpg';
import EvenBackground from '../../images/whirlpool.png';
// import messages from './messages';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  background: url(${BackgroundImage}) center;
  background-size: cover;
  display: table;
`;

const EvenSection = styled.section`
  height: auto;
  width: 100%;
  background: url(${EvenBackground}) center repeat;
  display: table;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2em 0;
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
        <EvenSection>
          <Wrapper>
            <h2>About Me</h2>
          </Wrapper>
        </EvenSection>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(Home);
