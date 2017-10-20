import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import KeyboardSpacer from '../../components/KeyboardSpacer';
import ChatInput from './ChatInput'

export default class ChatBg extends Component {
  render() {
    return (
      <ScrollView style={{flexDirection:'column'}}>
        <View style={styles.messageLeft}>
          <View style={styles.inMessageRight}>
            <Text style={{fontSize:10}}>Scroll qq plz</Text>
          </View>
        </View>
        <View style={styles.messageRight}>
          <View style={styles.inMessageRight}>
            <Text style={{fontSize:10}}>Scroll qq plz</Text>
          </View>
        </View>
        <View style={styles.messageLeft}>
          <View style={styles.inMessageLeft}>
            <Text style={{fontSize:10}}>Scroll qq plz</Text>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  messageLeft: {
    alignItems: 'flex-start',
    height: 30,
  },
  messageRight: {
    alignItems: 'flex-end',
    height: 30,
  },
  inMessageRight: {
    backgroundColor: 'red',
    height: 30,
    maxWidth: '80%'
  },
  inMessageLeft: {
    backgroundColor: 'blue',
    height: 30,
    maxWidth: '80%'
  }
})
