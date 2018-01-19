
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/Index.js';
import Chat from '../pages/message/Chat';
import FriendList from '../pages/friend/Index.js';
import FriendDetail from '../pages/friend/FriendDetail';
import DepartmentList from '../pages/friend/DepartmentList';
import GroupList from '../pages/friend/GroupList';
import ServiceList from '../pages/friend/ServiceList';
import UserInfo from '../pages/UserInfo';
import createStorage from '../model/storage';

createStorage()

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
  Department: {screen: DepartmentList},
  Group: {screen: GroupList},
  Service: {screen: ServiceList},
});