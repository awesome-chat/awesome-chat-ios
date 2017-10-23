
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/MessageList';
import Chat from '../pages/message/Chat';
import FriendList from '../pages/friend/FriendList';
import UserInfo from '../pages/UserInfo';

// 消息
const message = StackNavigator({
  MessageList: {screen: MessageList},
},{
  initialRouteName: 'MessageList'
});

// 通讯录
const friend = StackNavigator({
  FriendList: {screen: FriendList},
},{
  initialRouteName: 'FriendList'
});

const tab = TabNavigator({
  Message: {screen: message},
  Friend: {screen: friend},
  UserInfo: {screen: UserInfo},
})

const chat = StackNavigator({
  Chat: {screen: Chat},
});

export default StackNavigator({
  Login: {screen: Login},
  Tab: {screen: tab},
  Chat: {screen: chat},
}, {
  headerMode: 'none'
});