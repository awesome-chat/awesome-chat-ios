import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import Item from './Item';

export default class DepartmentList extends Component {
  static navigationOptions = {
    title: '帮助台',
    tabBarLabel: '帮助台',
    headerBackTitle: '返回',
  };

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Item navigation={this.props.navigation}/>
        <Item navigation={this.props.navigation}/>
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
