import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Toast, Badge, Popover, Icon } from 'antd-mobile';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import _ from 'lodash';
import MessageItem from './Item';
import SearchInput from '../../components/SearchInput';
import api from '../../model/api';
import ep from '../../store'

export default class MessageList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '消息',
    tabBarLabel: '消息',
    headerLeft: null,
    headerRight: (
      <Popover
        overlayStyle={{
          width: 100,
          top: 40,
        }}
        overlay={[
          (
            <Popover.Item key="5" value="special">
              <TouchableHighlight
                onPress={() => {navigation.navigate('GroupCreate')}}
                underlayColor='#fff'
              >
                <Text>创建群</Text>
              </TouchableHighlight>
            </Popover.Item>
          ),
        ]}
      >
        <View style={{
          marginTop: 10,
          marginRight: 10,
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <Icon type="ellipsis"/>
        </View>
      </Popover>
    ),
    tabBarIcon: ({ focused }) => {
      return focused ? <View style={{width: 30, height: 30}}>
        <Badge text={''}>
          <Image
            source={require('../../asset/message_fill.png')}
            style={{width: 30, height: 30}}
          />
        </Badge>
      </View> : <Image
        source={require('../../asset/message.png')}
        style={{width: 30, height: 30}}
      /> 
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      list: [],
      rooms: []
    }
    api.connect()
  }

  componentWillMount() {
    this.listenMessage()
    this.getLocalStorage()
    this.getUserInfo(this.fetchMessage)
    ep.on('update', this.handleFocusChanged)
  }

  listenMessage = () => {
    api.listernMessage((data) => {
      storage.load({
        key: 'rooms'
      }).then(ret => {
        const newRooms = _.cloneDeep(ret);
        let createRoom = true
        newRooms.map(d => {
          if(d.roomId === data.roomId) {
            createRoom = false
            d.newMessageNum = (d.newMessageNum || 0) + 1
            d.otherSideAvatar = data.otherSideAvatar
            d.messages.push({
              isPic: data.isPic,
              createTime: data.createTime,
              content: data.content
            })
          }
        })
        if (createRoom) {
          newRooms.unshift({
            roomId: data.roomId,
            roomMemberId: data.roomMemberId,
            otherSideName: data.otherSideName,
            otherSideAvatar: data.otherSideAvatar,
            newMessageNum: 1,
            messages: [
              {
                isPic: data.isPic,
                sysMessage: data.sysMessage,                
                createTime: data.createTime,
                content: data.content
              }
            ]
          })
        }
        storage.save({
          key: 'rooms',
          data: newRooms
        }).then(d => {
          ep.emit('update')
        })
      })
    })
  }

  handleFocusChanged = () => {
    this.getLocalStorage()    
  }

  getLocalStorage = () => {
    storage.load({
      key: 'rooms'
    }).then(ret => {
      this.setState({
        rooms: ret || []
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  getUserInfo = (cb) => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'lastUpdateTime' }
    ]).then(results => {
      this.setState({
        userInfo: results[0]
      })
      cb(results[0].userId, results[1])
    }).catch(err => {
      console.log(err.message);
    })
  }

  fetchMessage = (userId, lastUpdateTime) => {
    // 上线
    api.userOnline({
      userId
    })
    // 拉取消息
    api.getMessage({
      userId,
      lastUpdateTime
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        this.updateList(userId, data)
        storage.save({
          key: 'lastUpdateTime',
          data:  Date.parse(new Date())
        });
      } else {
        Toast.info('拉取信息失败', 1);
      }
    })
  }

  updateList = (userId, data) => {
    console.log('gggggggget', data)
    const newRooms = _.cloneDeep(this.state.rooms)
    
    const newData = data.data.filter(d => d.messageFromId !== userId)
    const remoteRooms = {}

    newData.map((d) => {
      let createRoom = true
      newRooms.forEach((e) => {
        if (d.messageToId === e.roomId) {
          createRoom = false;
          e.newMessageNum = (e.newMessageNum || 0) + 1;
          e.otherSideAvatar = d.otherSideAvatar
          e.isGroup = d.isGroup
          e.messages.push({
            isRecommend: d.isRecommend,
            isPic: d.isPic,
            content: d.messageContent,
            createTime: d.createTime
          })
        }
      })
      if(createRoom) {
        newRooms.push({
          roomId: d.roomId,
          otherSideName: d.isGroup ? (d.room.roomName || `群聊(${d.room.roomMemberId.split('-').length})`) : d.user.userName,
          otherSideAvatar: d.otherSideAvatar,
          roomMemberId: d.room.roomMemberId,
          isGroup: d.isGroup,
          newMessageNum: 1,
          messages: [{
            isRecommend: d.isRecommend,
            isPic: d.isPic,
            content: d.messageContent,
            createTime: d.createTime
          }]
        })
      }
    })
    storage.save({
      key: 'rooms',
      data: newRooms,
    }).then(d => {ep.emit('update')});
  }

  refreshData = (PullRefresh) => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'lastUpdateTime' }
    ]).then(results => {
      const userId = results[0].userId
      api.getMessage({
        userId,
        lastUpdateTime: results[1]
      })
      .then(({data}) => {
        if (data && data.code === 0) {
          this.updateList(userId, data)
          Toast.info('拉取消息成功', 0.5);
        } else {
          Toast.info('拉取信息失败', 0.5);
        }
        PullRefresh.onRefreshEnd();
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  handleRefresh = (PullRefresh) => {
    this.refreshData(PullRefresh)
  }

  render() {
    const { rooms, userInfo } = this.state
    return (
      <View style={styles.container}>
        <PullRefreshScrollView ref="PullRefresh" onRefresh={this.handleRefresh}>
          <SearchInput navigation={this.props.navigation}/>
          {rooms.length === 0 ? <View style={styles.block}>
            <Image style={styles.block_img} source={require('../../asset/message_block.png')} />
            <Text style={styles.block_text}>暂无消息</Text>
          </View> : null}
          {rooms.map((d,i) => (
            <MessageItem
              userId={userInfo.userId}
              otherSideAvatar={d.otherSideAvatar}
              key={d.roomId || i}
              roomId={d.roomId}
              isGroup={d.isGroup}
              roomMemberId={d.roomMemberId}
              newMessageNum={d.newMessageNum}
              otherSideName={d.otherSideName}
              message={d.messages ? d.messages[d.messages.length - 1] : []}
              navigation={this.props.navigation}/>
          ))}
        </PullRefreshScrollView>
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
  block: {
    marginTop: 50,
    alignItems: 'center',
  },
  block_img: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  block_text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#bbb',
  }
})
