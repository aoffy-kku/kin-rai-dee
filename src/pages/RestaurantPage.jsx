import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Button,
  Column,
  Heading,
  Text,
  Divider,
  Container,
  Avatar,
  Icon,
  Modal,
  Label,
  TextField,
  TextArea,
  SelectList,
  Switch,
} from 'gestalt';
import FileBase64 from '../components/FileBase64';
import Menu from '../components/Menu';

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

const isLoggedIn = localStorage.hasOwnProperty('user');
const userId = isLoggedIn ? JSON.parse(localStorage.getItem('user')).userId : null;
const isOwner = localStorage.hasOwnProperty('restaurant');
const resId = isOwner ? JSON.parse(localStorage.getItem('restaurant')).resId : null;

class RestaurantPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      username: '',
      isLoaded: false,
      isFollowed: null,
      follower: [],
      defaultData: {
        resId: null,
        name: '',
        description: '',
        logo: '',
        cover: '',
        type: types[0].value,
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
      formData: {
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
    this.handleEdit = this.handleEdit.bind(this);
    this.getFollow = this.getFollow.bind(this);
  }

  componentWillMount() {
    // const username = JSON.parse(localStorage.getItem('user')).username;
    // this.setState({
    //   username: username,
    // });
    axios.get(`${ip}/restaurant/${this.props.match.params.id}`)
      .then((res) => {
        // console.log(res.status);
        if (res.data.length === 0) {
          this.props.history.replace('/');
        } else {
          this.setState({
            defaultData: res.data,
            formData: res.data,
          });
        }
      }).catch((error) => {
        console.log(error);
        this.props.history.replace('/');
      });
    this.getFollow();
  }

  getFollow() {
    axios.get(`${ip}/follow/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          follower: res.data,
        });
      }).catch((error) => {
        console.log(error);
        // this.props.history.replace('/');
      });

    if (isLoggedIn) {
      axios.get(`${ip}/follow/${userId}/${this.props.match.params.id}`)
        .then((res) => {
          console.log(res.data);
          this.setState({
            isFollowed: res.data,
          });
        }).catch((error) => {
          console.log(error);
          // this.props.history.replace('/');
        });
    }
  }

  handleChange(name, value) {
    let state = this.state.formData;
    state = { ...state, [name]: value };
    this.setState({
      formData: state,
    });
  }

  handleEdit(isOpen) {
    this.setState({
      isOpen,
      formData: this.state.defaultData,
    });
  }

  render() {
    return (
      <Box padding={3}>
        <Container>
          <Box
            color="white"
            column={12}
            display="flex"
            direction="column"
            shape="roundedTop"
          >
            <div style={{
              height: '300px',
              zIndex: 0,
              backgroundImage: `url(${this.state.defaultData.cover})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '8px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
            />
            {/* PROFILE */}
            <Box display="flex" padding={5} wrap>
              <Column span={12} smSpan={12} mdSpan={3} lgSpan={3}>
                <Box
                  color="red"
                  shape="circle"
                  width={180}
                  height={180}
                  padding={3}
                >
                  <Avatar
                    src={this.state.defaultData.logo}
                    name="kinraidee"
                    verified={this.state.defaultData.open}
                  />
                </Box>
              </Column>
              <Column span={12} smSpan={12} mdSpan={9} lgSpan={9}>
                <Box
                  display="flex"
                  direction="column"
                  padding={3}
                >
                  <Box minWidth={300} display="flex" direction="column">
                    <Heading size="sm">
                      {this.state.defaultData.name}
                    </Heading>
                    <Box display="flex" marginTop={2}>
                      <Text color="gray">@kinraidee</Text>
                    </Box>
                  </Box>
                  {
                    (this.state.isFollowed !== null && ((!isOwner || this.props.match.params.id != resId) && isLoggedIn && !this.state.isFollowed)) ? (
                      <Box display="flex" alignItems="center" marginTop={8} column={12}>
                        <Button
                          text={`Follow`}
                          color="red"
                          onClick={() => {
                            axios.post(
                              `${ip}/follow`,
                              {
                                resId: this.props.match.params.id,
                                userId,
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                              },
                            ).then((res) => {
                              console.log(res.data);
                              this.getFollow();
                            }).catch((error) => {
                              console.log(error);
                            });
                          }}
                        />
                      </Box>
                    ) : (
                        isLoggedIn && this.state.isFollowed ? (
                          <Box display="flex" alignItems="center" marginTop={8} column={12}>
                            <Button
                              text="Unfollow"
                              color="darkGray"
                              onClick={() => {
                                const follower = this.state.follower;
                                const follow = follower.filter((obj) => {
                                  return obj.userId === userId
                                });
                                console.log(follow);
                                axios.delete(
                                  `${ip}/follow/${follow[0].followId}`,
                                ).then((res) => {
                                  console.log(res.data);
                                  this.getFollow();
                                }).catch((error) => {
                                  console.log(error);
                                });
                              }}
                            />
                          </Box>
                        ) : (
                            <Box display="flex" alignItems="center" marginTop={2} column={12}>
                              <Text bold>{`${this.state.follower.length}`}</Text>
                              <Box marginLeft={1}>
                                <Text>{`followers`}</Text>
                              </Box>
                            </Box>
                          )
                      )
                  }
                  {
                    (isOwner && resId == this.props.match.params.id) ? (
                      <Box display="flex" alignItems="center" marginTop={8} column={12}>
                        <Button
                          text="Edit"
                          color="gray"
                          onClick={() => this.handleEdit(true)}
                        />
                      </Box>
                    ) : null
                  }
                </Box>
              </Column>
            </Box>
            {/* PROFILE */}
            {/* INFORMATION */}
            <Box marginLeft={5} marginTop={4}>
              <Text color="darkGray" size="lg">
                ข้อมูลพื้นฐาน
              </Text>
            </Box>
            <Box display="flex" direction="row" wrap>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.vegan ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    vegan
                  </Text>
                </Box>
              </Column>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.wifi ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    wifi
                  </Text>
                </Box>
              </Column>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.plug ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    plug
                  </Text>
                </Box>
              </Column>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.air ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    aircondition
                  </Text>
                </Box>
              </Column>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.motorcycle ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    motorcycle
                  </Text>
                </Box>
              </Column>
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3}>
                <Box padding={4} alignItems="center" display="flex">
                  <Box marginRight={1} padding={1}>
                    <Icon
                      icon="check"
                      accessibilityLabel="check"
                      color={this.state.defaultData.car ? 'red' : 'gray'}
                    />
                  </Box>
                  <Text align="center" bold color="darkGray">
                    car
                  </Text>
                </Box>
              </Column>
            </Box>
            {/* INFORMATION */}
            <Divider />
            {/* DESCRIPTION */}
            <Box marginLeft={5} marginTop={4}>
              <Text color="darkGray" size="lg">
                เกี่ยวกับเรา
              </Text>
            </Box>
            <Box display="flex" direction="row" padding={5}>
              <Text>{this.state.defaultData.description}</Text>
            </Box>
            {/* DESCRIPTION */}
            <Divider />
            {/* MENU */}
            <Menu />
            {/* MENU */}
          </Box>
        </Container>
        {/* Edit Modal */}
        {
          this.state.isOpen ?
            (
              <Modal
                accessibilityCloseLabel="close"
                accessibilityModalLabel="Edit restaurant's board"
                heading="Edit your restaurant"
                onDismiss={() => this.handleEdit(false)}
              >
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log(this.state.formData);
                  axios.put(
                    `${ip}/restaurant/${this.props.match.params.id}`,
                    this.state.formData,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  ).then((res) => {
                    console.log(res.data);
                    this.setState({
                      defaultData: res.data,
                      isOpen: false,
                    });
                    this.getFollow();
                  }).catch((error) => {
                    console.log(error);
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
                    <Box padding={2} display="flex" direction="column" column={12}>
                      <Box marginBottom={1}>
                        <Button type="submit" color="red" text="Save" />
                      </Box>
                      <Button
                        type="button"
                        color="gray"
                        text="Cancle"
                        onClick={() => this.handleEdit(false)}
                      />
                    </Box>
                  </Box>
                </form>
              </Modal>
            ) : null
        }
        {/* Edit Modal */}
      </Box>
    );
  }
}

export default withRouter(RestaurantPage);
