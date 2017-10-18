
import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Login from '../pages/Login';
import ChatList from '../pages/ChatList';
import ColleagueList from '../pages/ColleagueList';
import UserInfo from '../pages/UserInfo';

const tab = TabNavigator({
  ChatList: {screen: ChatList},
  ColleagueList: {screen: ColleagueList},
  UserInfo: {screen: UserInfo}
})

export default StackNavigator({
  Login: {screen: Login},
  Tab: {screen: tab},
}, {
  headerMode: 'none'
});