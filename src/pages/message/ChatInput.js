import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';

export default class ChatInput extends Component {
  static navigationOptions = {
    title: 'Name',
  };
  render() {
    return (
      <View style={[{flex: 1, flexDirection: 'row'}]}>
        <View>
          <Image
            source={require('../../asset/联系人.png')}
            style={{width: 25, height: 25}}
          />
        </View>
        <View>
          <TextInput
            style={{left: 0, right: 0, height: 45}}
            placeholder={'Enter your text!'}
          />
        </View>
        <View></View>
        <View></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500
  }
})
