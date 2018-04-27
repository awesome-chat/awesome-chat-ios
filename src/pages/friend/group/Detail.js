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
import ep from '../../../store/index'
import Item from '../component/Item';
import { Button, Grid, Toast } from 'antd-mobile';

export default class GroupDetail extends Component {
  static navigationOptions = {
    title: '群详情',
    tabBarLabel: '群详情',
    headerBackTitle: '返回',
  };

  constructor(props) {
    super(props)
    const {params = {}} = this.props.navigation.state;
    console.log('params:', params)
    this.state = {
      members: [],
      rooms: [],
      userInfo: {},
      roomId: params.roomId,
      roomMemberId: params.roomMemberId,
      messageList: [],
      isGroup: params.isGroup,
      otherSideName: params.otherSideName,
      otherSideAvatar: params.otherSideAvatar,
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
    const { userInfo, roomId, roomMemberId } = this.state
    api.leaveGroup({
      userId: userInfo.userId,
      roomId,
      roomMemberId
    }).then(({ data }) => {
      if (data.code === 0) {
        Toast.info('退出群成功', 1)
        this.props.navigation.navigate('MessageList')

        storage.load({
          key: 'rooms'
        }).then(ret => {
          const newRooms = ret.filter(d => {
            return d.roomId !== roomId
          })
          storage.save({
            key: 'rooms',
            data: newRooms
          }).then(d => {
            ep.emit('update')        
          })
        })
      }
    })
  }

  render() {
    const {rooms, otherSideName, otherSideAvatar,  members} = this.state

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor:'#eee',
                marginTop: 30,
                borderRadius: 10,
                overflow: 'hidden'
              }}
            >
              {otherSideAvatar ? (
                <Image
                  style={styles.pic}
                  source={{uri: `http://47.95.234.220/static/img/${otherSideAvatar}`}}
                />
              ) : null}
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
                        source={{uri: `http://47.95.234.220/static/img/${d.userAvatar}`}}
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
  pic: {
    width: '100%',
    height: '100%'
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

