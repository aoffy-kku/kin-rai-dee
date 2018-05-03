import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Heading,
  Label,
  TextField,
  Text,
  Button,
  Link,
  Toast,
} from 'gestalt';

import background from '../images/login.jpg';
import { ip } from '../config';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showErrorToast: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillMount() {
    if (localStorage.hasOwnProperty('user')) {
      this.props.history.replace('/');
    }
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleError(error) {
    this.setState({
      showErrorToast: error,
    });
    setTimeout(() => {
      this.setState({
        showErrorToast: false,
      });
    }, 1500);
  }


  render() {
    return (
      <div style={{
        position: 'absolute',
        width: '100vw',
        backgroundImage: `url(${background})`,
      }}
      >
        <Box
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          minWidth="100vw"
          minHeight="100vh"
          padding={3}
        >
          <Box
            color="white"
            display="flex"
            direction="column"
            padding={8}
            alignItems="center"
          >
            <Heading color="red">Login</Heading>
            <form onSubmit={(e) => {
              e.preventDefault();
              // console.log(`${ip}/user/signin`);
              axios.post(
                `${ip}/user/signin`,
                {
                  username: this.state.username,
                  password: this.state.password,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              ).then((res) => {
                // console.log(res.data);
                if (res.status === 500) {
                  this.handleError(true);
                  setTimeout(() => {
                    this.handleError(false);
                  }, 1500);
                } else {
                  if (res.data.user !== null) {
                    localStorage.setItem('user', JSON.stringify({
                      userId: res.data.user.userId,
                      username: res.data.user.username,
                    }));
                    if (res.data.restaurant !== null) {
                      localStorage.setItem('restaurant', JSON.stringify({
                        resId: res.data.restaurant.resId,
                      }));
                    }
                    window.location.href = '/';
                  } else {
                    this.handleError(true);
                  }
                  // window.location.href = '/';
                }
              })
                .catch((error) => {
                  this.handleError(true);
                });
            }}
            >
              <Box padding={2}>
                <Box marginBottom={2}>
                  <Label htmlFor="username">
                    <Text>Username</Text>
                  </Label>
                </Box>
                <TextField
                  id="username"
                  name="username"
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                  placeholder="Username"
                  value={this.state.username}
                  type="text"
                />
              </Box>
              <Box padding={2}>
                <Box marginBottom={2}>
                  <Label htmlFor="password">
                    <Text>Password</Text>
                  </Label>
                </Box>
                <TextField
                  id="password"
                  name="password"
                  errorMessage={(this.state.password.length < 8) ? 'Password must contain at least 8 characters' : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  placeholder="Password"
                  value={this.state.password}
                  type="password"
                />
              </Box>
              <Box padding={2}>
                <Button
                  color="red"
                  type="submit"
                  text="Submit"
                  disabled={(this.state.username.length === 0 || this.state.password.length < 8)}
                />
              </Box>
              <Box padding={2}>
                <Link href="/">
                  <Button color="gray" type="button" text="Back" />
                </Link>
              </Box>
              <Box padding={2} display="flex">
                <Box marginRight={2}>
                  <Text>Not registerd?</Text>
                </Box>
                <Link href="/register">
                  <Text color="red">Create an account</Text>
                </Link>
              </Box>
            </form>
          </Box >
        </Box>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 110,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {this.state.showErrorToast ? (
            <Toast color="orange" text="Oops, we couldn't login!" />
          ) : null}
        </Box>
      </div >
    );
  }
}

export default withRouter(LoginPage);
