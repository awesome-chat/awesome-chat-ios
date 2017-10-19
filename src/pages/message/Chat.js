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
          backgroundColor:'red'
        }}>
          <TextInput
            style={{left: 0, right: 0, height: 45}}
            placeholder={'Enter your text!'}
          />
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
