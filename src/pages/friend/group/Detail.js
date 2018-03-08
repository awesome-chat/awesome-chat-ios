import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import api from '../../../model/api'
import Item from '../component/Item';
import { Button, Grid } from 'antd-mobile';

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
      members: [],
      rooms: [],
      roomId: params.roomId,
      messageList: [],
      isGroup: params.isGroup,
      otherSideName: params.otherSideName,
    }
  }

  componentWillMount() {
    this.getLocalStorage()
    this.getRoomDetail()
  }

  getRoomDetail = () => {
    api.getRoomDetail({
      roomId: this.state.roomId
    }).then(({ data }) => {
      this.setState({
        members: data.data.map(d => d.user)
      })
      console.log(data)
    })
  }

  getLocalStorage = () => {
    storage.getBatchData([
      { key: 'userInfo' },
    ]).then(results => {
      this.setState({
        userInfo: results[0],
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  handleLeave = () => {
    
  }

  render() {
    const {rooms, otherSideName, members} = this.state

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View
              style={{
                overflow: 'hidden',
                width: 80,
                height: 80,
                backgroundColor:'#999',
                marginTop: 30,
                borderRadius: 10
              }}
            >
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
          <View style={{marginTop: 10}}>
            <View style={{ width: '100%', padding: 5 }}>
              <Text style={{ fontSize: 16, color: '#999' }}>群成员：</Text>
            </View>
            <View style={{ width: '100%', padding: 5, backgroundColor: '#fff', marginTop: 5 }}>
              <Grid
                hasLine={false}
                data={members}
                columnNum={4}
                onClick={d => {
                  this.props.navigation.navigate('FriendDetail',{userId: d.userId})
                }}
                renderItem={d => (
                  <View style={{ justifyContent:'center', alignItems:'center' }}>
                    <View
                      style={{
                        overflow: 'hidden',
                        width: 60,
                        height: 60,
                        backgroundColor:'#eee',
                        marginTop: 8,
                        marginBottom: 6,
                        borderRadius: 30
                      }}
                    >
                      <Image
                        source={{uri: `http://localhost:3000/static/img/${d.userAvatar}`}}
                        style={{width: 60, height: 60}}
                      />
                    </View>
                    <Text style={{ color: '#666'}}>{d.userName}</Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Button
              style={{
                marginTop: 20,
                width: '95%'
              }}
              onClick={this.handleLeave}
              type="warning"
            >退出群</Button>
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
