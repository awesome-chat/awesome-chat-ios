import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Alert
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };
  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="用户名"
        />
        <Input
          placeholder="密码"
        />
        <Button
          onPress={() => this.props.navigation.navigate('MessageList')}
          title="登录"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
