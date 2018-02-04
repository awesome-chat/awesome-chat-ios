import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import Item from '../component/Item';

export default class GroupList extends Component {
  static navigationOptions = {
    title: '群组',
    tabBarLabel: '群组',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props)
    this.state = {
      rooms: []
    }
  }

  componentWillMount() {
    this.getList()
  }

  getList() {
    storage.load({
      key: 'rooms',
    }).then(ret => {
      console.log('ret', ret, ret.filter(d => d.isGroup))
      
      this.setState({
        rooms: ret.filter(d => d.isGroup),
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  render() {
    const {rooms} = this.state
    console.log('rooms', rooms)
    return (
      <View style={styles.container}>
        {
          rooms.map(d => (
            <Item name={d.otherSideName} key={d.roomId} link='Chat' params={{roomId: d.roomId, otherSideName: d.otherSideName}} navigation={this.props.navigation}/>
          ))
        }
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
