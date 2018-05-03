import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Text,
  Card,
  Box,
  Link,
  Avatar,
  Button,
} from 'gestalt';

class SuggestCard extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      active: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      active: false,
    });
  }

  render() {
    if (this.props.data) {
      //console.log(this.props.data.name);
      return (
        <Box maxWidth={236} padding={2} column={12}>
          <Card
            image={
              <Avatar
                name={this.props.data.name}
                src={this.props.data.logo}
              />
            }
            active={this.state.active}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <Text align="center" bold size="xl">
              <Link href="https://pinterest.com">
                <Box paddingX={3} paddingY={2}>
                  {this.props.data.name}
                </Box>
              </Link>
            </Text>
            <Button
              accessibilityLabel="Follow Ben Silbermann - Pinterest CEO"
              color="red"
              text="View"
              onClick={() => {
                this.props.history.push(`/restaurant/${this.props.data.resId}`);
              }}
            />
          </Card>
        </Box>
      );
    }
    return null;
  }
}
export default withRouter(SuggestCard);
