import React from 'react';
import { Box, Divider } from 'gestalt';
import TopRestaurant from '../components/TopRestaurant';
import TopMenu from '../components/TopMenu';


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }
  render() {
    return (
      <Box display="flex" direction="column">
        <TopRestaurant />
        <Divider />
        <TopMenu />
        <Divider />
      </Box>
    );
  }
}

export default HomePage;
