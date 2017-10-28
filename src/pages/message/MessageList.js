import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import MessageItem from './MessageItem';

export default class MessageList extends Component {
  static navigationOptions = {
    title: '消息',
    tabBarLabel: '消息',
    headerLeft: null,
    tabBarIcon: ({ focused }) => {
      return focused ? <Image
        source={require('../../asset/message_fill.png')}
        style={{width: 30, height: 30}}
      /> : <Image
        source={require('../../asset/message.png')}
        style={{width: 30, height: 30}}
      /> 
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <MessageItem navigation={this.props.navigation}/>}
        />
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
