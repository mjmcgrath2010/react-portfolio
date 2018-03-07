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
// import { FormattedMessage } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { defaultAction } from './actions';

import About from './sections/about';
import MySkills from './sections/skills';
import MyWork from './sections/mywork';
import Contact from './sections/contact';
import Playground from './sections/playground';
import Logo from '../../components/Logo';
import TopNavMenu from '../../components/TopNavMenu';

import { EvenSection, HeroContainer, OddSection, Footer, AccentSection } from './styles';
import { FETCH_TICKERS, FETCH_MARKET_DATA } from './constants';

// import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return (
      <div id="homeContainer">
        <HeroContainer>
          <TopNavMenu />
          <div className="hero-text">
            <Logo />
          </div>
        </HeroContainer>
        <EvenSection id="about">
          <About />
        </EvenSection>
        <OddSection id="playground">
          <Playground />
        </OddSection>
        <EvenSection id="mywork">
          <MyWork />
        </EvenSection>
        <OddSection>
          <MySkills />
        </OddSection>
        <AccentSection id="contact">
          <Contact />
        </AccentSection>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  fetchData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch({ type: FETCH_TICKERS });
      dispatch({ type: FETCH_MARKET_DATA });
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(Home);
