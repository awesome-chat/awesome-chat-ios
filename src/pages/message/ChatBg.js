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
      <ScrollView style={{flexDirection:'column', paddingTop: 5}}>
        <View style={styles.messageRight}>
          <View style={styles.inMessageRight}>
            <Text style={styles.textRight}>我知道啦 qq plzScroll qq plz</Text>
          </View>
        </View>
        <View style={styles.messageLeft}>
          <View style={styles.inMessageLeft}>
            <Text style={styles.textLeft}>Scroll qq plz</Text>
          </View>
        </View>
        <View style={styles.messageLeft}>
          <View style={styles.inMessageLeft}>
            <Text style={styles.textLeft}>sadvasdvbvasd qq plz</Text>
          </View>
        </View>
        <View style={styles.messageLeft}>
          <View style={styles.inMessageLeft}>
            <Text style={styles.textLeft}>Scroll qsavnfdbkdfsbnfdbq plz</Text>
          </View>
        </View>
        <View style={styles.messageRight}>
          <View style={styles.inMessageRight}>
            <Text style={styles.textRight}>Scroll qq plz</Text>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  messageLeft: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
    height: 40
  },
  messageRight: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-end',
    height: 40,
  },
  inMessageRight: {
    backgroundColor: '#2189f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    height: 30,
    maxWidth: '80%'
  },
  inMessageLeft: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    height: 30,
    borderRadius: 10,
    maxWidth: '80%'
  },
  textRight:{
    fontSize: 15,
    color: '#fff',
  },
  textLeft:{
    fontSize: 15,
    color: '#000',
  }
})
