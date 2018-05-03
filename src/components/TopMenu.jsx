import React from 'react';
import axios from 'axios';
import {
  Box,
  Column,
  Heading,
  Masonry,
  Text,
  Link
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
        src={item.data.image}
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
      <Box marginTop={1}>
        <Text>฿{item.data.price}</Text>
      </Box>
    </Box>
  );
}

class TopMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      cardList: [],
    };
  }

  componentWillMount() {
    axios.get(`${ip}/menu`)
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
        <Heading size="md">Menu(s)</Heading>
        {/* <Box
          display="flex"
          direction="row"
          alignItems="center"
          wrap
        >
          {
            this.state.cardList.map(data => (
              <Column span={12} smSpan={6} mdSpan={4} lgSpan={3} key={data.resId}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <SuggestCard
                    data={data}
                  />
                </Box>
              </Column>
            ))
          }
        </Box> */}
        <Box>
          <Masonry
            comp={Item}
            items={this.state.cardList}
            minCols={1}
            flexible
          />
        </Box>
      </Box>
    );
  }
}

export default TopMenu;
