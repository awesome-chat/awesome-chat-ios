import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Toast } from 'antd-mobile';
import _ from 'lodash';
import KeyboardSpacer from '../../../components/KeyboardSpacer';
import Background from './Background'
import api from '../../../model/api'
import ep from '../../../store'

export default class Chat extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.otherSideName || '',
    headerBackTitle: '返回',
  });

  constructor(props){
    super(props);
    this.state = {
      showOther: false,
      textValue: '',
      user: {},
      roomId: '',
      messageList: [],
      rooms: [],
      otherSideId: '',
    }
  }

  componentWillMount() {
    // this.fetchDetail()
    this.initRoom()
    this.getLocalStorage()
  }

  fetchDetail = () => {
    // api.getUser({
    //   userId: this.props.navigation.state.otherSideId,
    // })
    // .then(({data}) => {
    //   if (data.code === 0) {
    //     this.setState({
    //       user: data.data || {},
    //     })
    //   }
    // })
  }

  initRoom = () => {
    const {params = {}} = this.props.navigation.state;
    // 必须携带roomId
    this.setState({
      roomId: params.roomId,
      otherSideName: params.otherSideName,
    })
  }

  getLocalStorage = () => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'rooms' }
    ]).then(results => {
      let messageList = [];
      results[1].forEach(d => {
        if(d.roomId === this.state.roomId) {
          messageList = d.messages
        }
      })
      this.setState({
        userInfo: results[0],
        rooms: results[1],
        messageList
      })
    }).catch(err => {
      console.warn(err.message);
    })
  }

  handleShowOther = () => {
    this.setState({
      showOther: !this.state.showOther
    })
  }

  handleChangeText = (e) => {
    this.setState({
      textValue: e
    })
  }

  saveToLocal = (messageItem) => {
    const { roomId, rooms, otherSideName } = this.state;
    const newRooms = _.cloneDeep(rooms)
    // 存到本地
    let isCreate = true;
    let room = {};
    let i;
    newRooms.forEach((d, index) => {
      if(d.roomId === roomId) {
        i = index
        isCreate = false;
        room = d;
        room.messages.push(messageItem)
      }
    })

    if (isCreate) {
      newRooms.unshift({
        roomId,
        otherSideName,      
        messages: [messageItem]
      })
    } else {
      newRooms.splice(i, 1);
      newRooms.unshift(room);
    }
    storage.save({
      key: 'rooms',
      data: newRooms
    });
  }

  handleSubmitText = (e) => {
    // 通过roomId建立ws
    // ep.emit('updateList')
    const { userInfo, textValue, user, roomId, messageList, rooms, otherSideName } = this.state;
    const newMessageList =  _.cloneDeep(messageList)
    const messageItem = {
      isMine: true,
      time: Date.parse(new Date()),
      content: textValue,
    }
    // 本地持久化
    this.saveToLocal(messageItem)

    // 更新视图
    newMessageList.push(messageItem)
    this.setState({
      messageList: newMessageList,
      textValue: ''
    })

    ep.emit('update')

    // 同步到服务器
    api.sendMessage({
      roomId: roomId,
      otherSideId: user.userId,
      userId: userInfo.userId,
      ...messageItem
    })
    // .then(({data}) => {
    //   if (data.code === 0) {
    //     // 存到storage里
    //   } else {
    //     Toast.info('请求失败', 1);
    //   }
    // })
    // this.setState({
    //   textValue: ''
    // })
  }

  render() {
    const state = this.state;
    return (
      <View style={[{flex: 1}]}>
        <Background messageList={state.messageList}/>
        <View style={{
          flexDirection:'row',
          backgroundColor: '#fff',
          height: 40,
        }}>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../../asset/语音.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10
          }}>
            <TextInput
              blurOnSubmit
              onSubmitEditing={this.handleSubmitText}
              onChangeText={this.handleChangeText}
              multiline={true}
              style={{left: 0, right: 0, height: 30}}
              value={state.textValue}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../../asset/表情.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <TouchableHighlight
              style={{borderRadius: 12.5}}
              underlayColor="#fff"
              onPress={this.handleShowOther}
            >
              <Image
                source={require('../../../asset/添加.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableHighlight>
          </View>
        </View>
        {state.showOther ? <View>
          <View>
            <View>
              <Image
                source={require('../../../asset/添加.png')}
                style={{width: 25, height: 25}}
              />
              <Text>图片</Text>
            </View>
          </View>
        </View> : null}
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500
  }
})
