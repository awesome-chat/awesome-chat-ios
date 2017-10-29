import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import MessageItem from './MessageItem';
import SearchInput from '../../components/SearchInput';

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
        <ScrollView>
          <SearchInput />
          {[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ].map(d => <MessageItem key={d.key} navigation={this.props.navigation}/>)}
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
