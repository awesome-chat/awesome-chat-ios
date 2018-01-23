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
import KeyboardSpacer from '../../../components/KeyboardSpacer';
import Background from './Background'
import api from '../../../model/api'

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
      otherSideId: '',
    }
  }

  componentWillMount() {
    this.initRoom()
    this.getLocalStorage()
  }

  initRoom = () => {
    const {params = {}} = this.props.navigation.state;
    // 必须携带roomId
    this.setState({
      roomId: params.roomId,
    })
  }

  getLocalStorage = () => {
    storage.getBatchData([
      { key: 'userInfo' },
      { key: 'rooms' }
    ]).then(results => {
      this.setState({
        userInfo: results[0],
        rooms: results[1]
      })
      console.log(results)
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

  handleSubmitText = (e) => {
    // 通过roomId建立ws
    const { textValue, roomId } = this.state;
    api.sendMessage({
      roomId: roomId,
      messageContent: textValue
    })
    .then(({data}) => {
      if (data.code === 0) {
        // 存到storage里
      } else {
        Toast.info('请求失败', 1);
      }
    })
    this.setState({
      textValue: ''
    })
  }

  render() {
    const state = this.state;
    return (
      <View style={[{flex: 1}]}>
        <Background />
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
