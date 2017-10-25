import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import {
  FriendItem,
  DepartmentItem
} from './FriendItem';

export default class DepartmentList extends Component {
  static navigationOptions = {
    title: '部门名称',
    tabBarLabel: '部门名称',
    headerBackTitle: '返回',    
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../asset/联系人.png')}
        style={{width: 25, height: 25}}
      />
    )
  };

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <FriendItem navigation={this.props.navigation}/>
        <FriendItem navigation={this.props.navigation}/>
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
