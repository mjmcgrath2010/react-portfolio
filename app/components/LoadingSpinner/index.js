/**
 *
 * LoadingSpinner
 *
 */

import React from 'react';
import { Loader } from 'semantic-ui-react';
// import styled from 'styled-components';

function LoadingSpinner() {
  return (
    <div id="loadingSpinner">
      <Loader active inline="centered" size="massive">
        Loading
      </Loader>
    </div>
  );
}

// LoadingSpinner.propTypes = {};

export default LoadingSpinner;
