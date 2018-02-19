/**
 *
 * TopNavMenu
 *
 */

import React from 'react';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class TopNavMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coloredNav: false,
    };
  }
  componentDidMount() {
    const that = this;
    let scrollPos = window.scrollY;

    window.addEventListener('scroll', () => {
      scrollPos = window.scrollY;
      if (scrollPos > 60) {
        that.setState({ coloredNav: true });
      } else {
        that.setState({ coloredNav: false });
      }
    });
  }
  render() {
    return (
      <nav id="topNav" className={this.state.coloredNav ? 'scroll' : ''}>
        <ul id="mainNavMenu">
          <span id="navLogo">
            <li>Logo Here</li>
          </span>
          <span id="menuContainer">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#playground">Playground</a>
            </li>
            <li>
              <a href="#mywork">My Work</a>
            </li>
            <li>
              <a href="#contact">Get in Touch</a>
            </li>
          </span>
        </ul>
      </nav>
    );
  }
}

TopNavMenu.propTypes = {};

export default TopNavMenu;
