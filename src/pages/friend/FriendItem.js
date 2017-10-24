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
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'row'
  },
  head: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#333'
  },
  body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  }
})