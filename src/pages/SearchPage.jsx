import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Heading,
  Masonry,
  Text,
  Link,
} from 'gestalt';
import { ip } from '../config';

function Item(item) {
  console.log(item);
  return (
    <Box color="white" padding={2} display="flex" direction="column">
      <img
        alt=""
        width="250"
        height="250"
        src={item.data.logo}
        style={{
          borderRadius: '10px',
        }}
      />
      <Box marginTop={2}>
        <Link href={`${process.env.PUBLIC_URL}/restaurant/${item.data.resId}`}>{item.data.name}</Link>
      </Box>
      <Box marginTop={1}>
        <Text>@{item.data.type}</Text>
      </Box>
    </Box>
  );
}

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cardList: [],
    };
  }

  componentWillMount() {
    axios.get(`${ip}/restaurant/name/${this.props.match.params.keyword}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          cardList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps() {
    axios.get(`${ip}/restaurant/name/${this.props.match.params.keyword}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          cardList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Box color="white" padding={8}>
        <Heading size="md">Result(s)</Heading>
        <Masonry
          comp={Item}
          items={this.state.cardList}
          minCols={1}
          flexible
        />
      </Box>
    );
  }
}

export default withRouter(SearchPage);
