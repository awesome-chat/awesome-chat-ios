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
import { Button, Modal, Toast,  List, InputItem, DatePicker, TextareaItem } from 'antd-mobile';
import { NavigationActions } from 'react-navigation'

export default class EditPassword extends Component {
  static navigationOptions = {
    title: '请假',
    showModal: true
  };

  constructor(props) {
    super(props);
    this.state = {
      cottageReason: '',
      startTime: '',
      endTime: '',
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
    const { startTime, endTime, cottageReason, userInfo } = this.state;
    console.log(this.state)
    api.cottage({
      userId: userInfo.userId,
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('申请成功', 1);
      } else {
        Toast.info(data.msg || '申请失败', 1);
      }
    })
  }

  handleChangeState = (type, e) => {
    this.setState({
      [type]: e
    })
  }

  render() {
    const {startTime, endTime, cottageReason, userInfo} = this.state;
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
          <DatePicker
            value={startTime ? new Date(startTime) : ''}
            mode="date"
            minDate={new Date()}
            onChange={(time) => {
              console.log(Date.parse(time))
              this.setState({
                startTime: Date.parse(time)
              })
            }}
          >
            <List.Item arrow="horizontal">请假开始时间</List.Item>
          </DatePicker>
          <DatePicker
            mode="date"
            value={endTime ? new Date(endTime) : ''}
            minDate={new Date()}
            onOk={(time) => {
              console.log(Date.parse(time))
              this.setState({
                endTime: Date.parse(time)
              })
            }}
          >
            <List.Item arrow="horizontal">请假结束时间</List.Item>
          </DatePicker>
          <TextareaItem
            value={cottageReason}
            onChange={(e) => {
              this.setState({
                cottageReason: e
              })
            }}
            placeholder="请填写请假原因"
            title="高度自适应"
            rows={5}
          />
        </List>
        <View style={{marginTop: 10, padding: 10, width: '100%'}}>
          <Button
            type="primary"
            // size={18}
            // style={{padding: 10}}
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
