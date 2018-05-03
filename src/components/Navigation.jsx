import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import {
  Box,
  Column,
  Heading,
  Link,
  SearchField,
  Button,
  Modal,
  Divider,
  Label,
  Text,
  Switch,
  TextArea,
  TextField,
  SelectList,
} from 'gestalt';
import FileBase64 from './FileBase64';

const types = [
  {
    value: 'rest',
    label: 'Rest',
  },
  {
    value: 'cafe',
    label: 'Cafe',
  },
  {
    value: 'buffet',
    label: 'Buffet',
  },
  {
    value: 'bar',
    label: 'Bar',
  },
];

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(search) {
    this.setState({
      search,
    });
    // console.log(this.state.search);
    if (search.length === 0) {
      this.props.history.replace('/');
    } else {
      this.props.history.replace(`/search/${search}`);
    }
  }

  render() {
    return (
      <div style={{ marginBottom: '16px' }}>
        {/* Navbar */}
        <Box
          padding={2}
          display="flex"
          direction="row"
          alignItems="center"
          color="white"
          wrap
        >
          <Column span={12} smSpan={12} mdSpan={3} lgSpan={3}>
            <Box padding={3} display="flex" alignItems="center" justifyContent="center">
              <Link href="/">
                <Heading size="xs" color="red">Kinraidee</Heading>
              </Link>
            </Box>
          </Column>
          <Column span={12} smSpan={12} mdSpan={6} lgSpan={6}>
            <SearchField
              id="search"
              accessibilityLabel="Search here"
              value={this.state.search}
              onChange={({ value }) => {
                this.handleSearchChange(value);
              }}
              onBlur={({ event }) => {
                this.handleSearchChange(event.target.value);
              }}
            />
          </Column>
          <Column span={12} smSpan={12} mdSpan={3} lgSpan={3}>
            {
              localStorage.hasOwnProperty('user') ? (
                <Box
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {
                    localStorage.hasOwnProperty('restaurant') ? (
                      <div style={{ marginLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                        <Button
                          type="button"
                          text="My Restaurant"
                          inline
                          onClick={() => { window.location.href = `/restaurant/${JSON.parse(localStorage.getItem('restaurant')).resId}` }}
                        />
                      </div>
                    ) : (
                        <div style={{ marginLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                          <Button
                            type="button"
                            text="Create Restaurant"
                            color="blue"
                            inline
                            onClick={() => { window.location.href = '/restaurant' }}
                          />
                        </div>
                      )
                  }
                  <div style={{ marginLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                    <Button
                      type="button"
                      text="Logout"
                      color="red"
                      inline
                      onClick={() => {
                        localStorage.clear();
                        this.props.history.replace('/');
                      }}
                    />
                  </div>
                </Box>
              ) : (
                  <Box
                    display="flex"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div style={{ marginLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                      <Button
                        type="button"
                        text="Register"
                        inline
                        onClick={() => { window.location.href = '/register' }}
                      />
                    </div>
                    <div style={{ marginLeft: '8px', marginTop: '2px', marginBottom: '2px' }}>
                      <Button
                        type="button"
                        text="Login"
                        color="red"
                        inline
                        onClick={() => { window.location.href = '/login' }}
                      />
                    </div>
                  </Box>
                )

            }
          </Column>
        </Box >
        {/* Navbar */}
      </div>
    );
  }
}

Navigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Navigation.defaultProps = {
  history: null,
};

export default withRouter(Navigation);
