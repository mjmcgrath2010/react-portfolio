/**
 *
 * TopNavMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { makeSelectPathName } from '../../containers/App/selectors';

// eslint-disable-next-line react/prefer-stateless-function
class TopNavMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coloredNav: false,
      className: '',
    };
  }
  componentDidMount() {
    this.renderNav();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.pathName !== this.props.pathName) {
      this.renderNav(nextProps.pathName, true);
    }
  }
  handleScroll = () => {
    const scrollPos = window.scrollY;
    window.scroll();
    if (scrollPos > 60) {
      this.setState({ coloredNav: true, className: 'scroll active' });
    } else {
      const className = this.state.className.replace('scroll', '');
      this.setState({ coloredNav: true, className });
    }
  };
  renderNav = (nextPath, active) => {
    const path = nextPath || this.props.pathName;

    window.removeEventListener('scroll', this.handleScroll);
    if (path !== '/') {
      this.setState({
        coloredNav: true,
        className: 'dark',
      });
    } else {
      window.addEventListener('scroll', this.handleScroll);
      if (active) {
        this.setState({ className: 'active' });
      }
    }
  };
  render() {
    return (
      <nav id="topNav" className={this.state.className}>
        <ul id="mainNavMenu">
          <span id="navLogo">
            <li>
              <Link to="/">
                <svg id="nav-svg" height="25px" viewBox="0 0 153 49">
                  <g id="navGroup">
                    <path
                      d="M0.6,21.135 L21.115,7.22 L21.115,11.565 L4.56,22.73 L4.56,22.95 L21.115,34.115 L21.115,38.46 L0.6,24.545 L0.6,21.135 Z M31.455,3.92 L36.515,3.92 L41.63,19.265 L43.445,25.095 L43.665,25.095 L45.425,19.265 L50.485,3.92 L55.545,3.92 L55.545,40 L51.64,40 L51.64,19.705 C51.64,18.971663 51.6583331,18.110005 51.695,17.12 C51.7316668,16.129995 51.7774997,15.1308384 51.8325,14.1225 C51.8875003,13.1141616 51.9424997,12.1241715 51.9975,11.1525 C52.0525003,10.1808285 52.1166663,9.328337 52.19,8.595 L52.025,8.595 L49.66,16.295 L44.71,30.21 L42.235,30.21 L37.285,16.295 L34.865,8.595 L34.7,8.595 C34.7366668,9.328337 34.7916663,10.1808285 34.865,11.1525 C34.9383337,12.1241715 35.0116663,13.1141616 35.085,14.1225 C35.1583337,15.1308384 35.2133331,16.129995 35.25,17.12 C35.2866669,18.110005 35.305,18.971663 35.305,19.705 L35.305,40 L31.455,40 L31.455,3.92 Z M64.455,3.92 L69.515,3.92 L74.63,19.265 L76.445,25.095 L76.665,25.095 L78.425,19.265 L83.485,3.92 L88.545,3.92 L88.545,40 L84.64,40 L84.64,19.705 C84.64,18.971663 84.6583331,18.110005 84.695,17.12 C84.7316668,16.129995 84.7774997,15.1308384 84.8325,14.1225 C84.8875003,13.1141616 84.9424997,12.1241715 84.9975,11.1525 C85.0525003,10.1808285 85.1166663,9.328337 85.19,8.595 L85.025,8.595 L82.66,16.295 L77.71,30.21 L75.235,30.21 L70.285,16.295 L67.865,8.595 L67.7,8.595 C67.7366668,9.328337 67.7916663,10.1808285 67.865,11.1525 C67.9383337,12.1241715 68.0116663,13.1141616 68.085,14.1225 C68.1583337,15.1308384 68.2133331,16.129995 68.25,17.12 C68.2866669,18.110005 68.305,18.971663 68.305,19.705 L68.305,40 L64.455,40 L64.455,3.92 Z M102.515,48.8 L98.445,48.8 L116.485,0.95 L120.555,0.95 L102.515,48.8 Z M152.4,24.545 L131.885,38.46 L131.885,34.115 L148.44,22.95 L148.44,22.73 L131.885,11.565 L131.885,7.22 L152.4,21.135 L152.4,24.545 Z"
                      id="navigationPath"
                    />
                  </g>
                </svg>
              </Link>
            </li>
          </span>
          <span id="menuContainer">
            <li>
              <Link to={{ pathname: '/', hash: '#about' }}>About</Link>
            </li>
            <li>
              <Link to={{ pathname: '/', hash: '#playground' }}>Playground</Link>
            </li>
            <li>
              <Link to={{ pathname: '/', hash: '#mywork' }}>My Work</Link>
            </li>
            <li>
              <Link to={{ pathname: '/', hash: '#contact' }}>Get in Touch</Link>
            </li>
          </span>
        </ul>
      </nav>
    );
  }
}

TopNavMenu.propTypes = {
  pathName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  pathName: makeSelectPathName(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TopNavMenu);
