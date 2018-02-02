
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import MessageList from '../pages/message/List.js';
import Chat from '../pages/message/chat/Index.js';
import FriendList from '../pages/friend/Index.js';
import FriendDetail from '../pages/friend/Detail';
import DepartmentList from '../pages/friend/dep/List';
import GroupList from '../pages/friend/group/List';
import GroupCreate from '../pages/friend/group/Create';
import ServiceList from '../pages/friend/service/List';
import UserInfo from '../pages/UserInfo';
import SearchList from '../pages/search/List';
import ResetPwd from '../pages/personal/password/Edit'
import FeedBack from '../pages/personal/feedback/Edit'
import SignIn from '../pages/personal/signin/Index'

const tab = TabNavigator({
  MessageList: {
    screen: MessageList,
    headerLeft: 'none',
    animationEnabled: false
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
  Search: {screen: SearchList},
  GroupCreate: {screen: GroupCreate},
  ResetPwd: {screen: ResetPwd},
  FeedBack: {screen: FeedBack},
  SignIn: {screen: SignIn},
}, {initialRouteName: 'Login'});