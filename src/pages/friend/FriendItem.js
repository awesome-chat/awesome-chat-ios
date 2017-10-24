import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

export class FriendItem extends Component {
  handlePress = () => {
    console.log('on press')
    this.props.navigation.navigate('FriendDetail',  { id: '0001' })
  }
  render() {
    return (
      <TouchableOpacity style={{
        height: 50,
        marginBottom: 2,    
        backgroundColor: '#fff'
      }} onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.head}>
          </View>
          <View style={styles.body}>
            <Text>sss</Text>
          </View>
        </View>
      </TouchableOpacity>
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
      <TouchableOpacity style={{
        height: 50,
        marginBottom: 2,    
        backgroundColor: '#fff'
      }} onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.head}>
          </View>
          <View style={styles.body}>
            <Text>department</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#333'
  },
  body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  }
})