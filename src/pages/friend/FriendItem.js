import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';

export class FriendItem extends Component {
  handlePress = () => {
    console.log('on press')
    this.props.navigation.navigate('FriendDetail',  { id: '0001' })
  }
  render() {
    return (
      <TouchableHighlight underlayColor='#fff' style={styles.touch} onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.head}>
          </View>
          <View style={styles.body}>
            <Text style={styles.word}>sss</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export class DepartmentItem extends Component {
  handlePress = () => {
    console.log('on press')
    this.props.navigation.navigate('DepartmentList',  { id: '0001' })
  }
  render() {
    return (
      <TouchableHighlight underlayColor='#fff' style={styles.touch} onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.head}>
          </View>
          <View style={styles.body}>
            <Text style={styles.word}>department</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    height: 50,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,   
    backgroundColor: '#fff'
  },
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'row'
  },
  head: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#eee'
  },
  body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  word: {
    width: '100%',
    marginLeft: 20,
  }
})