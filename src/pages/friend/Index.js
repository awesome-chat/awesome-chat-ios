import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Item from './component/Item';
import SearchInput from '../../components/SearchInput';

export default class FriendList extends Component {
  static navigationOptions = {
    title: '通讯录',
    tabBarLabel: '通讯录',
    headerBackTitle: '返回',    
    headerLeft: null,
    tabBarIcon: ({ focused }) => {
      return focused ? <Image
        source={require('../../asset/friend_fill.png')}
        style={{width: 30, height: 30}}
      /> : <Image
        source={require('../../asset/friend.png')}
        style={{width: 30, height: 30}}
      /> 
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SearchInput />
          <Item type='department' name='组织架构' style={{backgroundColor: '#7C7DBB'}} link={'Department'} navigation={this.props.navigation}/>
          <Item type='group' name='群组' style={{backgroundColor: '#70CF5B'}} link={'Group'} navigation={this.props.navigation}/>
          <Item type='service' name='帮助台' style={{backgroundColor: '#66D5F7'}} link={'Service'} navigation={this.props.navigation}/>
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
