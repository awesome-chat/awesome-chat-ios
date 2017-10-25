
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/MessageList';
import Chat from '../pages/message/Chat';
import FriendList from '../pages/friend/FriendList';
import FriendDetail from '../pages/friend/FriendDetail';
import DepartmentList from '../pages/friend/DepartmentList';
import UserInfo from '../pages/UserInfo';


const tab = TabNavigator({
  MessageList: {
    screen: MessageList,
    headerLeft: 'none',
  },
  FriendList: {screen: FriendList},
  UserInfo: {screen: UserInfo},
})

export default StackNavigator({
  Login: {screen: Login},
  Tab: {screen: tab},
  Chat: {screen: Chat},
  FriendDetail: {screen: FriendDetail},
  DepartmentList: {screen: DepartmentList},
});