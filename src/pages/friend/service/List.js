import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import Item from '../component/Item';

export default class DepartmentList extends Component {
  static navigationOptions = {
    title: '帮助台',
    tabBarLabel: '帮助台',
    headerBackTitle: '返回',
  };

  render() {
    return (
      <View style={styles.container}>
        <Item type='system' name='系统通知' style={{backgroundColor: '#ff7d14'}} link='Chat' params={{roomId:'system', otherSideName: '系统通知'}} navigation={this.props.navigation}/>
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
