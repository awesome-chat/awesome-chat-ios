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
import api from '@model/api';
import { Button, Modal, Toast } from 'antd-mobile';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
    showModal: true
  };

  constructor(props) {
    super(props);
    this.state = {
      userMisId: '',
      userPwd: '',
    }
  }

  handleSubmit = () => {
    const { userMisId, userPwd } = this.state;
    console.log(userMisId, userPwd)
    if (userMisId && userPwd) {
      console.log(userMisId, userPwd)
      api.verifyUser({
        userMisId,
        userPwd
      })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (data && data.code === 0) {
          this.props.navigation.navigate('MessageList')
        } else {
          Toast.info('用户名密码错误', 1);
        }
      })
    } else {
      Toast.info('用户名密码错误', 1);
    }
  }

  render() {
    const {userMisId, userPwd} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={() => {this.setState({showModal: false})}}
          title="输入有误，请重新填写"
          footer={[{ text: 'OK', onPress: () => {this.setState({showModal: false}); } }]}
        >
           <View></View>
        </Modal>
        <Image  style={styles.img}
          source={require('../asset/bg.jpg')}
          resizeMode='cover'
        />
        <View style={styles.bg}></View>
        <View style={styles.titleCon}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../asset/logo.png')}
            resizeMode='cover'
          />
          <Text style={styles.title}>欢迎您的使用</Text>
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.label}>Mis号</Text>
          <TextInput
            onChangeText={(text) => this.setState({userMisId: text})}
            value={userMisId}
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            placeholder="请输入用户名"
          />
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            onChangeText={(text) => this.setState({userPwd: text})}
            value={userPwd}
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            placeholder="请输入密码"
          />
        </View>
        <Button
          disabled={!(userPwd && userPwd)}
          style={{
            marginTop: 20,
            width: '80%'
          }}
          onClick={this.handleSubmit}
          type="primary"
        >登录</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bg: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.2,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleCon: {
    width:'80%',
    flexDirection: 'row',
    backgroundColor: null,
    marginBottom: 60,
    marginTop: 100,
  },
  title: {
    color: '#fff',
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0)',
    marginLeft: 20,
  },
  label: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0)',
    marginBottom: 15,
  },
  inputCon: {
    width:'80%',
    marginBottom: 8,
  },
  input: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom:10,
    paddingBottom:10,
    borderBottomWidth: 0.5,
    borderBottomColor:'rgba(255,255,255,0.2)',
    width: '100%'
  }
});
