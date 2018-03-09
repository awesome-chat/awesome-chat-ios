import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Image
} from 'react-native';
import { List, InputItem, ActivityIndicator, Button, Icon, Toast } from 'antd-mobile';
import _ from 'lodash'
import ep from '../../../store/index'
import api from '../../../model/api'

export default class GroupCreate extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '创建群',
    headerBackTitle: '返回',
  });

  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
      users: [],
      inputValue: '',
      loading: false,
      userInfo: {}
    }
    this.tmpArr = []
  }

  componentWillMount() {
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      this.setState({
        userInfo: ret,
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  handleChangeHoc = (e) => {
    this.tmpArr.push(e)
    this.setState({
      inputValue: e,
      loading: true
    })
    if(this.tmpArr.length > 0) {
      setTimeout(() => {
        this.handleChange(this.tmpArr[this.tmpArr.length - 1])
      }, 2000)
    }
  }

  handleChange = (e) => {
    if(e) {
      api.searchUsers({
        value: e
      }).then(({data}) => {
        if(data.code === 0) {
          this.setState({
            users: data.data.filter(d => d.userId !== this.state.userInfo.userId)
          })
        }
        this.setState({
          loading: false
        })
      })
    } else {
      this.setState({
        loading: false
      })
    }
    this.tmpArr = []
  }

  handleAdd = (data) => {
    const newMemberList = _.cloneDeep(this.state.memberList)
    let shouldAdd = true
    newMemberList.forEach(d => {
      if(d.userId === data.userId) {
        shouldAdd = false
      }
    })
    if( shouldAdd ) {
      newMemberList.push(data)
      this.setState({
        memberList: newMemberList
      })
    } else {
      Toast.info('该用户已添加', 1);
    }

  }

  handleSubmit = () => {
    const { userInfo, memberList } = this.state;
    // const roomId = [userInfo.userId].concat(memberList.map(d => d.userId)).join('-')
    const otherIds = memberList.map(d => d.userId)
    const memberNum = otherIds.length + 1
    // 判断room是否存在
    api.createRoom({
      userId: userInfo.userId,
      otherIds,
      isGroup: 1
    }).then(({ data }) => {
      console.log(data)
      // 创建新的房间
      if (data.type === 'create') {
        // 通知服务端
        api.sendMessage({
          userId: userInfo.userId,
          roomId: data.data.roomId,
          roomMemberId: data.data.roomMemberId,
          content: '新房间已创建',
          userName: userInfo.userName,
          isGroup: true,
        })
        // 本地存储
        storage.load({
          key: 'rooms'
        }).then(ret => {
          const newRooms = _.cloneDeep(ret)
          newRooms.unshift({
            roomId: data.data.roomId,
            isGroup: true,
            roomMemberId: data.data.roomMemberId,
            otherSideName: `群聊(${memberNum})`,
            messages: [{
              sysMessage: true,
              createTime: Date.parse(new Date()),
              content: '新房间已创建'
            }]
          })
          storage.save({
            key: 'rooms',
            data: newRooms
          }).then(d => {
            // 跳转并刷新
            this.handleJump({
              roomId: data.data.roomId,
              roomName: data.data.roomName,
              roomMemberId: data.data.roomMemberId,
              memberNum
            })
            ep.emit('update')
          })
        })
        return
      }
      // 房间已存在直接跳转
      this.handleJump({
        roomId: data.data.roomId,
        roomName: data.data.roomName,
        roomMemberId: data.data.roomMemberId,
        isGroup: true,
        memberNum
      })
    })
  }

  handleJump = ({
    roomId,
    roomName,
    memberNum,
    roomMemberId
  }) => {
    this.props.navigation.navigate(
      'Chat',
      {
        isGroup: true,
        sysMessage: true,
        roomId,
        roomMemberId,
        otherSideName: roomName || `群聊(${memberNum})`
      }
    )
  }

  handleDelete = (data) => {
    const newMemberList = this.state.memberList.filter(d => d.userId !== data.userId)
    this.setState({
      memberList: newMemberList
    })
  }

  render() {
    const {users, inputValue, loading, memberList} = this.state;
    return (
      <View style={styles.container}>
        <List
          style={{width: '100%'}}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: '#eee'
            }}
          >
            <TextInput
              style={{
                borderRadius: 4,
                padding: 5,
                backgroundColor: '#fff',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
                color:'#999'
              }}
              autoFocus
              value={inputValue}
              onChangeText={this.handleChangeHoc}
              placeholder="请输入姓名或misId"
            />
          </View>
          <View style={{flexDirection: 'row', paddingTop: 10, flexWrap: 'wrap' }}>
            {memberList.map(d => (
              <Button
                key={d.userId}
                size={16}
                onClick={() => {this.handleDelete(d)}}
                style={{
                  marginBottom: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  width: 100,
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: '#999'
                  }}
                >{d.userName}</Text>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 6,
                    marginLeft: 10
                  }}
                  source={require('../../../asset/minus.png')}
                />
              </Button>
            ))}
          </View>
          <View style={{padding: 10}}>
            <Button
              disabled={memberList.length < 2}
              type="primary"
              size={18}
              style={{padding: 10}}
              onClick={this.handleSubmit}
            >创建群</Button>
          </View>
          {
            users.length > 0 && !loading ? (
              users.map(d => (
                <List.Item
                  disabled
                  key={d.userId}
                  onClick={() => {this.handleAdd(d)}}
                >
                  <Text style={{ color: '#666' }}>{`${d.userName}(${d.userMisId})`}</Text>
                </List.Item>
              ))
            ) : null
          }
          {
            inputValue && users.length === 0 && !loading ? (
              <List.Item>
                <Text style={{color: '#666'}}>没有找到相关联系人</Text>
              </List.Item>
            ) : null
          }
          {
            loading ? (
              <List.Item>
                <ActivityIndicator />
              </List.Item>
            ) : null
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
