
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/MessageList';
import FriendList from '../pages/friend/FriendList';
import UserInfo from '../pages/UserInfo';

const tab = TabNavigator({
  MessageList: {screen: MessageList},
  FriendList: {screen: FriendList},
  UserInfo: {screen: UserInfo}
})

export default StackNavigator({
  Login: {screen: Login},
  Tab: {screen: tab},
}, {
  headerMode: 'none'
});