import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Animated,
} from 'react-native';
import { Toast, Grid } from 'antd-mobile';
import _ from 'lodash';
import KeyboardSpacer from '../../../components/KeyboardSpacer';
import Background from './Background'
import api from '../../../model/api'
import ep from '../../../store'
import emoji from '../../../constants/emoji'
import ImagePicker from 'react-native-image-picker'

export default class Chat extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.otherSideName || '',
    headerBackTitle: '返回',
    headerRight: (
      <TouchableHighlight
        underlayColor='#eee'
        style={{marginRight: 10}}
        onPress={()=>{
          const {
            roomId,
            otherSideName,
            isGroup,
            userId,
            roomMemberId
          } = navigation.state.params;
          const url = navigation.state.params.isGroup ? 'GroupDetail' : 'FriendDetail';
          const params = navigation.state.params.isGroup ? {
            roomId,
            otherSideName,
            isGroup,
            userId
          } : {
            userId: roomMemberId.split('-').filter(d => d!==String(userId))[0]
          }
          navigation.navigate(url, params)
        }}
      >
        {
          navigation.state.params.isGroup ?
          <Image style={{width: 25, height: 25}} source={require('../../../asset/friend_fill.png')} /> :
          <Image style={{width: 25, height: 25}} source={require('../../../asset/people_fill.png')} />
        }
      </TouchableHighlight>
    ),
  });

  constructor(props){
    super(props);
    const {params = {}} = this.props.navigation.state;
    this.state = {
      showExpression: new Animated.Value(0),
      showOther: new Animated.Value(0),
      textValue: '',
      user: {},
      roomId: params.roomId,
      roomMemberId: params.roomMemberId,
      messageList: [],
      rooms: [],
      isGroup: params.isGroup,
      otherSideName: params.otherSideName,
      otherSideAvatar: params.otherSideAvatar
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
      let messageList = [];
      results[1].forEach(d => {
        if(d.roomId === this.state.roomId) {
          messageList = d.messages
        }
      })
      const newRooms = results[1].map(d => {
        if(d.roomId === this.state.roomId) {
          d.newMessageNum = 0
        }
        return d
      })
      // 去掉新消息通知
      storage.save({
        key: 'rooms',
        data: newRooms
      }).then(d => {
        ep.emit('update')        
      })
      this.setState({
        userInfo: results[0],
        rooms: results[1],
        messageList
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  handleShowOther = () => {
    Animated.timing(
      this.state.showExpression,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
    Animated.timing(
      this.state.showOther,
      {
        toValue: this.state.showOther._value === 100 ? 0 : 100,
        duration: 200,
      }
    ).start();
  }

  handleShowExp = () => {
    Animated.timing(
      this.state.showOther,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
    Animated.timing(
      this.state.showExpression,
      {
        toValue: this.state.showExpression._value === 150 ? 0 : 150,
        duration: 200,
      }
    ).start();
  }

  handleFocus = () => {
    // Animated.timing(
    //   this.state.showOther,
    //   {
    //     toValue: 0,
    //     duration: 0,
    //   }
    // ).start();
  }

  handleChangeText = (e) => {
    this.setState({
      textValue: e
    })
  }

  saveToLocal = (messageItem, otherSideAvatar = '') => {
    const { roomId, otherSideName } = this.state;
    storage.load({
      key: 'rooms'
    }).then(rooms => {
      const newRooms = _.cloneDeep(rooms)
      // 存到本地
      let isCreate = true;
      let room = {};
      let i;
      newRooms.forEach((d, index) => {
        if(d.roomId === roomId) {
          i = index
          isCreate = false;
          room = {
            ...d,
            otherSideAvatar
          };
          room.messages.push(messageItem)
        }
      })
      if (isCreate) {
        newRooms.unshift({
          roomId,
          roomMemberId,
          otherSideName,
          otherSideAvatar,
          messages: [messageItem]
        })
      } else {
        newRooms.splice(i, 1);
        newRooms.unshift(room);
      }
      storage.save({
        key: 'rooms',
        data: newRooms
      }).then(d => {
        // 告诉首页需要更新
        ep.emit('update')
      });
    })
  }

  handleSubmitText = (e) => {
    const {
      userInfo,
      textValue,
      otherSideAvatar,
      roomId,
      roomMemberId,
      messageList,
      rooms,
      otherSideName,
      isGroup
    } = this.state;
    const newMessageList =  _.cloneDeep(messageList)
    const messageItem = {
      isMine: true,
      createTime: Date.parse(new Date()),
      content: textValue,
    }
    // 本地持久化
    this.saveToLocal(messageItem, otherSideAvatar)

    // 更新视图
    newMessageList.push(messageItem)
    this.setState({
      messageList: newMessageList,
      textValue: ''
    })
    
    // 同步到服务器
    if(isGroup) {
      // 群聊
      api.sendMessage({
        isGroup: true,
        roomId: roomId,
        roomMemberId: roomMemberId,
        userId: userInfo.userId,
        userName: userInfo.userName,
        otherSideName: otherSideName,
        ...messageItem
      })
    } else {
      // 单聊
      api.sendMessage({
        roomId: roomId,
        roomMemberId: roomMemberId,
        userId: userInfo.userId,
        userName: userInfo.userName,
        ...messageItem
      })
    }
  }

  handleSubmitImg = (res) => {
    const { userInfo, user, roomId, roomMemberId, messageList, rooms, otherSideName, isGroup } = this.state;

    let formData = new FormData();
    let file = {uri: res.uri, type: 'multipart/form-data', name: res.fileName};
    
    formData.append("images",file);

    api.uploadImg(formData)
    .then(res => res && res.data)
    .then(data => {
      if(data.code === 0) {
        const newMessageList =  _.cloneDeep(messageList)
        const messageItem = {
          isPic: true,
          isMine: true,
          createTime: Date.parse(new Date()),
          content: `http://localhost:3000/static/img/${data.fileName}`,
        }
        // 本地持久化
        this.saveToLocal(messageItem)
        newMessageList.push(messageItem)
        this.setState({
          messageList: newMessageList,
          textValue: ''
        })
        if(isGroup) {
          // 群聊
          api.sendMessage({
            isGroup: true,
            roomId: roomId,
            roomMemberId: roomMemberId,
            userId: userInfo.userId,
            userName: userInfo.userName,
            otherSideName: otherSideName,
            ...messageItem
          })
        } else {
          // 单聊
          api.sendMessage({
            roomId: roomId,
            roomMemberId: roomMemberId,
            userId: userInfo.userId,
            userName: userInfo.userName,
            ...messageItem
          })
        }
      } else {
        Toast.info('图片上传失败')
      }
    })
    
    // fetch(url,{  
    //   method:'POST',  
    //   headers:{  
    //       'Content-Type':'multipart/form-data',  
    //   },  
    //   body:formData,  
    // })  
    // .then((response) => response.text() )  
    // .then((responseData)=>{  
    
    //   console.log('responseData',responseData);  
    // })  
    // .catch((error)=>{console.error('error',error)});




    // const content = 'url'
    // const newMessageList =  _.cloneDeep(messageList)
    // const messageItem = {
    //   isPic: true,
    //   isMine: true,
    //   createTime: Date.parse(new Date()),
    //   content,
    // }
    // // 本地持久化
    // this.saveToLocal(messageItem)
    // newMessageList.push(messageItem)
    // this.setState({
    //   messageList: newMessageList,
    //   textValue: ''
    // })
  }

  render() {
    const state = this.state;

    const expData = emoji.map(d => ({text: d}))

    const gridData = [{
      img: <Image source={require('../../../asset/img.png')} style={{width: 35, height: 35}} />,
      func: () => {
        ImagePicker.launchImageLibrary({}, (response)  => {
          this.handleSubmitImg(response)
          // Same code as in above section!
        });
      }
    }, {
      img: <Image source={require('../../../asset/photo.png')} style={{width: 35, height: 35}} />,
      func: () => {
        ImagePicker.launchCamera({}, (response)  => {
          // Same code as in above section!
        });
      }
    }, {
      img: <Image source={require('../../../asset/cooperation.png')} style={{width: 35, height: 35}} />
    }];

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
              source={require('../../../asset/voice.png')}
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
              onFocus={this.handleFocus}
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
            <TouchableHighlight
              style={{borderRadius: 12.5}}
              underlayColor="#fff"
              onPress={this.handleShowExp}
            >
              <Image
                source={require('../../../asset/expression.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableHighlight>
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
                source={require('../../../asset/add.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableHighlight>
          </View>
        </View>
        <Animated.View
          style={{
            ...this.props.style,
            overflow: 'hidden',
            height: state.showExpression,
          }}
        >
          <View style={{backgroundColor: '#f5f5f9'}}>
            <Grid
              isCarousel
              carouselMaxRow={3}
              itemStyle={{height: 50}}
              hasLine={false}
              data={expData}
              columnNum={6}
              renderItem={d => (
                <View style={{ justifyContent:'center', alignItems:'center', height:50 }}>
                  <Text>{d.text}</Text>
                </View>
              )}
              onClick={(d, i) => {
                this.setState({
                  textValue: state.textValue + d.text
                })
              }}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            ...this.props.style,
            overflow: 'hidden',
            height: state.showOther,
          }}
        >
          <View style={{backgroundColor: '#f5f5f9'}}>
            <Grid
              hasLine={false}
              data={gridData}
              columnNum={3}
              renderItem={d => (
                <View style={{justifyContent:'center', alignItems:'center', height:'100%'}}>
                  {d.img}
                </View>
              )}
              onClick={(d, i) => {
                d.func()
              }}
            />
          </View>
        </Animated.View>
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
