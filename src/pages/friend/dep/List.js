import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import Item from '../component/Item';
import api from '../../../model/api';

export default class DepartmentList extends Component {
  static navigationOptions = {
    title: this.props && this.props.navigation.state.params || '组织结构',
    tabBarLabel: '部门名称',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props);
    this.state = {
      owner: {},
      child: [],
      user: [],
      params: this.props && this.props.navigation.state.params || {}
    }
  }

  componentWillMount() {
    this.fetchList()
  }

  fetchList = () => {
    const { params } = this.state
    api.getDep({
      depId: params.depId || 1,
    })
    .then(({data}) => {
      this.setState({
        owner: data.data.owner,
        child: data.data.child || [],
        user: data.data.user || [],
      })
    })
  }

  render() {
    const { owner, child, user } = this.state;
    return (
      <View style={styles.container}>
        {
          owner && owner.user
          ? (
            <Item
              type="owner"
              navigation={this.props.navigation}
              name={owner.user.userName}
              userAvatar={owner.user.userAvatar}
              link={'FriendDetail'}
              params={{
                userId: owner.user.userId,
              }}/>
          ) : null
        }
        {child.map(d => <Item navigation={this.props.navigation} key={d.depId} name={d.depName} link={'Department'} params={{depId: d.depId}}/>)}
        {user.map(d => (
          <Item
            type="user"
            navigation={this.props.navigation}
            key={d.userId}
            name={d.userName}
            userAvatar={d.userAvatar}
            link={'FriendDetail'}
            params={{userId: d.userId}}
          />
        ))}
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
