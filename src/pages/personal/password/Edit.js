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
import api from '../../../model/api';
import { Button, Modal, Toast,  List, InputItem } from 'antd-mobile';
import { NavigationActions } from 'react-navigation'

export default class EditPassword extends Component {
  static navigationOptions = {
    title: '修改密码',
    showModal: true
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPwd: '',
      newPwd: '',
      userInfo: {}
    }
  }

  componentWillMount() {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      this.setState({
        userInfo: ret
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleSubmit = () => {
    const { oldPwd, newPwd, userInfo } = this.state;
    if (newPwd.length < 6) {
      Toast.info('新密码最少六位', 1);
      return
    }
    api.resetPwd({
      userId: userInfo.userId,
      oldPwd,
      newPwd
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('密码修改成功', 1);
      } else {
        Toast.info(data.msg || '密码修改失败', 1);
      }
    })
  }

  handleChangeState = (type, e) => {
    this.setState({
      [type]: e
    })
  }

  render() {
    const {oldPwd, newPwd, userInfo} = this.state;
    return (
      <View style={styles.container}>
        <List style={{width: '100%', marginTop: 20}}>
          <InputItem
            value={userInfo.userName}
            editable={false}
          >用户名</InputItem>
          <InputItem
            value={userInfo.userTel}
            editable={false}
          >手机号</InputItem>
          <InputItem
            type="password"
            value={oldPwd}
            placeholder="请输入"
            onChange={(e) => {this.handleChangeState('oldPwd', e)}}
          >旧密码</InputItem>
          <InputItem
            type="password"
            value={newPwd}
            placeholder="请输入"
            onChange={(e) => {this.handleChangeState('newPwd', e)}}
          >新密码</InputItem>
        </List>
        <View style={{marginTop: 10, padding: 10, width: '100%'}}>
          <Button
            disabled={!(newPwd && oldPwd)}
            type="primary"
            // size={18}
            // style={{padding: 10}}
            onClick={this.handleSubmit}
          >修改密码</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f9',
  }
});
