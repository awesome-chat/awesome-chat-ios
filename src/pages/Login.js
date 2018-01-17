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
import Button from '@components/Button';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPwd: '',
    }
  }

  handleSubmit = () => {
    const { userName, userPwd } = this.state;
    console.log(userName, userPwd)
    if (userName && userPwd) {
      console.log(userName, userPwd)
      this.props.navigation.navigate('MessageList')
    } else {

    }
  }

  handleNameChange = (e) => {
    console.log(e.target)
    this.setState({
      userName: String(e.target)
    })
  }

  handlePwdChange = (e) => {
    this.setState({
      userPwd: String(e.target)
    })
  }

  render() {
    const {userName, userPwd} = this.state;
    return (
      <View style={styles.container}>
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
          <Text style={styles.label}>用户名</Text>
          <TextInput
            onChange={this.handleNameChange}
            value={userName}
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            placeholder="请输入用户名"
          />
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            onChange={this.handlePwdChange}
            value={userPwd}
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            placeholder="请输入密码"
          />
        </View>
        <Button
          onPress={this.handleSubmit}
          title="登录"
        />
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
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0)',
    marginLeft: 20,
  },
  label: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0)',
    marginBottom: 10,
  },
  inputCon: {
    width:'80%',
    marginBottom: 8,
  },
  input: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginBottom:10,
    paddingBottom:10,
    borderBottomWidth: 0.5,
    borderBottomColor:'rgba(255,255,255,0.2)',
    width: '100%'
  }
});
