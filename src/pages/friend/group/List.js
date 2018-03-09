import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import api from '../../../model/api';
import Item from '../component/Item';

export default class GroupList extends Component {
  static navigationOptions = {
    title: '群组',
    tabBarLabel: '群组',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props)
    this.state = {
      rooms: []
    }
  }

  componentDidMount() {
    this.getCurrentUser(this.fetchlist)
  }

  getCurrentUser = (cb) => {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      cb(ret.userId)
    }).catch(err => {
      console.log(err.message);
    })
  }

  fetchlist = (userId) => {
    api.getGroupList({ userId }).then(({data}) => {
      console.log('list:', data)
      if (data.code === 0) {
        this.setState({
          rooms: data.data
        })
      }
    })
  }

  render() {
    const {rooms} = this.state
    return (
      <View style={styles.container}>
        {
          rooms.map(d => (
            <Item
              name={d.room.roomName || `群聊(${d.room.roomMemberId.split('-').length})`}
              key={d.roomId}
              link='Chat'
              params={{
                roomId: d.roomId,
                isGroup: true,
                roomMemberId: d.room.roomMemberId,
                otherSideName: d.room.roomName || `群聊(${d.room.roomMemberId.split('-').length})`
              }}
              navigation={this.props.navigation}
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
