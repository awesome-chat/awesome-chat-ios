
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/MessageList';
import Chat from '../pages/message/Chat';
import FriendList from '../pages/friend/FriendList';
import FriendDetail from '../pages/friend/FriendDetail';
import DepartmentList from '../pages/friend/DepartmentList';
import UserInfo from '../pages/UserInfo';

// 消息
const message = StackNavigator({
  MessageList: {screen: MessageList},
},{
  initialRouteName: 'MessageList'
});

// 通讯录
const friend = StackNavigator({
  DepartmentList: {screen: DepartmentList},
  FriendList: {screen: FriendList},
},{
  initialRouteName: 'FriendList'
});

const tab = TabNavigator({
  Message: {screen: message},
  Friend: {screen: friend},
  UserInfo: {screen: UserInfo},
})

const stack = StackNavigator({
  Chat: {screen: Chat},
  FriendDetail: {screen: FriendDetail},
},{
  initialRouteName: 'FriendDetail'
});

export default StackNavigator({
  Login: {screen: Login},
  Tab: {screen: tab},
  Stack: {screen: stack},
}, {
  headerMode: 'none',
  initialRouteName: 'Stack'
});