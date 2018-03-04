import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import Item from '../component/Item';

export default class GroupDetail extends Component {
  static navigationOptions = {
    title: '群详情',
    tabBarLabel: '群详情',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props)
    const {params = {}} = this.props.navigation.state;
    this.state = {
      rooms: [],
      roomId: params.roomId,
      messageList: [],
      isGroup: params.isGroup,
      otherSideName: params.otherSideName,
    }
  }

  componentWillMount() {
    this.getLocalStorage()
  }

  getLocalStorage = () => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'rooms' }
    ]).then(results => {
      this.setState({
        userInfo: results[0],
        rooms: results[1],
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  render() {
    const {rooms} = this.state
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
})
