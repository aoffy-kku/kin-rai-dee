import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
} from 'gestalt';
import Navigation from './components/Navigation';

function App(props) {
  return (
    <Box>
      <Navigation />
      {/* Pages */}
      {props.children}
      {/* Pages */}
    </Box>
  );
}

App.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  children: null,
};

export default App;
