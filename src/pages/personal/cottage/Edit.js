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
import moment from 'moment';
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
    if (!startTime || !endTime) {
      Toast.info('请选择请假时间', 1)
      return
    }
    if (!cottageReason) {
      Toast.info('请输入请假理由', 1)
      return
    }
    const interval = ((endTime - startTime)/(1000 * 60 * 60 * 24)).toFixed(0)
    const days = []
    const start = new Date(startTime)
    const end = new Date(endTime)
    while((end.getTime()-start.getTime())>=0){
      var year = start.getFullYear();
      var month = start.getMonth() + 1;
      var date = start.getDate();
      days.push({
        userId: userInfo.userId,
        attendanceYear: year,
        attendanceMonth: month,
        attendanceDate: date
      })
      start.setDate(start.getDate()+1);
    }
    api.cottage({
      days,
      cottageReason,
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('申请成功', 1);
        this.setState({
          cottageReason: '',
          startTime: '',
          endTime: '',
        })
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
              this.setState({
                startTime: Date.parse(time),
                endTime: ''
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
              console.log(new Date(startTime), new Date(time))
              if (!startTime) {
                Toast.info('请先选择开始时间', 1)
                return
              }
              if (startTime > Date.parse(time)) {
                Toast.info('开始时间需小于结束时间', 1)
                return
              }
              const interval = ((time - startTime)/(1000 * 60 * 60 * 24)).toFixed(0)
              if (interval >= 5) {
                Toast.info('单次数请假时间最长5天', 1)
                return
              }
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
