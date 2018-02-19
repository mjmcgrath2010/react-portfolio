/**
 *
 * TopNavMenu
 *
 */

import React from 'react';
// import styled from 'styled-components';

function TopNavMenu() {
  return (
    <nav id="topNav">
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

TopNavMenu.propTypes = {};

export default TopNavMenu;
