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

import { EvenSection, HeroContainer, OddSection, Footer, AccentSection } from './styles';

// import messages from './messages';

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
          <MyWork />
        </EvenSection>
        <OddSection>
          <MySkills />
        </OddSection>
        <EvenSection>
          <About />
        </EvenSection>
        <OddSection>
          <Playground />
        </OddSection>
        <AccentSection>
          <Contact />
        </AccentSection>
        <Footer />
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
