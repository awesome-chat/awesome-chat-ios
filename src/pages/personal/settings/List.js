import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import api from '../../../model/api';
import { Button, Modal, Switch, Toast,  List, InputItem, TextareaItem } from 'antd-mobile';
import { NavigationActions } from 'react-navigation'

export default class Setting extends Component {
  static navigationOptions = {
    title: '反馈',
    showModal: true
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

  handleChangeState = (type, e) => {
    this.setState({
      [type]: e
    })
  }

  render() {
    const {value, userInfo} = this.state;
    return (
      <View style={styles.container}>
        <List
          style={{width: '100%'}}
        >
          <List.Item arrow="horizontal" onClick={() => {
            this.props.navigation.navigate('Paganname')
          }}>修改签名</List.Item>
          <List.Item
            extra={<Switch
            />}
          >关闭提醒</List.Item>
          <List.Item>清空聊天记录</List.Item>
        </List>
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
