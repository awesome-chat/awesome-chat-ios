import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  // Button,
  Alert
} from 'react-native';
import Button from '../components/Button';

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="用户名"
        />
        <TextInput
          style={{height: 40}}
          placeholder="密码"
        />
        <Button
          onPress={onButtonPress}
          title="登录"
          accessibilityLabel="Ok, Great!"
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
