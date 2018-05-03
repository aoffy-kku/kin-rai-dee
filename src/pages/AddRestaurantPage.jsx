import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Divider,
  Label,
  Text,
  Switch,
  TextArea,
  TextField,
  SelectList,
  Container,
} from 'gestalt';
import FileBase64 from '../components/FileBase64';
import { ip } from '../config';


const types = [
  {
    value: 'restaurant',
    label: 'Restaurant',
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

class AddRestaurantPage extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: {
        userId: '',
        name: '',
        description: '',
        logo: '',
        cover: '',
        type: '',
        lat: '',
        lng: '',
        vegan: false,
        wifi: false,
        plug: false,
        air: false,
        motorcycle: false,
        car: false,
        open: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const isLoggedIn = localStorage.hasOwnProperty('user');
    const isOwner = localStorage.hasOwnProperty('restaurant');
    if (isLoggedIn && !isOwner) {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      let state = this.state.formData;
      state = { ...state, userId };
      this.setState({
        formData: state,
      });
    } else {
      this.props.history.replace('/');
    }
  }

  handleChange(name, value) {
    let state = this.state.formData;
    state = { ...state, [name]: value };
    this.setState({
      formData: state,
    });
  }

  render() {
    return (
      <Container>
        <Box color="white">
          <Box padding={4} display="flex" justifyContent="center">
            <Heading size="sm" color="red">
              Create your restaurant
            </Heading>
          </Box>
          <form onSubmit={(e) => {
            e.preventDefault();
            axios.post(
              `${ip}/restaurant`,
              this.state.formData,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            ).then((res) => {
              console.log(res.data);
              alert('Create your restaurant successfully. You must login again.');
              localStorage.clear();
              this.props.history.replace('/login');
            }).catch((error) => {
              console.log(error);
              alert('Create your restaurant fail.');
            });
          }}
          >
            <Box display="flex" direction="column" marginLeft={2} marginRight={2}>
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="open">
                    <Text bold>Open</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => this.handleChange(event.target.name, value)}
                    id="open"
                    name="open"
                    switched={this.state.formData.open}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="name">
                    <Text bold>Name</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <TextField
                    id="name"
                    name="name"
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    // errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                    placeholder="Restaurant Name"
                    value={this.state.formData.name}
                    type="text"
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="description">
                    <Text bold>Description</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <TextArea
                    id="description"
                    name="description"
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    // errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                    placeholder="Description"
                    value={this.state.formData.description}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="type">
                    <Text bold>Type</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <SelectList
                    id="type"
                    name="type"
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    options={types}
                    placeholder="Select type"
                    value={this.state.formData.type}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="lat">
                    <Text bold>Latitude</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <TextField
                    id="lat"
                    name="lat"
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    // errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                    placeholder="Latitude"
                    value={this.state.formData.lat}
                    type="text"
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="lng">
                    <Text bold>Longitude</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <TextField
                    id="lng"
                    name="lng"
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    // errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                    placeholder="Longitude"
                    value={this.state.formData.lng}
                    type="text"
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="logo">
                    <Text bold>Logo</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      this.handleChange('logo', base64);
                    }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="cover">
                    <Text bold>Cover</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      this.handleChange('cover', base64);
                    }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="vegan">
                    <Text bold>Vegan</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="vegan"
                    name="vegan"
                    switched={this.state.formData.vegan}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="wifi">
                    <Text bold>Wifi</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="wifi"
                    name="wifi"
                    switched={this.state.formData.wifi}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="plug">
                    <Text bold>Plug</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="plug"
                    name="plug"
                    switched={this.state.formData.plug}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="air">
                    <Text bold>Aircondition</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="air"
                    name="air"
                    switched={this.state.formData.air}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="motorcycle">
                    <Text bold>Motorcycle</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="motorcycle"
                    name="motorcycle"
                    switched={this.state.formData.motorcycle}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} display="flex">
                <Box column={4}>
                  <Label htmlFor="car">
                    <Text bold>Car</Text>
                  </Label>
                </Box>
                <Box column={8}>
                  <Switch
                    onChange={({ event, value }) => {
                      this.handleChange(event.target.name, value);
                    }}
                    id="car"
                    name="car"
                    switched={this.state.formData.car}
                  />
                </Box>
              </Box>
              <Divider />
              <Box padding={2} marginTop={4} display="flex" direction="column" column={12}>
                <Button type="submit" color="red" text="Create" />
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
}

export default withRouter(AddRestaurantPage);
