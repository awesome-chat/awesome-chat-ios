import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Image,
  NetInfo
} from 'react-native';
import api from '../../../model/api';
import { Button, Modal, Toast,  List, InputItem, Switch} from 'antd-mobile';
import { NavigationActions } from 'react-navigation'
import Geolocation from 'Geolocation';
import { NetworkInfo } from 'react-native-network-info';

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
    const { location, connectionInfo, userInfo } = this.state;
    api.signIn({
      location,
      connectionInfo,
      userId: userInfo.userId
    })
    .then(({data}) => {
      if (data && data.code === 0) {
        Toast.info('打卡成功', 1);
      } else {
        Toast.info(data.msg || '打卡失败', 1);
      }
    })
  }

  handleGetLoc = () => {
    if (!this.state.place) {
      Geolocation.getCurrentPosition(
        location => {
          // 请求服务端判断经纬度是否符合
          // var result = "速度：" + location.coords.speed +
          //             "\n经度：" + location.coords.longitude +
          //             "\n纬度：" + location.coords.latitude +
          //             "\n准确度：" + location.coords.accuracy +
          //             "\n行进方向：" + location.coords.heading +
          //             "\n海拔：" + location.coords.altitude +
          //             "\n海拔准确度：" + location.coords.altitudeAccuracy +
          //             "\n时间戳：" + location.timestamp;
          Alert.alert('提示', '获取地理位置成功');
          this.setState({
            place: !this.state.place,
            location: location.coords
          })
        },
        error => {
          Alert.alert('提示', "获取位置失败："+ error)
        }
      );
    } else {
      this.setState({
        place: !this.state.place,
        location: {}
      })
    }
  }

  handleGetWifi = () => {
    if (!this.state.wifi) {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('connectionInfo', connectionInfo)
        Alert.alert('提示', '获取wifi信息成功');
        this.setState({
          wifi: !this.state.wifi,
          connectionInfo
        })
      }).catch((error) => { console.error(error); })
    } else {
      this.setState({
        wifi: !this.state.wifi,
        connectionInfo: {}
      })
    }
  }

  render() {
    const {wifi, place, userInfo} = this.state;
    return (
      <View style={styles.container}>
        <List style={{width: '100%', marginTop: 20}}>
          <List.Item
            extra={<Switch
              checked={wifi}
              onChange={this.handleGetWifi}
            />}
          >请获取WIFI</List.Item>
          <List.Item
            extra={<Switch
              checked={place}
              onChange={this.handleGetLoc}
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
