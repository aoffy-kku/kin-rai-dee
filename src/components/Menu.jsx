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
  Masonry,
} from 'gestalt';
import FileBase64 from '../components/FileBase64';
import { ip } from '../config';


const types = [
  {
    value: 'คาว',
    label: 'ของคาว',
  },
  {
    value: 'หวาน',
    label: 'ของหวาน',
  },
];


const isOwner = localStorage.hasOwnProperty('restaurant');
const resId = isOwner ? JSON.parse(localStorage.getItem('restaurant')).resId : null;

function Item(item) {
  console.log(item);
  return (
    <Box color="white" padding={2} display="flex" direction="column">
      <img
        alt=""
        width="100%"
        src={item.data.image}
        style={{
          borderRadius: '10px',
        }}
      />
      <Box marginTop={2}>
        <Text bold>{item.data.name}</Text>
      </Box>
      <Box marginTop={1}>
        <Text>฿ {item.data.price}</Text>
      </Box>
    </Box>
  );
}

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      name: '',
      image: '',
      price: '',
      type: types[0].value,
      menuList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }

  componentWillMount() {
    axios.get(`${ip}/menu/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          menuList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMenu() {
    axios.get(`${ip}/menu/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          menuList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleAdd(isOpen) {
    this.setState({
      isOpen,
    });
  }

  render() {
    return (
      <Box>
        <Box marginLeft={5} marginTop={4} display="flex" justifyContent="between">
          <Text color="darkGray" size="lg">
            เมนู
          </Text>
          {
            (isOwner && resId == this.props.match.params.id) ? (
              <Box marginRight={5}>
                <Button
                  color="red"
                  text="Add"
                  inline
                  onClick={() => {
                    this.handleAdd(true);
                  }}
                />
              </Box>
            ) : null
          }

        </Box>
        <Box padding={2}>
          <Masonry
            comp={Item}
            items={this.state.menuList}
            minCols={1}
          />
        </Box>
        {/* <Box padding={5} display="flex" direction="row" wrap>
          {
            this.state.menuList.map(data => (
              <Column span={12} smSpan={12} mdSpan={4} lgSpan={3}>
                <Box display="flex" justifyContent="center" padding={2}>
                  <img
                    key={data.menuId}
                    alt={data.name}
                    src={data.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '150px',
                    }}
                  />
                </Box>
              </Column>
            ))
          }
        </Box> */}
        {/* Add Modal */}
        {
          this.state.isOpen ?
            (
              <Modal
                accessibilityCloseLabel="close"
                accessibilityModalLabel="Add restaurant's menu"
                heading="Add your menu"
                onDismiss={() => this.handleAdd(false)}
              >
                <form onSubmit={(e) => {
                  e.preventDefault();
                  axios.post(
                    `${ip}/menu`,
                    {
                      resId,
                      name: this.state.name,
                      image: this.state.image,
                      type: this.state.type,
                      price: this.state.price,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  ).then((res) => {
                    console.log(res.data);
                    this.getMenu();
                    this.setState({
                      isOpen: false,
                      name: '',
                      image: '',
                      price: '',
                      type: types[0].value,
                    });
                  }).catch((error) => {
                    console.log(error);
                  });
                }}
                >
                  <Box display="flex" direction="column" marginLeft={2} marginRight={2}>
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
                          placeholder="Menu Name"
                          value={this.state.name}
                          type="text"
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
                          value={this.state.type}
                        />
                      </Box>
                    </Box>
                    <Divider />
                    <Box padding={2} display="flex">
                      <Box column={4}>
                        <Label htmlFor="price">
                          <Text bold>Price</Text>
                        </Label>
                      </Box>
                      <Box column={8}>
                        <TextField
                          id="price"
                          name="price"
                          onChange={({ event, value }) => {
                            this.handleChange(event.target.name, value);
                          }}
                          // errorMessage={(this.state.username.length === 0) ? "This field can't be blank!" : null}
                          value={this.state.price}
                          type="number"
                        />
                      </Box>
                    </Box>
                    <Divider />
                    <Box padding={2} display="flex">
                      <Box column={4}>
                        <Label htmlFor="image">
                          <Text bold>Image</Text>
                        </Label>
                      </Box>
                      <Box column={8}>
                        <FileBase64
                          multiple={false}
                          onDone={({ base64 }) => {
                            this.handleChange('image', base64);
                          }}
                        />
                      </Box>
                    </Box>
                    <Divider />
                    <Box padding={2} display="flex" direction="column" column={12}>
                      <Box marginBottom={1}>
                        <Button type="submit" color="red" text="Add" />
                      </Box>
                      <Button
                        type="button"
                        color="gray"
                        text="Cancle"
                        onClick={() => this.handleAdd(false)}
                      />
                    </Box>
                  </Box>
                </form>
              </Modal>
            ) : null
        }
        {/* Add Modal */}
      </Box>
    );
  }
}

export default withRouter(Menu);
