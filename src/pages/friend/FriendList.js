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
        <DepartmentItem navigation={this.props.navigation}/>
        <FriendItem navigation={this.props.navigation}/>
        <FriendItem navigation={this.props.navigation}/>
        {/*<FlatList
          data={[
            {key: 'Devin'}, 
            {key: '111'}, 
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />*/}
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
