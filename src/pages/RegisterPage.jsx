import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
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

class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      cpassword: '',
      email: '',
      firstname: '',
      lastname: '',
      birthdate: '',
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
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        width: '100vw',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'repeat',
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
            <Heading color="red">Register</Heading>
            <form onSubmit={(e) => {
              e.preventDefault();
              axios.post(
                `${ip}/user`,
                {
                  username: this.state.username,
                  password: this.state.password,
                  email: this.state.email,
                  birthdate: this.state.birthdate,
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              ).then((res) => {
                console.log(res.data);
                alert('Register account successfully.');
                this.props.history.replace('/login');
              })
                .catch((error) => {
                  this.handleError(true);
                  setTimeout(() => {
                    this.handleError(false);
                  }, 1500);
                });
            }}
            >
              <Box padding={2}>
                <Box
                  marginBottom={2}
                >
                  <Label htmlFor="firstname">
                    <Text>Firstname</Text>
                  </Label>
                </Box>
                <TextField
                  id="firstname"
                  name="firstname"
                  errorMessage={(this.state.firstname.length === 0) ? "Firstname can't be blank" : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  placeholder="Firstname"
                  value={this.state.firstname}
                  type="text"
                />
              </Box>
              <Box padding={2}>
                <Box marginBottom={2}>
                  <Label htmlFor="lastname">
                    <Text>Lastname</Text>
                  </Label>
                </Box>
                <TextField
                  id="lastname"
                  name="lastname"
                  errorMessage={(this.state.lastname.length === 0) ? "Lastname can't be blank" : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  placeholder="Lastname"
                  value={this.state.lastname}
                  type="text"
                />
              </Box>
              <Box padding={2}>
                <Box marginBottom={2}>
                  <Label htmlFor="birthdate">
                    <Text>Birthdate</Text>
                  </Label>
                </Box>
                <TextField
                  id="birthdate"
                  name="birthdate"
                  errorMessage={(this.state.birthdate.length === 0) ? "Birthdate can't be blank" : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  value={this.state.birthdate}
                  type="date"
                />
              </Box>
              <Box padding={2}>
                <Box marginBottom={2}>
                  <Label htmlFor="email">
                    <Text>Email</Text>
                  </Label>
                </Box>
                <TextField
                  id="email"
                  name="email"
                  errorMessage={(this.state.email.length === 0) ? 'Please input correct email pattern' : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  placeholder="Email Address"
                  value={this.state.email}
                  type="email"
                />
              </Box>
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
                <Box marginBottom={2}>
                  <Label htmlFor="password">
                    <Text>Confirm Password</Text>
                  </Label>
                </Box>
                <TextField
                  id="cpassword"
                  name="cpassword"
                  errorMessage={(this.state.password !== this.state.cpassword) ? 'Password not match' : null}
                  onChange={({ event, value }) => {
                    this.handleChange(event.target.name, value);
                  }}
                  placeholder="Password"
                  value={this.state.cpassword}
                  type="password"
                />
              </Box>
              <Box padding={2}>
                <Button
                  color="red"
                  type="submit"
                  text="Submit"
                  disabled={(this.state.username.length === 0 || this.state.password.length < 8)}
                  onClick={() => {

                  }}
                />
              </Box>
              <Box padding={2}>
                <Link href="/">
                  <Button color="gray" type="button" text="Back" />
                </Link>
              </Box>
              <Box padding={2} display="flex">
                <Box marginRight={2}>
                  <Text>Registerd?</Text>
                </Box>
                <Link href="/login">
                  <Text color="red">Login</Text>
                </Link>
              </Box>
            </form>
          </Box >
        </Box>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              position: 'absolute',
              bottom: 150,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {this.state.showErrorToast ? (
            <Toast color="orange" text="Oops, we couldn't register!" />
          ) : null}
        </Box>
      </div >
    );
  }
}

export default withRouter(RegisterPage);
