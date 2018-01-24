import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { Toast, Badge } from 'antd-mobile';
import MessageItem from './Item';
import SearchInput from '../../components/SearchInput';
import api from '../../model/api';
import ep from '../../store'

export default class MessageList extends Component {
  static navigationOptions = {
    title: '消息',
    tabBarLabel: '消息',
    headerLeft: null,
    tabBarIcon: ({ focused }) => {
      return focused ? <View style={{width: 30, height: 30}}>
        <Badge text={''}>
          <Image
            source={require('../../asset/message_fill.png')}
            style={{width: 30, height: 30}}
          />
        </Badge>
      </View> : <Image
        source={require('../../asset/message.png')}
        style={{width: 30, height: 30}}
      /> 
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      rooms: []
    }
  }

  componentWillMount() {
    this.getLocalStorage()
    this.getUserInfo(this.fetchMessage)
  }

  getLocalStorage = () => {
    storage.load({
      key: 'rooms'
    }).then(ret => {
      this.setState({
        rooms: ret
      })
    }).catch(err => {
      console.warn(err.message);
    })
  }

  getUserInfo = (cb) => {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      cb(ret.userId)
    }).catch(err => {
      console.warn(err.message);
    })
  }

  fetchMessage = (userId) => {
    api.getMessage({
      userId
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        storage.save({
          key: 'message',
          data: data.data,
        });
      } else {
        Toast.info('拉取信息失败', 1);
      }
    })
  }

  render() {
    const { rooms } = this.state
    console.log('render', rooms)
    return (
      <View style={styles.container}>
        <ScrollView>
          <SearchInput />
          {rooms.map((d,i) => (
            <MessageItem
              key={d.roomId}
              roomId={d.roomId}
              otherSideName={d.otherSideName}
              message={d.messages[d.messages.length - 1]}
              navigation={this.props.navigation}/>
          ))}
        </ScrollView>
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
