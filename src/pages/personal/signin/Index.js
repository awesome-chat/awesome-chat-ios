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
import { Button, Modal, Toast,  List, InputItem, Switch} from 'antd-mobile';
import { NavigationActions } from 'react-navigation'

export default class SignIn extends Component {
  static navigationOptions = {
    title: '一键打卡',
    showModal: true
  };

  constructor(props) {
    super(props);
    this.state = {
      wifi: false,
      place: false,
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
    const { userInfo } = this.state;
    api.signin()
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('密码修改成功', 1);
      } else {
        Toast.info(data.msg || '密码修改失败', 1);
      }
    })
  }

  handleChangeState = (type, e) => {
    console.log(type, this.state[type])
    this.setState({
      [type]: !this.state[type]
    })
  }

  render() {
    const {wifi, place, userInfo} = this.state;
    return (
      <View style={styles.container}>
        <List style={{width: '100%', marginTop: 20}}>
          <List.Item
            extra={<Switch
              checked={wifi}
              onChange={(e) => {this.handleChangeState('wifi', e)}}
            />}
          >请获取WIFI</List.Item>
          <List.Item
            extra={<Switch
              checked={place}
              onChange={(e) => {this.handleChangeState('place', e)}}
            />}
          >请获取位置</List.Item>
        </List>
        <View style={{marginTop: 10, padding: 10, width: '100%'}}>
          <Button
            disabled={!(wifi && place)}
            type="primary"
            onClick={this.handleSubmit}
          >打卡</Button>
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
