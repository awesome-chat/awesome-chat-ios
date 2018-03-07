import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView
} from 'react-native';

import Item from '../component/Item';

export default class GroupDetail extends Component {
  static navigationOptions = {
    title: '群详情',
    tabBarLabel: '群详情',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props)
    const {params = {}} = this.props.navigation.state;
    this.state = {
      rooms: [],
      roomId: params.roomId,
      messageList: [],
      isGroup: params.isGroup,
      otherSideName: params.otherSideName,
    }
  }

  componentWillMount() {
    this.getLocalStorage()
  }

  getLocalStorage = () => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'rooms' }
    ]).then(results => {
      this.setState({
        userInfo: results[0],
        rooms: results[1],
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  render() {
    const {rooms, otherSideName} = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={{overflow: 'hidden', width: 80,height: 80, backgroundColor:'#999', marginTop: 30, borderRadius: 10}}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{uri: `http://localhost:3000/static/img/${1}`}}
              />
            </View>
            <View style={{marginTop: 15, flexDirection: 'row',}}>
              <Text style={{
                color: '#999',
                fontSize: 20,
                fontWeight: 'bold',
                }}>{otherSideName}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
   },
   img: {
     marginLeft: 5,
     width: 18,
     height: 18,
   },
   header: {
     height: 180,
     backgroundColor:'#fff',
     flexDirection:'column',
     alignItems:'center',
     marginBottom: 5,
     marginTop: 5,
   },
})
