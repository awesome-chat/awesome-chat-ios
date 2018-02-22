import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import api from '../../../../model/api';
import { Button, Modal, Toast,  List, InputItem, TextareaItem } from 'antd-mobile';
import { NavigationActions } from 'react-navigation'

export default class Paganname extends Component {
  static navigationOptions = {
    title: '签名',
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

  handleSubmit = () => {
    const { value } = this.state;
    api.modifyPaganname({
      userId: this.state.userInfo.userId,
      userSign: value
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('更换签名成功', 1);
        this.setState({value: ''})
      } else {
        Toast.info(data.msg || '更换签名失败', 1);
      }
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
          renderHeader={() => '请输入新签名：'}
          style={{width: '100%'}}
        >
          <TextareaItem
            value={value}
            onChange={(e) => {this.handleChangeState('value', e)}}
            title="高度自适应"
            rows={5}
          />
        </List>
        <View style={{marginTop: 10, padding: 10, width: '100%'}}>
          <Button
            disabled={!value}
            type="primary"
            onClick={this.handleSubmit}
          >提交</Button>
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
