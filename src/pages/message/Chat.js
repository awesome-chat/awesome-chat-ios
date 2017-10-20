import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView
} from 'react-native';
import KeyboardSpacer from '../../components/KeyboardSpacer';
import ChatInput from './ChatInput'

export default class Chat extends Component {
  static navigationOptions = {
    title: 'Name',
  };
  render() {
    return (
      <View style={[{flex: 1}]}>
        <Image
          source={{uri: 'http://img11.deviantart.net/072b/i/2011/206/7/0/the_ocean_cherry_tree_by_tomcadogan-d41nzsz.png', static: true}}
          style={{flex: 1}}
        />
        <View style={{
          flexDirection:'row',
          backgroundColor: '#fff',
          height: 40,
        }}>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../asset/语音.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10
          }}>
            <TextInput
              multiline={true}
              style={{left: 0, right: 0, height: 30}}
              placeholder={'Enter your text!'}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../asset/表情.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../asset/添加.png')}
              style={{width: 25, height: 25}}
            />
          </View>
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500
  }
})
